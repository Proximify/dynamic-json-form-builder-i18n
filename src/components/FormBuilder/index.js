import React, {createRef, useEffect, useRef, useState} from 'react';
import Form from "@rjsf/core";
import clone from 'clone';
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import {tw} from "twind";

import {fetchFormSchema, fetchLovOptions} from "./service/api";
import SchemaParser, {getLovSubtypeId} from "./service/schemaParser";
import {handleFormDelete, handleFormSubmit} from "./service/formDataHandler";
import Tooltip from "./components/utils/Tooltip";
import {ModalDeleteConfirm, ModalSaveAnywayConfirm} from "./components/utils/Modals";

import {
    BooleanInputWidget,
    DateInputWidget,
    ElapsedTimeWidget,
    MonthDayInputWidget,
    NumberInputWidget,
    PhoneInputWidget,
    SliderInputWidget,
    StringInputWidget,
    YearInputWidget,
    YearMonthInputWidget
} from "./components/SingleField";
import {MultiColLargeSelectionWidget, SingleLargeSelectionWidget} from "./components/SelectionField";
import {MultiLangFieldWidget} from './components/MultiLangField'
import HiddenFieldWidget from "./components/HiddenField";
import ReadOnlyFieldWidget from "./components/ReadOnlyFieldWidget";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {FormCancelBtnClass, FormClass, FormDeleteBtnClass} from "./twClass";
import {
    AmountInputTemplate,
    CurrencyGroupFieldTemplate,
    CurrencySelectTemplate
} from "./components/utils/CurrencyGroupFieldTemplate";
import HiddenFieldTemplate from "./components/HiddenField/HiddenFieldTemplate";
import ButtonWithDropdown from "./components/ButtonWithDropdown";

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

// let formRef;

