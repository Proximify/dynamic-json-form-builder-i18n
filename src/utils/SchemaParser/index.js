import React, {useState} from 'react';
import Form from '../../component/dynamic-json-form-builder/index';
import api from "../../api";
import style from "../../style.module.scss";
import ModalStyle from "../../ModalStyles.json";

export function SchemaParser(props) {
    // console.log("SchemaParser", props)

    const schema = props.schema;
    const data = props.data;

    const [state, setState] = useState({
        sectionControl: {
            personal_information: {identification: false, language_skill: false},
            recognitions: false,
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

    return (
        <>
            {Object.keys(schema).map((key, index) => {
                // return (key === "personal_information" ?
                //         (
                //             Object.keys(schema["personal_information"]["subSection"]).map((subKey, subIndex) => {
                //                     return (subKey === "identification" ?
                //                         (
                //                             <div>
                //
                //
                //                                 {/*<button className="border bg-blue-200 p-2 rounded"*/}
                //                                 {/*        onClick={() => {*/}
                //                                 {/*            this.setState({*/}
                //                                 {/*                ...this.state,*/}
                //                                 {/*                childComponentOpen: {*/}
                //                                 {/*                    ...this.state.childComponentOpen,*/}
                //                                 {/*                    identification: !this.state.childComponentOpen["identification"]*/}
                //                                 {/*                }*/}
                //                                 {/*            })*/}
                //                                 {/*        }}>*/}
                //                                 {/*    Identification*/}
                //                                 {/*</button>*/}
                //
                //
                //                             </div>
                //
                //                         ) : null)
                //                 }
                //             )
                //
                //         )
                //         : null
                // )

                return (
                    <div key={index}>
                        <p className=" text-xl text-white border border-yellow-700 bg-yellow-700 rounded m-1 p-1">{schema[key].title}</p>
                        {
                            ((isSection(schema[key]) && hasSubSection(schema[key])) ?
                                (
                                    // console.log("---", schema[key]["subSection"])
                                    Object.keys(schema[key]["subSection"]).map((subKey, subIndex) => {
                                        // console.log("sss", schema[key]["subSection"][subKey]["title"])
                                        return (
                                            <div className="ml-5">
                                                <p className="text-lg text-yellow-700 font-bold"
                                                   onClick={() => {
                                                       console.log("sss", key, subKey)
                                                       setState({
                                                           ...state,
                                                           sectionControl: {
                                                               ...state.sectionControl,
                                                               [key]: {
                                                                   ...state.sectionControl[key],
                                                                   [subKey]: !state.sectionControl[key][subKey]
                                                               }
                                                           }
                                                       })
                                                   }}
                                                >
                                                    {schema[key]["subSection"][subKey]["title"]}
                                                </p>
                                                {isForm(schema[key]["subSection"][subKey]) ?
                                                    // <div>{JSON.stringify(schema[key]["subSection"][subKey]["schema"])}</div>
                                                    (
                                                        // console.log(state.sectionControl[key][subKey])
                                                        state.sectionControl[key][subKey] &&
                                                        <Form
                                                            formID={"user-profile-form"}
                                                            resourceURL={"form/"}
                                                            // validationDeclaration={this.validationDeclaration}
                                                            HTTPMethod={"PATCH"}
                                                            language={props.language}
                                                            formSchema={schema[key]["subSection"][subKey]["schema"]}
                                                            formData={null}
                                                            // rerenderParentCallback={this.rerenderParentCallback}
                                                            formContext={{
                                                                api: api,
                                                                style: style,
                                                                modalStyle: ModalStyle,
                                                                app: "CV",
                                                                form: "PersonalInformation"
                                                            }}
                                                        />
                                                    )
                                                    : null}
                                            </div>
                                        )
                                    })
                                )

                                : (isForm(schema[key]) ?
                                    (
                                        <div className="ml-5">
                                            <p className="text-lg text-yellow-700 font-bold"
                                               onClick={() => {
                                                   console.log("sss", key)
                                                   setState({
                                                       ...state,
                                                       sectionControl: {
                                                           ...state.sectionControl,
                                                           [key]: !state.sectionControl[key]
                                                       }
                                                   })
                                               }}
                                            >
                                                {schema[key]["title"]}
                                            </p>
                                            {state.sectionControl[key] &&
                                            <Form
                                                formID={"user-profile-form"}
                                                resourceURL={"form/"}
                                                // validationDeclaration={this.validationDeclaration}
                                                HTTPMethod={"PATCH"}
                                                // language={this.state.language.language}
                                                formSchema={schema[key]["schema"]}
                                                formData={null}
                                                // rerenderParentCallback={this.rerenderParentCallback}
                                                formContext={{
                                                    api: api,
                                                    style: style,
                                                    modalStyle: ModalStyle,
                                                    app: "CV",
                                                    form: "PersonalInformation"
                                                }}
                                            />
                                            }
                                        </div>
                                    ) : null))
                        }

                    </div>
                )

            })}
        </>
    )
}