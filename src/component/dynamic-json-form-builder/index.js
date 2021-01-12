import React, {Component} from 'react';
import Form from "@rjsf/core";
import './i18n';
import './index.css';
import {withTranslation} from 'react-i18next';
import formValidatorGenerator from './service/formValidatorGenerator';

import GenericFieldTemplate from './components/utils/GenericFieldTemplate';
import SingleFieldWidget from "./components/SingleField";
import SelectionFieldWidget from "./components/SelectionField";
import {CurrencyFieldTemplate, FundBundleFieldTemplate, FundFieldTemplate} from "./components/FundField/templates";
import {CurrencyFieldWidget, FundFieldWidget} from "./components/FundField/widgets";
import {MultiLangFieldWidget, MultiLangTextAreaFieldWidget} from './components/MultiLangField'
import MultiLangFieldTemplate from './components/MultiLangField/template';
// import ObjectFieldTemplate from './components/ObjectField/ObjectFieldTemplate';
import ArrayFieldTemplate from './components/ArrayField/ArrayFieldTemplate';
import FileFieldTemplate from "./components/FileField/FileFieldTemplate";
import FileFieldWidget from "./components/FileField";

const customWidgets = {
    fundFieldWidget:FundFieldWidget,
    currencyFieldWidget:CurrencyFieldWidget,
    multiLangFieldWidget: MultiLangFieldWidget,
    singleFieldWidget: SingleFieldWidget,
    selectionFieldWidget:SelectionFieldWidget
};

const customTemplates = {
    fundBundleFieldTemplate: FundBundleFieldTemplate,
    fundFieldTemplate:FundFieldTemplate,
    currencyFieldTemplate:CurrencyFieldTemplate,
    genericFieldTemplate:GenericFieldTemplate
}

/**
 * This is a sample UI schema
 */
const uiSchema = {
    "name": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "singleFieldWidget"
    },
    "email": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "singleFieldWidget"
    },
    "age": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "singleFieldWidget"
    },
    "gender": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "selectionFieldWidget",
        "ui:emptyValue": ""
    },
    "phone": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "singleFieldWidget"
    },
    "hobby": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "selectionFieldWidget",
        "ui:emptyValue": ""
    },
    "comment": {
        "ui:FieldTemplate": MultiLangFieldTemplate,
        "ui:widget": "multiLangFieldWidget"
    },
    "signature": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "singleFieldWidget"
    },
    "education": {
        "ui:ArrayFieldTemplate": ArrayFieldTemplate,
        "items": {
            "degree": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget",
                "ui:emptyValue": ""
            },
            "institution": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget",
                "ui:emptyValue": ""
            }
        }
    },
    "resume": {
        "ui:FieldTemplate": FileFieldTemplate,
        "ui:widget": FileFieldWidget
    },
    "work-experience": {
        "ui:FieldTemplate": MultiLangFieldTemplate,
        "ui:widget": MultiLangTextAreaFieldWidget
    },
    "address": {
        "ui:ArrayFieldTemplate": ArrayFieldTemplate,
        "items": {
            "street-number":{
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleFieldWidget"
            },
            "street-name":{
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleFieldWidget"
            },
            "country":{
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            }
        }
    },
    "funding-bundle": {
        "ui:ObjectFieldTemplate": customTemplates["fundBundleFieldTemplate"],
        "converted-funding":{
            "ui:widget":"hidden"
        },
        "funding": {
            "ui:FieldTemplate": customTemplates["fundFieldTemplate"],
            "ui:widget": "fundFieldWidget"
        },
        "currency":{
            "ui:FieldTemplate": customTemplates["currencyFieldTemplate"],
            "ui:widget": "currencyFieldWidget"
        }
    }
};


const UISchema = {
    "personal_information": {
        "identification":{
            "ui:ArrayFieldTemplate": ArrayFieldTemplate,
            "items":{
                "title":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "selectionFieldWidget",
                    "ui:emptyValue": ""
                },
                "family_name":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "singleFieldWidget"
                },
                "first_name":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "singleFieldWidget"
                },
                "middle_name":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "singleFieldWidget"
                },
                "previous_family_name":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "singleFieldWidget"
                },
                "previous_first_name":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "singleFieldWidget"
                },
                "date_of_birth":{

                },
                "sex":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "selectionFieldWidget",
                    "ui:emptyValue": ""
                },
                "designated_group":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "selectionFieldWidget",
                    "ui:emptyValue": ""
                },
                "correspondence_language":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "selectionFieldWidget",
                    "ui:emptyValue": ""
                },
                "canadian_residency_status":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "selectionFieldWidget",
                    "ui:emptyValue": ""
                },
                "applied_for_permanent_residency":{
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "selectionFieldWidget",
                    "ui:emptyValue": ""
                },
                "permanent_residency_start_date": {
                    "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                    "ui:widget": "singleFieldWidget"
                },
                "country_of_citizenship":{
                    "ui:ArrayFieldTemplate": ArrayFieldTemplate,
                    "items":{
                        "country_of_citizenship":{
                            "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                            "ui:widget": "selectionFieldWidget",
                            "ui:emptyValue": ""
                        }
                    }
                }
            }
        }
    }
}







