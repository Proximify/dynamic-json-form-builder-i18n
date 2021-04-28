import React, {useEffect, useState} from "react";
import {tw} from "twind";
import {TextAreaInputStyle} from "../utils/twindClass";
import TextareaAutosize from "react-textarea-autosize";


export default function ReadOnlyFieldWidget(props) {
    console.log("ReadOnlyFieldWidget", props);
    const {formData} = props.formContext;
    const {constraints} = props.schema;
    const [value, setValue] = useState(props.value && props.value !== "NaN" ? props.value : "0");

    useEffect(() => {
        if (constraints.autoSum) {
            let total = 0;
            if (formData.undergraduate_teaching) {
                total += Number(formData.undergraduate_teaching)
            }
            if (formData.graduate_professional_teaching) {
                total += Number(formData.graduate_professional_teaching)
            }
            if (formData.external_teaching) {
                formData.external_teaching.forEach(subsection => {
                    if (subsection.external_workload){
                        total += Number(subsection.external_workload)
                    }
                })
            }
            if (formData.internal_activities) {
                total += Number(formData.internal_activities)
            }
            if (formData.academic_administration) {
                total += Number(formData.academic_administration)
            }
            if (formData.external_activities) {
                total += Number(formData.external_activities)
            }
            setValue(total);

        }
    }, [formData])


    return (
        <TextareaAutosize
            minRows={1}
            readOnly={true}
            id={props.schema.id}
            value={value}
            className={tw`${TextAreaInputStyle} bg-gray-200`}
        />
    );
}