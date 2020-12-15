import React, {useEffect, useRef, useState} from "react";
import 'bootstrap';
import {ContentState, convertFromRaw, convertToRaw, EditorState,RichUtils} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import richTextFieldToolBarStyle from '../style/richTextFieldToolBarStyle';
import PropTypes from 'prop-types';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import {useTranslation} from "react-i18next";
import {XIcon} from "@primer/octicons-react";
import {LanguageContext} from "../../../language-context";

export function MultiLangRichTextWidget(props) {
    const {value} = props;
    const {t, i18n} = useTranslation();
    const style = props.formContext.style;
    const isFirstRun = useRef(true);
    const isLangFirstRun = useRef(true);

    const [state, setState] = useState({
        isBilingual: false,
        primaryLanguage: "",
        secondaryLanguage: "",
        primaryContent: EditorState.createEmpty(),
        secondaryContent: EditorState.createEmpty(),
        discardedContent: null,
        languageList: []
    });

    const languageLabel = {
        EN: "English",
        FR: "French",
        SP: "Spanish"
    }

    useEffect(() => {
        if (value) {
            let valueObj = JSON.parse(props.value);
            const languageList = props.registry.rootSchema["fieldLanguages"].map(lang => lang.toUpperCase()) ?? [i18n.language.toUpperCase()];
            if (valueObj.language === "Bilingual" && languageList.length === 2) {
                const htmlPageLang = i18n.language;
                const primaryLanguage = languageList.includes(htmlPageLang.toUpperCase()) ? htmlPageLang.toUpperCase() : languageList[0];
                const secondaryLanguage = primaryLanguage === languageList[0] ? languageList[1] : languageList[0];
                const primaryContent = valueObj.hasOwnProperty(primaryLanguage) ? valueObj[primaryLanguage] : null;
                const secondaryContent = valueObj.hasOwnProperty(secondaryLanguage) ? valueObj[secondaryLanguage] : null;
                // console.log(primaryLanguage, primaryContent, secondaryLanguage, secondaryContent);
                setState({
                    ...state,
                    isBilingual: true,
                    primaryLanguage: primaryLanguage,
                    primaryContent: EditorState.createWithContent(getContentFromHTML(primaryContent)),
                    secondaryLanguage: secondaryLanguage,
                    secondaryContent: EditorState.createWithContent(getContentFromHTML(secondaryContent)),
                    languageList: languageList
                })
            } else {
                const primaryLanguage = valueObj.language;
                const primaryContent = valueObj[valueObj.language];
                // console.log(primaryLanguage, primaryContent);
                setState({
                    ...state,
                    primaryLanguage: primaryLanguage,
                    primaryContent: EditorState.createWithContent(getContentFromHTML(primaryContent)),
                    languageList: languageList
                })
            }
        } else {
            const languageList = props.registry.rootSchema["fieldLanguages"].map(lang => lang.toUpperCase()) ?? [i18n.language.toUpperCase()];
            setState({
                ...state,
                primaryLanguage: i18n.language.toUpperCase(),
                languageList: languageList
            })
        }
    }, [])

    useEffect(() => {
        if (isLangFirstRun.current) {
            isLangFirstRun.current = false;
            return;
        }
        if (!value) {
            if (state.isBilingual) {
                if (state.languageList.includes(i18n.language.toUpperCase())) {
                    const primaryLanguage = i18n.language.toUpperCase();
                    const secondaryLanguage = primaryLanguage === state.languageList[0] ? state.languageList[1] : state.languageList[0];
                    setState({
                        ...state,
                        primaryLanguage: primaryLanguage,
                        secondaryLanguage: secondaryLanguage
                    })
                }
            } else {
                if (state.languageList.includes(i18n.language.toUpperCase()))
                    setState({...state, primaryLanguage: i18n.language.toUpperCase()})
            }
        } else if (state.languageList.includes(i18n.language.toUpperCase())) {
            if (state.isBilingual && state.languageList.length === 2) {
                const primaryLanguage = i18n.language.toUpperCase();
                const secondaryLanguage = primaryLanguage === state.languageList[0] ? state.languageList[1] : state.languageList[0];
                const primaryContent = state.primaryLanguage !== primaryLanguage ? state.secondaryContent : state.primaryContent;
                const secondaryContent = state.primaryLanguage !== primaryLanguage ? state.primaryContent : state.secondaryContent;
                setState({
                    ...state,
                    primaryLanguage: primaryLanguage,
                    primaryContent: primaryContent,
                    secondaryLanguage: secondaryLanguage,
                    secondaryContent: secondaryContent
                })
            } else {
                if (!state.isBilingual && (!state.primaryContent || !state.primaryContent.getCurrentContent().hasText())) {
                    setState({
                        ...state,
                        primaryLanguage: i18n.language.toUpperCase()
                    })
                }
            }
        }
        handleChange()
    }, [i18n.language])

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
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
            newValue = {
                language: "Bilingual",
                [state.languageList[0]]: state.primaryLanguage === state.languageList[0] ? draftToHtml(convertToRaw(state.primaryContent.getCurrentContent())) : draftToHtml(convertToRaw(state.secondaryContent.getCurrentContent())),
                [state.languageList[1]]: state.primaryLanguage === state.languageList[1] ? draftToHtml(convertToRaw(state.primaryContent.getCurrentContent())) : draftToHtml(convertToRaw(state.secondaryContent.getCurrentContent())),
            }
        } else {
            newValue = {
                language: state.primaryLanguage,
                [state.primaryLanguage]: draftToHtml(convertToRaw(state.primaryContent.getCurrentContent()))
            }
        }
        if (value !== JSON.stringify(newValue)) {
            console.log("handle change", newValue);
            console.log(state);
            props.onChange(JSON.stringify(newValue));
        }
    }

    const handleLangChange = () => {
        // handle language change from 1 to 2
        if (state.languageList.length < 2)
            return;

        if (state.primaryLanguage === i18n.language.toUpperCase()) {
            setState({
                ...state,
                isBilingual: true,
                secondaryLanguage: state.primaryLanguage === state.languageList[0] ? state.languageList[1] : state.languageList[0],
                secondaryContent: state.discardedContent ?? EditorState.createEmpty(),
                discardedContent: null
            })
        } else {
            setState({
                ...state,
                isBilingual: true,
                primaryLanguage: state.primaryLanguage === state.languageList[0] ? state.languageList[1] : state.languageList[0],
                primaryContent: state.discardedContent ?? EditorState.createEmpty(),
                secondaryLanguage: state.primaryLanguage,
                secondaryContent: state.primaryContent,
                discardedContent: null
            })
        }
    }

    const LangDropDownBtn = () => {
        return (
            <div className="input-group-append">
                <div className="btn-group dropright">
                    <button type="button"
                            className={`btn ${style.btnLanguage} dropdown-toggle p-0`}
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false"
                            id={`${props.id}_lang_btn`}>{state.primaryLanguage}
                    </button>
                    <div className="dropdown-menu" id={`${props.id}_multi_lang_selection_dropdown`}>
                        {state.languageList.map((lang, index) => {
                            return (
                                <a className={`dropdown-item ${(state.primaryLanguage === lang && !state.isBilingual) ? "active" : ""}`}
                                   href="#"
                                   onClick={(e) => {
                                       e.preventDefault();
                                       if (state.isBilingual) {
                                           if (state.primaryLanguage === lang) {
                                               setState({
                                                   ...state,
                                                   isBilingual: false,
                                                   primaryContent: state.primaryContent.getCurrentContent().hasText() ? state.primaryContent : state.secondaryContent,
                                                   secondaryLanguage: "",
                                                   secondaryContent: null,
                                                   discardedContent: (state.primaryContent.getCurrentContent().hasText() && state.secondaryContent.getCurrentContent().hasText()) ? state.secondaryContent : null
                                               })
                                           } else {
                                               setState({
                                                   ...state,
                                                   isBilingual: false,
                                                   primaryLanguage: state.secondaryLanguage,
                                                   primaryContent: state.secondaryContent.getCurrentContent().hasText() ? state.secondaryContent : state.primaryContent,
                                                   secondaryLanguage: "",
                                                   secondaryContent: null,
                                                   discardedContent: (state.primaryContent.getCurrentContent().hasText() && state.secondaryContent.getCurrentContent().hasText()) ? state.primaryContent : null
                                               })
                                           }

                                       } else {
                                           if (state.primaryLanguage !== lang) {
                                               setState({...state, primaryLanguage: lang})
                                           }
                                       }
                                   }}>{languageLabel[lang]} Only</a>
                            )
                        })}
                        {state.languageList.length === 2 ?
                            <a className={`dropdown-item ${state.isBilingual ? "active" : ""}`}
                               href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   if (!state.isBilingual) {
                                       console.log(state);
                                       handleLangChange()
                                   }
                               }}>Bilingual</a>
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }

    const LangCloseBtn = () => {
        return (
            <div className={`input-group-append`}>
                <button type="button"
                        className={`btn ${style.btnLanguage} p-0 pl-1"`}
                        onClick={(event) => {
                            setState({
                                ...state,
                                isBilingual: false,
                                secondaryLanguage: "",
                                secondaryContent: null,
                                discardedContent: state.secondaryContent
                            })
                        }}>{state.secondaryLanguage}<XIcon verticalAlign='middle' size={13}/>
                </button>
            </div>
        )
    }

    return (
        <div id={`${props.id}_multi_lang_input_group`}>
            <div className="my-auto text-center input-group">
                <div style={{
                    border: "1px solid #ced4da",
                    minHeight: "300px",
                    borderRadius: "0.2rem 0.2rem 0.2rem 0.2rem"
                }}>
                    <Editor
                        editorState={state.primaryContent}
                        wrapperClassName="multiLangRichTextWrapper"
                        toolbarClassName="multiLangRichTextToolbar"
                        editorClassName="multiLangRichTextEditor"
                        // stripPastedStyles={true}
                        // spellCheck={true}
                        // placeholder={"Enter something..."}
                        // toolbar={{richTextFieldToolBarStyle}}
                        onEditorStateChange={text => {
                            setState({...state, primaryContent: text})
                        }}
                        toolbarCustomButtons={[<LangDropDownBtn />]}
                        onBlur={() => {
                            handleChange()
                        }}
                    />
                </div>
                {/*<div className="input-group-append">*/}
                {/*    <div className="btn-group dropright">*/}
                {/*        <button type="button"*/}
                {/*                className={`btn ${style.btnLanguage} dropdown-toggle p-0`}*/}
                {/*                data-toggle="dropdown"*/}
                {/*                aria-haspopup="true" aria-expanded="false"*/}
                {/*                id={`${props.id}_lang_btn`}>{state.primaryLanguage}*/}
                {/*        </button>*/}
                {/*        <div className="dropdown-menu" id={`${props.id}_multi_lang_selection_dropdown`}>*/}
                {/*            {state.languageList.map((lang, index) => {*/}
                {/*                return (*/}
                {/*                    <a className={`dropdown-item ${(state.primaryLanguage === lang && !state.isBilingual) ? "active" : ""}`}*/}
                {/*                       href="#"*/}
                {/*                       onClick={(e) => {*/}
                {/*                           e.preventDefault();*/}
                {/*                           if (state.isBilingual) {*/}
                {/*                               if (state.primaryLanguage === lang) {*/}
                {/*                                   setState({*/}
                {/*                                       ...state,*/}
                {/*                                       isBilingual: false,*/}
                {/*                                       primaryContent: state.primaryContent.getCurrentContent().hasText() ? state.primaryContent : state.secondaryContent,*/}
                {/*                                       secondaryLanguage: "",*/}
                {/*                                       secondaryContent: null,*/}
                {/*                                       discardedContent: (state.primaryContent.getCurrentContent().hasText() && state.secondaryContent.getCurrentContent().hasText()) ? state.secondaryContent : null*/}
                {/*                                   })*/}
                {/*                               } else {*/}
                {/*                                   setState({*/}
                {/*                                       ...state,*/}
                {/*                                       isBilingual: false,*/}
                {/*                                       primaryLanguage: state.secondaryLanguage,*/}
                {/*                                       primaryContent: state.secondaryContent.getCurrentContent().hasText() ? state.secondaryContent : state.primaryContent,*/}
                {/*                                       secondaryLanguage: "",*/}
                {/*                                       secondaryContent: null,*/}
                {/*                                       discardedContent: (state.primaryContent.getCurrentContent().hasText() && state.secondaryContent.getCurrentContent().hasText()) ? state.primaryContent : null*/}
                {/*                                   })*/}
                {/*                               }*/}
                {/*                           } else {*/}
                {/*                               if (state.primaryLanguage !== lang) {*/}
                {/*                                   setState({...state, primaryLanguage: lang})*/}
                {/*                               }*/}
                {/*                           }*/}
                {/*                       }}>{languageLabel[lang]} Only</a>*/}
                {/*                )*/}
                {/*            })}*/}
                {/*            {state.languageList.length === 2 ?*/}
                {/*                <a className={`dropdown-item ${state.isBilingual ? "active" : ""}`}*/}
                {/*                   href="#"*/}
                {/*                   onClick={(e) => {*/}
                {/*                       e.preventDefault();*/}
                {/*                       if (!state.isBilingual) {*/}
                {/*                           console.log(state);*/}
                {/*                           handleLangChange()*/}
                {/*                       }*/}
                {/*                   }}>Bilingual</a>*/}
                {/*                : null*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div
                className={`my-auto text-center input-group pt-1 ${!state.isBilingual ? "d-none" : ""}`}>
                <div style={{
                    border: "1px solid #ced4da",
                    minHeight: "300px",
                    borderRadius: "0.2rem 0.2rem 0.2rem 0.2rem"
                }}>
                    <Editor
                        editorState={state.secondaryContent}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        stripPastedStyles={true}
                        onEditorStateChange={text => {
                            setState({...state, secondaryContent: text})
                        }}
                        toolbarCustomButtons={[<LangCloseBtn />]}
                        onBlur={() => {
                            handleChange()
                        }}
                    />
                </div>
                {/*<div className={`input-group-append`}>*/}
                {/*    <button type="button"*/}
                {/*            className={`btn ${style.btnLanguage} p-0 pl-1"`}*/}
                {/*            onClick={(event) => {*/}
                {/*                setState({*/}
                {/*                    ...state,*/}
                {/*                    isBilingual: false,*/}
                {/*                    secondaryLanguage: "",*/}
                {/*                    secondaryContent: null,*/}
                {/*                    discardedContent: state.secondaryContent*/}
                {/*                })*/}
                {/*            }}>{state.secondaryLanguage}<XIcon verticalAlign='middle' size={13}/>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
            <div>
                <a className={`btn ${style.btnUndo} ${!state.discardedContent ? "d-none" : ""}`}
                   onClick={() => {
                       handleLangChange()
                   }}>{t('btn-undo')}
                </a>
            </div>
        </div>
    );
}