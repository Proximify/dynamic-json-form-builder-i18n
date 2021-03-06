import React, {useState, useEffect} from 'react';
import FormBuilder from '../FormBuilder';
import api, {fetchCVSchema} from "./helper/api";
import {FiEdit} from 'react-icons/fi';
import {AiOutlineFileAdd} from 'react-icons/ai'
import {ModalFullScreen} from "./Modal";
import Formatter from "../Formatter";
import SchemaParser from "../SchemaParser";
import {
    handleOnPrimaryItemCancelBtnClick,
    handleOnPrimaryItemChangeBtnClick,
    handleOnPrimaryItemSetBtnClick
} from './helper/sectionPageBuilderHelper'
import {SectionLabel, StyledSectionContainer} from "./twClass";
import {setup, tw} from "twind";
import {Reports} from './dummyData/reports.js';

const contentType = process.env.REACT_APP_CONTENT_TYPE ?? 'members';
const contentId = process.env.REACT_APP_CONTENT_ID ?? '3';
const viewType = process.env.REACT_APP_VIEW_TYPE ?? 'cv';
const withFormat = process.env.react_app_with_format ?? 'true';

export function SectionPageBuilder(props) {
    const [state, setState] = useState({
        sections: [],
        form: {},
        shouldModalOpen: false,
        scrollY: 0,
        ready: false,
        structureChain: [],
        loadingErr: ""
    })
    // console.log("SectionPageBuilder", state)

    useEffect(() => {
        if (state.ready)
            return;
        fetchCVSchema(contentType, contentId, viewType, withFormat, (res, err) => {
            if (res && !err) {
                const resData = res.data;
                const cvSections = SchemaParser(resData);
                if (cvSections.length > 0) {
                    cvSections.forEach(section => sectionSchemaBuilder(section, section.section_data, section.fields));
                    setState({
                        ...state,
                        sections: cvSections,
                        ready: true
                    })
                } else {
                    setState({
                        ...state,
                        ready: true,
                        loadingErr: `error occurs when parse cvSections, response data: ${resData} \n parsed cv sections: ${cvSections}`
                    })
                    console.warn("error occurs when parse cvSections", resData, cvSections)
                }
            } else if (!res && err) {
                setState({
                    ...state,
                    ready: true,
                    loadingErr: `error occurs when fetch cv section data, error: ${JSON.stringify(err)}`
                })
                console.warn("error occurs when fetch cv section data", err)
            } else {
                setState({
                    ...state,
                    ready: true,
                    loadingErr: `unhandled response from server on cv page, response: ${res} \n error: ${JSON.stringify(err)}`
                })
                console.warn("unhandled response from server on cv page", res, err)
            }
        })

    }, [state.ready])

    useEffect(() => {
        if (!state.ready)
            return;
        if (state.shouldModalOpen === true) {
            document.body.style.position = 'fixed';
        } else {
            console.log('end', state.scrollY)
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, state.scrollY);
        }
    }, [state.shouldModalOpen])

    const sectionSchemaBuilder = (section, section_data, fields) => {
        if (section["type"] === "form") {
            if (section.primary_item === '1') {
                section["primaryItemUpdate"] = false;
            }
        } else if (section["type"] === "section") {
            Object.keys(section["subsections"]).forEach(key => {
                const subsection = section["subsections"][key];
                const dataArray = [];
                section_data.forEach(data => dataArray.push(data.values))
                Object.keys(fields).forEach(key => {
                    const field = fields[key];
                    if (field["subsection_id"] === subsection["section_id"]) {
                        const field_id = field["field_id"];
                        subsection["section_data"] = []
                        dataArray.forEach(data => {
                            Object.keys(data).forEach(dataKey => {
                                if (dataKey === field_id) {
                                    subsection["section_data"] = data[dataKey]
                                }
                            })
                        })
                    }
                })
                sectionSchemaBuilder(subsection, subsection["section_data"], subsection.fields);
            })
        }
    }

    const handleFormSubmitRes = (response, error) => {
        if (response) {
            if (!response.data.error) {
                const formSchema = SchemaParser({sections: [response.data]}, false);
                //console.log(formSchema)
                const newSection = [...state.sections];
                const targetForm = getFormRecur(state.sections, state.form.structureChain);
                const newData = formSchema[0].section_data;
                if (targetForm) {
                    if (state.form.itemId !== "0") {
                        const index = targetForm.section_data.findIndex(data => data.id === newData[0].id)
                        if (index >= 0) {
                            targetForm.section_data[index] = newData[0];
                        }
                    } else {
                        targetForm.section_data.push(newData[0]);
                    }
                    setState({
                        ...state,
                        sections: newSection,
                        shouldModalOpen: false,
                        form: null,
                    })
                } else {
                    console.error("cannot find target form")
                }
            } else {
                console.error(response)
                setState({
                    ...state,
                    shouldModalOpen: false,
                    form: null
                })
            }
        } else if (error) {
            console.error(error);
            setState({
                ...state,
                shouldModalOpen: false,
                form: null
            })
        }
    }

    const handleFormCancel = () => {
        setState({
            ...state,
            shouldModalOpen: false,
            form: null
        })
    }

    const handleFormDeleteRes = (response, error) => {
        if (response) {
            if (!response.data.error) {
                const newSection = [...state.sections];
                const targetForm = getFormRecur(newSection, state.form.structureChain);
                const newData = response.data.items;
                if (targetForm) {
                    if (state.form.itemId !== "0") {
                        const index = targetForm.section_data.findIndex(data => data.id === newData[0].id.toString())
                        if (index >= 0) {
                            targetForm.section_data.splice(index, 1);
                        }
                    }
                    setState({
                        ...state,
                        sections: newSection,
                        shouldModalOpen: false,
                        form: null,
                    })
                } else {
                    console.error("cannot find target form")
                }
            } else {
                console.error(response)
                setState({
                    ...state,
                    shouldModalOpen: false,
                    form: null
                })
            }
        } else if (error) {
            console.error(error);
            setState({
                ...state,
                shouldModalOpen: false,
                form: null
            })
        }

    }

    const handleOnItemClick = (sectionId, itemId, parentItemId, parentFieldId, structureChain, multiplicity) => {
        setState({
            ...state,
            form: {
                sectionId: sectionId,
                itemId: itemId,
                structureChain: structureChain,
                parentItemId: parentItemId,
                parentFieldId: parentFieldId,
                multiplicity: multiplicity
            },
            shouldModalOpen: true,
            scrollY: window.scrollY
        })
    }

    const getFormRecur = (sections, structureChain) => {
        if (structureChain.length === 1) {
            let section = null;
            Object.keys(sections).forEach(key => {
                if (sections[key].name === structureChain[0]) {
                    section = sections[key]
                }
            })
            return section;
        } else {
            let subSections = null;
            Object.keys(sections).forEach(key => {
                if (sections[key].name === structureChain[0]) {
                    subSections = sections[key]
                }
            })
            return subSections === null ? null : getFormRecur(subSections.subsections, structureChain.slice(1))
        }
    }

    const getParentFieldID = (section, parentSection) => {
        return Object.keys(parentSection.fields).find(fieldID => parentSection.fields[fieldID].name === section.name);
    }

    const sectionBuilder = (section, sectionIndex, layer, structureChain, parentSection = null) => {
        if (section.type === "form" && (section.disabled && section.disabled !== "1")) {
            return (
                <StyledSectionContainer key={sectionIndex} layer={layer}>
                    <div className={tw`flex items-center`}>
                        <SectionLabel topSectionLabel={layer === 3}>{section.title}</SectionLabel>
                        <p className={tw`ml-1 text-color-action hover:text-color-confirm`}>{section.multiplicity === "multiple" ?
                            <AiOutlineFileAdd size={"1.1rem"}
                                              onClick={() => {
                                                  //parentSection ? (parentSection.section_data.length > 0 ? parentSection.section_data[0].id : 0) : null
                                                  handleOnItemClick(section.section_id, "0", parentSection?.section_data[0]?.id ?? "0", parentSection ? getParentFieldID(section, parentSection) : null, structureChain, section.multiplicity)
                                              }}
                                              onDoubleClick={() => {
                                                  console.log('double clicked')
                                              }}
                            />
                            :
                            <FiEdit size={"1.1rem"}
                                    onClick={() => {
                                        // console.log(section, parentSection)
                                        handleOnItemClick(section.section_id, section.section_data[0]?.id ?? "0", parentSection?.section_data[0]?.id ?? "0", parentSection ? getParentFieldID(section, parentSection) : null, structureChain, section.multiplicity)
                                    }}
                                    onDoubleClick={() => {
                                        console.log('double clicked')
                                    }}
                            />
                        }
                        </p>
                    </div>
                    {section.section_data.length > 0 ?
                        section.section_data.map((data, itemIndex) => {
                            return (
                                <div key={itemIndex}>
                                    {!state.shouldModalOpen &&
                                    <>
                                        {(section.section_data[itemIndex].attributes && section.section_data[itemIndex].attributes.primary === true) &&
                                        <div className={tw`flex space-x-2 ml-2 text-sm`}>
                                            <p className={tw`text-yellow-700 text-base`}>Primary</p>
                                            <button
                                                className={tw`text-blue-500 hover:text-blue-400 hover:underline`}
                                                onClick={() => {
                                                    handleOnPrimaryItemChangeBtnClick(state, setState, structureChain, getFormRecur)
                                                }}>Change
                                            </button>
                                            <button
                                                className={tw`${section.primaryItemUpdate ? 'text-gray-500 hover:text-gray-700 hover:underline' : 'hidden'}`}
                                                onClick={() => {
                                                    handleOnPrimaryItemCancelBtnClick(state, setState, structureChain, getFormRecur)
                                                }}>Cancel
                                            </button>
                                        </div>}

                                        <div className={tw`mx-3 mb-1 px-2 text-sm flex justify-between`}>
                                            <input
                                                className={tw`${section.primaryItemUpdate ? 'mt-1 cursor-pointer p-0' : 'hidden'}`}
                                                type='radio'
                                                checked={!!(section.section_data[itemIndex].attributes && section.section_data[itemIndex].attributes.primary === true)}
                                                onChange={() => {
                                                    handleOnPrimaryItemSetBtnClick(state, setState, structureChain, getFormRecur, itemIndex, api);
                                                }}>
                                            </input>
                                            <div className={tw`w-11/12`}>
                                                {/*{JSON.stringify(section.section_data[itemIndex])}*/}
                                                <Formatter app={"CV"}
                                                           structureChain={[...structureChain]}
                                                           isFullScreenViewMode={true}
                                                           schema={section}
                                                           rawData={section.section_data[itemIndex]}
                                                />
                                            </div>
                                            {section.multiplicity === "multiple" ?
                                                <div className={tw`text-color-action hover:text-color-confirm`}>
                                                    <FiEdit size={"1.1rem"}
                                                            onClick={() => {
                                                                if (!section.section_data[itemIndex]) {
                                                                    console.error("unable to get item id", section);
                                                                    return;
                                                                }
                                                                if (parentSection && parentSection.section_data.length < 1) {
                                                                    console.error("unable to get parent section item id")
                                                                    return;
                                                                }
                                                                handleOnItemClick(section.section_id, section.section_data[itemIndex].id, parentSection ? parentSection.section_data[0].id : null, parentSection ? getParentFieldID(section, parentSection) : null, structureChain, section.multiplicity)
                                                            }}
                                                            onDoubleClick={(e) => {
                                                                e.preventDefault();
                                                                console.log('double clicked')
                                                            }}
                                                    />
                                                </div> : null}

                                        </div>
                                    </>
                                    }
                                </div>
                            )
                        }) : null}
                </StyledSectionContainer>
            )
        } else if (section.type === "section") {
            return (
                <StyledSectionContainer key={sectionIndex} layer={layer}>
                    <SectionLabel topSectionLabel={layer === 3}>{section.title}</SectionLabel>
                    {Object.keys(section.subsections).map((subsectionId, subsectionIndex) => sectionBuilder(section.subsections[subsectionId], subsectionIndex, layer - 1, structureChain.concat(section.subsections[subsectionId].name), section))}
                </StyledSectionContainer>)
        }
    }

    return (
        <div className={tw`mx-auto max-w-screen-md bg-gray-200 p-2`}>
            {state.ready ? (state.loadingErr === "" || !state.loadingErr ? state.sections.map((section, index) => {
                return sectionBuilder(section, index, 3, [section.name])
            }) : <div>{state.loadingErr}</div>) : <div>Loading...</div>}
            <div>
                {state.shouldModalOpen === true &&
                <ModalFullScreen
                    content={
                        <FormBuilder
                            itemId={state.form.itemId}
                            sectionId={state.form.sectionId}
                            parentItemId={state.form.parentItemId}
                            parentFieldId={state.form.parentFieldId}
                            multiplicity={state.form.multiplicity}
                            handleFormSubmitRes={handleFormSubmitRes}
                            handleFormDeleteRes={handleFormDeleteRes}
                            handleFormCancel={handleFormCancel}
                            contentType={contentType}
                            contentId={contentId}
                            viewType={viewType}
                            formContext={{
                                api: api,
                                structureChain: state.form.structureChain,
                                reports: Reports
                            }}
                        />
                    }
                    title={"title"}
                />
                }
            </div>
        </div>
    )
}