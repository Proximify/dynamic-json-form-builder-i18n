import {language, LanguageContext} from './language-context';
import React from "react";
import {css} from 'styled-components/macro'
import tw, {theme} from 'twin.macro'
import styled, {ThemeProvider} from "styled-components";

// const Button = styled.button`
//   background: ${props => props.theme.background};
//   color: ${props => props.theme.color};
//   font-size: ${props => props.theme.fontSize};
//   font-family: ${props => props.theme.fontFamily};
// `;
//
// Button.defaultProps = {
//     theme: {
//         color: 'black',
//         fontSize:`20px`,
//         fontFamily: 'Times New Roman',
//         background: 'aliceblue'
//     }
// }
//
// const customTheme = {
//     fontFamily: `${theme`fontFamily.title`}`,
//     fontSize: `${theme`fontSize.title`}`,
//     background: `${theme`colors.color-info`}`
//
// };


function LanguageTogglerButton(props) {
    const languages = {
        EN: "English",
        FR: "French",
        SP: "Spanish"
    }
    // className={"text-color-secondary"}

    return (
        <LanguageContext.Consumer>
            {({language, toggleLanguage}) => (
                <div>
                    <button>
                        Change Language:
                    </button>
                    {/*<ThemeProvider theme={customTheme}>*/}
                        <button>
                            Change Language:
                        </button>
                    {/*</ThemeProvider>*/}
                    <div tw="flex space-x-2">
                        {
                            props.pageLanguages.map((value, index) => {
                                return (
                                    <a
                                        href="#" key={index}
                                        tw="text-color-action"
                                        onClick={() => toggleLanguage(value)}>{languages[value]}</a>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </LanguageContext.Consumer>
    );

}

export default LanguageTogglerButton;