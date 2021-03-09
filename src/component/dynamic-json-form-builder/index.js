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

import {
    CurrencyFieldTemplate,
    FundBundleFieldTemplate,
    FundFieldTemplate
} from "./components/FundField/FundFieldTemplates";
import {CurrencyFieldWidget, FundFieldWidget} from "./components/FundField";
import {MultiLangTextAreaFieldWidget} from './components/MultiLangField'
import MultiLangFieldTemplate from './components/MultiLangField/MultiLanFieldTemplate';
// import ObjectFieldTemplate from './components/ObjectField/ObjectFieldTemplate';
import {ReorderableArrayFieldTemplate, ArrayFieldTemplate} from './components/ArrayField/ArrayFieldTemplate';
import FileFieldTemplate from "./components/FileField/FileFieldTemplate";
import FileFieldWidget from "./components/FileField";

const customWidgets = {
    fundFieldWidget: FundFieldWidget,
    currencyFieldWidget: CurrencyFieldWidget,
    multiLangTextAreaFieldWidget: MultiLangTextAreaFieldWidget,


    stringInputWidget: StringInputWidget,
    numberInputWidget: NumberInputWidget,
    phoneInputWidget: PhoneInputWidget,
    elapsedTimeWidget:ElapsedTimeWidget,
    dateInputWidget: DateInputWidget,
    monthDayInputWidget: MonthDayInputWidget,
    yearMonthInputWidget: YearMonthInputWidget,
    yearInputWidget:YearInputWidget,


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
    /**
     * This function handle the form submit event
     * @param data
     */
    onFormSubmit = (data) => {
        this.onErrorMsgChange(null);
        this.props.onFormEditSubmit(data, this.props.formDependent);
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
            if (Array.isArray(fieldValidations)){
                fieldValidations.forEach(fieldValidation=>{
                    if (!fieldValidation.validateMethod(formData)){
                        errors[fieldName].addError(fieldValidation.getErrMsg(formData));
                    }
                })
            }else if(fieldValidations && fieldValidations.constructor === Object){
                Object.keys(fieldValidations).forEach(subFieldName=>{
                    const subFieldValidations = validations[fieldName][subFieldName];
                    if (Array.isArray(subFieldValidations)){
                        subFieldValidations.forEach(subFieldValidation=>{
                            formData[fieldName].forEach((subsection,index)=>{
                                if (!subFieldValidation.validateMethod(subsection)){
                                    errors[fieldName][index][subFieldName].addError(subFieldValidation.getErrMsg(subsection[subFieldName]));
                                }
                            })
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
                submitOnEnter={false}
                onSubmit={({formData}) => this.onFormSubmit(formData)}>
                <div className="flex mt-5">
                    <div id={`${this.props.formID}-errorMsg`}>
                    </div>
                    <div>
                        <button className="border bg-green-400 px-1 py-1 rounded mr-3"
                                type="submit">
                            {t('btn-save')}
                        </button>
                        <button className="border bg-gray-600 px-1 py-1 rounded text-white mr-20"
                                type="button"
                                onClick={() => {
                                    this.props.onFormEditCancel();
                                }}>
                            {t('btn-cancel')}
                        </button>
                        <button className="border bg-gray-300 px-1 py-1 rounded text-black"
                                type="button"
                                onClick={() => {
                                    this.props.onFormEditDelete(this.props.formDependent);
                                }}
                        >Delete
                        </button>
                    </div>
                </div>
            </Form>
        );
    }

}

export default withTranslation()(FormBuilder);