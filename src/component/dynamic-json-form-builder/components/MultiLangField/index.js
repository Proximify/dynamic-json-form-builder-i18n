import React, {useEffect, useRef, useState} from "react";
import {BsX, BsCaretRightFill, BsCaretDownFill} from 'react-icons/bs';
import './MultiLangField.css';
import {useTranslation} from 'react-i18next';
import ClickAwayListener from 'react-click-away-listener';
import {Menu, Transition} from "@headlessui/react";


/**
 * This is the custom widget for multiple languages input field
 * @param props
 * @returns {JSX.Element}
 * @constructor
 // */
export function MultiLangFieldWidget(props) {
    // console.log("MultiLangTextInputWidget", props);
    const {value} = props;
    const {t, i18n} = useTranslation();
    const isFirstRun = useRef(true);
    const isLangFirstRun = useRef(true);

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [state, setState] = useState({
        isBilingual: false,
        primaryLanguage: "",
        secondaryLanguage: "",
        primaryContent: "",
        secondaryContent: "",
        discardedContent: "",
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
                const primaryContent = valueObj.hasOwnProperty(primaryLanguage) ? valueObj[primaryLanguage] : "";
                const secondaryContent = valueObj.hasOwnProperty(secondaryLanguage) ? valueObj[secondaryLanguage] : "";
                setState({
                    ...state,
                    isBilingual: true,
                    primaryLanguage: primaryLanguage,
                    primaryContent: primaryContent,
                    secondaryLanguage: secondaryLanguage,
                    secondaryContent: secondaryContent,
                    languageList: languageList
                })
            } else {
                setState({
                    ...state,
                    primaryLanguage: valueObj.language,
                    primaryContent: valueObj[valueObj.language],
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
                if (!state.isBilingual && (!state.primaryContent || state.primaryContent === "")) {
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

    const handleChange = () => {
        let newValue;
        if (state.isBilingual) {
            newValue = {
                language: "Bilingual",
                [state.languageList[0]]: state.primaryLanguage === state.languageList[0] ? state.primaryContent : state.secondaryContent,
                [state.languageList[1]]: state.primaryLanguage === state.languageList[1] ? state.primaryContent : state.secondaryContent,
            }
        } else {
            newValue = {
                language: state.primaryLanguage,
                [state.primaryLanguage]: state.primaryContent
            }
        }
        if (value !== JSON.stringify(newValue)) {
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
                secondaryContent: state.discardedContent,
                discardedContent: ""
            })
        } else {
            setState({
                ...state,
                isBilingual: true,
                primaryLanguage: state.primaryLanguage === state.languageList[0] ? state.languageList[1] : state.languageList[0],
                primaryContent: state.discardedContent,
                secondaryLanguage: state.primaryLanguage,
                secondaryContent: state.primaryContent,
                discardedContent: ""
            })
        }
    }

    console.log(state, dropDownOpen)

    return (
        <React.Fragment>
            <div className="multiLangField">
                <input
                    className="multiLangFieldInput"
                    type="text"
                    id={props.schema.id}
                    value={state.primaryContent}
                    required={props.required}
                    onChange={(event) => {
                        setState({...state, primaryContent: event.target.value})
                    }}
                    onBlur={() => {
                        handleChange()
                    }}
                />
                <div className="multiLangFieldSelect"
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     setDropDownOpen(true);
                    // }}
                >

                    <Menu>
                        {({open}) => (
                            <>
                                <div className="w-full h-full items-center justify-center">
                                    <Menu.Button
                                        className="w-full h-full flex flex-row items-center justify-center bg-white rounded-md hover:text-gray-600">
                                        {state.primaryLanguage}
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
                                        className="absolute right-12 w-30 mt-1 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg outline-none z-10"
                                    >
                                        <div className="py-1">
                                            {state.languageList.map((lang, index) => {
                                                return (
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <a className={`${
                                                                active
                                                                    ? "bg-indigo-500 text-white"
                                                                    : "text-gray-700"
                                                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none`}
                                                               href="#"
                                                               key={index}
                                                               onClick={(e) => {
                                                                   e.preventDefault();
                                                                   if (state.isBilingual) {
                                                                       if (state.primaryLanguage === lang) {
                                                                           setState({
                                                                               ...state,
                                                                               isBilingual: false,
                                                                               primaryContent: state.primaryContent !== "" ? state.primaryContent : state.secondaryContent,
                                                                               secondaryLanguage: "",
                                                                               secondaryContent: "",
                                                                               discardedContent: (state.primaryContent !== "" && state.secondaryContent !== "") ? state.secondaryContent : ""
                                                                           })
                                                                       } else {
                                                                           setState({
                                                                               ...state,
                                                                               isBilingual: false,
                                                                               primaryLanguage: state.secondaryLanguage,
                                                                               primaryContent: state.secondaryContent !== "" ? state.secondaryContent : state.primaryContent,
                                                                               secondaryLanguage: "",
                                                                               secondaryContent: "",
                                                                               discardedContent: (state.primaryContent !== "" && state.secondaryContent !== "") ? state.primaryContent : ""
                                                                           })
                                                                       }
                                                                   } else {
                                                                       if (state.primaryLanguage !== lang) {
                                                                           setState({...state, primaryLanguage: lang})
                                                                       }
                                                                   }
                                                                   setDropDownOpen(false);
                                                               }}
                                                               onBlur={() => setDropDownOpen(false)}
                                                            >
                                                                {languageLabel[lang]} Only</a>
                                                        )}
                                                    </Menu.Item>
                                                )
                                            })
                                            }
                                            {/*<Menu.Item>*/}
                                            {/*    {({active}) => (*/}
                                            {/*        <a*/}
                                            {/*            href="#"*/}
                                            {/*            className={`${*/}
                                            {/*                active*/}
                                            {/*                    ? "bg-indigo-500 text-white font-semibold"*/}
                                            {/*                    : "text-gray-700"*/}
                                            {/*            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none`}*/}
                                            {/*        >*/}
                                            {/*            EN Only*/}
                                            {/*        </a>*/}
                                            {/*    )}*/}
                                            {/*</Menu.Item>*/}
                                            {/*<Menu.Item>*/}
                                            {/*    {({active}) => (*/}
                                            {/*        <a*/}
                                            {/*            href="#"*/}
                                            {/*            className={`${*/}
                                            {/*                active*/}
                                            {/*                    ? "bg-indigo-500 text-white font-semibold"*/}
                                            {/*                    : "text-gray-700"*/}
                                            {/*            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none`}*/}
                                            {/*        >*/}
                                            {/*            FR Only*/}
                                            {/*        </a>*/}
                                            {/*    )}*/}
                                            {/*</Menu.Item>*/}
                                        </div>
                                        {state.languageList.length === 2 ?
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a className={`${
                                                            active
                                                                ? "bg-red-500 text-white font-semibold"
                                                                : "text-gray-700"
                                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none`}
                                                           href="#"
                                                           onClick={(e) => {
                                                               e.preventDefault();
                                                               if (!state.isBilingual) {
                                                                   handleLangChange()
                                                               }
                                                               setDropDownOpen(false);
                                                           }}>Bilingual</a>
                                                        // <a
                                                        //     href="#"
                                                        //     className={`${
                                                        //         active
                                                        //             ? "bg-red-500 text-white font-semibold"
                                                        //             : "text-gray-700"
                                                        //     } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none`}
                                                        // >
                                                        //     Bilingual
                                                        // </a>
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

                    {/*<div className="w-full h-full items-center justify-center flex flex-row">*/}
                    {/*    <button*/}
                    {/*    >*/}
                    {/*        {state.primaryLanguage}*/}
                    {/*    </button>*/}
                    {/*    <BsCaretDownFill size={"0.8em"}/>*/}
                    {/*</div>*/}


                    {/*<ClickAwayListener onClickAway={() => {*/}
                    {/*    if (state.dropDownOpen) {*/}
                    {/*        setDropDownOpen(false);*/}
                    {/*        // setState({*/}
                    {/*        //     ...state,*/}
                    {/*        //     dropDownOpen: false*/}
                    {/*        // })*/}
                    {/*    }*/}
                    {/*}}>*/}
                    {/*    <div className={`dropdownMenu ${dropDownOpen ? '' : 'hidden'}`}*/}
                    {/*         style={{zIndex: 5}}>*/}

                    {/*        {state.languageList.map((lang, index) => {*/}
                    {/*            return (*/}
                    {/*                <a className={`dropdownItem ${(state.primaryLanguage === lang && !state.isBilingual) ? "bg-blue-500 text-white" : "bg-transparent text-black"}`}*/}
                    {/*                   href="#"*/}
                    {/*                   key={index}*/}
                    {/*                   onClick={(e) => {*/}
                    {/*                       e.preventDefault();*/}
                    {/*                       if (state.isBilingual) {*/}
                    {/*                           if (state.primaryLanguage === lang) {*/}
                    {/*                               setState({*/}
                    {/*                                   ...state,*/}
                    {/*                                   isBilingual: false,*/}
                    {/*                                   primaryContent: state.primaryContent !== "" ? state.primaryContent : state.secondaryContent,*/}
                    {/*                                   secondaryLanguage: "",*/}
                    {/*                                   secondaryContent: "",*/}
                    {/*                                   discardedContent: (state.primaryContent !== "" && state.secondaryContent !== "") ? state.secondaryContent : ""*/}
                    {/*                               })*/}
                    {/*                           } else {*/}
                    {/*                               setState({*/}
                    {/*                                   ...state,*/}
                    {/*                                   isBilingual: false,*/}
                    {/*                                   primaryLanguage: state.secondaryLanguage,*/}
                    {/*                                   primaryContent: state.secondaryContent !== "" ? state.secondaryContent : state.primaryContent,*/}
                    {/*                                   secondaryLanguage: "",*/}
                    {/*                                   secondaryContent: "",*/}
                    {/*                                   discardedContent: (state.primaryContent !== "" && state.secondaryContent !== "") ? state.primaryContent : ""*/}
                    {/*                               })*/}
                    {/*                           }*/}
                    {/*                       } else {*/}
                    {/*                           if (state.primaryLanguage !== lang) {*/}
                    {/*                               setState({...state, primaryLanguage: lang})*/}
                    {/*                           }*/}
                    {/*                       }*/}
                    {/*                       setDropDownOpen(false);*/}
                    {/*                   }}*/}
                    {/*                   onBlur={() => setDropDownOpen(false)}*/}
                    {/*                >*/}
                    {/*                    {languageLabel[lang]} Only</a>*/}
                    {/*            )*/}
                    {/*        })}*/}
                    {/*        {state.languageList.length === 2 ?*/}
                    {/*            <a className={`dropdownItem ${state.isBilingual ? "bg-blue-500 text-white" : "bg-transparent text-black"}`}*/}
                    {/*               href="#"*/}
                    {/*               onClick={(e) => {*/}
                    {/*                   e.preventDefault();*/}
                    {/*                   if (!state.isBilingual) {*/}
                    {/*                       handleLangChange()*/}
                    {/*                   }*/}
                    {/*                   setDropDownOpen(false);*/}
                    {/*               }}>Bilingual</a>*/}
                    {/*            : null*/}
                    {/*        }*/}

                    {/*    </div>*/}
                    {/*</ClickAwayListener>*/}

                </div>

            </div>
            <div className={`mt-1 ${!state.isBilingual ? "hidden" : ""}`}>
                <div className={`multiLangField`}>
                    <input
                        className="multiLangFieldInput"
                        type="text"
                        value={state.secondaryContent}
                        onChange={(event) => {
                            setState({...state, secondaryContent: event.target.value})
                        }}
                        onBlur={() => {
                            handleChange()
                        }}
                    />
                    <div className="multiLangFieldSelect">
                        <div className="w-full h-full items-center justify-center">
                            <button type="button"
                                className="w-full h-full items-center justify-center flex flex-row"
                                    onClick={(event) => {
                                        setState({
                                            ...state,
                                            isBilingual: false,
                                            secondaryLanguage: "",
                                            secondaryContent: "",
                                            discardedContent: state.secondaryContent
                                        })
                                    }}>{state.secondaryLanguage}
                                <BsX size={"0.9em"}/>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <a className={`undoBtn ${!state.discardedContent ? "hidden" : ""}`}
                   onClick={() => {
                       handleLangChange()
                   }}>
                    {t('btn-undo')}
                </a>
            </div>
        </React.Fragment>
    );
}