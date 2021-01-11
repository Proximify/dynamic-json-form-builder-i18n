import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {PlusCircleIcon} from "@primer/octicons-react";
import ModalArrayItem from "../utils/Modals";
import Formatter from "../utils/formatter";
import './ArrayField.css'
import {BsTrashFill} from "react-icons/bs";

export default function ArrayFieldTemplate(props) {
    console.log("ArrayFieldTemplate", props);
    const {title, items, canAdd, onAddClick, required, formData, formContext, schema} = props;

    const [state, setState] = useState({
        open: false,
        index: NaN,
        edit: false,
        dataPrevious: null
    });
    const {t, i18n} = useTranslation();

    const formDataInit = () => {
        const data = [];

        formData.forEach((element, index) => {
            // console.log(element)
            data.push(
                <li className={`flex justify-between py-1 mx-2 ${index < formData.length - 1 ? "border-b border-gray-300" : ""}`}
                    key={index}>
                    <div
                        className="hover:text-gray-600"
                        onClick={() => {
                            setState({
                                ...state,
                                open: true,
                                index: index,
                                edit: true,
                                dataPrevious: items[index].children.props.formData
                            })
                        }}>
                        <Formatter app={formContext.app}
                                   form={formContext.form}
                                   section={schema.id}
                                   fields={items[0].children.props.schema.properties}
                                   values={formData[index]}
                        />
                    </div>
                    <div>
                        <a type="button"
                           className="text-gray-500"
                           data-toggle={"tooltip"}
                           data-placement={"left"}
                           title={"Delete this content"}
                           id={`${formContext.app}_${formContext.form}_${title}_modal_item_cancel_btn_${index}`}
                           onClick={
                               items[index].onDropIndexClick(index)
                           }
                        > <BsTrashFill size={"0.8em"}/>
                        </a>
                    </div>
                </li>
            )
        })

        return data;
    }

    return (
        <div className="flex flex-wrap justify-center pt-3">
            <label
                className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2 pl-2">
                {title}{required ? "*" : null}</label>
            <div className="flex-grow" style={{maxWidth: "20rem"}}>
                <div className="sectionData">
                    {canAdd &&
                    <a type="button" className="text-blue-600" onClick={() => {
                        setState({
                            ...state,
                            open: true,
                            index: items.length,
                            edit: false
                        })
                        return onAddClick();
                    }}>< PlusCircleIcon
                        size={16}/></a>}
                    <div className={`${formData && formData.length > 0 ? "border border-gray-300 rounded mt-1" : "hidden"}`}>
                        <ul>
                            <p className="border-b px-2 border-gray-300">{title}:</p>
                            {formDataInit()}
                        </ul>
                    </div>
                </div>
                <div id={`${title}_modal`}>
                    {state.open ?
                        <ModalArrayItem state={state} setState={setState} items={items} context={formContext}
                                        title={title} fullScreen={!!(schema.hasOwnProperty("fullScreen") && schema.fullScreen)}/> : null}
                </div>
            </div>
        </div>
    )
}