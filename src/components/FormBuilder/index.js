import React, {useEffect, useState} from 'react';
import Form from "@rjsf/core";
import {
    NumberInputWidget,
    StringInputWidget,
    PhoneInputWidget,
    ElapsedTimeWidget,
    DateInputWidget,
    MonthDayInputWidget,
    YearMonthInputWidget,
    YearInputWidget,
    BooleanInputWidget,
    SliderInputWidget
} from "./components/SingleField";
import {
    SingleLargeSelectionWidget,
    MultiColLargeSelectionWidget
} from "./components/SelectionField";
import {MultiLangFieldWidget} from './components/MultiLangField'
import {SortableArrayFieldTemplate, ArrayFieldTemplate} from './components/ArrayField/ArrayFieldTemplate';
import {ModalDeleteConfirm} from "./components/utils/Modals";
import HiddenFieldTemplate from "./components/HiddenField/HiddenFieldTemplate";
import HiddenFieldWidget from "./components/HiddenField";
import ReadOnlyFieldWidget from "./components/ReadOnlyFieldWidget";
import {tw} from "twind";

import {fetchFormSchema, fetchLovOptions} from "./service/api";
import SchemaParser, {getLovSubtypeId} from "./service/schemaParser";

const customWidgets = {
    multiLangFieldWidget: MultiLangFieldWidget,
    stringInputWidget: StringInputWidget,
    numberInputWidget: NumberInputWidget,
    phoneInputWidget: PhoneInputWidget,
    elapsedTimeWidget: ElapsedTimeWidget,
    dateInputWidget: DateInputWidget,
    monthDayInputWidget: MonthDayInputWidget,
    yearMonthInputWidget: YearMonthInputWidget,
    yearInputWidget: YearInputWidget,
    booleanInputWidget: BooleanInputWidget,
    sliderInputWidget: SliderInputWidget,
    singleLargeSelectionWidget: SingleLargeSelectionWidget,
    multiColLargeSelectionWidget: MultiColLargeSelectionWidget,
    hiddenFieldWidget: HiddenFieldWidget,
    readOnlyFieldWidget: ReadOnlyFieldWidget
};

// setup({
//     theme: {
//         "colors": {
//             "color-primary": "#26a0f1",
//             "color-secondary": "#9b6904",
//             "color-info": "#36c",
//             "color-action": "#c66216",
//             "color-transparent": "#ffffff",
//             "color-warning": "#ff0000",
//             "color-revert": "#cdcdcd",
//             "color-confirm": "#1d3b79"
//         },
//         "fontFamily": {
//             "title": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
//             "TopSectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
//             "SectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif"
//         },
//         "fontSize": {
//             "title": "15px",
//             "TopSectionLabel": "15px",
//             "SectionLabel": "16px"
//         }
//     }
// })


