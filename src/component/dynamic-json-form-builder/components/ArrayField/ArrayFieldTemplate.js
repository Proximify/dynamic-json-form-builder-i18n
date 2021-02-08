import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {AiOutlinePlusCircle, AiOutlineQuestionCircle} from "react-icons/ai";
import ModalArrayItem from "../utils/Modals";
import Formatter from "../../../../utils/formatter";
import './ArrayField.css'
import {BsTrashFill} from "react-icons/bs";
import Tooltip from "../../../Tooltip";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

export default function ArrayFieldTemplate(props) {
    console.log("ArrayFieldTemplate", props);
    const {title, items, canAdd, onAddClick, required, formData, formContext, schema} = props;
    const {t, i18n} = useTranslation();

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

    const formDataInit = () => {
        const data = [];
        console.log(fieldItems);
        fieldItems.forEach((item, index) => {
            data.push(
                <li key={index}
                    onClick={() => {
                        const fi = [...fieldItems];
                        fi[index].open = true;
                        fi[index].edit = true;
                        fi[index].data = items[index].children.props.formData;
                        setFieldItems(fi);
                    }}>
                    <Formatter app={"CV"}
                               structureChain={[...formContext.structureChain, schema.id]}
                               isFullScreenViewMode={false}
                               schema={schema}
                               rawData={formData[index]}
                    />
                </li>
            )
        })
        return data;
    }

    return (
        <div className="flex flex-wrap justify-center my-3">
            <div className="w-1/4 flex-grow text-base font-medium text-gray-700">
                <div className="flex items-center">
                    <label className="mr-2">{title}</label>
                    <p className="text-red-700">{required && "*"}</p>
                    <Tooltip
                        placement="right"
                        trigger="hover"
                        delayHide={150}
                        tooltip={
                            <>
                                <p>{schema.description}</p>
                                <p>{descriptions[schema.field_type]}</p>
                            </>
                        }
                        modifiers={[
                            {
                                name: "offset",
                                enabled: true,
                                options: {
                                    offset: [0, 10]
                                }
                            }
                        ]}
                    >
                        <AiOutlineQuestionCircle/>
                    </Tooltip>
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
                        className={`${formData && formData.length > 0 ? "border border-gray-300 rounded mt-1" : "hidden"}`}>
                        <ul>
                            <p className="border-b px-2 border-gray-300 text-base">{title}:</p>
                            {formDataInit()}
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