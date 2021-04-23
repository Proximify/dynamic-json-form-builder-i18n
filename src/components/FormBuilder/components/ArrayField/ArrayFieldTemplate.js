import isEmpty from 'lodash/isEmpty'
import React, {useState} from 'react';
import {AiOutlinePlusCircle, AiOutlineQuestionCircle} from "react-icons/ai";
import {BiPencil} from 'react-icons/bi';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import ModalArrayItem from "../utils/Modals";
import Formatter from "../../../Formatter";
import Tooltip from "../../../Tooltip";
import {SubsectionFormatterContainerStyle} from "../utils/twindClass";
import {tw} from "twind";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

const itemValueValidator = (itemData) => {
    const itemFormData = {...itemData};
    if (isEmpty(itemFormData)) {
        return false;
    } else {
        delete itemFormData.order;
        delete itemFormData.itemId;
        if (isEmpty(itemFormData)) {
            return false;
        } else {
            let valid = false;
            Object.values(itemFormData).forEach(formData => {
                if (formData) {
                    valid = true;
                }
            })
            return valid;
        }
    }
}

export function SortableArrayFieldTemplate(props) {
    const {title, items, canAdd, onAddClick, required, formData, formContext, schema} = props;

    const [state, setState] = useState(
        {
            open: false,
            edit: false,
            index: -1,
            dataPrev: null
        }
    )

    const isItemValueValid = (index) => {
        return itemValueValidator(formData[index]);
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination)
            return;
        const sortedFormData = [...formData].sort((a, b) => ((a.order && b.order) && Number(a.order) > Number(b.order) ? 1 : -1));
        const si = result.source.index;
        const di = result.destination.index;

        const sItem = sortedFormData[si];
        const dItem = sortedFormData[di];
        const sItemIndex = formData.findIndex(data => data.order === sItem.order);
        const dItemIndex = formData.findIndex(data => data.order === dItem.order);

        if (di < si) {
            formData[sItemIndex]["order"] = -1;
            const destOrder = formData[dItemIndex]["order"];
            for (let i = si - 1; i >= di; i--) {
                let shiftItem = sortedFormData[i];
                let shiftItemIndex = formData.findIndex(data => data.order === shiftItem.order);
                const newData = formData[shiftItemIndex];
                newData['order'] = (Number(formData[shiftItemIndex]["order"]) + 1).toString();
                items[shiftItemIndex].children.props.onChange(newData);
            }
            const newData = formData[sItemIndex];
            newData['order'] = destOrder.toString()
            items[sItemIndex].children.props.onChange(newData);
        } else if (si < di) {
            formData[sItemIndex]["order"] = 999;
            const destOrder = formData[dItemIndex]["order"];
            for (let i = si + 1; i <= di; i++) {
                let shiftItem = sortedFormData[i];
                let shiftItemIndex = formData.findIndex(data => data.order === shiftItem.order);
                const newData = formData[shiftItemIndex];
                newData['order'] = (Number(formData[shiftItemIndex]["order"]) - 1).toString();
                items[shiftItemIndex].children.props.onChange(newData);
            }
            const newData = formData[sItemIndex];
            newData['order'] = destOrder.toString()
            items[sItemIndex].children.props.onChange(newData);
        }
    }

    return (
        <div className={tw`flex flex-wrap justify-center my-3 space-x-6`}>
            <div className={tw`w-1/4 flex flex-grow text-sm font-medium text-gray-700 justify-end`}>
                <div>
                    <div className={tw`flex items-center`}>
                        {title && <label>{title}</label>}
                        {required && <p className={tw`text-red-700 ml-1 mr-2`}>*</p>}
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
                            <AiOutlineQuestionCircle size={'1.1em'} className={tw`text-gray-400 mx-1`}/>
                        </Tooltip>}
                    </div>
                </div>
            </div>
            <div style={{maxWidth: "20rem"}} className={tw`flex-grow`}>
                <div className={tw`${SubsectionFormatterContainerStyle}`}>
                    {canAdd &&
                    <a type="button"
                       className={tw`text-blue-600`}
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
                        className={formData && formData.length > 0 ? tw`border border-gray-300 rounded mt-1 text-sm` : tw`hidden`}>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId={title}>
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            [...formData].sort((a, b) => ((a.order && b.order) && Number(a.order) > Number(b.order) ? 1 : -1)).map((item, index) => {
                                                return (
                                                    <Draggable key={index} draggableId={`${schema.id}_${index}`}
                                                               index={index}>
                                                        {(provided) => (
                                                            <li {...provided.draggableProps} {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                className={index < items.length - 1 ? tw`flex mx-1 py-1 pl-1 justify-between border-b` : tw`flex mx-1 py-1 pl-1 justify-between`}
                                                            >
                                                                <div>
                                                                    <Formatter app={"CV"}
                                                                               structureChain={[...formContext.structureChain, schema.name]}
                                                                               isFullScreenViewMode={false}
                                                                               schema={schema}
                                                                               rawData={item}
                                                                    />
                                                                </div>
                                                                <div className={tw`mt-0.5`}>
                                                                    <BiPencil
                                                                        className={tw`cursor-pointer mx-1`}
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
                                                                </div>
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
                                formData[index]["order"] = (Math.max(...formData.map(data => data.order ?? 0)) + 1).toString();
                            }
                        }
                        return index === state.index &&
                            <ModalArrayItem
                                key={index} state={state}
                                setState={setState}
                                index={index}
                                children={items[index].children}
                                context={formContext}
                                dropItem={items[index].onDropIndexClick(index)}
                                title={title}
                                itemValueValidator={isItemValueValid}
                            />
                    })
                }
            </div>
        </div>
    )
}

