import React, {useState, useEffect} from 'react';
import {AiOutlinePlusCircle, AiOutlineQuestionCircle} from "react-icons/ai";
import {BiPencil} from 'react-icons/bi';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import ModalArrayItem from "../utils/Modals";
import Formatter from "../../../../utils/formatter";
import './ArrayField.css'
import Tooltip from "../../../Tooltip";
import {stringify} from "postcss";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

export function ReorderableArrayFieldTemplate(props) {
    console.log("ReorderableArrayFieldTemplate", props);
    const {title, items, canAdd, onAddClick, required, formData, formContext, schema} = props;

    const [state, setState] = useState(
        {
            open: false,
            edit: false,
            index: -1,
            dataPrev: null
        }
    )

    const handleOnDragEnd = (result) => {
        if (!result.destination)
            return;
        const sortedFormData = [...formData].sort((a, b) => (a.order > b.order ? 1 : -1));
        const si = result.source.index;
        const di = result.destination.index;

        const sItem = sortedFormData[si];
        const dItem = sortedFormData[di];
        const sItemIndex = formData.findIndex(data => data.order === sItem.order);
        const dItemIndex = formData.findIndex(data => data.order === dItem.order);
        // console.log(sItem, dItem, sItemIndex, dItemIndex);

        if (di < si) {
            formData[sItemIndex]["order"] = -1;
            const destOrder = formData[dItemIndex]["order"];
            for (let i = si - 1; i >= di; i--) {
                let shiftItem = sortedFormData[i];
                let shiftItemIndex = formData.findIndex(data => data.order === shiftItem.order);
                // console.log("shift item ", i, shiftItem, shiftItemIndex);
                formData[shiftItemIndex]["order"]++;
            }
            formData[sItemIndex]["order"] = Number(destOrder);
        } else if (si < di) {
            formData[sItemIndex]["order"] = 999;
            const destOrder = formData[dItemIndex]["order"];
            for (let i = si + 1; i <= di; i++) {
                let shiftItem = sortedFormData[i];
                let shiftItemIndex = formData.findIndex(data => data.order === shiftItem.order);
                // console.log("shift item ", i, shiftItem, shiftItemIndex);
                formData[shiftItemIndex]["order"]--;
            }
            formData[sItemIndex]["order"] = Number(destOrder);
        }
    }

    return (
        <div className="flex flex-wrap justify-center my-3 space-x-6">
            <div className="w-1/4 flex flex-grow text-base font-medium text-gray-700 justify-end">
                <div>
                    <div className="flex items-center">
                        {title && <label>{title}</label>}
                        {required && <p className="text-red-700 ml-1 mr-2">*</p>}
                        {schema.description && <Tooltip
                            placement="right-start"
                            trigger="hover"
                            delayHide={150}
                            tooltip={
                                <>
                                    <div dangerouslySetInnerHTML={{__html: schema.description}}/>
                                    <p>{descriptions[schema.field_type]}</p>
                                </>
                            }
                            hideArrow={true}
                            modifiers={[
                                {
                                    name: "offset",
                                    enabled: true,
                                    options: {
                                        offset: [0, 8]
                                    }
                                }
                            ]}
                        >
                            <AiOutlineQuestionCircle className="text-gray-400 mx-1" size={'1.1em'}/>
                        </Tooltip>}
                    </div>
                </div>
            </div>
            <div className="flex-grow" style={{maxWidth: "20rem"}}>
                <div className="sectionData">
                    {canAdd &&
                    <a type="button" className="text-blue-600"
                       onClick={() => {
                           setState({
                               ...state,
                               open: true,
                               edit: false,
                               index: formData.length,
                               dataPrev: null
                           })
                           return onAddClick();
                       }}
                    >< AiOutlinePlusCircle size={"1.2em"}/></a>}
                    <div
                        className={`${formData && formData.length > 0 ? "border border-gray-300 rounded mt-1 text-sm" : "hidden"}`}>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId={title}>
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            [...formData].sort((a, b) => (a.order > b.order ? 1 : -1)).map((item, index) => {
                                                return (
                                                    <Draggable key={index} draggableId={`${schema.id}_${index}`}
                                                               index={index}>
                                                        {(provided) => (
                                                            <li {...provided.draggableProps} {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                className={`flex mx-1 py-1 pl-1 justify-between items-center ${index < items.length - 1 ? "border-b" : ""}`}
                                                            >
                                                                <Formatter app={"CV"}
                                                                           structureChain={[...formContext.structureChain, schema.name]}
                                                                           isFullScreenViewMode={false}
                                                                           schema={schema}
                                                                           rawData={item}
                                                                />
                                                                <BiPencil
                                                                    className="cursor-pointer mx-1"
                                                                    onClick={() => {
                                                                        const itemIndex = formData.findIndex(data => data.order === item.order);
                                                                        setState({
                                                                            ...state,
                                                                            open: true,
                                                                            edit: true,
                                                                            index: itemIndex,
                                                                            dataPrev: formData[itemIndex]
                                                                        })
                                                                    }}
                                                                />
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}

                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                {
                    formData.length > 0 && state.open && state.index >= 0 &&
                    formData.map((item, index) => {
                        if (index === state.index) {
                            if (!state.edit) {
                                // TODO: investigate why order += 2
                                formData[index]["order"] = Math.max(...formData.map(data => data.order ?? 0)) + 1;
                            }
                        }
                        return index === state.index &&
                            <ModalArrayItem key={index} state={state}
                                            setState={setState}
                                            index={index}
                                            children={items[index].children}
                                            context={formContext}
                                            dropItem={items[index].onDropIndexClick(index)}
                                            title={title}
                                            fullScreen={!!(schema.hasOwnProperty("fullScreen") && schema.fullScreen)}/>

                    })
                }
            </div>
        </div>
    )
}

export function ArrayFieldTemplate(props) {
    // console.log("ArrayFieldTemplate", props);
    const {title, items, canAdd, onAddClick, required, formData, formContext, schema} = props;

    const [state, setState] = useState(
        {
            open: false,
            edit: false,
            index: -1,
            dataPrev: null
        }
    )

    return (
        <div className="flex flex-wrap justify-center my-3 space-x-6">
            <div className="w-1/4 flex flex-grow text-base font-medium text-gray-700 justify-end">
                <div>
                    <div className="flex items-center">
                        {title && <label>{title}</label>}
                        {required && <p className="text-red-700 ml-1 mr-2">*</p>}
                        {schema.description && <Tooltip
                            placement="right-start"
                            trigger="hover"
                            delayHide={150}
                            tooltip={
                                <>
                                    <div dangerouslySetInnerHTML={{__html: schema.description}}/>
                                    <p>{descriptions[schema.field_type]}</p>
                                </>
                            }
                            hideArrow={true}
                            modifiers={[
                                {
                                    name: "offset",
                                    enabled: true,
                                    options: {
                                        offset: [0, 8]
                                    }
                                }
                            ]}
                        >
                            <AiOutlineQuestionCircle className="text-gray-400 mx-1" size={"1.1em"}/>
                        </Tooltip>}
                    </div>
                </div>
            </div>
            <div className="flex-grow" style={{maxWidth: "20rem"}}>
                <div className="sectionData">
                    {canAdd &&
                    <a type="button" className="text-blue-600"
                       onClick={() => {
                           setState({
                               ...state,
                               open: true,
                               edit: false,
                               index: formData.length,
                               dataPrev: null
                           })
                           return onAddClick();
                       }}
                    >< AiOutlinePlusCircle size={"1.2em"}/></a>}
                    <div
                        className={`${formData && formData.length > 0 ? "border border-gray-300 rounded mt-1 text-sm" : "hidden"}`}>
                        <ul>
                            {
                                formData.map((item, index) => {
                                    return (
                                        <li key={index}
                                            className={`flex mx-1 py-1 pl-1 justify-between items-center ${index < items.length - 1 ? "border-b" : ""}`}
                                        >
                                            <Formatter app={"CV"}
                                                       structureChain={[...formContext.structureChain, schema.name]}
                                                       isFullScreenViewMode={false}
                                                       schema={schema}
                                                       rawData={item}
                                            />
                                            <BiPencil
                                                className="cursor-pointer mx-1"
                                                onClick={() => {
                                                    setState({
                                                        ...state,
                                                        open: true,
                                                        edit: true,
                                                        index: index,
                                                        dataPrev: formData[index]
                                                    })
                                                }}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                {
                    formData.length > 0 && state.open && state.index >= 0 &&
                    formData.map((item, index) => {
                        return index === state.index &&
                            <ModalArrayItem key={index} state={state}
                                            setState={setState}
                                            index={index}
                                            children={items[index].children} context={formContext}
                                            dropItem={items[index].onDropIndexClick(index)}
                                            title={title}
                                            fullScreen={!!(schema.hasOwnProperty("fullScreen") && schema.fullScreen)}/>

                    })
                }
            </div>
        </div>
    )
}