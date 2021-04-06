import {language,LanguageContext} from './language-context';
import React from "react";
import {css} from 'styled-components/macro'
import tw from 'twin.macro'

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
                        <button>
                            Change Language:
                        </button>
                    <div css={[tw`flex space-x-2`]}>
                        {
                            props.pageLanguages.map((value, index) => {
                                return (
                                    <a
                                        href="#" key={index}
                                        css={[tw`text-red-300`]}
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