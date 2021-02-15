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
    DateInputWidget,
    MonthDayInputWidget,
    YearMonthInputWidget
} from "./components/SingleField";
import {
    SingleSelectionWidget,
    MultiColSelectionWidget,
    SingleLargeSelectionWidget,
    MultiColLargeSelectionWidget, DOBSelectionWidget
} from "./components/SelectionField";
import HiddenFieldTemplate from "./components/HiddenField/HiddenFieldTemplate";
import HiddenFieldWidget from "./components/HiddenField";

import {CurrencyFieldTemplate, FundBundleFieldTemplate, FundFieldTemplate} from "./components/FundField/FundFieldTemplates";
import {CurrencyFieldWidget, FundFieldWidget} from "./components/FundField";
import {MultiLangFieldWidget, MultiLangTextAreaFieldWidget} from './components/MultiLangField'
import MultiLangFieldTemplate from './components/MultiLangField/template';
// import ObjectFieldTemplate from './components/ObjectField/ObjectFieldTemplate';
import {ReorderableArrayFieldTemplate, ArrayFieldTemplate} from './components/ArrayField/ArrayFieldTemplate';
import FileFieldTemplate from "./components/FileField/FileFieldTemplate";
import FileFieldWidget from "./components/FileField";

const customWidgets = {
    fundFieldWidget: FundFieldWidget,
    currencyFieldWidget: CurrencyFieldWidget,
    multiLangFieldWidget: MultiLangFieldWidget,
    multiLangTextAreaFieldWidget:MultiLangTextAreaFieldWidget,


    stringInputWidget: StringInputWidget,
    numberInputWidget: NumberInputWidget,
    phoneInputWidget: PhoneInputWidget,
    dateInputWidget:DateInputWidget,
    monthDayInputWidget:MonthDayInputWidget,
    yearMonthInputWidget:YearMonthInputWidget,


    singleSelectionWidget: SingleSelectionWidget,
    multiColSelectionWidget: MultiColSelectionWidget,
    singleLargeSelectionWidget: SingleLargeSelectionWidget,
    multiColLargeSelectionWidget: MultiColLargeSelectionWidget,
    dobSelectionWidget: DOBSelectionWidget,

    hiddenFieldWidget:HiddenFieldWidget
};

const customTemplates = {
    genericFieldTemplate: GenericFieldTemplate,
    hiddenFieldTemplate:HiddenFieldTemplate
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
        // if (formData.ca !== "dep"){
        //     errors.department.addError("Passwords don't match");
        // }

        return errors;
    }

    render() {
        // const {isLoaded, loadingError, FormSchema, FormData, FormContext, FormID, validation} = this.state;
        const {t, i18n} = this.props;

        if (this.props.language && i18n.language !== this.props.language.toLowerCase()) {
            i18n.changeLanguage(this.props.language.toLowerCase());
        }
        // console.log(this.props.formSchema, this.props.formData)
        return (
            <Form
                id={this.props.formID ?? null}
                schema={this.props.formSchema ?? null}
                uiSchema={this.props.uiSchema ?? null}
                formData={this.props.formData ?? null}
                formContext={
                    {...this.props.formContext, submitAction: this.onSubmit} ?? null
                }
                widgets={customWidgets}
                showErrorList={false}
                // liveValidate
                onChange={({formData}) => {
                    console.log("data changed",formData)
                }}
                // validate={this.validation}
                onError={(errors) => {
                    this.onErrorMsgChange(errors);
                }}
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