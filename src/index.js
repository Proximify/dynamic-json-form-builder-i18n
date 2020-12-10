import React, {Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {language, LanguageContext} from './language-context';
import LanguageTogglerButton from './language-toggle-btn';
import 'bootstrap/dist/css/bootstrap.css';
import Form from './component/dynamic-json-form-builder';
import ModalStyle from './ModalStyles.json';
import api from "./api";
import style from "./style.module.scss";
import { I18nextProvider } from "react-i18next";
import i18n from './component/dynamic-json-form-builder/i18n';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleLanguage = (value) => {
            console.log(language[value]);

            i18n.changeLanguage(language[value].language.toLowerCase());

            this.setState({
                language: language[value]
            });
            document.documentElement.lang = language[value].language.toLowerCase();
        };

        this.state = {
            language: language.EN,
            pageLanguages: ["EN", "FR", "SP"],
            toggleLanguage: this.toggleLanguage
        };
    }

    validationMethods = {
        requiredField: (value) => {
            return value ? null : "is a required property";
        },
        emailField: (value) => {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !value ? null : (re.test(value) ? null : "is not a valid email");
        },
        customTestFiled: (value) => {
            return !value ? null : (value === "test" ? null : "is not valid");
        },
        fileFieldSizeLimit: (value) => {
            return !value ? null : (value < 100 ? null : "is too large");
        }
    }

    validationDeclaration = {
        name: this.validationMethods["requiredField"],
        email: this.validationMethods["emailField"],
        signature: this.validationMethods["customTestFiled"],
        age: this.validationMethods["fileFieldSizeLimit"]
    }

    render() {
        return (
            <Suspense fallback={<div className="App theme-light">{<div>loading...</div>}</div>}>
                <LanguageContext.Provider value={this.state}>
                    <LanguageTogglerButton pageLanguages={this.state.pageLanguages}/>

                        <Form
                            formID={"user-profile-form"}
                            resourceURL={"form/"}
                            validationDeclaration={this.validationDeclaration}
                            HTTPMethod={"PATCH"}
                            formContext={{
                                api: api,
                                globalContext: {language, LanguageContext},
                                style: style,
                                modalStyle: ModalStyle
                            }}
                        />
                </LanguageContext.Provider>
            </Suspense>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))