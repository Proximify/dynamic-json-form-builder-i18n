import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {language, LanguageContext} from './language-context';
import LanguageTogglerButton from './language-toggle-btn';
import {SectionPageBuilder} from "./components/SectionPageBuilder";
import {css} from 'styled-components/macro'
import tw from 'twin.macro'
import './main.css'

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
        };
    }

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                <LanguageTogglerButton pageLanguages={this.state.pageLanguages}/>
                <div css={[tw`flex justify-center bg-gray-200 pt-3`]}>
                    <div
                        css={"background: white; max-width: 40rem"}>
                        <SectionPageBuilder
                            language={this.state.language.language}
                        />
                    </div>
                </div>
            </LanguageContext.Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));