export function ArrayFieldTemplate(props) {
    const {title, items, canAdd, onAddClick, required, formData, formContext, schema} = props;

    const [state, setState] = useState(
        {
            open: false,
            edit: false,
            index: -1,
            dataPrev: null
        }
    )

    const isItemValueValid = (index) => {
        return itemValueValidator(formData[index])
    }

    return (
        <div className={tw`flex flex-wrap justify-center my-3 space-x-6`}>
            <div className={tw`w-1/4 flex flex-grow text-sm font-medium text-gray-700 justify-end`}>
                <div>
                    <div className={tw`flex items-center`}>
                        {title && <label>{title}</label>}
                        {required && <p className={tw`text-red-700 ml-1 mr-2`}>*</p>}
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
                            <AiOutlineQuestionCircle size={"1.1em"} className={tw`text-gray-400 mx-1`}/>
                        </Tooltip>}
                    </div>
                </div>
            </div>
            <div style={{maxWidth: "20rem"}} className={tw`flex-grow`}>
                <div className={tw`${SubsectionFormatterContainerStyle}`}>
                    {canAdd &&
                    <a type="button"
                       className={tw`text-blue-600`}
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
                        className={formData && formData.length > 0 ? tw`border border-gray-300 rounded mt-1 text-sm` : tw`hidden`}>
                        <ul>
                            {
                                formData.map((item, index) => {
                                    return (
                                        <li key={index}
                                            className={index < items.length - 1 ? tw`flex mx-1 py-1 pl-1 justify-between border-b` : tw`flex mx-1 py-1 pl-1 justify-between`}
                                        >
                                            <div>
                                                <Formatter app={"CV"}
                                                           structureChain={[...formContext.structureChain, schema.name]}
                                                           isFullScreenViewMode={false}
                                                           schema={schema}
                                                           rawData={item}
                                                />
                                            </div>
                                            <div className={tw`mt-0.5`}>
                                                <BiPencil
                                                    className={tw`cursor-pointer mx-1 align-top`}
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
                                            </div>
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
                            <ModalArrayItem
                                key={index}
                                title={title}
                                state={state}
                                setState={setState}
                                index={index}
                                children={items[index].children}
                                context={formContext}
                                dropItem={items[index].onDropIndexClick(index)}
                                itemValueValidator={isItemValueValid}
                            />
                    })
                }
            </div>
        </div>
    )
}