const FormBuilder = (props) => {
    let formRef = useRef(null);
    let btnGroupRefs = {
        saveAndCloseRef: useRef(null)
    }
    const {
        sectionId,
        parentItemId,
        parentFieldId,
        multiplicity,
        formContext,
        handleFormSubmitRes,
        handleFormDeleteRes,
        handleFormCancel,
        contentType,
        contentId,
        viewType
    } = props;


    const [state, setState] = useState({
        shouldDeleteConfirmModalOpen: false,
        shouldSaveWithErrorModalOpen: false,
        shouldDeleteForm: false,
        shouldSubmitForm: false,
        formData: {},
        initialFormData: {},
        formSchema: {},
        initialFormSchema: {},
        uiSchema: {},
        initialUiSchema: {},
        validations: {},
        lovOptions: {},
        newForm: false,
        itemId: props.itemId,
        mandatoryFieldValidation: true,
        formErrorMessages: [],
        shouldDisplayErrorList: false,
        submitType: "saveAndClose",
        loadingError: "",
        isReady: false,
        saveAndCloseBtnRef: null
        // formRef: undefined
    })

    useEffect(() => {
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [state.isReady]);

    const listener = (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            event.preventDefault();
            // callMyFunction();
            console.log(btnGroupRefs);

            if (btnGroupRefs?.saveAndCloseRef)
                btnGroupRefs.saveAndCloseRef.click();
            // if (formRef.current){
            //     const form = formRef.current;
            //     const errorMessages = validation(form.props.formData).errorMessages;
            //     console.log(errorMessages)
            //     if (errorMessages.length <= 0){
            //         return form.props.onSubmit();
            //     }
            // }
        }
    };


    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyDown);
    //
    //     // return () => {
    //     //     window.removeEventListener('keydown', handleKeyDown);
    //     // };
    // }, []);
    //
    // const handleKeyDown = (event) => {
    //     console.log("handleOnKeyDown", event.keyCode)
    //     if (event.keyCode === 13) {
    //         console.log("enter ",formRef);
    //
    //         // formRef.submit();
    //     }
    // }

    useEffect(() => {
        if (state.isReady)
            return;
        fetchFormSchema(sectionId, state.itemId, parentItemId, parentFieldId, (res) => {
            const lovSubtypeIDs = getLovSubtypeId(res);
            fetchLovOptions(lovSubtypeIDs, (optRes => {
                const parsedSchema = SchemaParser(res);
                const preprocessedSchema = clone(parsedSchema.formSchema);
                formSchemaPreprocessor(preprocessedSchema);
                const preprocessedData = clone(parsedSchema.dataSchema);
                dataSchemaPreprocessor(preprocessedData, parsedSchema.formSchema);
                const preprocessedUi = clone(parsedSchema.uiSchema);
                uiSchemaPreprocessor(preprocessedUi, parsedSchema.formSchema, 0, preprocessedSchema);

                setState({
                    ...state,
                    formData: preprocessedData,
                    initialFormData: parsedSchema.dataSchema,
                    formSchema: preprocessedSchema,
                    initialFormSchema: parsedSchema.formSchema,
                    uiSchema: preprocessedUi,
                    initialUiSchema: parsedSchema.uiSchema,
                    validations: parsedSchema.validations,
                    fieldIdNameMapper: parsedSchema.fieldIdNameMapper,
                    lovOptions: optRes,
                    newForm: state.itemId === "0",
                    isReady: true
                })
            }))
        })
    }, [state.isReady])

    useEffect(() => {
        if (state.shouldDeleteForm) {
            handleFormDelete(state, sectionId, state.itemId, parentItemId, parentFieldId, contentType, contentId, viewType, handleFormDeleteRes);
        }
    }, [state.shouldDeleteForm])

    useEffect(() => {
        if (state.shouldSubmitForm) {
            handleFormSubmit(state, sectionId, state.itemId, parentItemId, parentFieldId, contentType, contentId, viewType, handleFormSubmitRes);
        }
    }, [state.shouldSubmitForm])

    const onFormSubmit = () => {
        if (isFormDataEmpty(state.formData)){
            setState({
                ...state,
                formErrorMessages: ["All fields are empty. Please click Cancel or Delete instead of Save."],
                shouldDisplayErrorList: true
            })
        }else {
            if (state.submitType === 'saveAndClose') {
                handleFormSubmit(state, sectionId, state.itemId, parentItemId, parentFieldId, contentType, contentId, viewType, handleFormSubmitRes);
            } else {
                handleFormSubmit(state, sectionId, state.itemId, parentItemId, parentFieldId, contentType, contentId, viewType, (response, error) => {
                    if (response) {
                        if (!response.data.error) {
                            setState({
                                ...state,
                                isReady: false,
                                itemId: "0"
                            })
                        } else {
                            setState({
                                ...state,
                                isReady: true,
                                loadingError: response.data.error
                            })
                        }
                    } else if (error) {
                        setState({
                            ...state,
                            isReady: true,
                            loadingError: error
                        })
                    }
                });
            }
        }
    }

    const handleStateChange = (newState) => {
        setState(newState);
    }

    const isFormDataEmpty = (formData) => {
        if (isEmpty(formData)){
            return true;
        }else {
            let isAllEmpty = true;
            for (const [, fieldValue] of Object.entries(formData)){
                if (Array.isArray(fieldValue)){
                    if (fieldValue.length > 0){
                        isAllEmpty = false;
                    }
                }else {
                    if (fieldValue){
                        isAllEmpty = false;
                    }
                }
            }
            return isAllEmpty;
        }
    }

    const getErrMsg = () => {
        return state.formErrorMessages &&
            <ul className={tw`border p-2 rounded-lg text-sm ${state.formErrorMessages.length > 0 ? 'bg-red-200' : 'bg-green-200'}`}>{
                state.formErrorMessages.length > 0 ?
                    state.formErrorMessages.map((errMsg, index) => <li key={index} className={tw`text-red-700`}>{errMsg}</li>)
                    :
                    <li className={tw`text-green-700`}>There are no more errors</li>
            }</ul>

        // if (state.formErrorMessages) {
        //
        //     // return state.formErrorMessages.length > 0 ?
        //     //     <ul className={tw`border p-2 rounded-lg bg-red-200 text-sm`}>{state.formErrorMessages.map((err, index) => {
        //     //         return (
        //     //             <li key={index}>{err}</li>
        //     //         )
        //     //     })}</ul>
        //     //     : <p>No error</p>
        // }
    }

    const validation = (formData, errors) => {
        const validations = state.validations;
        const errorMessages = [];
        Object.keys(validations).forEach(fieldName => {
            const fieldValidations = validations[fieldName];
            if (Array.isArray(fieldValidations)) {
                fieldValidations.forEach(fieldValidation => {
                    if (!fieldValidation.validateMethod(formData, state.mandatoryFieldValidation)) {
                        const errorMsg = fieldValidation.getErrMsg(formData);
                        if (errors) {
                            errors[fieldName].addError(errorMsg);
                        }
                        errorMessages.push(errorMsg);
                    }
                })
            } else if (isObject(fieldValidations)) {
                Object.keys(fieldValidations).forEach(subFieldName => {
                    const subFieldValidations = validations[fieldName][subFieldName];
                    if (Array.isArray(subFieldValidations)) {
                        subFieldValidations.forEach(subFieldValidation => {
                            if (state.formData[fieldName]) {
                                state.formData[fieldName].forEach((subsection, index) => {
                                    if (!subFieldValidation.validateMethod(subsection, state.mandatoryFieldValidation)) {
                                        const errorMsg = subFieldValidation.getErrMsg(subsection[subFieldName]);
                                        if (errors) {
                                            errors[fieldName].addError(errorMsg);
                                            errors[fieldName][index].addError(errorMsg);
                                            if (errors[fieldName][index][subFieldName]) {
                                                errors[fieldName][index][subFieldName].addError(errorMsg);
                                            }
                                        }
                                        errorMessages.push(errorMsg);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

        return {errors: errors, errorMessages: errorMessages};
    }

    const formSchemaPreprocessor = (schema, count = 0) => {
        const {properties: fields, fundingFormGroupFields} = schema;
        if (fundingFormGroupFields) {
            fundingFormGroupFields.forEach(groupFields => {
                const fundingFormGroup = {
                    "type": "object",
                    "id": `fundingGroup${count}`,
                    "properties": {}
                }
                groupFields.forEach(groupField => {
                    const field = fields[groupField.field_name];
                    if (groupField.fundingType === 'amount') {
                        fundingFormGroup.title = field.title;
                        fundingFormGroup['order_number'] = field.order_number;
                    }
                    fundingFormGroup.properties[groupField.field_name] = field;
                    delete fields[groupField.field_name];
                })
                fields[fundingFormGroup.id] = fundingFormGroup;
                count++;
            })
            for (const [fieldName, field] of Object.entries(fields)) {
                if (field.type === "array") {
                    formSchemaPreprocessor(field.items, count);
                }
            }
        }
    }

    const dataSchemaPreprocessor = (formData, formSchema, count = 0) => {
        if (!isEmpty(formData)) {
            const {properties: fields, fundingFormGroupFields} = formSchema;
            if (fundingFormGroupFields) {
                fundingFormGroupFields.forEach(groupFields => {
                    const fundingFormGroup = {};
                    const fundingFormGroupName = `fundingGroup${count}`;
                    groupFields.forEach(groupField => {
                        fundingFormGroup[groupField.field_name] = formData[groupField.field_name];
                        delete formData[groupField.field_name];
                    })
                    formData[fundingFormGroupName] = fundingFormGroup;
                    count++;
                })
                for (const [fieldName, field] of Object.entries(fields)) {
                    if (field.type === "array") {
                        formData[fieldName].forEach(subFormData => {
                            dataSchemaPreprocessor(subFormData, field.items, count);
                        })
                    }
                }
            }
        }
    }

    // TODO: link string template name with component over here
    const uiSchemaPreprocessor = (uiSchema, formSchema, count = 0, preprocessedSchema) => {
        const {properties: fields, fundingFormGroupFields} = formSchema;
        if (fundingFormGroupFields) {
            fundingFormGroupFields.forEach(groupFields => {
                const fundingFormGroup = {
                    "ui:ObjectFieldTemplate": CurrencyGroupFieldTemplate,
                }
                const fundingFormGroupName = `fundingGroup${count}`;
                groupFields.forEach(groupField => {
                    const fieldUi = uiSchema[groupField.field_name];
                    if (groupField.fundingType === 'amount') {
                        fieldUi['ui:FieldTemplate'] = AmountInputTemplate;
                    } else if (groupField.fundingType === 'currency') {
                        fieldUi['ui:FieldTemplate'] = CurrencySelectTemplate;
                    } else if (groupField.fundingType === 'convertedAmount') {
                        fieldUi['ui:FieldTemplate'] = HiddenFieldTemplate;
                    }
                    fundingFormGroup[groupField.field_name] = fieldUi;
                    delete uiSchema[groupField.field_name];
                })
                uiSchema[fundingFormGroupName] = fundingFormGroup;
                count++;
            })
            for (const [fieldName, field] of Object.entries(fields)) {
                if (field.type === "array") {
                    uiSchemaPreprocessor(uiSchema[fieldName]['items'], field.items, count, preprocessedSchema.properties[fieldName].items);
                }
            }
        }
        uiSchema['ui:order'] = Object.keys(preprocessedSchema.properties).sort((a, b) => {
            return preprocessedSchema.properties[a]?.order_number - preprocessedSchema.properties[b]?.order_number
        })
    }

    if (!state.isReady) {
        return (
            <div>Loading...</div>
        )
    } else if (state.loadingError) {
        return (
            <div>Error: {state.loadingError}</div>
        )
    } else {
        console.log(state)
        return (
            <>
                <div
                    className={tw`bg-white pb-20`}>
                    <div className={tw`flex items-center mt-1 mb-5 p-2 px-7 border-b space-x-2`}>
                        <p className={tw`text-2xl font-bold`}>{state.formSchema.form_title}</p>
                        <Tooltip
                            placement="right-end"
                            trigger="hover"
                            delayHide={200}
                            tooltip={
                                <div className={tw`mx-2 my-1 text-sm`}>
                                    <p className={tw`mb-1`}><strong>{state.formSchema.form_title}</strong></p>
                                    <p>{state.formSchema?.form_description ?? null}</p>
                                </div>
                            }
                            hideArrow={true}
                            modifiers={[
                                {
                                    name: "offset",
                                    enabled: true,
                                    options: {
                                        offset: [0, 10]
                                    }
                                }
                            ]}
                        >
                            <AiOutlineQuestionCircle className={tw`text-red-600`} size={"1.5em"}/>
                        </Tooltip>
                    </div>

                    <Form
                        className={tw`${FormClass}`}
                        schema={state.formSchema}
                        uiSchema={state.uiSchema}
                        formData={state.formData}
                        formContext={{
                            ...formContext,
                            lovOptions: state.lovOptions,
                            formData: state.formData,
                            mandatoryFieldValidation: state.mandatoryFieldValidation,
                            fieldIdNameMapper: state.fieldIdNameMapper
                        }}
                        widgets={customWidgets}
                        onChange={({formData}) => {
                            console.log("data changed", formData);
                            let errorMessages;
                            if (state.shouldDisplayErrorList) {
                                errorMessages = validation(formData).errorMessages;
                            }
                            setState({...state, formData: formData, formErrorMessages: errorMessages})
                        }}
                        liveValidate={!isEmpty(state.formErrorMessages) || !state.newForm}
                        noHtml5Validate={true}
                        validate={(formData, errors) => {
                            return validation(formData, errors).errors;
                        }}
                        onError={(errors) => {
                            let isAllMandatoryError = true;
                            let rawErrors = errors;
                            const errorMessages = [];

                            rawErrors.forEach(error => {
                                const errorMsg = error.stack.split(':')[1].trim();
                                errorMessages.push(errorMsg);
                                if (!errorMsg.includes('is required')) {
                                    isAllMandatoryError = false;
                                }
                            })

                            setState({
                                ...state,
                                formErrorMessages: errorMessages,
                                shouldDisplayErrorList: true,
                                shouldSaveWithErrorModalOpen: isAllMandatoryError
                            })
                        }}
                        showErrorList={false}
                        onSubmit={onFormSubmit}
                        // ref={formRef}
                        // ref={(form) => {
                        //     // if (state.formRef === undefined && form){
                        //     //     console.log("-------")
                        //     //     setState({
                        //     //         ...state,
                        //     //         formRef: form
                        //     //     })
                        //     // }
                        //     formRef = form
                        //     // console.log(form)
                        //     // if (!state.formRef){
                        //     //     setState({
                        //     //         ...state,
                        //     //         formRef: form
                        //     //     })
                        //     // }
                        // }}
                    >
                        <div className={'form-action'}>
                            {state.shouldDisplayErrorList && <div className={'form-error-list'}>
                                {getErrMsg()}
                            </div>}
                            <div className={'action-btn-container'}>
                                <div className={tw`flex justify-between mr-10`}>
                                    <div className={tw`space-x-5`}>
                                        <ButtonWithDropdown
                                            dropdownBtnText={""}
                                            primaryBtn={
                                                {
                                                    btnGroupRefs:btnGroupRefs,
                                                    label: 'Save Changes',
                                                    handleOnClick: () => {
                                                        setState({
                                                            ...state,
                                                            submitType: "saveAndClose"
                                                        })
                                                    },
                                                    type: "submit"
                                                }
                                            }
                                            dropdownOptions={multiplicity === 'multiple' && [
                                                {
                                                    label: "Save and Close", handleOnClick: () => {
                                                        setState({
                                                            ...state,
                                                            submitType: "saveAndClose"
                                                        })
                                                    },
                                                    type: "submit"
                                                },
                                                {
                                                    label: "Save and Add New", handleOnClick: () => {
                                                        setState({
                                                            ...state,
                                                            submitType: "saveAndAddNew"
                                                        })
                                                    },
                                                    type: "submit"
                                                }
                                            ]}/>
                                        <button
                                            className={tw`${FormCancelBtnClass}`}
                                            type="button"
                                            onClick={() => {
                                                handleFormCancel();
                                            }}>
                                            Cancel
                                        </button>
                                    </div>
                                    <div className={state.newForm ? tw`invisible` : tw``}>
                                        <button
                                            className={tw`${FormDeleteBtnClass}`}
                                            type="button"
                                            onClick={() => {
                                                setState({...state, shouldDeleteConfirmModalOpen: true})
                                            }}
                                        >Delete
                                        </button>
                                    </div>
                                </div>
                                {/*<button type={"submit"}*/}
                                {/*        ref={ref => {*/}
                                {/*            if (ref)*/}
                                {/*                formRef = ref*/}
                                {/*        }}*/}
                                {/*    //         onClick={() => {*/}
                                {/*    //     console.log("==", formRef)*/}
                                {/*    //     // // formRef.submit()*/}
                                {/*    //     return formRef.current.props.onSubmit();*/}
                                {/*    //     // formRef && formRef.current.onFormSubmit()*/}
                                {/*    // }*/}
                                {/*    //}*/}
                                {/*>test*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    </Form>
                </div>
                {state.shouldDeleteConfirmModalOpen &&
                <ModalDeleteConfirm state={state} changeState={handleStateChange}/>}
                {state.shouldSaveWithErrorModalOpen &&
                <ModalSaveAnywayConfirm state={state} changeState={handleStateChange}/>}
            </>
        );
    }
}

export default FormBuilder;