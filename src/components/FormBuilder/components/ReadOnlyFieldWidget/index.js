import React, {useEffect, useState} from "react";
import {tw} from "twind";
import {TextAreaInputStyle} from "../utils/twindClass";
import TextareaAutosize from "react-textarea-autosize";


export default function ReadOnlyFieldWidget(props) {
    console.log("ReadOnlyFieldWidget", props);
    const {formData, fieldIdNameMapper} = props.formContext;
    const {constraints,type} = props.schema;
    const [value, setValue] = useState(props.value && props.value !== "NaN" ? props.value : "0");

    useEffect(() => {
        if (constraints.autoSum) {
            let total = 0;
            console.log(constraints, fieldIdNameMapper);
            const targetFieldsId = constraints.autoSum.fields.map(field => (field.id))
            console.log(targetFieldsId);
            targetFieldsId.forEach(targetFieldId => {
                if (fieldIdNameMapper[targetFieldId]) {
                    if (!fieldIdNameMapper[targetFieldId].isSubsectionField) {
                        if (formData[fieldIdNameMapper[targetFieldId].name]) {
                            total += Number(formData[fieldIdNameMapper[targetFieldId].name]);
                        }
                    } else {
                        if (formData[fieldIdNameMapper[targetFieldId].parentName]) {
                            formData[fieldIdNameMapper[targetFieldId].parentName].forEach(subsectionFormData => {
                                if (subsectionFormData[fieldIdNameMapper[targetFieldId].name]) {
                                    total += Number(subsectionFormData[fieldIdNameMapper[targetFieldId].name])
                                }
                            })
                        }
                    }
                }
            })
            setValue(total);
            props.onChange(total.toString());
        }
    }, [formData])

    if (props.schema.currencyField === 'convertedAmount'){
        return <p>{value}</p>
    }
    return (
        <TextareaAutosize
            minRows={1}
            readOnly={true}
            id={props.schema.id}
            value={value + `${type === 'slider' ? '%' : ''}`}
            className={tw`${TextAreaInputStyle} bg-gray-200`}
        />
    );
}