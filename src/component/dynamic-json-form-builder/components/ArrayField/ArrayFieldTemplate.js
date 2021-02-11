import React, {useState} from 'react';
import {AiOutlinePlusCircle, AiOutlineQuestionCircle} from "react-icons/ai";
import {BiPencil} from 'react-icons/bi';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import ModalArrayItem from "../utils/Modals";
import Formatter from "../../../../utils/formatter";
import './ArrayField.css'
import Tooltip from "../../../Tooltip";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

export function ReorderableArrayFieldTemplate(props) {
    // console.log("ReorderableArrayFieldTemplate", props);
    const {title, items, canAdd, onAddClick, required, formData, formContext, schema} = props;
    // console.log(schema.description)

    const [fieldItems, setFieldItems] = useState(
        () => {
            const array = [];
            formData.forEach((data, index) => {
                array.push({
                    open: false,
                    index: index,
                    edit: false,
                    data: items[index].children.props.formData
                })
            });
            return array;
        }
    );

    const reorderOnItemDelete = (index) => {

        for (let i = index; i < items.length; i++) {
            // console.log("reorder", items)
            formData[i]["order"]--;
        }
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination)
            return;
        const fi = [...fieldItems];
        const si = result.source.index;
        const di = result.destination.index;
        [fi[si], fi[di]] = [fi[di], fi[si]];
        items[si].onReorderClick(si, di)("");
        if (di < si) {
            formData[si]["order"] = di + 1;
            for (let i = di; i < si; i++) {
                formData[i]["order"]++;
            }
        } else if (si < di) {
            formData[si]["order"] = di + 1;
            for (let i = si + 1; i <= di; i++) {
                formData[i]["order"]--;
            }
        }
        setFieldItems(fi);
    }

    return (
        <div className="flex flex-wrap justify-center my-3">
            <div className="w-1/4 flex-grow text-base font-medium text-gray-700">
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
                        <AiOutlineQuestionCircle className="text-gray-400 mx-1"/>
                    </Tooltip>}
                </div>
            </div>
            <div className="flex-grow" style={{maxWidth: "20rem"}}>
                <div className="sectionData">
                    {canAdd &&
                    <a type="button" className="text-blue-600"
                       onClick={() => {
                           const fi = [...fieldItems];
                           fi.push({
                               open: true,
                               index: items.length,
                               edit: false,
                               data: undefined
                           })
                           setFieldItems(fi);
                           return onAddClick();
                       }}
                    >< AiOutlinePlusCircle/></a>}
                    <div
                        className={`${formData && formData.length > 0 ? "border border-gray-300 rounded mt-1 text-sm" : "hidden"}`}>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId={title}>
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            fieldItems.map((item, index) => {
                                                return (
                                                    <Draggable key={index} draggableId={`${schema.id}_${index}`}
                                                               index={index}>
                                                        {(provided) => (
                                                            <li {...provided.draggableProps} {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                className={`flex mx-1 py-1 pl-1 justify-between items-center ${index < items.length - 1 ? "border-b" : ""}`}
                                                            >
                                                                <Formatter app={"CV"}
                                                                           structureChain={[...formContext.structureChain, schema.id]}
                                                                           isFullScreenViewMode={false}
                                                                           schema={schema}
                                                                           rawData={formData[index]}
                                                                />
                                                                <BiPencil
                                                                    className="cursor-pointer mx-1"
                                                                    onClick={() => {
                                                                        const fi = [...fieldItems];
                                                                        fi[index].open = true;
                                                                        fi[index].edit = true;
                                                                        fi[index].data = items[index].children.props.formData;
                                                                        setFieldItems(fi);
                                                                    }}
                                                                />
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                )
                                            })
                                        }
                                        {provided.placeholder}
                                    </ul>
                                )}

                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                {
                    fieldItems.length > 0 &&
                    fieldItems.map((item, index) => {
                        if (item.open) {
                            if (item.edit === false) {
                                formData[item.index]["order"] = item.index + 1;
                            }
                        }
                        return item.open &&
                            <ModalArrayItem key={index} fieldItems={fieldItems} setFieldItems={setFieldItems}
                                            index={index}
                                            items={items} context={formContext}
                                            dropItem={items[index].onDropIndexClick(index)}
                                            reorder={reorderOnItemDelete}
                                            title={title}
                                            fullScreen={!!(schema.hasOwnProperty("fullScreen") && schema.fullScreen)}/>

                    })
                }
            </div>
        </div>
    )
}

export function ArrayFieldTemplate(props) {
    const {title, items, canAdd, onAddClick, required, formData, formContext, schema} = props;

    const [fieldItems, setFieldItems] = useState(
        () => {
            const array = [];
            formData.forEach((data, index) => {
                array.push({
                    open: false,
                    index: index,
                    edit: false,
                    data: items[index].children.props.formData
                })
            });
            return array;
        }
    );

    return (
        <div className="flex flex-wrap justify-center my-3">
            <div className="w-1/4 flex-grow text-base font-medium text-gray-700">
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
                        <AiOutlineQuestionCircle className="text-gray-400 mx-1"/>
                    </Tooltip>}
                </div>
            </div>
            <div className="flex-grow" style={{maxWidth: "20rem"}}>
                <div className="sectionData">
                    {canAdd &&
                    <a type="button" className="text-blue-600"
                       onClick={() => {
                           const fi = [...fieldItems];
                           fi.push({
                               open: true,
                               index: items.length,
                               edit: false,
                               data: undefined
                           })
                           setFieldItems(fi);
                           return onAddClick();
                       }}
                    >< AiOutlinePlusCircle/></a>}
                    <div
                        className={`${formData && formData.length > 0 ? "border border-gray-300 rounded mt-1 text-sm" : "hidden"}`}>
                        <ul>
                            {
                                fieldItems.map((item, index) => {
                                    return (
                                        <li key={index}
                                            className={`flex mx-1 py-1 pl-1 justify-between items-center ${index < items.length - 1 ? "border-b" : ""}`}
                                        >
                                            <Formatter app={"CV"}
                                                       structureChain={[...formContext.structureChain, schema.id]}
                                                       isFullScreenViewMode={false}
                                                       schema={schema}
                                                       rawData={formData[index]}
                                            />
                                            <BiPencil
                                                className="cursor-pointer mx-1"
                                                onClick={() => {
                                                    const fi = [...fieldItems];
                                                    fi[index].open = true;
                                                    fi[index].edit = true;
                                                    fi[index].data = items[index].children.props.formData;
                                                    setFieldItems(fi);
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
                    fieldItems.length > 0 &&
                    fieldItems.map((item, index) => {
                        return item.open &&
                            <ModalArrayItem key={index} fieldItems={fieldItems} setFieldItems={setFieldItems}
                                            index={index}
                                            items={items} context={formContext}
                                            dropItem={items[index].onDropIndexClick(index)}
                                            title={title}
                                            fullScreen={!!(schema.hasOwnProperty("fullScreen") && schema.fullScreen)}/>
                    })
                }
            </div>
        </div>
    )
}