class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            loadingError: null,
            FormSchema: null,
            FormData: undefined,
            FormContext: this.props.formContext,
            FormID: null,
            validation: null,
            HTTPMethod: null
        };
    }

    componentDidMount() {
        if (!this.props.resourceURL) {
            this.setState({
                isLoaded: true,
                loadingError: "No form resource url provided"
            })
        } else if (!this.props.HTTPMethod || (this.props.HTTPMethod.toLowerCase() !== "post" && this.props.HTTPMethod.toLowerCase() !== "put" && this.props.HTTPMethod.toLowerCase() !== "patch")) {
            this.setState({
                isLoaded: true,
                loadingError: `No/Invalid HTTP method provided, expect 'POST','PUT','PATCH', given: ${this.props.HTTPMethod ?? "nothing"}`
            })
        } else if (!this.props.formContext.hasOwnProperty('api')) {
            this.setState({
                isLoaded: true,
                loadingError: `No API/Base URL provided`
            })
        } else {
            this.state.FormContext.api.get(this.props.resourceURL).then(res => {
                const validationDeclaration = this.props.validationDeclaration;
                this.setState({
                    isLoaded: true,
                    FormSchema: res.data.formSchema,
                    FormData: res.data.formData ?? undefined,
                    FormID: this.props.formID ?? "form",
                    validation: function (formData, errors) {
                        formValidatorGenerator(res.data.formSchema, formData, errors, validationDeclaration);
                        return errors;
                    },
                    HTTPMethod: this.props.HTTPMethod,
                })
            }).catch(err => {
                this.setState({
                    isLoaded: true,
                    loadingError: err.message
                })
            })
        }
    }

    /**
     * This function handle the form submit event
     * @param data
     */
    onFormSubmit = (data) => {
        console.log(data);
        this.onErrorMsgChange(null);

        console.log("submitting");

        this.state.FormContext.api[this.state.HTTPMethod.toLowerCase()](this.props.resourceURL + 'submit', data)
            .then(res => {
                console.log(res);
            }).catch(err => {
            console.log(err);
        })
        this.forceUpdate();
    }

    onErrorMsgChange = (errors) => {
        const errorMsgDiv = document.getElementById(`${this.state.FormID}-errorMsg`);
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

    render() {
        const {isLoaded, loadingError, FormSchema, FormData, FormContext, FormID, validation} = this.state;
        const {t, i18n} = this.props;
        if (loadingError) {
            return <h3>Loading Error: {loadingError}</h3>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (this.props.language && i18n.language !== this.props.language.toLowerCase()) {
                i18n.changeLanguage(this.props.language.toLowerCase());
            }
            // console.log((uiSchema));
            // console.log((generateUISchema(FormSchema)))
            // console.log(_.isEqual(uiSchema,generateUISchema(FormSchema)))
            return (
                <Form
                    id={FormID}
                    schema={FormSchema}
                    // uiSchema={generateUISchema(FormSchema)}
                    uiSchema={UISchema}
                    formData={FormData}
                    formContext={
                        {...this.props.formContext, submitAction:this.onSubmit} ?? null
                    }
                    widgets={customWidgets}
                    showErrorList={false}
                    // liveValidate
                    onChange={() => {
                        console.log("data changed")
                    }}
                    // validate={validation}
                    onError={(errors) => {
                        this.onErrorMsgChange(errors);
                    }}
                    onSubmit={({formData}) => this.onFormSubmit(formData)}>
                    <div className="flex">
                        <div id={`${FormID}-errorMsg`}>
                        </div>
                        <div>
                            <button className="border bg-green-400 w-20 h-9 rounded mr-3"
                                    type="submit">
                                {t('btn-submit')}
                            </button>
                            <button className="border bg-gray-600 w-20 h-9 rounded text-white"
                                    type="button">
                                {t('btn-cancel')}
                            </button>
                        </div>
                    </div>
                </Form>
            );
        }
    }
}

export default withTranslation()(Index);