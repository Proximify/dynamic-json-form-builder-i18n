import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {SectionPageBuilder} from "./components/SectionPageBuilder";
import {setup, tw} from 'twind';

// setup({
//     theme: {
//         "colors": {
//             "color-primary": "#26a0f1",
//             "color-secondary": "#9b6904",
//             "color-info": "#36c",
//             "color-action": "#c66216",
//             "color-transparent": "#ffffff",
//             "color-warning": "#ff0000",
//             "color-revert": "#cdcdcd",
//             "color-confirm": "#1d3b79"
//         },
//         "fontFamily": {
//             "title": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
//             "TopSectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
//             "SectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif"
//         },
//         "fontSize": {
//             "title": "15px",
//             "TopSectionLabel": "15px",
//             "SectionLabel": "16px"
//         }
//     }
// })


class App extends Component {
    constructor(props) {
        super(props);
        // setup({
        //     theme: {
        //         "colors": {
        //             "color-primary": "#26a0f1",
        //             "color-secondary": "#9b6904",
        //             "color-info": "#36c",
        //             "color-action": "#c66216",
        //             "color-transparent": "#ffffff",
        //             "color-warning": "#ff0000",
        //             "color-revert": "#cdcdcd",
        //             "color-confirm": "#1d3b79"
        //         },
        //         "fontFamily": {
        //             "title": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
        //             "TopSectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
        //             "SectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif"
        //         },
        //         "fontSize": {
        //             "title": "15px",
        //             "TopSectionLabel": "15px",
        //             "SectionLabel": "16px"
        //         }
        //     }
        // })
        // this.toggleLanguage = (value) => {
        //     console.log(language[value]);
        //
        //     this.setState({
        //         language: language[value]
        //     });
        //     document.documentElement.lang = language[value].language.toLowerCase();
        // };
        //
        // this.state = {
        //     language: language.EN,
        //     pageLanguages: ["EN", "FR", "SP"],
        //     toggleLanguage: this.toggleLanguage,
        // };
    }



    render() {

        return (
            // <button className={tw`bg-color-primary`}>btn</button>

            // <LanguageContext.Provider value={this.state}>
            //     <LanguageTogglerButton pageLanguages={this.state.pageLanguages}/>
                <div>
                    <div>
                        <SectionPageBuilder
                            language={"EN"}
                        />
                    </div>
                </div>
            // </LanguageContext.Provider>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));