import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {PlusCircleIcon} from "@primer/octicons-react";
import ModalRegular from "../widgets/ModalWidgets";

export function ModalFieldTemplate(props) {
    console.log("ModalFieldTemplate", props);
    const {title, items, canAdd, onAddClick, required, formData} = props;

    const [state, setState] = useState({
        open: false,
        index: NaN,
        edit: false,
        dataPrevious: null
    });
    const {t, i18n} = useTranslation();

    const formDataInit = () => {
        const data = [];
        // console.log("2")

        formData.forEach((element, index) => {
            // console.log(element)
            data.push(
                <li className={`list-group-item ${(state.index === index && !state.edit) ? "d-none" : ""}`} key={index}>
                    <div className={"col-8"} onClick={()=>{
                        setState({
                            ...state,
                            open:true,
                            index:index,
                            edit:true,
                            dataPrevious: items[index].children.props.formData
                        })
                    }}>
                        {JSON.stringify(element)}
                    </div>
                    <div className={"col-4"}>
                        <a type={"button"} className={"btn"}
                           id={`${title}_modal_item_delete_btn_${index}`}
                        onClick={items[index].onDropIndexClick(index)}>delete</a>
                    </div>
                </li>
            )
        })

        return data;
    }

    return (
        <div className="form-group row justify-content-center mx-auto my-xl-3 my-lg-3 my-md-2 my-sm-2 my-0">
            <label className="col-lg-4 col-md-3 col-sm-3 col-10 col-form-label">{title}{required ? "*" : null}</label>
            <div className="col-lg-8 col-md-9 col-sm-9 col-10">
                {canAdd &&
                <a type="button" className={"btn btn-light btn-link my-1"} onClick={() => {
                    setState({
                        ...state,
                        open: true,
                        index: items.length,
                        edit: false
                    })
                    console.log("on add click");
                    return onAddClick();
                }}>< PlusCircleIcon
                    size={16}/></a>}
                <div>
                    <ul className={"list-group"}>
                        {formDataInit()}
                    </ul>
                </div>
                <div id={`${title}_modal`}>
                    {state.open ?
                        <ModalRegular state={state} setState={setState} items={items} title={title}/> : null}
                </div>
            </div>
        </div>
    )
}