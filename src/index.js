import React, {Component, Suspense} from 'react';
import ReactDOM from 'react-dom';
import {language, LanguageContext} from './language-context';
import LanguageTogglerButton from './language-toggle-btn';
import {SectionPageBuilder} from "./utils/CV/SectionPageBuilder";
import api from "./api";
import SchemaParser from "./utils/CV/SchemaParser";
import axios from "axios";

// if (navigator.serviceWorker) {
//     console.log("service worker supported");
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('sw_cv_schemaParser.js').then(reg => console.log("Registered")).catch(err => console.log("Register Error", err));
//     })
// }

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
            data: null,
            rawError: null,
            formSchema: null
        };
        this.fetchFormSchema = this.fetchFormSchema.bind(this);
        this.fetchLovOptions = this.fetchLovOptions.bind(this);
    }

    // http://127.0.0.1:8000/profiles.php?action=edit&editable=true&contentType=members&contentId=1&viewType=cv&section=2&itemId=2&parentItemId=1&parentFieldId=46
    componentDidMount() {
        api.get("profiles.php?action=display&editable=true&contentType=members&contentId=1&viewType=cv&withFormat=true", {
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            this.setState({...this.state, schema: res.data, isReady: true})
            console.log("load success", res)
        }).catch(err => {
            this.setState({...this.state, isReady: false, rawError: err})
            console.log("loading err", err);
        })
    }

    fetchFormSchema(section, itemId, parentItemId, parentFieldId, callback) {
        const url = `profiles.php?action=edit&editable=true&contentType=members&contentId=1&viewType=cv${section ? '&section=' + section : ""}${itemId ? '&itemId=' + itemId : ""}${parentItemId ? '&parentItemId=' + parentItemId : ""}${parentFieldId ? '&parentFieldId=' + parentFieldId : ""}`;
        api.get(url, {
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            console.log("fetch single schema success:", res);
            callback(res.data)
        }).catch(err => {
            console.error("fetch single schema err:", err);
        })
    }

    fetchLovOptions(subtypeIds, callback) {
        const urlTemplate = 'profiles.php?action=subtypeOptions&contentType=members&subtypeId=';
        const urls = []
        subtypeIds.forEach(id => {
            if (Array.isArray(id)) {
                urls.push(api.get(`${urlTemplate}${id[0]}&dependencies=${id[0].replaceAll(',', '%2C')}`))
            } else {
                urls.push(api.get(`${urlTemplate}${id}`))
            }
        })
        axios.all(urls).then(axios.spread((...responses) => {
            const res = {};
            subtypeIds.forEach((subtypeId, index) => {
                res[Array.isArray(subtypeId) ? subtypeId[0] : subtypeId] = responses[index].data;
            })
            callback(res);
        })).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Suspense fallback={<div className="App theme-light">{<div>loading...</div>}</div>}>
                <LanguageContext.Provider value={this.state}>
                    <LanguageTogglerButton pageLanguages={this.state.pageLanguages}/>
                    <div className="bg-white py-4">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-10">
                                <div
                                    className="md:col-span-5 md:col-start-4 sm:col-span-8 sm:col-start-2 col-span-10 col-start-1">
                                    {this.state.isReady &&
                                    <SectionPageBuilder
                                        schema={SchemaParser(this.state.schema)}
                                        data={this.state.data}
                                        language={this.state.language.language}
                                        fetchFormSchema={this.fetchFormSchema}
                                        fetchLovOptions={this.fetchLovOptions}
                                    />}
                                    {this.state.rawError && <div>{JSON.stringify(this.state.rawError)}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </LanguageContext.Provider>
            </Suspense>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));