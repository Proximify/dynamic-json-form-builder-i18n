import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {SectionPageBuilder} from "./components/SectionPageBuilder";
import {setup} from 'twind';

// setup({
//     theme: {
//         extend: {
//             "colors": {
//                 "color-primary": "#26a0f1",
//                 "color-secondary": "#9b6904",
//                 "color-info": "#36c",
//                 "color-action": "#c66216",
//                 "color-transparent": "#ffffff",
//                 "color-warning": "#ff0000",
//                 "color-revert": "#cdcdcd",
//                 "color-confirm": "#1d3b79"
//             },
//             "fontFamily": {
//                 "title": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
//                 "TopSectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
//                 "SectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif"
//             },
//             "fontSize": {
//                 "title": "15px",
//                 "TopSectionLabel": "15px",
//                 "SectionLabel": "16px"
//             }
//         }
//     }
// })


class App extends Component {
    constructor(props) {
        super(props);

        setup({
            theme: {
                extend: {
                    "colors": {
                        "color-primary": "#26a0f1",
                        "color-secondary": "#9b6904",
                        "color-info": "#36c",
                        "color-action": "#d97e38",
                        "color-transparent": "#ffffff",
                        "color-warning": "#f86262",
                        "color-revert": "#cdcdcd",
                        "color-confirm": "#1d3b79"
                    },
                    "fontFamily": {
                        "title": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
                        "TopSectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif",
                        "SectionLabel": "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif"
                    },
                    "fontSize": {
                        "title": "15px",
                        "TopSectionLabel": "15px",
                        "SectionLabel": "16px"
                    }
                }
            }
        })
    }


    render() {
        return (
            <div>
                <SectionPageBuilder />
            </div>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));