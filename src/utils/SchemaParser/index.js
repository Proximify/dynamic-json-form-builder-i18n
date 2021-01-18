import React, {useState} from 'react';
import FormBuilder from '../../component/dynamic-json-form-builder';
import api from "../../api";
import {FiEdit} from 'react-icons/fi';
import {AiOutlineFileAdd} from 'react-icons/ai'
import {MdDeleteForever} from 'react-icons/md'
import {ModalFullScreen} from "../../component/dynamic-json-form-builder/components/utils/Modals";
import Formatter from "../../component/dynamic-json-form-builder/components/utils/formatter";

export function SchemaParser(props) {
    // console.log("SchemaParser", props)

    const schema = props.schema;
    const data = props.data;

    const [state, setState] = useState({
        data: {
            personal_information: {identification: {}, language_skill: []},
            recognitions: [],
            user_profile: {}
        },
        sectionControl: {
            personal_information: {identification: false, language_skill: []},
            recognitions: [],
            user_profile: false
        }
    })

    console.log(state)

    const isSection = (obj) => {
        return obj.hasOwnProperty("type") && obj.type === "section";
    }

    const hasSubSection = (obj) => {
        return obj.hasOwnProperty("subSection") && Object.keys(obj.subSection).length > 0
    }

    const isForm = (obj) => {
        return obj.hasOwnProperty("type") && obj.type === "form" && obj.hasOwnProperty("schema") && Object.keys(obj.schema).length > 0;
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
            sectionControl: {
                personal_information: {identification: false, language_skill: []},
                recognitions: [],
                user_profile: false
            }
        })
    }

    return (
        <>
            {Object.keys(schema).map((key, index) => {
                return (
                    <div key={index}>
                        <p className="inline-block text-xl text-white border border-yellow-700 bg-yellow-700 rounded m-1 p-1">{schema[key].title}</p>
                        {
                            (
                                (
                                    isSection(schema[key]) && hasSubSection(schema[key])) ?
                                    (
                                        // console.log("---", schema[key]["subSection"])
                                        Object.keys(schema[key]["subSection"]).map((subKey, subIndex) => {
                                            // console.log("sss", schema[key]["subSection"][subKey]["title"])
                                            return (
                                                <div className="ml-5">
                                                    <div className="flex items-stretch space-x-2">
                                                        <p className="text-lg font-bold">
                                                            {schema[key]["subSection"][subKey]["title"]}
                                                        </p>
                                                        {
                                                            isSingle(schema[key]["subSection"][subKey]) ?
                                                                <div className="pt-1">
                                                                    <div
                                                                        onClick={() => {
                                                                            // console.log("sss", key, subKey)
                                                                            setState({
                                                                                ...state,
                                                                                sectionControl: {
                                                                                    ...state.sectionControl,
                                                                                    [key]: {
                                                                                        ...state.sectionControl[key],
                                                                                        [subKey]: true
                                                                                    }
                                                                                }
                                                                            })
                                                                        }}
                                                                    ><FiEdit size={"1.1rem"}/>
                                                                    </div>
                                                                    {!isEmptyObject(state.data[key][subKey]) ? (
                                                                        <div
                                                                            className="flex justify-between items-center">
                                                                            <div
                                                                                onClick={() => {
                                                                                    setState({
                                                                                        ...state,
                                                                                        sectionControl: {
                                                                                            ...state.sectionControl,
                                                                                            [key]: {
                                                                                                ...state.sectionControl[key],
                                                                                                [subKey]: true
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                }}>
                                                                                <Formatter app={"CV"} section={key}
                                                                                           form={subKey}
                                                                                           rawData={state.data[key][subKey]}
                                                                                           isFullScreenViewMode={true}/>
                                                                            </div>
                                                                            <div className="ml-5"
                                                                                 onClick={() => {
                                                                                     // console.log(state.data[key], key)
                                                                                     setState({
                                                                                         ...state,
                                                                                         data: {
                                                                                             ...state.data,
                                                                                             [key]: {
                                                                                                 ...state.data[key],
                                                                                                 [subKey]: {}
                                                                                             }
                                                                                         }
                                                                                     })
                                                                                 }}>
                                                                                <MdDeleteForever/>
                                                                            </div>
                                                                        </div>
                                                                    ) : null
                                                                    }
                                                                </div>
                                                                :
                                                                <div className="pt-1">
                                                                    <div
                                                                        onClick={() => {
                                                                            console.log(state.sectionControl[key][subKey]);
                                                                            const array = state.sectionControl[key][subKey];
                                                                            array.push(true);
                                                                            setState({
                                                                                ...state,
                                                                                sectionControl: {
                                                                                    ...state.sectionControl,
                                                                                    [key]: {
                                                                                        ...state.sectionControl[key],
                                                                                        [subKey]: array
                                                                                    }
                                                                                }
                                                                            })
                                                                        }}
                                                                    ><AiOutlineFileAdd size={"1.1rem"}/>
                                                                        {/*{JSON.stringify(state.data[key][subKey])}*/}
                                                                    </div>
                                                                    {!isEmptyObject(state.data[key][subKey]) ? (
                                                                        state.data[key][subKey].map((element, index) => {
                                                                                return (
                                                                                    <div
                                                                                        className="flex justify-between items-center">
                                                                                        <div key={index}
                                                                                             onClick={() => {
                                                                                                 const array = state.sectionControl[key][subKey];
                                                                                                 array[index] = true;
                                                                                                 setState({
                                                                                                     ...state,
                                                                                                     sectionControl: {
                                                                                                         ...state.sectionControl,
                                                                                                         [key]: {
                                                                                                             ...state.sectionControl[key],
                                                                                                             [subKey]: array
                                                                                                         }
                                                                                                     }
                                                                                                 })
                                                                                             }}>
                                                                                            <Formatter app={"CV"}
                                                                                                       section={key}
                                                                                                       form={subKey}
                                                                                                       rawData={state.data[key][subKey][index]}
                                                                                                       isFullScreenViewMode={true}/>
                                                                                        </div>
                                                                                        <div className="ml-5"
                                                                                             onClick={() => {
                                                                                                 const array = state.data[key][subKey];
                                                                                                 array.splice(index, 1)
                                                                                                 setState({
                                                                                                     ...state,
                                                                                                     data: {
                                                                                                         ...state.data,
                                                                                                         [key]: {
                                                                                                             ...state.data[key],
                                                                                                             [subKey]: array
                                                                                                         }
                                                                                                     }
                                                                                                 })
                                                                                             }}>
                                                                                            <MdDeleteForever/>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        )
                                                                    ) : null
                                                                    }
                                                                </div>
                                                        }
                                                    </div>
                                                    {isForm(schema[key]["subSection"][subKey]) ?
                                                        (
                                                            (Array.isArray(state.sectionControl[key][subKey]) ?
                                                                    state.sectionControl[key][subKey].map((element, index) => {
                                                                        // console.log(key, "--", schema[key], subKey, schema[key]["subSection"][subKey])
                                                                        return (
                                                                            element &&
                                                                            <div key={index}>
                                                                                <ModalFullScreen content={<FormBuilder
                                                                                    formID={"user-profile-form"}
                                                                                    resourceURL={"form/"}
                                                                                    // validationDeclaration={this.validationDeclaration}
                                                                                    HTTPMethod={"PATCH"}
                                                                                    language={props.language}
                                                                                    formSchema={schema[key]["subSection"][subKey]["schema"]}
                                                                                    formData={state.data[key][subKey][index]}
                                                                                    onFormEditSubmit={handleFormEditSubmit}
                                                                                    onFormEditCancel={handleFormEditCancel}
                                                                                    formDependent={{
                                                                                        section: key,
                                                                                        form: subKey,
                                                                                        index: index
                                                                                    }}
                                                                                    formContext={{
                                                                                        api: api,
                                                                                        app: "CV",
                                                                                        form: "PersonalInformation"
                                                                                    }}
                                                                                />} title={""} fullScreen={true}/>
                                                                            </div>
                                                                        )
                                                                    })
                                                                    :
                                                                    state.sectionControl[key][subKey] &&
                                                                    <ModalFullScreen content={<FormBuilder
                                                                        formID={"user-profile-form"}
                                                                        resourceURL={"form/"}
                                                                        // validationDeclaration={this.validationDeclaration}
                                                                        HTTPMethod={"PATCH"}
                                                                        language={props.language}
                                                                        formSchema={schema[key]["subSection"][subKey]["schema"]}
                                                                        formData={state.data[key][subKey]}
                                                                        onFormEditSubmit={handleFormEditSubmit}
                                                                        onFormEditCancel={handleFormEditCancel}
                                                                        formDependent={{
                                                                            section: key,
                                                                            form: subKey,
                                                                            index: NaN
                                                                        }}
                                                                        formContext={{
                                                                            api: api,
                                                                            app: "CV",
                                                                            form: "PersonalInformation"
                                                                        }}
                                                                    />} title={""} fullScreen={true}/>
                                                            )
                                                        )
                                                        : null}
                                                </div>
                                            )
                                        })
                                    ) : (
                                        isForm(schema[key]) ? (
                                            <div className="inline-block">
                                                {
                                                    isSingle(schema[key]) ?
                                                        <div>
                                                            <div
                                                                onClick={() => {
                                                                    // console.log("sss", key, subKey)
                                                                    setState({
                                                                        ...state,
                                                                        sectionControl: {
                                                                            ...state.sectionControl,
                                                                            [key]: true
                                                                        }
                                                                    })
                                                                }}
                                                            ><FiEdit size={"1.1rem"}/>
                                                            </div>
                                                            {!isEmptyObject(state.data[key]) ? (
                                                                <div className="flex justify-between items-center">
                                                                    <div
                                                                        onClick={() => {
                                                                            setState({
                                                                                ...state,
                                                                                sectionControl: {
                                                                                    ...state.sectionControl,
                                                                                    [key]: true
                                                                                }
                                                                            })
                                                                        }}>
                                                                        <Formatter app={"CV"} section={key}
                                                                                   rawData={state.data[key]}
                                                                                   isFullScreenViewMode={true}/>
                                                                    </div>
                                                                    <div className="ml-5"
                                                                         onClick={() => {
                                                                             // console.log(state.data[key], key)
                                                                             setState({
                                                                                 ...state,
                                                                                 data: {
                                                                                     ...state.data,
                                                                                     [key]: {}
                                                                                 }
                                                                             })
                                                                         }}>
                                                                        <MdDeleteForever/>
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                            }
                                                        </div>
                                                        :
                                                        <div>
                                                            <div
                                                                onClick={() => {
                                                                    const array = state.sectionControl[key];
                                                                    array.push(true);
                                                                    setState({
                                                                        ...state,
                                                                        sectionControl: {
                                                                            ...state.sectionControl,
                                                                            [key]: array
                                                                        }
                                                                    })
                                                                }}
                                                            ><AiOutlineFileAdd size={"1.1rem"}/>
                                                            </div>
                                                            {!isEmptyObject(state.data[key]) ? (
                                                                state.data[key].map((element, index) => {
                                                                        return (
                                                                            <div className="flex justify-between items-center">
                                                                                <div key={index}
                                                                                     onClick={() => {
                                                                                         const array = state.sectionControl[key];
                                                                                         array[index] = true;
                                                                                         setState({
                                                                                             ...state,
                                                                                             sectionControl: {
                                                                                                 ...state.sectionControl,
                                                                                                 [key]: array
                                                                                             }
                                                                                         })
                                                                                     }}>
                                                                                    <Formatter app={"CV"} section={key}
                                                                                               rawData={state.data[key][index]}
                                                                                               isFullScreenViewMode={true}/>
                                                                                </div>
                                                                                <div className="ml-5"
                                                                                     onClick={() => {
                                                                                         const array = state.data[key];
                                                                                         array.splice(index, 1)
                                                                                         setState({
                                                                                             ...state,
                                                                                             data: {
                                                                                                 ...state.data,
                                                                                                 [key]: array
                                                                                             }
                                                                                         })
                                                                                     }}>
                                                                                    <MdDeleteForever/>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                )
                                                            ) : null}
                                                        </div>
                                                }
                                                {
                                                    (Array.isArray(state.sectionControl[key]) ?
                                                            state.sectionControl[key].map((element, index) => {
                                                                // console.log(element, index)
                                                                return (
                                                                    element &&
                                                                    <div key={index}>
                                                                        <ModalFullScreen content={<FormBuilder
                                                                            formID={"user-profile-form"}
                                                                            resourceURL={"form/"}
                                                                            // validationDeclaration={this.validationDeclaration}
                                                                            HTTPMethod={"PATCH"}
                                                                            language={props.language}
                                                                            formSchema={schema[key]["schema"]}
                                                                            formData={state.data[key][index]}
                                                                            onFormEditSubmit={handleFormEditSubmit}
                                                                            onFormEditCancel={handleFormEditCancel}
                                                                            formDependent={{
                                                                                section: key,
                                                                                form: null,
                                                                                index: index
                                                                            }}
                                                                            formContext={{
                                                                                api: api,
                                                                                app: "CV",
                                                                                form: "PersonalInformation"
                                                                            }}
                                                                        />} title={""} fullScreen={true}/>
                                                                    </div>
                                                                )
                                                            })
                                                            :
                                                            state.sectionControl[key] &&
                                                            <ModalFullScreen content={<FormBuilder
                                                                formID={"user-profile-form"}
                                                                resourceURL={"form/"}
                                                                // validationDeclaration={this.validationDeclaration}
                                                                HTTPMethod={"PATCH"}
                                                                language={props.language}
                                                                formSchema={schema[key]["schema"]}
                                                                formData={state.data[key]}
                                                                onFormEditSubmit={handleFormEditSubmit}
                                                                onFormEditCancel={handleFormEditCancel}
                                                                formDependent={{
                                                                    section: key,
                                                                    form: null,
                                                                    index: NaN
                                                                }}
                                                                formContext={{
                                                                    api: api,
                                                                    app: "CV",
                                                                    form: "PersonalInformation"
                                                                }}
                                                            />} title={""} fullScreen={true}/>
                                                    )
                                                }
                                            </div>
                                        ) : null
                                    )
                            )
                        }
                    </div>
                )

            })}
        </>
    )
}