import React, {Component} from 'react';
import Form from "@rjsf/core";
import './i18n';
import './index.css';
import {withTranslation} from 'react-i18next';

import GenericFieldTemplate from './components/utils/GenericFieldTemplate';
import {
    NumberInputWidget,
    StringInputWidget,
    PhoneInputWidget,
    ElapsedTimeWidget,
    DateInputWidget,
    MonthDayInputWidget,
    YearMonthInputWidget,
    YearInputWidget
} from "./components/SingleField";
import {
    SingleSelectionWidget,
    MultiColSelectionWidget,
    SingleLargeSelectionWidget,
    MultiColLargeSelectionWidget, DOBSelectionWidget
} from "./components/SelectionField";
import HiddenFieldTemplate from "./components/HiddenField/HiddenFieldTemplate";
import HiddenFieldWidget from "./components/HiddenField";

import {CurrencyFieldWidget, FundFieldWidget} from "./components/FundField";
import {MultiLangFieldWidget} from './components/MultiLangField'
import {ReorderableArrayFieldTemplate, ArrayFieldTemplate} from './components/ArrayField/ArrayFieldTemplate';
import {ModalConfirm} from "./components/utils/Modals";

const customWidgets = {
    fundFieldWidget: FundFieldWidget,
    currencyFieldWidget: CurrencyFieldWidget,
    multiLangFieldWidget: MultiLangFieldWidget,


    stringInputWidget: StringInputWidget,
    numberInputWidget: NumberInputWidget,
    phoneInputWidget: PhoneInputWidget,
    elapsedTimeWidget: ElapsedTimeWidget,
    dateInputWidget: DateInputWidget,
    monthDayInputWidget: MonthDayInputWidget,
    yearMonthInputWidget: YearMonthInputWidget,
    yearInputWidget: YearInputWidget,


    singleSelectionWidget: SingleSelectionWidget,
    multiColSelectionWidget: MultiColSelectionWidget,
    singleLargeSelectionWidget: SingleLargeSelectionWidget,
    multiColLargeSelectionWidget: MultiColLargeSelectionWidget,
    dobSelectionWidget: DOBSelectionWidget,

    hiddenFieldWidget: HiddenFieldWidget
};

const customTemplates = {
    genericFieldTemplate: GenericFieldTemplate,
    hiddenFieldTemplate: HiddenFieldTemplate
}

const customArrayTemplate = {
    reorderableArrayFieldTemplate: ReorderableArrayFieldTemplate,
    arrayFieldTemplate: ArrayFieldTemplate
}

class FormBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {shouldDeleteConfirmModalOpen: false, shouldDeleteForm: false};
        this.handleStateChange = this.handleStateChange.bind(this);
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
    }

    /**
     * This function handle the form submit event
     * @param data
     */
    onFormSubmit = (data) => {
        this.onErrorMsgChange(null);
        this.props.onFormEditSubmit(data, this.props.formDependent);
    }

    componentDidUpdate() {
        if (this.state.shouldDeleteForm){
            this.props.onFormEditDelete(this.props.formDependent)
        }
    }

    _handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    handleStateChange(newState) {
        this.setState(newState);
    }

    onErrorMsgChange = (errors) => {
        const errorMsgDiv = document.getElementById(`${this.props.formID}-errorMsg`);
        if (!errorMsgDiv)
            return;
        if (errors) {
            const errorList = errors.map(err => Object.values(err));
            errorList.forEach(err => {
                console.log(err)
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

    validation = (formData, errors) => {
        // console.log(this.props.validations);
        const validations = this.props.validations;
        Object.keys(validations).forEach(fieldName => {
            const fieldValidations = validations[fieldName];
            if (Array.isArray(fieldValidations)) {
                fieldValidations.forEach(fieldValidation => {
                    if (!fieldValidation.validateMethod(formData)) {
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
                                    if (!subFieldValidation.validateMethod(subsection)) {
                                        errors[fieldName][index][subFieldName].addError(subFieldValidation.getErrMsg(subsection[subFieldName]));
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

        // if (formData.sex && JSON.stringify(formData.sex) !== JSON.stringify(["1038", "Male"])){
        //     errors.sex.addError("sex don't male");
        // }
        // formData.country_of_citizenship.forEach((subsection,index) => {
        //     console.log(subsection)
        //     if (subsection.country_of_citizenship && JSON.stringify(subsection.country_of_citizenship) !== JSON.stringify(["12", "American Samoa"])){
        //         errors.country_of_citizenship[index].addError("not america");
        //     }
        // })

        return errors;
    }

    render() {
        // const {isLoaded, loadingError, FormSchema, FormData, FormContext, FormID, validation} = this.state;
        const {t, i18n} = this.props;

        if (this.props.language && i18n.language !== this.props.language.toLowerCase()) {
            i18n.changeLanguage(this.props.language.toLowerCase());
        }
        // console.log(this.props.formData)
        return (
            <>
                <Form
                    id={this.props.formID ?? null}
                    schema={this.props.formSchema ?? undefined}
                    uiSchema={this.props.uiSchema ?? undefined}
                    formData={this.props.formData ?? undefined}
                    formContext={
                        {...this.props.formContext, submitAction: this.onSubmit} ?? undefined
                    }
                    widgets={customWidgets}
                    showErrorList={false}
                    liveValidate
                    onChange={({formData}) => {
                        console.log("data changed", formData)
                    }}
                    validate={this.validation}
                    // noValidate={true}
                    onError={(errors) => {
                        this.onErrorMsgChange(errors);
                    }}
                    onSubmit={({formData}) => this.onFormSubmit(formData)}>
                    <div className="my-4 mb-20 mx-1.5">
                        <div id={`${this.props.formID}-errorMsg`}>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <button className="py-1 px-2 border bg-red-500 rounded text-white"
                                        type="button"
                                        onClick={() => {
                                            // this.props.onFormEditDelete(this.props.formDependent);
                                            this.setState({shouldDeleteConfirmModalOpen: true})
                                        }}
                                >Delete
                                </button>
                            </div>
                            <div>
                                <button className="py-1 px-2 mr-4 border bg-gray-300 rounded text-black"
                                        type="button"
                                        onClick={() => {
                                            this.props.onFormEditCancel();
                                        }}>
                                    {t('btn-cancel')}
                                </button>
                                <button className="py-1 px-2 border bg-green-400 rounded"
                                        type="submit">
                                    {t('btn-save')}
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
                {this.state.shouldDeleteConfirmModalOpen &&
                <ModalConfirm state={this.state} changeState={this.handleStateChange}/>}
            </>
        );
    }
}

export default withTranslation()(FormBuilder);