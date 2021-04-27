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
import {SortableArrayFieldTemplate, ArrayFieldTemplate} from './components/utils/ArrayFieldTemplate';
import {ModalDeleteConfirm} from "./components/utils/Modals";
import HiddenFieldTemplate from "./components/HiddenField/HiddenFieldTemplate";
import HiddenFieldWidget from "./components/HiddenField";
import ReadOnlyFieldWidget from "./components/ReadOnlyFieldWidget";
import {tw} from "twind";

import {fetchFormSchema, fetchLovOptions} from "./service/api";
import SchemaParser, {getLovSubtypeId} from "./service/schemaParser";
import {handleFormSubmit, handleFormDelete} from "./service/formDataHandler";

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

const contentType = process.env.REACT_APP_CONTENT_TYPE ?? 'members';
const contentId = process.env.REACT_APP_CONTENT_ID ?? '3';
const viewType = process.env.REACT_APP_VIEW_TYPE ?? 'cv';


const FormBuilder = (props) => {
    const {
        formID,
        HTTPMethod,
        language,
        itemId,
        sectionId,
        parentItemId,
        parentFieldId,
        formContext,
        handleFormSubmitRes,
        handleFormDeleteRes,
        handleFormCancel
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
        formErrors: [],
        isReady: false
    })

    useEffect(() => {
        fetchFormSchema(sectionId, itemId, parentItemId, parentFieldId, (res) => {
            const lovSubtypeIDs = getLovSubtypeId(res);
            fetchLovOptions(lovSubtypeIDs, (optRes => {
                const parsedSchema = SchemaParser(res);
                setState({
                    ...state,
                    formData: parsedSchema.dataSchema,
                    initialFormData: parsedSchema.dataSchema,
                    formSchema: parsedSchema.formSchema,
                    uiSchema: parsedSchema.uiSchema,
                    validations: parsedSchema.validations,
                    lovOptions: optRes,
                    newForm: itemId === "0",
                    isReady: true
                })
            }))
        })

    }, [])

    useEffect(() => {
        if (state.shouldDeleteForm) {
            handleFormDelete(state, sectionId, itemId, parentItemId, parentFieldId, contentType, contentId, viewType, handleFormDeleteRes);
        }
    }, [state.shouldDeleteForm])


    const onFormSubmit = () => {
        handleFormSubmit(state, sectionId, itemId, parentItemId, parentFieldId, contentType, contentId, viewType, handleFormSubmitRes)
    }

    const handleStateChange = (newState) => {
        setState(newState);
    }

    const getErrMsg = () => {
        return state.formErrors && state.formErrors.map((err, index) => {
            return (
                <li key={index}>{err.stack.split(':')[1].trim()}</li>
            )
        });

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


    if (!state.isReady) {
        return (
            <div>Loading...</div>
        )
    } else {
        console.log(state)
        return (
            <div className={tw`bg-gray-200 flex justify-center`}>
                <div className={tw`w-1/5`}/>
                <div
                    className={tw`w-3/5 max-w-screen-md justify-self-center bg-white px-5 my-2 border-l border-r border-gray-400`}>
                    <p className={tw`mt-1 mb-5 p-2 px-7 text-2xl font-bold border-b`}>{state.formSchema.form_title}</p>
                    <Form
                        id={formID ?? null}
                        schema={state.formSchema}
                        uiSchema={state.uiSchema}
                        formData={state.formData}
                        formContext={{...formContext, lovOptions: state.lovOptions, formData: state.formData,mandatoryFieldValidation: state.mandatoryFieldValidation}}
                        widgets={customWidgets}
                        onChange={({formData}) => {
                            setState({...state, formData: formData})
                            console.log("data changed", formData);
                        }}
                        liveValidate={true}
                        noHtml5Validate={true}
                        validate={(formData, errors)=>{
                            return validation(formData, errors)}}
                        onError={(errors) => {
                            console.log(errors)
                            setState({
                                ...state,
                                formErrors: errors
                            })
                        }}
                        showErrorList={false}
                        onSubmit={onFormSubmit}>

                        <div className={tw`my-4 mb-14 ml-10 mr-14`}>
                            <div>
                                <ul>{getErrMsg()}</ul>
                            </div>
                            <div className={tw`flex justify-between`}>
                                <div className={state.newForm ? tw`invisible` : tw``}>
                                    <button className={tw`py-1 px-2 ml-16 border bg-color-warning rounded text-white`}
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
                                                handleFormCancel();
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
                </div>
                <div className={tw`w-1/5 p-5`}>
                    {/*<button onClick={() => {*/}
                    {/*}}>{state.mandatoryFieldValidation ? "Save Without Required Field" : "Save With Required Field"}</button>*/}
                    <input type={"radio"} checked={!state.mandatoryFieldValidation}
                           onChange={() => {
                           }}
                           onClick={() => {
                               setState({
                                   ...state,
                                   mandatoryFieldValidation: !state.mandatoryFieldValidation
                               })
                           }}
                    /> Allow saving without required fields
                </div>
                {state.shouldDeleteConfirmModalOpen &&
                <ModalDeleteConfirm state={state} changeState={handleStateChange}/>}
            </div>
        );
    }
}

export default FormBuilder;