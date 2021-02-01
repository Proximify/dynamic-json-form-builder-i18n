import React, {useState, useEffect} from 'react';
import FormBuilder from '../../../component/dynamic-json-form-builder';
import api from "../../../api";
import {FiEdit} from 'react-icons/fi';
import {AiOutlineFileAdd} from 'react-icons/ai'
import {MdDeleteForever} from 'react-icons/md'
import {ModalFullScreen} from "../../../component/dynamic-json-form-builder/components/utils/Modals";
import Formatter from "../../formatter";

export function SectionPageBuilder(props) {
    // console.log("SchemaParser", props)

    const schema = props.schema;

    const [state, setState] = useState({
        sections: [],
        schema: null,
        fff: "--",
        ready: false
    })

    // has subsection, use field to create subtitle, no subsection, use field to call formatter
    const sectionSchemaBuilder = (section, section_data, fields) => {
        if (section["type"] === "form") {
            if (section.section_data.length > 0) {
                let opens = [];
                for (let i = 0; i < section.section_data.length; i++) {
                    opens.push(false)
                }
                section["open"] = opens;
            } else {
                section["open"] = []
            }
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
            ready: true
        })
    }, [state.ready])

    const handleFormEditSubmit = (formData, formDependent) => {
        console.log("received form data", formData, formDependent);
        console.log("should fetch data");
        setState({
            ...state,
            ready: false
        })
        // if (formDependent.form === null) {
        //     if (isNaN(formDependent.index)) {
        //         setState({
        //             ...state,
        //             data: {
        //                 ...state.data,
        //                 [formDependent.section]: formData
        //             },
        //             sectionControl: {
        //                 ...state.sectionControl,
        //                 [formDependent.section]: false
        //             }
        //         })
        //     } else {
        //         const dataArray = state.data[formDependent.section];
        //         dataArray[formDependent.index] = formData;
        //         const controlArray = state.sectionControl[formDependent.section];
        //         controlArray[formDependent.index] = false;
        //         setState({
        //             ...state,
        //             data: {
        //                 ...state.data,
        //                 [formDependent.section]: dataArray
        //             },
        //             sectionControl: {
        //                 ...state.sectionControl,
        //                 [formDependent.section]: controlArray
        //             }
        //         })
        //     }
        // } else {
        //     if (isNaN(formDependent.index)) {
        //         setState({
        //             ...state,
        //             data: {
        //                 ...state.data,
        //                 [formDependent.section]: {
        //                     ...state.data[formDependent.section],
        //                     [formDependent.form]: formData
        //                 }
        //             },
        //             sectionControl: {
        //                 ...state.sectionControl,
        //                 [formDependent.section]: {
        //                     ...state.sectionControl[formDependent.section],
        //                     [formDependent.form]: false
        //                 }
        //             }
        //         })
        //     } else {
        //         const dataArray = state.data[formDependent.section][formDependent.form];
        //         dataArray[formDependent.index] = formData;
        //         const controlArray = state.sectionControl[formDependent.section][formDependent.form];
        //         controlArray[formDependent.index] = false;
        //         setState({
        //             ...state,
        //             data: {
        //                 ...state.data,
        //                 [formDependent.section]: {
        //                     ...state.data[formDependent.section],
        //                     [formDependent.form]: dataArray
        //                 }
        //             },
        //             sectionControl: {
        //                 ...state.sectionControl,
        //                 [formDependent.section]: {
        //                     ...state.sectionControl[formDependent.section],
        //                     [formDependent.form]: controlArray
        //                 }
        //             }
        //         })
        //     }
        // }
    }

    const handleFormEditCancel = () => {
        setState({
            ...state,
            ready: false
        })
        // props.rerenderParentCallback();

    }

    const handleFormEditDelete = (formDependent) => {
        console.log("on form delete", formDependent);
        setState({
            ...state,
            ready: false
        })
        // if (formDependent.form === null) {
        //     if (isNaN(formDependent.index)) {
        //         setState({
        //             ...state,
        //             data: {
        //                 ...state.data,
        //                 [formDependent.section]: {}
        //             },
        //             sectionControl: {
        //                 ...state.sectionControl,
        //                 [formDependent.section]: false
        //             }
        //         })
        //     } else {
        //         const dataArray = state.data[formDependent.section];
        //         dataArray[formDependent.index] = {};
        //         const controlArray = state.sectionControl[formDependent.section];
        //         controlArray[formDependent.index] = false;
        //         setState({
        //             ...state,
        //             data: {
        //                 ...state.data,
        //                 [formDependent.section]: dataArray
        //             },
        //             sectionControl: {
        //                 ...state.sectionControl,
        //                 [formDependent.section]: controlArray
        //             }
        //         })
        //     }
        // } else {
        //     if (isNaN(formDependent.index)) {
        //         setState({
        //             ...state,
        //             data: {
        //                 ...state.data,
        //                 [formDependent.section]: {
        //                     ...state.data[formDependent.section],
        //                     [formDependent.form]: {}
        //                 }
        //             },
        //             sectionControl: {
        //                 ...state.sectionControl,
        //                 [formDependent.section]: {
        //                     ...state.sectionControl[formDependent.section],
        //                     [formDependent.form]: false
        //                 }
        //             }
        //         })
        //     } else {
        //         const dataArray = state.data[formDependent.section][formDependent.form];
        //         dataArray[formDependent.index] = {};
        //         const controlArray = state.sectionControl[formDependent.section][formDependent.form];
        //         controlArray[formDependent.index] = false;
        //         setState({
        //             ...state,
        //             data: {
        //                 ...state.data,
        //                 [formDependent.section]: {
        //                     ...state.data[formDependent.section],
        //                     [formDependent.form]: dataArray
        //                 }
        //             },
        //             sectionControl: {
        //                 ...state.sectionControl,
        //                 [formDependent.section]: {
        //                     ...state.sectionControl[formDependent.section],
        //                     [formDependent.form]: controlArray
        //                 }
        //             }
        //         })
        //     }
        // }
    }

    const handleOnItemClick = (structureChain, itemIndex) => {
        const clickedSectionIndex = state.sections.map(s => s.name).indexOf(structureChain[0]);
        structureChain.shift();
        if (clickedSectionIndex !== -1) {
            // handleOnItemClick(clickedSectionIndex, [...structureChain].slice(1), index);
            const sections = [...state.sections];
            const form = structureChain.length > 0 ? getFormRecur(sections[clickedSectionIndex].subsections, structureChain) : sections[clickedSectionIndex];
            let formSchema = null;
            if (form !== null) {
                formSchema = props.fetchFormSchema(form.name);
                // if (formSchema !== null) {
                    form.open[itemIndex] = true;
                    setState({
                        ...state,
                        sections: sections,
                        schema: formSchema,
                    })
                console.log(formSchema)
                // } else {
                //     console.warn("Warning, not form schema found")
                // }
            }
        }
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
                    console.log("found", subSections)
                }
            })
            return subSections === null ? null : getFormRecur(subSections.subsections, structureChain.slice(1))
        }
    }

    const pageBuilder = (section, index, fontSize, structureChain) => {
        const size = {
            3: "text-2xl font-bold my-3 border border-yellow-500 bg-yellow-500 rounded inline-block p-1",
            2: "text-xl font-semibold my-2 text-yellow-600",
            1: "text-lg font-normal my-1 text-black",
            0: "text-sm"
        }
        if (section.type === "form") {
            return (
                <div key={index} className="pl-4 border border-black p-3 rounded">
                    <div className={`flex items-center`}><p
                        className={`${size[fontSize]}`}>{section.title}</p>
                        <p className="ml-3">{section.multiplicity === "multiple" ? <AiOutlineFileAdd size={"1.1rem"}/> :
                            <FiEdit size={"1.1rem"}/>}
                        </p>
                    </div>
                    {section.section_data.length > 0 ?
                        section.section_data.map((data, index) => {
                            return (
                                <div className={"font-extralight"} key={index}>
                                    <div className="font-medium text-black"
                                         onClick={() => {
                                             console.log("onClick")
                                             // TODO merge everything in handleOnItemClick()
                                             // const clickedSectionIndex = state.sections.map(s => s.name).indexOf(structureChain[0]);
                                             // if (clickedSectionIndex !== -1) {
                                             //     handleOnItemClick(clickedSectionIndex, [...structureChain].slice(1), index);
                                             // }
                                             handleOnItemClick([...structureChain], index);

                                         }}>
                                        {<Formatter app={"CV"}
                                                    structureChain={[...structureChain]}
                                                    isFullScreenViewMode={true}
                                                    schema={section}
                                                    rawData={section.section_data[index]}
                                        />
                                        }
                                    </div>
                                    <div>
                                        {section.open[index] === true ?
                                            <ModalFullScreen
                                                content={
                                                    state.schema ? (
                                                            <FormBuilder
                                                                formID={"user-profile-form"}
                                                                resourceURL={"form/"}
                                                                // validationDeclaration={this.validationDeclaration}
                                                                HTTPMethod={"PATCH"}
                                                                language={props.language}
                                                                formSchema={state.schema.formSchema}
                                                                uiSchema={null}
                                                                formData={null}
                                                                onFormEditSubmit={handleFormEditSubmit}
                                                                onFormEditCancel={handleFormEditCancel}
                                                                onFormEditDelete={handleFormEditDelete}
                                                                formDependent={{
                                                                    section: null,
                                                                    form: null,
                                                                    index: NaN
                                                                }}
                                                                formContext={{
                                                                    api: api,
                                                                    app: "CV",
                                                                    form: "PersonalInformation"
                                                                }}
                                                            />
                                                        ) :
                                                        <div>path: {structureChain.map(ele => ele + "->")} content: {JSON.stringify(section.section_data[index])}</div>
                                                }
                                                title={section.title}
                                                fullScreen={true}/> : null
                                        }
                                    </div>
                                </div>
                            )
                        }) : null}
                </div>
            )
        } else if (section.type === "section") {
            return (<div key={index}
                         className="pl-4 border border-green-400 p-3 m-2 rounded shadow-xl"><p
                className={`${size[fontSize]}`}>{section.title}</p>{Object.keys(section.subsections).map((key, index) => pageBuilder(section.subsections[key], index, fontSize - 1, structureChain.concat(section.subsections[key].name)))}
            </div>)
        }
    }

    return (
        <>
            {state.ready && state.sections.map((section, index) => {
                // console.log(section)
                return pageBuilder(section, index, 3, [section.name])
            })}
        </>
    )
}