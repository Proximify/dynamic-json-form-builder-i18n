import React, {useEffect, useRef, useState} from "react";
import {BsCaretDownFill, BsTrashFill, BsX} from 'react-icons/bs';
import './MultiLangField.css';
import {useTranslation} from 'react-i18next';
import {Menu, Transition} from "@headlessui/react";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import {Editor} from "react-draft-wysiwyg";
import {ToolbarStyleCompact} from "../../../../RichTextToolBarStyle";

export function MultiLangTextAreaFieldWidget(props) {
    // console.log("MultiLangRichTextWidget", props)
    const {value, schema} = props;
    const {t, i18n} = useTranslation();
    const isFirstRun = useRef(true);
    const isLangFirstRun = useRef(true);

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
            // const languageList = props.registry.rootSchema["fieldLanguages"].map(lang => lang.toUpperCase()) ?? [i18n.language.toUpperCase()];
            if (fieldValue.english && fieldValue.french) {
                // const htmlPageLang = i18n.language;
                // const primaryLanguage = languageList.includes(htmlPageLang.toUpperCase()) ? htmlPageLang.toUpperCase() : languageList[0];
                // const secondaryLanguage = primaryLanguage === languageList[0] ? languageList[1] : languageList[0];
                // const primaryContent = fieldValue.hasOwnProperty(primaryLanguage) ? fieldValue[primaryLanguage] : null;
                // const secondaryContent = fieldValue.hasOwnProperty(secondaryLanguage) ? fieldValue[secondaryLanguage] : null;
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

    // useEffect(() => {
    //     if (isLangFirstRun.current) {
    //         isLangFirstRun.current = false;
    //         return;
    //     }
    //     if (!value) {
    //         if (state.isBilingual) {
    //             if (state.languageList.includes(i18n.language.toUpperCase())) {
    //                 const primaryLanguage = i18n.language.toUpperCase();
    //                 const secondaryLanguage = primaryLanguage === state.languageList[0] ? state.languageList[1] : state.languageList[0];
    //                 setState({
    //                     ...state,
    //                     primaryLanguage: primaryLanguage,
    //                     secondaryLanguage: secondaryLanguage
    //                 })
    //             }
    //         } else {
    //             if (state.languageList.includes(i18n.language.toUpperCase()))
    //                 setState({...state, primaryLanguage: i18n.language.toUpperCase()})
    //         }
    //     } else if (state.languageList.includes(i18n.language.toUpperCase())) {
    //         if (state.isBilingual && state.languageList.length === 2) {
    //             const primaryLanguage = i18n.language.toUpperCase();
    //             const secondaryLanguage = primaryLanguage === state.languageList[0] ? state.languageList[1] : state.languageList[0];
    //             const primaryContent = state.primaryLanguage !== primaryLanguage ? state.secondaryContent : state.primaryContent;
    //             const secondaryContent = state.primaryLanguage !== primaryLanguage ? state.primaryContent : state.secondaryContent;
    //             setState({
    //                 ...state,
    //                 primaryLanguage: primaryLanguage,
    //                 primaryContent: primaryContent,
    //                 secondaryLanguage: secondaryLanguage,
    //                 secondaryContent: secondaryContent
    //             })
    //         } else {
    //             if (!state.isBilingual && (!state.primaryContent || !state.primaryContent.getCurrentContent().hasText())) {
    //                 setState({
    //                     ...state,
    //                     primaryLanguage: i18n.language.toUpperCase()
    //                 })
    //             }
    //         }
    //     }
    //     handleChange()
    // }, [i18n.language])

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
        // console.log(draftToHtml(convertToRaw(state.primaryContent.getCurrentContent()));
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
        // handle language change from 1 to 2
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
                className={`focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-r align-middle text-gray-500 ${!state.isRichText && 'w-full h-full'}`}>
                <div className={`w-full h-full items-center justify-center`}>
                    <Menu>
                        {({open}) => (
                            <>
                                <div className="w-full h-full items-center justify-center">
                                    <Menu.Button
                                        className="w-full h-full flex flex-row items-center justify-center bg-white rounded-md hover:text-gray-600">
                                        {languageShortLabel[state.primaryLanguage] ?? "EN"}
                                        <BsCaretDownFill size={"0.8em"}/>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    show={open}
                                    // enter="transition ease-out duration-100"
                                    // enterFrom="transform opacity-0 scale-95"
                                    // enterTo="transform opacity-100 scale-100"
                                    // leave="transition ease-in duration-75"
                                    // leaveFrom="transform opacity-100 scale-100"
                                    // leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        static
                                        className="absolute w-30 mt-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg outline-none z-10"
                                    >
                                        <div className="py-1">
                                            {state.languageList.map((lang, index) => {
                                                return (
                                                    <Menu.Item key={index}>
                                                        {({active}) => (
                                                            <a className={`${
                                                                (active || (!state.isBilingual && state.primaryLanguage === lang))
                                                                    ? "bg-indigo-500 text-white"
                                                                    : "text-gray-700"
                                                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none`}
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
                                                        <a className={`${
                                                            (active || (state.isBilingual))
                                                                ? "bg-red-500 text-white font-semibold"
                                                                : "text-gray-700"
                                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none`}
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
                className={`focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-r align-middle text-gray-500 ${!state.isRichText && 'w-full h-full'}`}>
                <div className={`w-full h-full items-center justify-center`}>
                    <button
                        className="w-full h-full items-center justify-center flex flex-row"
                        data-toggle={"tooltip"}
                        data-placement={"left"}
                        title={"Delete this content"}
                        onClick={(event) => {
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
            <div className="multiLangField">
                {state.isRichText ? <Editor
                        editorState={state.primaryContent}
                        wrapperClassName="multiLangRichTextAreaWrapper"
                        toolbarClassName="multiLangRichTextAreaToolbar"
                        editorClassName="multiLangRichTextAreaEditor"
                        stripPastedStyles={true}
                        spellCheck={true}
                        toolbar={ToolbarStyleCompact}
                        tool
                        onEditorStateChange={text => {
                            setState({...state, primaryContent: text})
                        }}
                        toolbarCustomButtons={[<LangDropDownBtn/>]}
                        onBlur={() => {
                            handleChange()
                        }}
                    /> :
                    <>
                        <input
                            className="multiLangFieldInput"
                            type="text"
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
                        <div className="multiLangFieldSelect">{<LangDropDownBtn/>}</div>
                    </>
                }

            </div>

            <div className={`mt-1 ${!state.isBilingual ? "hidden" : ""}`}>
                <div className="multiLangField">
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
                            <input
                                className="multiLangFieldInput"
                                type="text"
                                value={state.secondaryContent ?? undefined}
                                onChange={(event) => {
                                    setState({...state, secondaryContent: event.target.value})
                                }}
                                onBlur={() => {
                                    handleChange()
                                }}
                            />
                            <div className="multiLangFieldSelect">{<LangCloseBtn/>}</div>
                        </>
                    }
                </div>
            </div>
            <div>
                <a className={`undoBtn undoBtn ${(!state.discardedContent || (state.isRichText && !state.discardedContent.getCurrentContent().hasText())) ? "hidden" : ""}`}
                   onClick={() => {
                       handleOnBilingual()
                   }}>{t('btn-undo')}
                </a>
            </div>
        </React.Fragment>
    );

}