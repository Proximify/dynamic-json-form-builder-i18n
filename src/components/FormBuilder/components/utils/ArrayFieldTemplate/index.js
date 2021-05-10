import isEmpty from 'lodash/isEmpty'
import React, {useState} from 'react';
import {AiOutlinePlusCircle, AiOutlineQuestionCircle} from "react-icons/ai";
import {BiPencil} from 'react-icons/bi';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import ModalArrayItem from "../Modals";
import {formatBuilder} from "../ArrayFieldFormatter"
import Tooltip from "../Tooltip";
import {
    FieldContainer,
    FieldControlContainer,
    FieldLabelContainer,
    SubsectionFormatterContainerStyle
} from "../twindClass";
import {tw} from "twind";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

const subsectionNeedByReport = (subsectionName, reports) => {
    const reportsNeedFields = [];
    for (const [reportId, report] of Object.entries(reports)) {
        if (report.fields.includes(subsectionName)) {
            reportsNeedFields.push({reportName: report.name, color: report.color});
        }
    }
    return reportsNeedFields;
}

const itemValueValidator = (itemData, arrayFieldSchema, mandatoryValidate = true) => {
    const {items} = arrayFieldSchema;
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
            if (mandatoryValidate) {
                Object.keys(items.properties).forEach(subFieldName => {
                    if (items.properties[subFieldName].mandatory === true) {
                        if (!itemData[subFieldName]) {
                            valid = false;
                        }
                    }
                })
            }
            return valid;
        }
    }
}

export function ArrayFieldTemplate(props) {
    const {title, items, canAdd, onAddClick, formData, formContext, schema, rawErrors} = props;

    const [state, setState] = useState(
        {
            open: false,
            edit: false,
            index: -1,
            dataPrev: null,
            sortable: schema.sortable
        }
    )

    const reportsNeedSubsection = subsectionNeedByReport(schema.name, formContext.reports);


    const isItemValueValid = (index) => {
        return itemValueValidator(formData[index], schema, formContext.mandatoryFieldValidation)
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
        <div className={tw`${FieldContainer}`}>
            <div className={tw`${FieldLabelContainer} items-start!`}>
                {reportsNeedSubsection.map((report, index) => {
                    return (<Tooltip
                        key={index}
                        placement="left-start"
                        trigger="hover"
                        delayHide={100}
                        tooltip={
                            <p className={tw`text-sm`}>Section used by: {report.reportName}</p>
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
                        <span className={tw`inline-block rounded-lg border-solid h-2 w-2 mr-2 mb-1`}
                              style={{backgroundColor: `${report.color}`}}/>
                    </Tooltip>)
                })}
                {title && <label className={tw`text-right text-sm font-medium text-gray-700`}>{title}</label>}
                {schema.mandatory && <p className={tw`text-red-700 mx-0.5`}>*</p>}
            </div>
            <div className={tw`${FieldControlContainer}`}>
                <div className={"subsectionFieldControl"}>
                    <div className={tw`${SubsectionFormatterContainerStyle}`}>
                        {canAdd &&
                        <a type="button"
                           className={tw`text-blue-600 flex items-center space-x-1`}
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
                        ><AiOutlinePlusCircle size={"1.1em"}/><span
                            className={tw`text-sm hover:underline cursor-pointer`}>Add</span></a>}
                        <div
                            className={formData && formData.length > 0 ? tw`border border-gray-300 rounded mt-1 text-sm` : tw`hidden`}>
                            {state.sortable ? <DragDropContext onDragEnd={handleOnDragEnd}>
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
                                                                            <div
                                                                                dangerouslySetInnerHTML={{__html: formatBuilder(item, schema.sectionFormat, schema.fields)}}/>
                                                                            {/*<Formatter app={"CV"}*/}
                                                                            {/*           structureChain={[...formContext.structureChain, schema.name]}*/}
                                                                            {/*           isFullScreenViewMode={false}*/}
                                                                            {/*           schema={schema}*/}
                                                                            {/*           rawData={item}*/}
                                                                            {/*/>*/}
                                                                        </div>
                                                                        <div className={tw`mt-0.5`}>
                                                                            <BiPencil
                                                                                className={tw`cursor-pointer mx-1 text-gray-500`}
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
                                :
                                <ul>
                                    {
                                        formData.map((item, index) => {
                                            return (
                                                <li key={index}
                                                    className={tw`flex mx-1 py-1 pl-1 justify-between items-center ${index < items.length - 1 && 'border-b'}`}
                                                >
                                                    <div>
                                                        <div
                                                            dangerouslySetInnerHTML={{__html: formatBuilder(item, schema.sectionFormat, schema.fields)}}/>

                                                        {/*<Formatter app={"CV"}*/}
                                                        {/*           structureChain={[...formContext.structureChain, schema.name]}*/}
                                                        {/*           isFullScreenViewMode={false}*/}
                                                        {/*           schema={schema}*/}
                                                        {/*           rawData={item}*/}
                                                        {/*/>*/}
                                                    </div>
                                                    <div className={tw`mt-0.5`}>
                                                        <BiPencil
                                                            className={tw`cursor-pointer mx-1 text-gray-500`}
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
                            }

                        </div>
                    </div>
                    <div>
                        <Tooltip
                            placement="right-start"
                            trigger="hover"
                            delayHide={150}
                            tooltip={
                                schema.description ? <div className={tw`text-sm`}>
                                    <div dangerouslySetInnerHTML={{__html: schema.description}}/>
                                    <div>{descriptions[schema.field_type]}</div>
                                </div> : <div className={tw`text-sm`}>{title}</div>
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
                            <AiOutlineQuestionCircle size={"1.2em"} className={tw`text-gray-300 mx-2 hover:text-gray-400`}/>
                        </Tooltip>
                    </div>
                </div>
                <div className={tw`${rawErrors ? '' : 'hidden'}`}>
                    {rawErrors ? rawErrors.map((error, index) => {
                        return (<li key={index} className={tw`text-red-600 text-sm w-72`}>{error}</li>)
                    }) : null}
                </div>
                {
                    formData.length > 0 && state.open && state.index >= 0 &&
                    formData.map((item, index) => {
                        if (state.sortable && index === state.index) {
                            if (!state.edit) {
                                formData[index]["order"] = (Math.max(...formData.map(data => data.order ?? 0)) + 1).toString();
                            }
                        }
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