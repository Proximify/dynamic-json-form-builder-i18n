import React, {useEffect, useState} from "react";
import {BsCaretDownFill, BsTrashFill} from 'react-icons/bs';
import './MultiLangField.css';
import {Menu, Transition} from "@headlessui/react";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import {Editor} from "react-draft-wysiwyg";
import {ToolbarStyleCompact} from "../utils/styledComponents/richTextToolBarStyle";
import {
    StyledMultiLangBtnContainer,
    StyledMultiLangFieldContainer,
    StyledMultiLangFieldTextarea
} from "../utils/styledComponents";
import {css} from 'styled-components/macro'
import tw from "twin.macro";


export function MultiLangFieldWidget(props) {
    const {value, schema} = props;

    const isRichText = schema.constraints ? !!schema.constraints.richText : false;
    const [state, setState] = useState({
        isReady: false,
        isBilingual: false,
        isRichText: isRichText,
        primaryLanguage: "",
        secondaryLanguage: "",
        primaryContent: isRichText ? null : "",
        secondaryContent: isRichText ? null : "",
        discardedContent: isRichText ? null : "",
        languageList: []
    });

    const languageLabel = {
        english: "English",
        french: "French"
    }

    const languageShortLabel = {
        english: "EN",
        french: "FR"
    }

    useEffect(() => {
        const languageList = ["english", "french"];
        if (value) {
            let fieldValue = JSON.parse(value);
            if (fieldValue.english && fieldValue.french) {
                const primaryLanguage = "english";
                const secondaryLanguage = "french";
                const primaryContent = fieldValue[primaryLanguage];
                const secondaryContent = fieldValue[secondaryLanguage];
                setState({
                    ...state,
                    isReady: true,
                    isBilingual: true,
                    primaryLanguage: primaryLanguage,
                    primaryContent: state.isRichText ? (primaryContent ? EditorState.createWithContent(getContentFromHTML(primaryContent)) : EditorState.createEmpty()) : primaryContent,
                    secondaryLanguage: secondaryLanguage,
                    secondaryContent: state.isRichText ? (secondaryContent ? EditorState.createWithContent(getContentFromHTML(secondaryContent)) : EditorState.createEmpty()) : secondaryContent,
                    languageList: languageList
                })
            } else {
                const primaryLanguage = fieldValue.english ? "english" : "french";
                const primaryContent = fieldValue[primaryLanguage];
                setState({
                    ...state,
                    isReady: true,
                    primaryLanguage: primaryLanguage,
                    primaryContent: state.isRichText ? (primaryContent ? EditorState.createWithContent(getContentFromHTML(primaryContent)) : EditorState.createEmpty()) : primaryContent,
                    languageList: languageList
                })
            }
        } else {
            setState({
                ...state,
                isReady: true,
                primaryLanguage: "english",
                primaryContent: state.isRichText ? EditorState.createEmpty() : "",
                languageList: languageList
            })
        }
    }, [])

    useEffect(() => {
        if (!state.isReady) {
            return;
        }
        handleChange();
    }, [state.isBilingual, state.primaryLanguage, state.secondaryLanguage])

    const getContentFromHTML = (html) => {
        const draft = htmlToDraft(html);
        const {contentBlocks, entityMap} = draft;
        return ContentState.createFromBlockArray(contentBlocks, entityMap);
    }

    const handleChange = () => {
        let newValue;
        if (state.isBilingual) {
            if (state.isRichText) {
                newValue = {
                    [state.languageList[0]]: state.primaryLanguage === state.languageList[0] ? draftToHtml(convertToRaw(state.primaryContent.getCurrentContent())) : draftToHtml(convertToRaw(state.secondaryContent.getCurrentContent())),
                    [state.languageList[1]]: state.primaryLanguage === state.languageList[1] ? draftToHtml(convertToRaw(state.primaryContent.getCurrentContent())) : draftToHtml(convertToRaw(state.secondaryContent.getCurrentContent())),
                }
            } else {
                newValue = {
                    [state.languageList[0]]: state.primaryLanguage === state.languageList[0] ? state.primaryContent : state.secondaryContent,
                    [state.languageList[1]]: state.primaryLanguage === state.languageList[1] ? state.primaryContent : state.secondaryContent,
                }
            }
        } else {
            if (state.isRichText) {
                newValue = {
                    [state.primaryLanguage]: draftToHtml(convertToRaw(state.primaryContent.getCurrentContent()))
                }
            } else {
                newValue = {
                    [state.primaryLanguage]: state.primaryContent
                }
            }
        }
        if (value !== JSON.stringify(newValue)) {
            props.onChange(JSON.stringify(newValue));
        }
    }

    const handleOnBilingual = () => {
        if (state.languageList.length < 2)
            return;

        if (state.primaryLanguage === "english") {
            setState({
                ...state,
                isBilingual: true,
                secondaryLanguage: "french",
                secondaryContent: state.isRichText ? (state.discardedContent ?? EditorState.createEmpty()) : state.discardedContent,
                discardedContent: null
            })
        } else {
            setState({
                ...state,
                isBilingual: true,
                primaryLanguage: "english",
                primaryContent: state.isRichText ? (state.discardedContent ?? EditorState.createEmpty()) : state.discardedContent,
                secondaryLanguage: state.primaryLanguage,
                secondaryContent: state.primaryContent,
                discardedContent: null
            })
        }
    }

    const LangDropDownBtn = () => {
        return (
            <div
                css={[state.isRichText ? tw`focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-r align-middle text-gray-500` : tw`w-full h-full focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-r align-middle text-gray-500`]}
            >
                <div css={[tw`w-full h-full items-center justify-center`]}>
                    <Menu>
                        {({open}) => (
                            <>
                                <div css={[tw`w-full h-full items-center justify-center`]}>
                                    <Menu.Button
                                        css={[tw`w-full h-full flex flex-row items-center justify-center bg-white rounded-md hover:text-gray-600`]}>
                                        {languageShortLabel[state.primaryLanguage] ?? "EN"}
                                        <BsCaretDownFill size={"0.8em"}/>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    show={open}
                                >
                                    <Menu.Items
                                        static
                                        css={[tw`absolute w-32 mt-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg outline-none z-10`]}
                                    >
                                        <div css={[tw`py-1`]}>
                                            {state.languageList.map((lang, index) => {
                                                return (
                                                    <Menu.Item key={index}>
                                                        {({active}) => (
                                                            <a
                                                                css={[(active || (!state.isBilingual && state.primaryLanguage === lang)) ? tw`bg-indigo-500 text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none` : tw`flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none text-gray-700`]}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (state.isBilingual) {
                                                                        if (state.primaryLanguage === lang) {
                                                                            setState({
                                                                                ...state,
                                                                                isBilingual: false,
                                                                                primaryContent: state.primaryContent ? state.primaryContent : state.secondaryContent,
                                                                                secondaryLanguage: "",
                                                                                secondaryContent: state.isRichText ? null : "",
                                                                                discardedContent: (state.primaryContent && state.secondaryContent) ? state.secondaryContent : (state.isRichText ? null : "")
                                                                            })
                                                                        } else {
                                                                            setState({
                                                                                ...state,
                                                                                isBilingual: false,
                                                                                primaryLanguage: state.secondaryLanguage,
                                                                                primaryContent: state.secondaryContent ? state.secondaryContent : state.primaryContent,
                                                                                secondaryLanguage: "",
                                                                                secondaryContent: state.isRichText ? null : "",
                                                                                discardedContent: (state.primaryContent && state.secondaryContent) ? state.primaryContent : (state.isRichText ? null : "")
                                                                            })
                                                                        }
                                                                    } else {
                                                                        if (state.primaryLanguage !== lang) {
                                                                            setState({...state, primaryLanguage: lang})
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                {languageLabel[lang]} Only</a>
                                                        )}
                                                    </Menu.Item>
                                                )
                                            })}
                                        </div>
                                        {state.languageList.length === 2 ?
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            css={[(active || state.isBilingual) ? tw`flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none bg-gray-500 text-white font-semibold` : tw`flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none text-gray-700`]}
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (!state.isBilingual) {
                                                                    handleOnBilingual()
                                                                }
                                                            }}>Bilingual</a>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            : null
                                        }
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
        )
    }

    const LangCloseBtn = () => {
        return (
            <div
                css={[state.isRichText ? tw`focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-r align-middle text-gray-500` : tw`focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-r align-middle text-gray-500 w-full h-full`]}
            >
                <div css={[tw`w-full h-full items-center justify-center`]}>
                    <button
                        css={[tw`w-full h-full items-center justify-center flex flex-row`]}
                        onClick={() => {
                            setState({
                                ...state,
                                isBilingual: false,
                                secondaryLanguage: "",
                                secondaryContent: state.isRichText ? null : "",
                                discardedContent: state.secondaryContent
                            })
                        }}>
                        {languageShortLabel[state.secondaryLanguage] ?? "EN"}
                        <BsTrashFill size={"0.9em"}/>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <StyledMultiLangFieldContainer>
                {state.isRichText ? <Editor
                        editorState={state.primaryContent}
                        wrapperClassName="multiLangRichTextAreaWrapper"
                        toolbarClassName="multiLangRichTextAreaToolbar"
                        editorClassName="multiLangRichTextAreaEditor"
                        stripPastedStyles={true}
                        spellCheck={true}
                        toolbar={ToolbarStyleCompact}
                        onEditorStateChange={text => {
                            setState({...state, primaryContent: text})
                        }}
                        toolbarCustomButtons={[<LangDropDownBtn/>]}
                        onBlur={() => {
                            handleChange()
                        }}
                    /> :
                    <>
                        <StyledMultiLangFieldTextarea
                            id={props.schema.id}
                            value={state.primaryContent ?? undefined}
                            required={props.required}
                            onChange={(event) => {
                                setState({...state, primaryContent: event.target.value})
                            }}
                            onBlur={() => {
                                handleChange()
                            }}
                        />
                        <StyledMultiLangBtnContainer>{<LangDropDownBtn/>}</StyledMultiLangBtnContainer>
                    </>
                }

            </StyledMultiLangFieldContainer>

            <div className={`mt-1 ${!state.isBilingual ? "hidden" : ""}`}>
                <StyledMultiLangFieldContainer>
                    {state.isRichText ?
                        <Editor
                            editorState={state.secondaryContent}
                            wrapperClassName="multiLangRichTextAreaWrapper"
                            toolbarClassName="multiLangRichTextAreaToolbar"
                            editorClassName="multiLangRichTextAreaEditor"
                            stripPastedStyles={true}
                            toolbar={ToolbarStyleCompact}
                            onEditorStateChange={text => {
                                setState({...state, secondaryContent: text})
                            }}
                            toolbarCustomButtons={[<LangCloseBtn/>]}
                            onBlur={() => {
                                handleChange()
                            }}
                        /> :
                        <>
                            <StyledMultiLangFieldTextarea
                                value={state.secondaryContent ?? undefined}
                                onChange={(event) => {
                                    setState({...state, secondaryContent: event.target.value})
                                }}
                                onBlur={() => {
                                    handleChange()
                                }}
                            />
                            <StyledMultiLangBtnContainer>{<LangCloseBtn/>}</StyledMultiLangBtnContainer>
                        </>
                    }
                </StyledMultiLangFieldContainer>
            </div>
            <div>
                <a
                    css={[(!state.discardedContent || (state.isRichText && !state.discardedContent.getCurrentContent().hasText())) ? tw`hidden` : tw`px-1 py-1 leading-normal text-sm text-blue-500 font-medium`]}
                    onClick={() => {
                        handleOnBilingual()
                    }}>undo
                </a>
            </div>
        </React.Fragment>
    );

}