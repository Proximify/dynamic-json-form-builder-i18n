import React, {useState, useEffect} from 'react';
import FormBuilder from '../../../component/dynamic-json-form-builder';
import api from "../../../api";
import {FiEdit} from 'react-icons/fi';
import {AiOutlineFileAdd} from 'react-icons/ai'
import {ModalFullScreen} from "../../../component/dynamic-json-form-builder/components/utils/Modals";
import Formatter from "../../formatter";
import SchemaParser, {getLovSubtypeId, bilingualValueParser} from "../SchemaParser";

export function SectionPageBuilder(props) {
    const schema = [...props.schema];
    const [state, setState] = useState({
        sections: [],
        form: null,
        shouldModalOpen: false,
        scrollY: 0,
        ready: false,
    })
    // console.log("SectionPageBuilder", state)

    useEffect(() => {
        if (state.shouldModalOpen === true) {
            document.body.style.position = 'fixed';
        } else {
            console.log('end', state.scrollY)
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, state.scrollY);
        }
    }, [state.shouldModalOpen])

    // has subsection, use field to create subtitle, no subsection, use field to call formatter
    const sectionSchemaBuilder = (section, section_data, fields) => {
        if (section["type"] === "form") {
            // if (section.section_data.length > 0) {
            //     let opens = [];
            //     for (let i = 0; i < section.section_data.length; i++) {
            //         opens.push(false)
            //     }
            //     section["open"] = opens;
            // } else {
            //     section["open"] = []
            // }
        } else if (section["type"] === "section") {
            // console.log(section)
            Object.keys(section["subsections"]).forEach(key => {
                const subsection = section["subsections"][key];
                const dataArray = [];
                section_data.forEach(data => dataArray.push(data.values))
                Object.keys(fields).forEach(key => {
                    const field = fields[key];
                    if (field["subsection_id"] === subsection["section_id"]) {
                        const field_id = field["field_id"];
                        subsection["section_data"] = []

                        dataArray.forEach(data => {
                            Object.keys(data).forEach(dataKey => {
                                if (dataKey === field_id) {
                                    // console.log(data[dataKey])
                                    subsection["section_data"] = data[dataKey]
                                }
                            })
                        })
                    }
                })
                sectionSchemaBuilder(subsection, subsection["section_data"], subsection.fields);
            })
        }
    }

    useEffect(() => {
        if (state.ready)
            return;
        schema.forEach(section => sectionSchemaBuilder(section, section.section_data, section.fields));
        setState({
            ...state,
            sections: schema,
            shouldModalOpen: false,
            ready: true,
            form: null,
        })
    }, [state.ready])

    const handleFormEditSubmit = (data) => {
        console.log("received form data", data, state);
        console.log("should fetch data");

        if (state.form && state.form.schema && state.form.schema.formSchema) {
            const formData = new FormData();
            formData.append('action', state.form.itemId !== 0 ? 'update' : 'insert');
            Object.keys(state.form.schema.formSchema.properties).forEach(fieldName => {
                const field = state.form.schema.formSchema.properties[fieldName]
                const fieldData = data[fieldName];
                switch (field.field_type) {
                    case 'string':
                    case 'integer':
                    case 'elaelapsed-time':
                    case "monthday":
                    case "yearmonth":
                    case "year":
                    case "date":
                        formData.append(`data[${field.id}]`, fieldData ?? "");
                        break;
                    case 'lov':
                    case 'reftable':
                        if (fieldData) {
                            const lovData = JSON.parse(fieldData);
                            if (field.field_type === 'lov') {
                                lovData.forEach(data => {
                                    formData.append(`data[${field.id}][]`, data)
                                })
                            } else {
                                formData.append(`data[${field.id}][]`, lovData[0])
                                formData.append(`data[${field.id}][]`, lovData.slice(1).join('|'))
                            }
                        } else {
                            formData.append(`data[${field.id}]`, "")
                        }
                        break;
                    case 'bilingual':
                        if (fieldData) {
                            const bilingualData = bilingualValueParser(field, fieldData, true, false);
                            if (bilingualData.eng) {
                                formData.append(`data[${field.id}][english]`, bilingualData.eng)
                            }
                            if (bilingualData.fre) {
                                formData.append(`data[${field.id}][french]`, bilingualData.fre)
                            }
                        } else {
                            formData.append(`data[${field.id}]`, "")
                        }
                        break;
                    case 'section': {
                        if (fieldData) {
                            const newFieldData = [...fieldData];
                            const oldFieldData = state.form.sectionData[fieldName] ? [...state.form.sectionData[fieldName]] : [];
                            let insertItemCount = 1;
                            let processCount = 0;
                            while (newFieldData.length > 0) {
                                const template = `data[${field.id}][${processCount}]`;
                                const nfd = newFieldData[0];
                                let oldFieldDataIndexTracker = -1;
                                if (!nfd.itemId) {
                                    // console.log(" insert new data", nfd);
                                    // console.log(`${field.id}-new${insertItemCount}-action insert`);
                                    formData.append(`${template}[itemId]`, `new${insertItemCount}`)
                                    formData.append(`${template}[action]`, `insert`)

                                    const subsectionFields = field.fields;
                                    Object.keys(subsectionFields).forEach(fieldId => {
                                        const subsectionField = subsectionFields[fieldId];
                                        Object.keys(nfd).forEach(nfdId => {
                                            const newFieldData = nfd[nfdId];
                                            if (nfdId === subsectionField.name) {
                                                if (newFieldData) {
                                                    if (subsectionField.type === 'lov') {
                                                        const subsectionLovData = JSON.parse(newFieldData);
                                                        subsectionLovData.forEach(data => {
                                                            formData.append(`${template}[data][${fieldId}][]`, data)
                                                        })
                                                    } else if (subsectionField.type === 'reftable') {
                                                        const subsectionLovData = JSON.parse(newFieldData);
                                                        formData.append(`${template}[data][${fieldId}][]`, subsectionLovData[0])
                                                        formData.append(`${template}[data][${fieldId}][]`, subsectionLovData.slice(1).join('|'))
                                                    } else if (subsectionField.type === 'bilingual') {
                                                        const bilingualData = bilingualValueParser(subsectionField, newFieldData, true, false);
                                                        if (bilingualData.eng) {
                                                            formData.append(`${template}[data][${fieldId}][english]`, bilingualData.eng)
                                                        }
                                                        if (bilingualData.fre) {
                                                            formData.append(`${template}[data][${fieldId}][french]`, bilingualData.fre)
                                                        }
                                                    } else {
                                                        formData.append(`${template}[data][${fieldId}]`, newFieldData)
                                                    }
                                                } else {
                                                    formData.append(`${template}[data][${fieldId}]`, '');
                                                }
                                            }
                                        })
                                    })
                                    newFieldData.shift();
                                    insertItemCount++;
                                } else {
                                    let found = false;
                                    oldFieldData.forEach((ofd, index) => {
                                        if (ofd.itemId === nfd.itemId) {
                                            formData.append(`${template}[itemId]`, ofd.itemId)
                                            found = true;
                                            if (JSON.stringify(ofd) !== JSON.stringify(nfd)) {
                                                formData.append(`${template}[action]`, `update`)
                                                console.log(" update form data", nfd);
                                            } else {
                                                console.log(" no change form data", nfd);
                                                formData.append(`${template}[action]`, `none`)
                                            }
                                            const subsectionFields = field.fields;
                                            Object.keys(subsectionFields).forEach(fieldId => {
                                                const subsectionField = subsectionFields[fieldId];
                                                Object.keys(nfd).forEach(nfdId => {
                                                    const newFieldData = nfd[nfdId];
                                                    if (nfdId === subsectionField.name) {
                                                        if (newFieldData) {
                                                            if (subsectionField.type === 'lov') {
                                                                const subsectionLovData = JSON.parse(newFieldData);
                                                                subsectionLovData.forEach(data => {
                                                                    formData.append(`${template}[data][${fieldId}][]`, data)
                                                                })
                                                            } else if (subsectionField.type === 'reftable') {
                                                                const subsectionLovData = JSON.parse(newFieldData);
                                                                formData.append(`${template}[data][${fieldId}][]`, subsectionLovData[0])
                                                                formData.append(`${template}[data][${fieldId}][]`, subsectionLovData.slice(1).join('|'))
                                                            } else if (subsectionField.type === 'bilingual') {
                                                                const bilingualData = bilingualValueParser(subsectionField, newFieldData, true, false);
                                                                if (bilingualData.eng) {
                                                                    formData.append(`${template}[data][${fieldId}][english]`, bilingualData.eng)
                                                                }
                                                                if (bilingualData.fre) {
                                                                    formData.append(`${template}[data][${fieldId}][french]`, bilingualData.fre)
                                                                }
                                                            } else {
                                                                formData.append(`${template}[data][${fieldId}]`, newFieldData)
                                                            }
                                                        } else {
                                                            formData.append(`${template}[data][${fieldId}]`, '');
                                                        }
                                                    }
                                                })
                                            })
                                            newFieldData.shift();
                                            oldFieldDataIndexTracker = index;
                                        }
                                    })
                                    if (oldFieldDataIndexTracker !== -1) {
                                        oldFieldData.splice(oldFieldDataIndexTracker, 1);
                                    }
                                    if (!found) {
                                        console.error("cannot find newdata itemId from old data", nfd, oldFieldData);
                                        newFieldData.shift();
                                    }
                                }
                                processCount++;
                            }
                            if (oldFieldData.length > 0) {
                                oldFieldData.forEach(ofd => {
                                    const template = `data[${field.id}][${processCount}]`;
                                    const subsectionFields = field.fields;

                                    formData.append(`${template}[itemId]`, ofd.itemId);
                                    formData.append(`${template}[action]`, `delete`);

                                    Object.keys(subsectionFields).forEach(fieldId => {
                                        const subsectionField = subsectionFields[fieldId];
                                        Object.keys(ofd).forEach(nfdId => {
                                            const oldFieldData = ofd[nfdId];
                                            if (nfdId === subsectionField.name) {

                                                if (oldFieldData) {
                                                    if (subsectionField.type === 'lov') {
                                                        const subsectionLovData = JSON.parse(oldFieldData);
                                                        subsectionLovData.forEach(data => {
                                                            formData.append(`${template}[data][${fieldId}][]`, data)
                                                        })
                                                    } else if (subsectionField.type === 'reftable') {
                                                        const subsectionLovData = JSON.parse(oldFieldData);
                                                        formData.append(`${template}[data][${fieldId}][]`, subsectionLovData[0])
                                                        formData.append(`${template}[data][${fieldId}][]`, subsectionLovData.slice(1).join('|'))
                                                    } else if (subsectionField.type === 'bilingual') {
                                                        const bilingualData = bilingualValueParser(subsectionField, oldFieldData, true, false);
                                                        if (bilingualData.eng) {
                                                            formData.append(`${template}[data][${fieldId}][english]`, bilingualData.eng)
                                                        }
                                                        if (bilingualData.fre) {
                                                            formData.append(`${template}[data][${fieldId}][french]`, bilingualData.fre)
                                                        }
                                                    } else {
                                                        formData.append(`${template}[data][${fieldId}]`, oldFieldData)
                                                    }
                                                } else {
                                                    formData.append(`${template}[data][${fieldId}]`, '');
                                                }

                                            }
                                        })

                                    })
                                    processCount++;
                                })
                            }
                        }
                        break;
                    }
                    default:
                        console.warn("unhandled field type when send formdata", field);
                        formData.append(`data[${field.id}]`, "")
                        break;
                }
            })
            formData.append('contentType', 'members');
            formData.append('contentId', '1');
            formData.append('viewType', 'cv');
            formData.append('sectionId', state.form.sectionId);
            formData.append('itemId', state.form.itemId);
            if (state.form.parentItemId) {
                formData.append('parentItemId', state.form.parentItemId);
            }
            if (state.form.parentFieldId) {
                formData.append('parentFieldId', state.form.parentFieldId);
            }

            api.post('http://127.0.0.1:8000/profiles.php', formData, {
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                if (!response.data.error) {
                    const formSchema = SchemaParser({sections: [response.data]}, false);
                    const newSection = [...state.sections];
                    const targetForm = getFormRecur(state.sections, state.form.structureChain);
                    const newData = formSchema[0].section_data;
                    if (targetForm) {
                        // console.log("----", targetForm, state.form.itemId, newData)
                        // targetForm.section_data = formSchema[0].section_data;
                        if (state.form.itemId !== 0) {
                            const index = targetForm.section_data.findIndex(data => data.id === newData[0].id)
                            if (index >= 0) {
                                targetForm.section_data[index] = newData[0];
                            }
                        } else if (state.form.itemId === 0) {
                            targetForm.section_data.push(newData[0]);
                        }
                        setState({
                            ...state,
                            sections: newSection,
                            shouldModalOpen: false,
                            form: null,
                        })
                    } else {
                        console.error("cannot find target form")
                    }
                } else {
                    console.error(response)
                    setState({
                        ...state,
                        shouldModalOpen: false,
                        form: null
                    })
                }
            }, (error) => {
                console.error(error);
                setState({
                    ...state,
                    shouldModalOpen: false,
                    form: null
                })
            });
        }
    }

    const handleFormEditCancel = () => {
        setState({
            ...state,
            ready: false
        })
    }

    const handleFormEditDelete = (data) => {
        console.log("on form delete", data);
        if (state.form && state.form.schema && state.form.schema.formSchema) {
            const formData = new FormData();
            formData.append('action', 'delete');
            Object.keys(state.form.schema.formSchema.properties).forEach(fieldName => {
                const field = state.form.schema.formSchema.properties[fieldName]
                const fieldData = data[fieldName];
                switch (field.field_type) {
                    case 'string':
                    case 'integer':
                    case 'elaelapsed-time':
                    case "monthday":
                    case "yearmonth":
                    case "year":
                    case "date":
                        formData.append(`data[${field.id}]`, fieldData ?? "");
                        break;
                    case 'lov':
                    case 'reftable':
                        if (fieldData) {
                            const lovData = JSON.parse(fieldData);
                            if (field.field_type === 'lov') {
                                lovData.forEach(data => {
                                    formData.append(`data[${field.id}][]`, data)
                                })
                            } else {
                                formData.append(`data[${field.id}][]`, lovData[0])
                                formData.append(`data[${field.id}][]`, lovData.slice(1).join('|'))
                            }
                        } else {
                            formData.append(`data[${field.id}]`, "")
                        }
                        break;
                    case 'bilingual':
                        if (fieldData) {
                            const bilingualData = bilingualValueParser(field, fieldData, true, false);
                            if (bilingualData.eng) {
                                formData.append(`data[${field.id}][english]`, bilingualData.eng)
                            }
                            if (bilingualData.fre) {
                                formData.append(`data[${field.id}][french]`, bilingualData.fre)
                            }
                        } else {
                            formData.append(`data[${field.id}]`, "")
                        }
                        break;
                    case 'section': {
                        if (fieldData) {
                            const oldFieldData = [...state.form.sectionData[fieldName]];
                            let processCount = 0;
                            if (oldFieldData.length > 0) {
                                oldFieldData.forEach(ofd => {
                                    const template = `data[${field.id}][${processCount}]`;
                                    const subsectionFields = field.fields;

                                    formData.append(`${template}[itemId]`, ofd.itemId)
                                    formData.append(`${template}[action]`, `none`)

                                    Object.keys(subsectionFields).forEach(fieldId => {
                                        const subsectionField = subsectionFields[fieldId];
                                        Object.keys(ofd).forEach(nfdId => {
                                            const oldFieldData = ofd[nfdId];
                                            if (nfdId === subsectionField.name) {
                                                if (oldFieldData) {
                                                    if (subsectionField.type === 'lov') {
                                                        const subsectionLovData = JSON.parse(oldFieldData);
                                                        subsectionLovData.forEach(data => {
                                                            formData.append(`${template}[data][${fieldId}][]`, data)
                                                        })
                                                    } else if (subsectionField.type === 'reftable') {
                                                        const subsectionLovData = JSON.parse(oldFieldData);
                                                        formData.append(`${template}[data][${fieldId}][]`, subsectionLovData[0])
                                                        formData.append(`${template}[data][${fieldId}][]`, subsectionLovData.slice(1).join('|'))
                                                    } else if (subsectionField.type === 'bilingual') {
                                                        const bilingualData = bilingualValueParser(subsectionField, oldFieldData, true, false);
                                                        if (bilingualData.eng) {
                                                            formData.append(`${template}[data][${fieldId}][english]`, bilingualData.eng)
                                                        }
                                                        if (bilingualData.fre) {
                                                            formData.append(`${template}[data][${fieldId}][french]`, bilingualData.fre)
                                                        }
                                                    } else {
                                                        formData.append(`${template}[data][${fieldId}]`, oldFieldData)
                                                    }
                                                } else {
                                                    formData.append(`${template}[data][${fieldId}]`, '');
                                                }
                                            }
                                        })
                                    })
                                    processCount++;
                                })
                            }
                        }
                        break;
                    }
                    default:
                        console.warn("unhandled field type when send formdata", field);
                        formData.append(`data[${field.id}]`, "")
                        break;
                }
            })
            formData.append('contentType', 'members');
            formData.append('contentId', '1');
            formData.append('viewType', 'cv');
            formData.append('sectionId', state.form.sectionId);
            formData.append('itemId', state.form.itemId);
            if (state.form.parentItemId) {
                formData.append('parentItemId', state.form.parentItemId);
            }
            if (state.form.parentFieldId) {
                formData.append('parentFieldId', state.form.parentFieldId);
            }

            api.post('http://127.0.0.1:8000/profiles.php', formData, {
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                if (!response.data.error) {
                    const newSection = [...state.sections];
                    const targetForm = getFormRecur(state.sections, state.form.structureChain);
                    const newData = response.data.items;
                    if (targetForm) {
                        if (state.form.itemId !== 0) {
                            const index = targetForm.section_data.findIndex(data => data.id === newData[0].id.toString())
                            if (index >= 0) {
                                targetForm.section_data.splice(index, 1);
                            }
                        }
                        setState({
                            ...state,
                            sections: newSection,
                            shouldModalOpen: false,
                            form: null,
                        })
                    } else {
                        console.error("cannot find target form")
                    }
                } else {
                    console.error(response)
                    setState({
                        ...state,
                        shouldModalOpen: false,
                        form: null
                    })
                }
            }, (error) => {
                console.error(error);
                setState({
                    ...state,
                    shouldModalOpen: false,
                    form: null
                })
            });
        }
    }

    const handleOnItemClick = (sectionId, itemId, parentItemId, parentFieldId, structureChain) => {
        // console.log(sectionId, itemId, parentItemId, parentFieldId);

        console.log('start', window.scrollY)

        props.fetchFormSchema(sectionId, itemId, parentItemId, parentFieldId, (res) => {
            const lovSubtypeIDs = getLovSubtypeId(res);
            // console.log(lovSubtypeIDs);
            props.fetchLovOptions(lovSubtypeIDs, (optRes => {
                // console.log(optRes);
                const formSchema = SchemaParser(res, true);
                // console.log(res)
                setState({
                    ...state,
                    form: {
                        schema: formSchema,
                        id: formSchema.formSchema.id,
                        sectionData: formSchema.dataSchema,
                        lovOptions: optRes,
                        sectionId: sectionId,
                        itemId: itemId,
                        structureChain: structureChain,
                        parentItemId: parentItemId,
                        parentFieldId: parentFieldId
                    },
                    shouldModalOpen: true,
                    scrollY: window.scrollY
                })
            }))
        })
    }

    const getFormRecur = (sections, structureChain) => {
        if (structureChain.length === 1) {
            let section = null;
            Object.keys(sections).forEach(key => {
                if (sections[key].name === structureChain[0]) {
                    section = sections[key]
                }
            })
            return section;
        } else {
            let subSections = null;
            Object.keys(sections).forEach(key => {
                if (sections[key].name === structureChain[0]) {
                    subSections = sections[key]
                    // console.log("found", subSections)
                }
            })
            return subSections === null ? null : getFormRecur(subSections.subsections, structureChain.slice(1))
        }
    }

    const getParentFieldID = (section, parentSection) => {
        return Object.keys(parentSection.fields).find(fieldID => parentSection.fields[fieldID].name === section.name);
    }

    const sectionBuilder = (section, sectionIndex, layer, structureChain, parentSection = null) => {
        const titleCSS = {
            3: "my-2 py-0.5 px-1 inline-block bg-blue-400 border rounded-md font-bold", //section title
            2: "my-1 inline-block text-yellow-600 font-semibold", //subsection title
            1: "my-0.5 inline-block text-yellow-700" //subsection title of subsection
        }
        const sectionCSS = {
            3: "mb-6 mt-1 mx-3", //section
            2: "mb-2 pl-4 py-1", //subsection
            1: "mb-1 pl-4 py-1" // subsection of subsection
        }

        if (section.type === "form" && (section.disabled && section.disabled !== "1")) {
            return (
                <div key={sectionIndex} className={`${sectionCSS[layer]}`}>
                    <div className="flex items-center">
                        <p className={`${titleCSS[layer]}`}>{section.title}</p>
                        <p className="ml-3 hover:text-yellow-700">{section.multiplicity === "multiple" ?
                            <AiOutlineFileAdd size={"1.1rem"}
                                              onClick={() => {
                                                  handleOnItemClick(section.section_id, 0, parentSection ? parentSection.section_data[0].id : null, parentSection ? getParentFieldID(section, parentSection) : null, structureChain)
                                              }}
                                              onDoubleClick={() => {
                                                  console.log('double clicked')
                                              }}
                            /> :
                            <FiEdit size={"1.1rem"}
                                    onClick={() => {
                                        handleOnItemClick(section.section_id, section.section_data[0].id, parentSection ? parentSection.section_data[0].id : null, parentSection ? getParentFieldID(section, parentSection) : null, structureChain)
                                    }}
                                    onDoubleClick={() => {
                                        console.log('double clicked')
                                    }}
                            />}
                        </p>
                    </div>
                    {state.shouldModalOpen === true && state.form && state.form.itemId === 0 && state.form.id === section.name ?
                        <ModalFullScreen
                            content={
                                state.form.schema ? (
                                        <FormBuilder
                                            formID={"user-profile-form"}
                                            resourceURL={"form/"}
                                            HTTPMethod={"PATCH"}
                                            language={props.language}
                                            formSchema={state.form.schema.formSchema}
                                            uiSchema={state.form.schema.uiSchema}
                                            formData={state.form.schema.dataSchema}
                                            validations={state.form.schema.validations}
                                            onFormEditSubmit={handleFormEditSubmit}
                                            onFormEditCancel={handleFormEditCancel}
                                            onFormEditDelete={handleFormEditDelete}
                                            formContext={{
                                                api: api,
                                                app: "CV",
                                                lovOptions: state.form.lovOptions,
                                                structureChain: structureChain
                                            }}
                                        />
                                    ) :
                                    <div>path: {structureChain.map(ele => ele + "->")} content: {JSON.stringify(section.section_data[0])}</div>
                            }
                            title={section.title}
                            fullScreen={true}/>
                        :
                        section.section_data.length > 0 ?
                            section.section_data.map((data, itemIndex) => {
                                return (
                                    <div key={itemIndex}>
                                        {!state.shouldModalOpen &&
                                        <>
                                            {/*TODO: primary component*/}
                                            {(section.section_data[itemIndex].attributes && section.section_data[itemIndex].attributes.primary === true) &&
                                            <div>Primary</div>}

                                            <div className={`mx-3 mb-1 px-2 text-sm flex justify-between`}>
                                                <div className="w-11/12">
                                                    {/*section={section.section_id} &itemId={section.section_data[itemIndex].id} &*/}
                                                    {/*parentItemId={parentSection ? parentSection.section_data[0].id : "null"} &parentFieldId={parentSection ? getParentFieldID(section, parentSection) : "null"}*/}
                                                    <Formatter app={"CV"}
                                                               structureChain={[...structureChain]}
                                                               isFullScreenViewMode={true}
                                                               schema={section}
                                                               rawData={section.section_data[itemIndex]}
                                                    />
                                                </div>
                                                {section.multiplicity === "multiple" ?
                                                    <div className="hover:text-yellow-700">
                                                        <FiEdit size={"1.1rem"}
                                                                onClick={() => {
                                                                    handleOnItemClick(section.section_id, section.section_data[itemIndex].id, parentSection ? parentSection.section_data[0].id : null, parentSection ? getParentFieldID(section, parentSection) : null, structureChain)
                                                                }}
                                                                onDoubleClick={(e) => {
                                                                    e.preventDefault();
                                                                    console.log('double clicked')
                                                                }}
                                                        />
                                                    </div> : null}

                                            </div>
                                        </>
                                        }
                                        <div>
                                            {state.shouldModalOpen === true && state.form && state.form.id === section.name && state.form.itemId === section.section_data[itemIndex].id &&
                                            // console.log(section)
                                            <ModalFullScreen
                                                content={
                                                    state.form.schema ? (
                                                            <FormBuilder
                                                                formID={"user-profile-form"}
                                                                resourceURL={"form/"}
                                                                HTTPMethod={"PATCH"}
                                                                language={props.language}
                                                                formSchema={state.form.schema.formSchema}
                                                                uiSchema={state.form.schema.uiSchema}
                                                                formData={state.form.schema.dataSchema}
                                                                validations={state.form.schema.validations}
                                                                onFormEditSubmit={handleFormEditSubmit}
                                                                onFormEditCancel={handleFormEditCancel}
                                                                onFormEditDelete={handleFormEditDelete}
                                                                formContext={{
                                                                    api: api,
                                                                    app: "CV",
                                                                    lovOptions: state.form.lovOptions,
                                                                    structureChain: structureChain
                                                                }}
                                                            />
                                                        ) :
                                                        <div>path: {structureChain.map(ele => ele + "->")} content: {JSON.stringify(section.section_data[itemIndex])}</div>
                                                }
                                                title={section.title}
                                                fullScreen={true}/>
                                            }
                                        </div>
                                    </div>
                                )
                            }) : null}
                </div>
            )
        } else if (section.type === "section") {
            return (
                <div key={sectionIndex} className={`${sectionCSS[layer]}`}>
                    <p className={`${titleCSS[layer]}`}>{section.title}</p>
                    {Object.keys(section.subsections).map((subsectionId, subsectionIndex) => sectionBuilder(section.subsections[subsectionId], subsectionIndex, layer - 1, structureChain.concat(section.subsections[subsectionId].name), section))}
                </div>)
        }
    }

    return (
        <>
            {state.ready && state.sections.map((section, index) => {
                // console.log(section)
                return sectionBuilder(section, index, 3, [section.name])
            })}
        </>
    )
}