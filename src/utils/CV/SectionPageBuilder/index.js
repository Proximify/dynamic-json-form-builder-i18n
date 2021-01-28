import React, {useState, useEffect} from 'react';
import api from "../../../api";
import {FiEdit} from 'react-icons/fi';
import {AiOutlineFileAdd} from 'react-icons/ai'
import Formatter from "../../../component/dynamic-json-form-builder/components/utils/formatter";
import {ModalFullScreen} from "../../../component/dynamic-json-form-builder/components/utils/Modals";
import {FormSchemaParser} from "../SchemaParser/FullScreen";


export function SectionPageBuilder(props) {
    // console.log("SchemaParser", props)

    const schema = props.schema;

    const [state, setState] = useState({
        sections: [],
        ready: false
    })

    // console.log(state)
    // console.log(schema)

    // has subsection, use field to create subtitle, no subsection, use field to call formatter
    const sectionSchemaBuilder = (section, section_data, fields) => {
        if (section["type"] === "form") {
            section["open"] = false;
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

        schema.forEach(section => sectionSchemaBuilder(section, section.section_data, section.fields))
        // console.log(schema)

        // if (!isEmptyObject(schema)) {
        //     Object.keys(schema).forEach(key => {
        //         const section = schema[key]
        //         // console.log(key, section)
        //         if (section.hasOwnProperty("type")) {
        //             if (section.type === "form") {
        //                 if (section.hasOwnProperty("multiplicity")) {
        //                     if (section.multiplicity === "single") {
        //                         sectionControl[key] = null;
        //                         if (noFormData) {
        //                             formData[key] = {};
        //                         }
        //                     } else if (section.multiplicity === "multiple") {
        //                         sectionControl[key] = [];
        //                         if (noFormData) {
        //                             formData[key] = [];
        //                         }
        //                     }
        //                 }
        //             } else if (section.type === "section") {
        //                 if (section.hasOwnProperty("subSection")) {
        //                     sectionControl[key] = {};
        //                     if (noFormData) {
        //                         formData[key] = {};
        //                     }
        //                     Object.keys(section.subSection).forEach(subKey => {
        //                         const subSection = section.subSection[subKey];
        //                         // console.log("+", subSection)
        //                         if (subSection.hasOwnProperty("type")) {
        //                             if (subSection.type === "form") {
        //                                 if (subSection.hasOwnProperty("multiplicity")) {
        //                                     if (subSection.multiplicity === "single") {
        //                                         sectionControl[key][subKey] = null;
        //                                         if (noFormData) {
        //                                             formData[key][subKey] = {};
        //                                         }
        //                                     } else if (subSection.multiplicity === "multiple") {
        //                                         sectionControl[key][subKey] = [];
        //                                         if (noFormData) {
        //                                             formData[key][subKey] = [];
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     })
        //                 }
        //             }
        //         }
        //     })
        //}
        // console.log({data:data, sectionControl: sectionControl});
        setState({
            ...state,
            sections: schema,
            ready: true
        })
    }, [state.ready])

    const isSection = (obj) => {
        return obj.hasOwnProperty("type") && obj.type === "section";
    }

    const hasSubSection = (obj) => {
        return obj.hasOwnProperty("subSection") && Object.keys(obj.subSection).length > 0
    }

    const isForm = (obj) => {
        return obj.hasOwnProperty("type") && obj.type === "form";
    }

    const isSingle = (obj) => {
        return obj.hasOwnProperty("multiplicity") && obj.multiplicity === "single";
    }

    const isEmptyObject = (obj) => {
        if (!obj) {
            return true;
        } else if (obj && Object.keys(obj).length === 0) {
            return true;
        } else {
            let noValue = true
            Object.values(obj).forEach(value => {
                if (value && value !== "" && value !== undefined) {
                    noValue = false;
                }
            })
            return noValue
        }
    }

    const handleFormEditSubmit = (formData, formDependent) => {
        console.log("received form data", formData, formDependent);
        console.log("should fetch data");
        if (formDependent.form === null) {
            if (isNaN(formDependent.index)) {
                setState({
                    ...state,
                    data: {
                        ...state.data,
                        [formDependent.section]: formData
                    },
                    sectionControl: {
                        ...state.sectionControl,
                        [formDependent.section]: false
                    }
                })
            } else {
                const dataArray = state.data[formDependent.section];
                dataArray[formDependent.index] = formData;
                const controlArray = state.sectionControl[formDependent.section];
                controlArray[formDependent.index] = false;
                setState({
                    ...state,
                    data: {
                        ...state.data,
                        [formDependent.section]: dataArray
                    },
                    sectionControl: {
                        ...state.sectionControl,
                        [formDependent.section]: controlArray
                    }
                })
            }
        } else {
            if (isNaN(formDependent.index)) {
                setState({
                    ...state,
                    data: {
                        ...state.data,
                        [formDependent.section]: {
                            ...state.data[formDependent.section],
                            [formDependent.form]: formData
                        }
                    },
                    sectionControl: {
                        ...state.sectionControl,
                        [formDependent.section]: {
                            ...state.sectionControl[formDependent.section],
                            [formDependent.form]: false
                        }
                    }
                })
            } else {
                const dataArray = state.data[formDependent.section][formDependent.form];
                dataArray[formDependent.index] = formData;
                const controlArray = state.sectionControl[formDependent.section][formDependent.form];
                controlArray[formDependent.index] = false;
                setState({
                    ...state,
                    data: {
                        ...state.data,
                        [formDependent.section]: {
                            ...state.data[formDependent.section],
                            [formDependent.form]: dataArray
                        }
                    },
                    sectionControl: {
                        ...state.sectionControl,
                        [formDependent.section]: {
                            ...state.sectionControl[formDependent.section],
                            [formDependent.form]: controlArray
                        }
                    }
                })
            }
        }
    }

    const handleFormEditCancel = () => {
        setState({
            ...state,
            ready: false
        })
        props.rerenderParentCallback();
    }

    const handleFormEditDelete = (formDependent) => {
        console.log("on form delete", formDependent);
        if (formDependent.form === null) {
            if (isNaN(formDependent.index)) {
                setState({
                    ...state,
                    data: {
                        ...state.data,
                        [formDependent.section]: {}
                    },
                    sectionControl: {
                        ...state.sectionControl,
                        [formDependent.section]: false
                    }
                })
            } else {
                const dataArray = state.data[formDependent.section];
                dataArray[formDependent.index] = {};
                const controlArray = state.sectionControl[formDependent.section];
                controlArray[formDependent.index] = false;
                setState({
                    ...state,
                    data: {
                        ...state.data,
                        [formDependent.section]: dataArray
                    },
                    sectionControl: {
                        ...state.sectionControl,
                        [formDependent.section]: controlArray
                    }
                })
            }
        } else {
            if (isNaN(formDependent.index)) {
                setState({
                    ...state,
                    data: {
                        ...state.data,
                        [formDependent.section]: {
                            ...state.data[formDependent.section],
                            [formDependent.form]: {}
                        }
                    },
                    sectionControl: {
                        ...state.sectionControl,
                        [formDependent.section]: {
                            ...state.sectionControl[formDependent.section],
                            [formDependent.form]: false
                        }
                    }
                })
            } else {
                const dataArray = state.data[formDependent.section][formDependent.form];
                dataArray[formDependent.index] = {};
                const controlArray = state.sectionControl[formDependent.section][formDependent.form];
                controlArray[formDependent.index] = false;
                setState({
                    ...state,
                    data: {
                        ...state.data,
                        [formDependent.section]: {
                            ...state.data[formDependent.section],
                            [formDependent.form]: dataArray
                        }
                    },
                    sectionControl: {
                        ...state.sectionControl,
                        [formDependent.section]: {
                            ...state.sectionControl[formDependent.section],
                            [formDependent.form]: controlArray
                        }
                    }
                })
            }
        }
    }

    const pageBuilder = (section, index, fontSize, structureChain) => {
        // console.log(structureChain)
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
                    {section.section_data.length > 0 ? (
                        <div className={"font-extralight"}>
                            <div className="font-medium text-red-400">
                                <Formatter app={"CV"}
                                           structureChain={structureChain}
                                           isFullScreenViewMode={true}
                                           schema={section}
                                           rawData={section.section_data}
                                />
                            </div>
                        </div>
                    ) : null}
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
                console.log(section)
                return pageBuilder(section, index, 3, [section.name])

                // console.log(section)
                // return (
                //     <div key={index} id={"section"}
                //          className="border border-gray-200 bg-red-50 rounded-lg px-2 py-3 mb-5">
                //         {
                //             isSection(section) && hasSubSection(section) ?
                //                 <>
                //                     <div id={"section header"}>
                //                         <p className="inline-block text-xl text-white border border-yellow-700 bg-yellow-700 rounded m-1 p-1">{schema[key].title}</p>
                //                     </div>
                //                     <div id={"section content"}>{
                //                         Object.keys(section["subSection"]).map((subKey, subIndex) => {
                //                             const subSection = section["subSection"][subKey];
                //                             return (
                //                                 <div
                //                                     className="mx-5 border border-gray-400 border-l-0 border-r-0 border-t-0 my-1 pb-2"
                //                                     id="subSection">
                //                                     <div className="flex items-center">
                //                                         <div className="text-lg font-bold">{subSection.title}</div>
                //                                         <div className="ml-3">{
                //                                             isSingle(subSection) ?
                //                                                 <div
                //                                                     onClick={() => {
                //                                                         // console.log("sss", key, subKey)
                //                                                         setState({
                //                                                             ...state,
                //                                                             sectionControl: {
                //                                                                 ...state.sectionControl,
                //                                                                 [key]: {
                //                                                                     ...state.sectionControl[key],
                //                                                                     [subKey]: true
                //                                                                 }
                //                                                             }
                //                                                         })
                //                                                     }}
                //                                                 >
                //                                                     <FiEdit size={"1.1rem"}/>
                //                                                 </div>
                //                                                 :
                //                                                 <div
                //                                                     onClick={() => {
                //                                                         // console.log(state.sectionControl[key][subKey]);
                //                                                         const array = state.sectionControl[key][subKey];
                //                                                         array.push(true);
                //                                                         setState({
                //                                                             ...state,
                //                                                             sectionControl: {
                //                                                                 ...state.sectionControl,
                //                                                                 [key]: {
                //                                                                     ...state.sectionControl[key],
                //                                                                     [subKey]: array
                //                                                                 }
                //                                                             }
                //                                                         })
                //                                                     }}
                //                                                 >
                //                                                     <AiOutlineFileAdd size={"1.1rem"}/>
                //                                                 </div>
                //                                         }
                //                                         </div>
                //                                     </div>
                //                                     <div className="mx-5">
                //                                         {/*{console.log("+",key,subKey, state.data[key][subKey])}*/}
                //                                         {
                //                                             isSingle(subSection) ?
                //                                                 !isEmptyObject(state.data[key][subKey]) ?
                //                                                     <div
                //                                                         className="flex justify-between items-center">
                //                                                         <div
                //                                                             onClick={() => {
                //                                                                 setState({
                //                                                                     ...state,
                //                                                                     sectionControl: {
                //                                                                         ...state.sectionControl,
                //                                                                         [key]: {
                //                                                                             ...state.sectionControl[key],
                //                                                                             [subKey]: true
                //                                                                         }
                //                                                                     }
                //                                                                 })
                //                                                             }}>
                //                                                             {/*{console.log("---",key,subKey)}*/}
                //                                                             <Formatter app={"CV"} section={key}
                //                                                                        form={subKey}
                //                                                                        rawData={state.data[key][subKey]}
                //                                                                        isFullScreenViewMode={true}/>
                //                                                         </div>
                //                                                         {/*<div className="ml-5"*/}
                //                                                         {/*     onClick={() => {*/}
                //                                                         {/*         setState({*/}
                //                                                         {/*             ...state,*/}
                //                                                         {/*             data: {*/}
                //                                                         {/*                 ...state.data,*/}
                //                                                         {/*                 [key]: {*/}
                //                                                         {/*                     ...state.data[key],*/}
                //                                                         {/*                     [subKey]: {}*/}
                //                                                         {/*                 }*/}
                //                                                         {/*             }*/}
                //                                                         {/*         })*/}
                //                                                         {/*     }}>*/}
                //                                                         {/*    <MdDeleteForever/>*/}
                //                                                         {/*</div>*/}
                //                                                     </div>
                //                                                     : null
                //                                                 :
                //                                                 !isEmptyObject(state.data[key][subKey]) ?
                //                                                     state.data[key][subKey].map((element, index) => {
                //                                                         return (
                //                                                             <div
                //                                                                 className="flex justify-between items-center">
                //                                                                 <div key={index}
                //                                                                      onClick={() => {
                //                                                                          const array = state.sectionControl[key][subKey];
                //                                                                          array[index] = true;
                //                                                                          setState({
                //                                                                              ...state,
                //                                                                              sectionControl: {
                //                                                                                  ...state.sectionControl,
                //                                                                                  [key]: {
                //                                                                                      ...state.sectionControl[key],
                //                                                                                      [subKey]: array
                //                                                                                  }
                //                                                                              }
                //                                                                          })
                //                                                                      }}>
                //                                                                     <Formatter app={"CV"}
                //                                                                                section={key}
                //                                                                                form={subKey}
                //                                                                                rawData={state.data[key][subKey][index]}
                //                                                                                isFullScreenViewMode={true}
                //                                                                     />
                //                                                                 </div>
                //                                                                 {/*<div className="ml-5"*/}
                //                                                                 {/*     onClick={() => {*/}
                //                                                                 {/*         const array = state.data[key][subKey];*/}
                //                                                                 {/*         array.splice(index, 1)*/}
                //                                                                 {/*         setState({*/}
                //                                                                 {/*             ...state,*/}
                //                                                                 {/*             data: {*/}
                //                                                                 {/*                 ...state.data,*/}
                //                                                                 {/*                 [key]: {*/}
                //                                                                 {/*                     ...state.data[key],*/}
                //                                                                 {/*                     [subKey]: array*/}
                //                                                                 {/*                 }*/}
                //                                                                 {/*             }*/}
                //                                                                 {/*         })*/}
                //                                                                 {/*     }}>*/}
                //                                                                 {/*    <MdDeleteForever/>*/}
                //                                                                 {/*</div>*/}
                //                                                             </div>
                //                                                         )
                //                                                     })
                //                                                     : null
                //
                //                                         }
                //                                     </div>
                //                                     {
                //                                         isForm(subSection) ?
                //                                             Array.isArray(state.sectionControl[key][subKey]) ?
                //                                                 state.sectionControl[key][subKey].map((element, index) => {
                //                                                     return (
                //                                                         element && <div key={index}>
                //                                                             <ModalFullScreen content={
                //                                                                 <FormBuilder
                //                                                                     formID={"user-profile-form"}
                //                                                                     resourceURL={"form/"}
                //                                                                     // validationDeclaration={this.validationDeclaration}
                //                                                                     HTTPMethod={"PATCH"}
                //                                                                     language={props.language}
                //                                                                     formSchema={subSection.schema}
                //                                                                     uiSchema={UISchema(key, subKey, null)}
                //                                                                     formData={state.data[key][subKey][index]}
                //                                                                     onFormEditSubmit={handleFormEditSubmit}
                //                                                                     onFormEditCancel={handleFormEditCancel}
                //                                                                     onFormEditDelete={handleFormEditDelete}
                //                                                                     formDependent={{
                //                                                                         section: key,
                //                                                                         form: subKey,
                //                                                                         index: index
                //                                                                     }}
                //                                                                     formContext={{
                //                                                                         api: api,
                //                                                                         app: "CV",
                //                                                                         form: "PersonalInformation"
                //                                                                     }}
                //                                                                 />} title={subSection.title}
                //                                                                              fullScreen={true}/>
                //                                                         </div>
                //                                                     )
                //                                                 })
                //                                                 :
                //                                                 state.sectionControl[key][subKey] &&
                //                                                 <ModalFullScreen content={
                //                                                     <FormBuilder
                //                                                         formID={"user-profile-form"}
                //                                                         resourceURL={"form/"}
                //                                                         // validationDeclaration={this.validationDeclaration}
                //                                                         HTTPMethod={"PATCH"}
                //                                                         language={props.language}
                //                                                         formSchema={subSection.schema}
                //                                                         uiSchema={UISchema(key, subKey, null)}
                //                                                         formData={state.data[key][subKey]}
                //                                                         onFormEditSubmit={handleFormEditSubmit}
                //                                                         onFormEditCancel={handleFormEditCancel}
                //                                                         onFormEditDelete={handleFormEditDelete}
                //                                                         formDependent={{
                //                                                             section: key,
                //                                                             form: subKey,
                //                                                             index: NaN
                //                                                         }}
                //                                                         formContext={{
                //                                                             api: api,
                //                                                             app: "CV",
                //                                                             form: "PersonalInformation"
                //                                                         }}
                //                                                     />
                //                                                 } title={subSection.title} fullScreen={true}/>
                //                                             : null
                //                                     }
                //                                 </div>
                //                             )
                //                         })}</div>
                //                 </>
                //                 :
                //                 isForm(section) ?
                //                     <>
                //                         <div id={"section header"}>
                //                             <p className="inline-block text-xl text-white border border-yellow-700 bg-yellow-700 rounded m-1 p-1">{schema[key].title}</p>
                //                             <div className="inline-block ml-2">
                //                                 {
                //                                     isSingle(section) ?
                //                                         <div
                //                                             onClick={() => {
                //                                                 // console.log("sss", key, subKey)
                //                                                 setState({
                //                                                     ...state,
                //                                                     sectionControl: {
                //                                                         ...state.sectionControl,
                //                                                         [key]: true
                //                                                     }
                //                                                 })
                //                                             }}
                //                                         >
                //                                             <FiEdit size={"1.1rem"}/>
                //                                         </div>
                //                                         :
                //                                         <div
                //                                             onClick={() => {
                //                                                 const array = state.sectionControl[key];
                //                                                 array.push(true);
                //                                                 setState({
                //                                                     ...state,
                //                                                     sectionControl: {
                //                                                         ...state.sectionControl,
                //                                                         [key]: array
                //                                                     }
                //                                                 })
                //                                             }}
                //                                         >
                //                                             <AiOutlineFileAdd size={"1.1rem"}/>
                //                                         </div>
                //                                 }
                //                             </div>
                //                         </div>
                //                         <div id="section content">
                //                             {
                //                                 isSingle(section) ?
                //                                     <>
                //                                         {
                //                                             !isEmptyObject(state.data[key]) ?
                //                                                 <div className="mx-5 flex justify-between items-center">
                //                                                     <div
                //                                                         onClick={() => {
                //                                                             setState({
                //                                                                 ...state,
                //                                                                 sectionControl: {
                //                                                                     ...state.sectionControl,
                //                                                                     [key]: true
                //                                                                 }
                //                                                             })
                //                                                         }}>
                //                                                         <Formatter app={"CV"} section={key}
                //                                                                    rawData={state.data[key]}
                //                                                                    isFullScreenViewMode={true}/>
                //                                                     </div>
                //                                                     {/*<div*/}
                //                                                     {/*    onClick={() => {*/}
                //                                                     {/*        // console.log(state.data[key], key)*/}
                //                                                     {/*        setState({*/}
                //                                                     {/*            ...state,*/}
                //                                                     {/*            data: {*/}
                //                                                     {/*                ...state.data,*/}
                //                                                     {/*                [key]: {}*/}
                //                                                     {/*            }*/}
                //                                                     {/*        })*/}
                //                                                     {/*    }}>*/}
                //                                                     {/*    <MdDeleteForever/>*/}
                //                                                     {/*</div>*/}
                //                                                 </div>
                //                                                 : null
                //                                         }
                //                                     </>
                //                                     :
                //                                     <>
                //                                         {
                //                                             !isEmptyObject(state.data[key]) ?
                //                                                 state.data[key].map((element, index) => {
                //                                                     return (
                //                                                         <div
                //                                                             className="mx-5 flex justify-between items-center">
                //                                                             <div key={index}
                //                                                                  onClick={() => {
                //                                                                      const array = state.sectionControl[key];
                //                                                                      array[index] = true;
                //                                                                      setState({
                //                                                                          ...state,
                //                                                                          sectionControl: {
                //                                                                              ...state.sectionControl,
                //                                                                              [key]: array
                //                                                                          }
                //                                                                      })
                //                                                                  }}>
                //                                                                 <Formatter app={"CV"} section={key}
                //                                                                            rawData={state.data[key][index]}
                //                                                                            isFullScreenViewMode={true}/>
                //                                                             </div>
                //                                                             {/*<div className="ml-5"*/}
                //                                                             {/*     onClick={() => {*/}
                //                                                             {/*         const array = state.data[key];*/}
                //                                                             {/*         array.splice(index, 1)*/}
                //                                                             {/*         setState({*/}
                //                                                             {/*             ...state,*/}
                //                                                             {/*             data: {*/}
                //                                                             {/*                 ...state.data,*/}
                //                                                             {/*                 [key]: array*/}
                //                                                             {/*             }*/}
                //                                                             {/*         })*/}
                //                                                             {/*     }}>*/}
                //                                                             {/*    <MdDeleteForever/>*/}
                //                                                             {/*</div>*/}
                //                                                         </div>
                //                                                     )
                //                                                 })
                //                                                 : null
                //                                         }
                //                                     </>
                //                             }
                //                             {
                //                                 Array.isArray(state.sectionControl[key]) ?
                //                                     state.sectionControl[key].map((element, index) => {
                //                                         // console.log(element, index)
                //                                         return (
                //                                             element &&
                //                                             <div key={index}>
                //                                                 <ModalFullScreen
                //                                                     content={
                //                                                         <FormBuilder
                //                                                             formID={"user-profile-form"}
                //                                                             resourceURL={"form/"}
                //                                                             // validationDeclaration={this.validationDeclaration}
                //                                                             HTTPMethod={"PATCH"}
                //                                                             language={props.language}
                //                                                             uiSchema={UISchema(key, null, null)}
                //                                                             formSchema={section.schema}
                //                                                             formData={state.data[key][index]}
                //                                                             onFormEditSubmit={handleFormEditSubmit}
                //                                                             onFormEditCancel={handleFormEditCancel}
                //                                                             onFormEditDelete={handleFormEditDelete}
                //                                                             formDependent={{
                //                                                                 section: key,
                //                                                                 form: null,
                //                                                                 index: index
                //                                                             }}
                //                                                             formContext={{
                //                                                                 api: api,
                //                                                                 app: "CV",
                //                                                                 form: "PersonalInformation"
                //                                                             }}
                //                                                         />
                //                                                     }
                //                                                     title={section.title}
                //                                                     fullScreen={true}/>
                //                                             </div>
                //                                         )
                //                                     })
                //                                     :
                //                                     state.sectionControl[key] &&
                //                                     <ModalFullScreen
                //                                         content={
                //                                             <FormBuilder
                //                                                 formID={"user-profile-form"}
                //                                                 resourceURL={"form/"}
                //                                                 // validationDeclaration={this.validationDeclaration}
                //                                                 HTTPMethod={"PATCH"}
                //                                                 language={props.language}
                //                                                 uiSchema={UISchema(key, null, null)}
                //                                                 formSchema={section.schema}
                //                                                 formData={state.data[key]}
                //                                                 onFormEditSubmit={handleFormEditSubmit}
                //                                                 onFormEditCancel={handleFormEditCancel}
                //                                                 onFormEditDelete={handleFormEditDelete}
                //                                                 formDependent={{
                //                                                     section: key,
                //                                                     form: null,
                //                                                     index: NaN
                //                                                 }}
                //                                                 formContext={{
                //                                                     api: api,
                //                                                     app: "CV",
                //                                                     form: "PersonalInformation"
                //                                                 }}
                //                                             />
                //                                         }
                //                                         title={section.title}
                //                                         fullScreen={true}
                //                                     />
                //                             }
                //                         </div>
                //                     </>
                //                     : null
                //         }
                //     </div>
                // )
            })}
        </>
    )
}