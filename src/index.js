import React, {Component, Suspense} from 'react';
import ReactDOM from 'react-dom';
import {language, LanguageContext} from './language-context';
import LanguageTogglerButton from './language-toggle-btn';
import {SectionPageBuilder} from "./utils/CV/SectionPageBuilder";
import api from "./api";


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
            toggleLanguage: this.toggleLanguage,
            isReady: false,

            schema: null,
            data: null
        };
    }

    componentDidMount() {
        console.log("refetch")
        api.get("form/").then(res => {
            this.setState({
                    schema: res.data.formSchema,
                    data: res.data.formData ?? undefined,
                    isReady: true
                }, () => console.log("load success", this.state.schema, this.state.data)
            )
        }).catch(err => {
            console.log("loading err", err);
        })
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
        console.log("parent render")
        return (
            <Suspense fallback={<div className="App theme-light">{<div>loading...</div>}</div>}>
                <LanguageContext.Provider value={this.state}>
                    <LanguageTogglerButton pageLanguages={this.state.pageLanguages}/>
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 justify-center">
                            <div
                                className="md:col-span-6 md:col-start-4 sm:col-span-8 sm:col-start-3 col-span-10 col-start-2">
                                {this.state.isReady &&
                                <SectionPageBuilder schema={this.state.schema} data={this.state.data} language={this.state.language.language}/>}
                            </div>
                        </div>

                    </div>
                </LanguageContext.Provider>
            </Suspense>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))