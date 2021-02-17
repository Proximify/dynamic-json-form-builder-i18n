import React, {useState, useEffect} from 'react';
import FormBuilder from '../../../component/dynamic-json-form-builder';
import api from "../../../api";
import {FiEdit} from 'react-icons/fi';
import {AiOutlineFileAdd} from 'react-icons/ai'
import {ModalFullScreen} from "../../../component/dynamic-json-form-builder/components/utils/Modals";
import Formatter from "../../formatter";

export function SectionPageBuilder(props) {

    const schema = [...props.schema];
    const [state, setState] = useState({
        sections: [],
        schema: null,
        shouldModalOpen: false,
        ready: false
    })
    // console.log("SchemaParser", state)

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
            shouldModalOpen: false,
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
    }

    const handleFormEditCancel = () => {
        setState({
            ...state,
            ready: false
        })
    }

    const handleFormEditDelete = (formDependent) => {
        console.log("on form delete", formDependent);
        setState({
            ...state,
            ready: false
        })
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
                console.log(formSchema)
                form.open[itemIndex] = true;
                setState({
                    ...state,
                    sections: sections,
                    schema: formSchema,
                    shouldModalOpen: true
                })
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
                    // console.log("found", subSections)
                }
            })
            return subSections === null ? null : getFormRecur(subSections.subsections, structureChain.slice(1))
        }
    }

    const pageBuilder = (section, index, layer, structureChain, isLast = false) => {
        const titleCSS = {
            3: "py-2 px-4 text-2xl font-semibold bg-blue-200 border border-blue-200 rounded-lg rounded-b-none", //section title
            2: "px-2 text-xl font-semibold", //subsection title
            1: "px-1 text-lg font-medium text-black" //subsection title of subsection
        }
        const sectionCSS = {
            3: "my-3 border-0 border-transparent rounded-md bg-white shadow-md", //section
            2: "px-3 py-2 bg-gray-100", //subsection
            1: "px-3 py-1 my-2 bg-white rounded-md" // subsection of subsection
        }

        if (section.type === "form") {
            return (
                <div key={index} className={`${sectionCSS[layer]} hover:shadow-xl hover:bg-blue-100 ${isLast ? "" : "border-b border-gray-300"}`}>
                    <div className={`${titleCSS[layer]} flex items-center justify-between`}>
                        <p>{section.title}</p>
                        <p className="ml-3">{section.multiplicity === "multiple" ? <AiOutlineFileAdd size={"1.1rem"}/> :
                            <FiEdit size={"1.1rem"}/>}
                        </p>
                    </div>
                    {section.section_data.length > 0 ?
                        section.section_data.map((data, index) => {
                            return (
                                <div key={index} className="mx-1.5 my-2">
                                    {!state.shouldModalOpen &&
                                    <div className="font-medium text-black"
                                         onClick={() => {
                                             handleOnItemClick([...structureChain], index);
                                         }}>
                                        {
                                            <div
                                                className={`my-1 p-2 border ${layer % 2 !== 0 ? "border-gray-100 bg-gray-100 hover:bg-white" : "border-white bg-white hover:bg-white"} rounded-md transform hover:scale-105 hover:border-opacity-0 hover:shadow-lg`}>
                                                <Formatter app={"CV"}
                                                           structureChain={[...structureChain]}
                                                           isFullScreenViewMode={true}
                                                           schema={section}
                                                           rawData={section.section_data[index]}
                                                />
                                            </div>
                                        }
                                    </div>}
                                    <div>
                                        {section.open[index] === true &&
                                        // console.log(section)
                                        <ModalFullScreen
                                            content={
                                                state.schema ? (
                                                        <FormBuilder
                                                            formID={"user-profile-form"}
                                                            resourceURL={"form/"}
                                                            HTTPMethod={"PATCH"}
                                                            language={props.language}
                                                            formSchema={state.schema.formSchema}
                                                            uiSchema={state.schema.uiSchema}
                                                            formData={state.schema.dataSchema}
                                                            validations={state.schema.validations}
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
                                                                structureChain: structureChain
                                                            }}
                                                        />
                                                    ) :
                                                    <div>path: {structureChain.map(ele => ele + "->")} content: {JSON.stringify(section.section_data[index])}</div>
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
                <div key={index} className={`${sectionCSS[layer]} ${isLast ? "" : "border-b border-gray-300"}`}>
                    <p className={`${titleCSS[layer]}`}>{section.title}</p>
                    {Object.keys(section.subsections).map((key, index) => pageBuilder(section.subsections[key], index, layer - 1, structureChain.concat(section.subsections[key].name),index === Object.keys(section.subsections).length - 1))}
                </div>)
        }
    }

    return (
        <>
            {state.ready && state.sections.map((section, index) => {
                // console.log(section)
                return pageBuilder(section, index, 3, [section.name], index === state.sections.length - 1)
            })}
        </>
    )
}