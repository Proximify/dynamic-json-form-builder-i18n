import React, {Component, Suspense} from 'react';
import ReactDOM from 'react-dom';
import {language, LanguageContext} from './language-context';
import LanguageTogglerButton from './language-toggle-btn';
import {SectionPageBuilder} from "./components/SectionPageBuilder";
import api, {fetchCVSchema} from "./components/SectionPageBuilder/helper/api";
import SchemaParser from "./components/SchemaParser";
import axios from "axios";
import {css} from 'styled-components/macro'
import tw, {theme} from 'twin.macro'

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
            rawError: null,
            formSchema: null
        };
        // this.fetchFormSchema = this.fetchFormSchema.bind(this);
        // this.fetchLovOptions = this.fetchLovOptions.bind(this);
    }

    // http://127.0.0.1:8000/profiles.php?action=edit&editable=true&contentType=members&contentId=1&viewType=cv&section=2&itemId=2&parentItemId=1&parentFieldId=46
    componentDidMount() {
        fetchCVSchema(this.state, (newState) => {
            this.setState(newState)
        })
        // api.get("profiles.php?action=display&editable=true&contentType=members&contentId=1&viewType=cv&withFormat=true", {
        //     headers: {'Content-Type': 'application/json'}
        // }).then(res => {
        //     this.setState({...this.state, schema: res.data, isReady: true})
        //     console.log("load success", res)
        // }).catch(err => {
        //     this.setState({...this.state, isReady: false, rawError: err})
        //     console.log("loading err", err);
        // })
    }

    // fetchFormSchema(section, itemId, parentItemId, parentFieldId, callback) {
    //     const url = `profiles.php?action=edit&editable=true&contentType=members&contentId=1&viewType=cv${section !== null ? '&section=' + section : ""}${itemId !== null ? '&itemId=' + itemId : ""}${parentItemId !== null ? '&parentItemId=' + parentItemId : ""}${parentFieldId !== null ? '&parentFieldId=' + parentFieldId : ""}`;
    //     api.get(url, {
    //         headers: {'Content-Type': 'application/json'}
    //     }).then(res => {
    //         console.log("fetch single schema success:", res);
    //         callback(res.data)
    //     }).catch(err => {
    //         console.error("fetch single schema err:", err);
    //     })
    // }
    //
    // fetchLovOptions(subtypeIds, callback) {
    //     const urlTemplate = 'profiles.php?action=subtypeOptions&contentType=members&subtypeId=';
    //     const urls = []
    //     subtypeIds.forEach(id => {
    //         if (Array.isArray(id)) {
    //             urls.push(api.get(`${urlTemplate}${id[0]}&dependencies=${id[0].replaceAll(',', '%2C')}`))
    //         } else {
    //             urls.push(api.get(`${urlTemplate}${id}`))
    //         }
    //     })
    //     axios.all(urls).then(axios.spread((...responses) => {
    //         const res = {};
    //         subtypeIds.forEach((subtypeId, index) => {
    //             res[Array.isArray(subtypeId) ? subtypeId[0] : subtypeId] = responses[index].data;
    //         })
    //         callback(res);
    //     })).catch(err => {
    //         console.log(err)
    //     })
    // }

    render() {
        if (!this.state.isReady) {
            return <div>loading...</div>
        }
        return (
            <LanguageContext.Provider value={this.state}>
                <LanguageTogglerButton pageLanguages={this.state.pageLanguages}/>
                <div css={[tw`flex justify-center bg-gray-200 pt-3`]}>
                    <div
                        css={"background: white; max-width: 40rem"}>
                        {this.state.isReady &&
                        <SectionPageBuilder
                            schema={SchemaParser(this.state.schema)}
                            language={this.state.language.language}
                        />}
                        {this.state.rawError && <div>{JSON.stringify(this.state.rawError)}</div>}
                    </div>
                </div>
            </LanguageContext.Provider>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));