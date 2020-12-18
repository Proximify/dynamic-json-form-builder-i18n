import React, {Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {language, LanguageContext} from './language-context';
import LanguageTogglerButton from './language-toggle-btn';
import 'bootstrap/dist/css/bootstrap.css';
import Form from './component/dynamic-json-form-builder/index';
import ModalStyle from './ModalStyles.json';
import api from "./api";
import style from "./style.module.scss";

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleLanguage = (value) => {
            console.log(language[value]);

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
                    <div className={"container"}>
                        <div className={"row d-flex justify-content-center"}>
                            <div className={"col-xl-8 col-lg-6 col-md-7 col-sm-10 col-12"}>
                        <Form
                            formID={"user-profile-form"}
                            resourceURL={"form/"}
                            validationDeclaration={this.validationDeclaration}
                            HTTPMethod={"PATCH"}
                            language={ this.state.language.language}
                            formContext={{
                                api: api,
                                style: style,
                                modalStyle: ModalStyle
                            }}
                        />
                            </div>
                        </div>
                    </div>
                </LanguageContext.Provider>
            </Suspense>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))