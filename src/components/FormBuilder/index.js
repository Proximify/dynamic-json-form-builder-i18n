import React, {useEffect, useState, useRef} from 'react';
import Form from "@rjsf/core";
import clone from 'clone';
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import {Menu, Transition} from "@headlessui/react";
import {tw} from "twind";
import {RiArrowDropDownLine} from 'react-icons/ri';

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
import {FormCancelBtnClass, FormClass, FormDeleteBtnClass, FormSubmitBtnClass} from "./twClass";
import {
    CurrencySelectTemplate,
    AmountInputTemplate,
    CurrencyGroupFieldTemplate
} from "./components/utils/CurrencyGroupFieldTemplate";
import HiddenFieldTemplate from "./components/HiddenField/HiddenFieldTemplate";

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
        formContext,
        multiplicity,
        handleFormSubmitRes,
        handleFormDeleteRes,
        handleFormCancel
    } = props;

    let formRef = useRef(null);

    const [state, setState] = useState({
        itemId: props.itemId,
        sectionId: props.sectionId,
        parentItemId: props.parentItemId,
        parentFieldId: props.parentFieldId,
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
        mandatoryFieldValidation: true,
        formErrors: [],
        submitType: "saveAndClose",
        loadingError: "",
        isReady: false
    })

    useEffect(() => {
        if (state.isReady)
            return;
        fetchFormSchema(state.sectionId, state.itemId, state.parentItemId, state.parentFieldId, (res) => {
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
            handleFormDelete(state, contentType, contentId, viewType, handleFormDeleteRes);
        }
    }, [state.shouldDeleteForm])

    useEffect(() => {
        if (state.shouldSubmitForm) {
            handleFormSubmit(state, contentType, contentId, viewType, handleFormSubmitRes);
        }
    }, [state.shouldSubmitForm])

    const onFormSubmit = () => {
        if (state.submitType === 'saveAndClose') {
            handleFormSubmit(state, contentType, contentId, viewType, handleFormSubmitRes);
        } else {
            handleFormSubmit(state, contentType, contentId, viewType, (response, error) => {
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
            } else if (isObject(fieldValidations)) {
                Object.keys(fieldValidations).forEach(subFieldName => {
                    const subFieldValidations = validations[fieldName][subFieldName];
                    if (Array.isArray(subFieldValidations)) {
                        subFieldValidations.forEach(subFieldValidation => {
                            if (state.formData[fieldName]) {
                                state.formData[fieldName].forEach((subsection, index) => {
                                    if (!subFieldValidation.validateMethod(subsection, state.mandatoryFieldValidation)) {
                                        errors[fieldName].addError(subFieldValidation.getErrMsg(subsection[subFieldName]))
                                        errors[fieldName][index].addError(subFieldValidation.getErrMsg(subsection[subFieldName]))
                                        if (errors[fieldName][index][subFieldName]) {
                                            errors[fieldName][index][subFieldName].addError(subFieldValidation.getErrMsg(subsection[subFieldName]));
                                        }
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
        // console.log(formData, formSchema);
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

    const SaveBtnWithOptions = () => {
        return (
            <div
                className={tw` px-5 py-2 rounded inline-flex ${isEmpty(state.formData) ? 'bg-gray-300 text-black' : 'bg-green-500 text-white active:bg-green-600'}`}>
                <button
                    className={tw`font-bold text-sm uppercase`}
                    disabled={isEmpty(state.formData)}
                    onClick={() => {
                        setState({
                            ...state,
                            submitType: "saveAndClose"
                        })
                        if (formRef)
                            formRef.submit();
                    }}>
                    Save
                </button>
                <Menu as={"div"} className={tw`${multiplicity === 'multiple' ? 'inline-block' : 'hidden'}`}>
                    {({open}) => (
                        <>
                            <div className={tw`${isEmpty(state.formData) ? 'invisible' : 'flex items-center justify-center'}`}>
                                <Menu.Button>
                                    <RiArrowDropDownLine size={"1.5rem"}/>
                                </Menu.Button>
                            </div>
                            <Transition
                                show={open}
                            >
                                <Menu.Items
                                    static
                                    className={tw`absolute w-32 mt-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg outline-none z-10`}
                                >
                                    <div className={tw`px-1 py-1`}>
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    className={tw`${
                                                        active ? "bg-blue-500 text-white" : "text-gray-900"
                                                    } w-full p-2 text-sm`}
                                                    onClick={() => {
                                                        setState({
                                                            ...state,
                                                            submitType: "saveAndClose"
                                                        })
                                                        if (formRef)
                                                            formRef.submit();
                                                    }}
                                                >
                                                    Save and Close
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    className={tw`${
                                                        active ? "bg-yellow-500 text-white" : "text-gray-900"
                                                    } w-full p-2 text-sm`}
                                                    onClick={() => {
                                                        setState({
                                                            ...state,
                                                            submitType: "saveAndAddNew"
                                                        })
                                                        if (formRef)
                                                            formRef.submit();
                                                    }}
                                                >
                                                    Save and Add New
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}

                </Menu>
            </div>
        )

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
        // console.log(state)
        // const preprocessedSchema = clone(state.formSchema);
        // formSchemaPreprocessor(preprocessedSchema);
        // console.log(state.uiSchema, state.formSchema)
        // const preprocessedData = clone(state.formData);

        // state.uiSchema[ "ui:order"]= ["end_date", "*"]
        return (
            <>
                {/*<div className={tw`w-1/5`}/>*/}
                <div
                    className={tw`bg-white pb-4`}>
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
                            setState({...state, formData: formData})
                            console.log("data changed", formData);
                        }}
                        liveValidate={!isEmpty(state.formErrors) || !state.newForm}
                        noHtml5Validate={true}
                        validate={(formData, errors) => {
                            return validation(formData, errors)
                        }}
                        onError={(errors) => {

                            let isAllMandatoryError = true;
                            errors.forEach(error => {
                                const errorMsg = error.stack;
                                if (!errorMsg.includes('is required')) {
                                    isAllMandatoryError = false;
                                }
                            })

                            setState({
                                ...state,
                                formErrors: errors,
                                shouldSaveWithErrorModalOpen: isAllMandatoryError
                            })
                        }}
                        showErrorList={false}
                        onSubmit={onFormSubmit}
                        ref={(form) => {
                            formRef = form
                        }}
                    >
                        <div className={'form-action'}>

                            <div className={'action-btn-container'}>
                                {state.formErrors && state.formErrors.length > 0 && <div className={'form-error-list'}>
                                    <ul className={'error-list'}>{getErrMsg()}</ul>
                                </div>}
                                <div className={tw`flex justify-between`}>
                                    <div>
                                        {SaveBtnWithOptions()}
                                        <button
                                            className={tw`${FormCancelBtnClass}`}
                                            type="button"
                                            onClick={() => {
                                                handleFormCancel();
                                            }}>
                                            Cancel
                                        </button>
                                    </div>
                                    {/*<button className={tw`${FormSubmitBtnClass}`}*/}
                                    {/*        onClick={() => {*/}
                                    {/*            formRef.submit();*/}
                                    {/*        }}>Save*/}
                                    {/*</button>*/}
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


                            </div>
                        </div>
                    </Form>
                </div>
                {/*<div className={tw`w-1/5 p-5 mt-1`}>*/}
                {/*    <input type={"radio"} checked={!state.mandatoryFieldValidation} className={tw``}*/}
                {/*           onChange={() => {*/}
                {/*           }}*/}
                {/*           onClick={() => {*/}
                {/*               setState({*/}
                {/*                   ...state,*/}
                {/*                   mandatoryFieldValidation: !state.mandatoryFieldValidation*/}
                {/*               })*/}
                {/*           }}*/}
                {/*    /> Allow saving without required fields*/}
                {/*</div>*/}
                {state.shouldDeleteConfirmModalOpen &&
                <ModalDeleteConfirm state={state} changeState={handleStateChange}/>}
                {state.shouldSaveWithErrorModalOpen &&
                <ModalSaveAnywayConfirm state={state} changeState={handleStateChange}/>}
            </>
        );
    }
}

export default FormBuilder;