const FormBuilder = (props) => {
    const {
        formID,
        resourceURL,
        HTTPMethod,
        language,
        itemId,
        sectionId,
        parentItemId,
        parentFieldId,
        onFormEditSubmit,
        onFormEditCancel,
        onFormEditDelete,
        formContext
    } = props;

    const [state, setState] = useState({
        shouldDeleteConfirmModalOpen: false,
        shouldDeleteForm: false,
        formData: {},
        initialFormData: {},
        formSchema: {},
        uiSchema: {},
        validations: {},
        lovOptions: {},
        newForm: false,
        mandatoryFieldValidation: true,
        isReady: false
    })
    // this.state = {
    //     shouldDeleteConfirmModalOpen: false,
    //     shouldDeleteForm: false,
    //     formData: this.props.formData ?? undefined,
    //     newForm: Object.keys(this.props.formData).length === 0,
    //     mandatoryFieldValidation: true
    // };
    // this.handleStateChange = this.handleStateChange.bind(this);
    //  document.addEventListener("keydown", this._handleKeyDown.bind(this));

    useEffect(() => {
        fetchFormSchema(sectionId, itemId, parentItemId, parentFieldId, (res) => {
            const lovSubtypeIDs = getLovSubtypeId(res);
            fetchLovOptions(lovSubtypeIDs, (optRes => {
                const parsedSchema = SchemaParser(res, true);
                setState({
                    ...state,
                    formData: parsedSchema.dataSchema,
                    initialFormData: parsedSchema.dataSchema,
                    formSchema: parsedSchema.formSchema,
                    uiSchema: parsedSchema.uiSchema,
                    validations: parsedSchema.validations,
                    lovOptions: optRes,
                    newForm: Object.keys(parsedSchema.dataSchema).length === 0,
                    isReady: true
                })
            }))
        })

    }, [])

    useEffect(() => {
        if (state.shouldDeleteForm)
            onFormEditDelete(state.formData)
    }, [state.shouldDeleteForm])


    const onFormSubmit = () => {
        onErrorMsgChange(null);
        onFormEditSubmit(state.formData);
    }

    // componentDidUpdate() {
    //     if (this.state.shouldDeleteForm) {
    //         this.props.onFormEditDelete(this.state.formData)
    //     }
    // }

    const _handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    const handleStateChange = (newState) => {
        setState(newState);
    }

    const onErrorMsgChange = (errors) => {
        const errorMsgDiv = document.getElementById(`${formID}-errorMsg`);
        if (!errorMsgDiv)
            return;
        if (errors) {
            const errorList = errors.map(err => Object.values(err));
            errorList.forEach(err => {
                let errorMsg = document.createElement("div");
                errorMsg.className += "alert alert-danger";
                errorMsg.role = "alert";
                errorMsg.innerHTML = err;
                errorMsgDiv.appendChild(errorMsg);
            })
        } else {
            errorMsgDiv.innerHTML = "";
        }
    }

    const validation = (formData, errors) => {
        const validations = state.validations;
        Object.keys(validations).forEach(fieldName => {
            const fieldValidations = validations[fieldName];
            if (Array.isArray(fieldValidations)) {
                fieldValidations.forEach(fieldValidation => {
                    if (!fieldValidation.validateMethod(formData, state.mandatoryFieldValidation)) {
                        errors[fieldName].addError(fieldValidation.getErrMsg(formData));
                    }
                })
            } else if (fieldValidations && fieldValidations.constructor === Object) {
                Object.keys(fieldValidations).forEach(subFieldName => {
                    const subFieldValidations = validations[fieldName][subFieldName];
                    if (Array.isArray(subFieldValidations)) {
                        subFieldValidations.forEach(subFieldValidation => {
                            if (formData[fieldName]) {
                                formData[fieldName].forEach((subsection, index) => {
                                    if (!subFieldValidation.validateMethod(subsection, state.mandatoryFieldValidation)) {
                                        errors[fieldName][index][subFieldName].addError(subFieldValidation.getErrMsg(subsection[subFieldName]));
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

        return errors;
    }

    console.log(state)
    if (!state.isReady) {
        return (
            <div>Loading...</div>
        )
    } else {

        return (
            <div className={tw`flex`}>
                <Form
                    id={formID ?? null}
                    schema={state.formSchema}
                    uiSchema={state.uiSchema}
                    formData={state.formData}
                    formContext={{...formContext, lovOptions: state.lovOptions}}
                    widgets={customWidgets}
                    onChange={({formData}) => {
                        setState({...state, formData: formData})
                        // TODO generic
                        // if (formData.hasOwnProperty('total_workload')) {
                        //     formData.total_workload = (Number(formData.undergraduate_teaching) + Number(formData.graduate_professional_teaching)).toString();
                        // }
                        console.log("data changed", formData);
                    }}
                    liveValidate={true}
                    noHtml5Validate={true}
                    validate={validation}
                    // noValidate={true}
                    onError={(errors) => {
                        console.log(errors)
                        onErrorMsgChange(errors);
                    }}
                    showErrorList={false}
                    onSubmit={onFormSubmit}>
                    <div className={tw`my-4 mb-20 mx-1.5`}>
                        {/*<div id={`${this.props.formID}-errorMsg`}>*/}
                        {/*      /!*className={tw`${this.state.noValidation ? 'hidden' : ''}`}>*!/*/}
                        {/*</div>*/}
                        <div className={tw`flex justify-between`}>
                            <div className={state.newForm ? tw`invisible` : tw``}>
                                <button className={tw`py-1 px-2 ml-16 border bg-color-warning rounded`}
                                        type="button"
                                        onClick={() => {
                                            setState({...state, shouldDeleteConfirmModalOpen: true})
                                        }}
                                >Delete
                                </button>
                            </div>
                            <div>
                                <button className={tw`py-1 px-2 mr-4 border bg-color-revert rounded text-black`}
                                        type="button"
                                        onClick={() => {
                                            onFormEditCancel();
                                        }}>
                                    Cancel
                                </button>
                                <button className={tw`py-1 px-2 border bg-color-action rounded`}
                                        type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>

                <div>
                    <button onClick={() => {
                        setState({
                            ...state,
                            mandatoryFieldValidation: !state.mandatoryFieldValidation
                        })
                    }}>{state.mandatoryFieldValidation ? "Save Without Required Field" : "Save With Required Field"}</button>
                </div>
                {state.shouldDeleteConfirmModalOpen &&
                <ModalDeleteConfirm state={state} changeState={handleStateChange}/>}
            </div>
        );
    }
}

export default FormBuilder;