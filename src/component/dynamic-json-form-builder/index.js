import React, {Component} from 'react';
import Form from "@rjsf/core";
// import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
import './i18n';
import './index.css';
import {withTranslation} from 'react-i18next';

import {
    MultiColSelectorWidget,
    PhoneNumInputWidget,
    SingleSelectWidget,
    // TextInputWidget,
    WindowedSelectorWidget,
    FileInputWidget
} from "./widgets/CustomWidgets";
import {
    CustomFieldTemplate,
    CustomArrayFieldTemplate,
    CustomUploadFieldTemplate,
    BundleFieldTemplate
} from "./templates/CustomTemplates";
import generateUISchema from "./service/UISchemaGenerator";
import formValidatorGenerator from './service/formValidatorGenerator';
import {MultiLangTextInputWidget} from './widgets/MultiLangTextInputWidget'
import {MultiLangRichTextAreaWidget} from "./widgets/MultiLangRichTextAreaWidget";

import {ModalFieldTemplate} from "./templates/ModalFieldTemplate";

import GenericFieldTemplate from './components/utils/GenericFieldTemplate';
import SingleFieldWidget from "./components/SingleField";
import SelectionFieldWidget from "./components/SelectionField";
import {FundBundleFieldTemplate,FundFieldTemplate,CurrencyFieldTemplate} from "./components/FundField/template";
import {FundFieldWidget, CurrencyFieldWidget} from "./components/FundField/widget";

const customWidgets = {
    multiColSelectorWidget: MultiColSelectorWidget,
    windowedSelectorWidget: WindowedSelectorWidget,
    multiLangTextInputWidget: MultiLangTextInputWidget,
    multiLangRichTextAreaWidget: MultiLangRichTextAreaWidget,
    singleSelectWidget: SingleSelectWidget,
    fileInputWidget: FileInputWidget,
    phoneNumInputWidget:PhoneNumInputWidget,
    fundFieldWidget:FundFieldWidget,
    currencyFieldWidget:CurrencyFieldWidget,

    singleFieldWidget: SingleFieldWidget,
    selectionFieldWidget:SelectionFieldWidget
};

const customTemplates = {
    fieldTemplate: CustomFieldTemplate,
    arrayFieldTemplate: CustomArrayFieldTemplate,
    uploadFieldTemplate: CustomUploadFieldTemplate,
    bundleFieldTemplate: BundleFieldTemplate,
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
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "multiLangTextInputWidget"
    },
    "signature": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "singleFieldWidget"
    },
    "education": {
        "ui:ArrayFieldTemplate": ModalFieldTemplate,
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
        "ui:FieldTemplate": customTemplates["uploadFieldTemplate"],
        "ui:widget": "fileInputWidget"
    },
    "work-experience": {
        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        "ui:widget": "multiLangRichTextAreaWidget"
    },
    "bundle-field": {
        "ui:ObjectFieldTemplate": customTemplates["bundleFieldTemplate"]
        // "BDL-field1":{
        //     "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        //     "ui:widget": "singleFieldWidget"
        // },
        // "BDL-field2":{
        //     "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        //     "ui:widget": "singleSelectWidget",
        //     "ui:emptyValue": ""
        // },
        // "BDL-field3":{
        //     "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
        //     "ui:widget": "singleFieldWidget"
        // }
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
                    uiSchema={uiSchema}
                    formData={FormData}
                    formContext={
                        this.props.formContext ?? null
                    }
                    widgets={customWidgets}
                    showErrorList={false}
                    liveValidate
                    onChange={() => {
                        console.log("data changed")
                    }}
                    validate={validation}
                    onError={(errors) => {
                        this.onErrorMsgChange(errors);
                    }}
                    onSubmit={({formData}) => this.onFormSubmit(formData)}>
                    <div className={"container"}>
                        <div id={`${FormID}-errorMsg`}>
                        </div>
                        <div>
                            <button className={"btn btn-info"}
                                    type="submit">
                                {t('btn-submit')}
                            </button>
                            <button className={"btn btn-secondary ml-3"}
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