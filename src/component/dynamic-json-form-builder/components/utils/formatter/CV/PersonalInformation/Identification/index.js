import React from "react";
import {Months, FieldValueMapper, FormatterTracker} from "../../../utils/helper";

export default function Identification(props) {
    // console.log("Identification", props)
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;
    // const months = [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July',
    //     'August',
    //     'September',
    //     'October',
    //     'November',
    //     'December'
    // ];
    //
    //
    // const fieldValueMapper = (value, schema) => {
    //     const fields = schema.fields
    //     const result = {}
    //     Object.keys(fields).forEach(fieldKey => {
    //         Object.keys(value).forEach(valueKey => {
    //             if (fieldKey === valueKey) {
    //                 result[fields[fieldKey].name] = {value: value[valueKey], type: fields[fieldKey]["type"], label:fields[fieldKey]["label"]}
    //                 if (Array.isArray(value[valueKey]) && fields[fieldKey]["type"] === "section") {
    //                     result[fields[fieldKey].name]["value"] = []
    //                     value[valueKey].forEach(val => {
    //                         if (val.values) {
    //                             // result[fields[fieldKey].name]["value"] = []
    //                             Object.keys(schema.subsections).forEach(key => {
    //                                 result[fields[fieldKey].name]["value"].push(fieldValueMapper(val.values, schema.subsections[key]))
    //                             })
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     })
    //     return result
    // }


    // console.log(fieldValueMapper(formData, schema))

    //a generic function that getting all data and tracking which one is been called to display use certain format, the rest of them will use default display style
    // var map = f(formData, formSchema, 'display'); // FieldValueMap
    //
    // labels.first_name；
    // values.first_name;

    // const formatter = [
    //     <span><strong>{map.value('first_name')} </strong></span>,
    //     <span><strong>{map.value('last_name')} </strong><strong>{map.value('previous_first_name')} </strong></span>,,
    // ];
    //
    //
    //
    //     {
    //      <span><strong>{map.value('first_name')} </strong></span>,
    //     24: <span><strong>{map.label('first_name')} </strong></span>,
    //     25: <span><strong>{formData["25"]} </strong></span>,
    //     23: <span><strong>{formData["23"]} </strong></span>,
    //     26: <p><span>Previous Family Name: </span><span>{formData["26"]}</span></p>,
    //     27: <p><span>Previous First Name: </span><span>{formData["27"]}</span></p>,
    //     28: <p><span>Date of Birth: </span><span>{months[formData["28"].split("/")[0]-1]} {formData["28"].split("/")[1]}</span></p>,
    //     29: <p><span>Sex: </span><span>{formData["29"][1]}</span></p>,
    //     30: <p><span>Designated Group: </span><span>{formData["30"][1]}</span></p>,
    //     32: <p>{formData["32"] === "Not Applicable" ?
    //         <span>Canadian Residency Status: </span> : null}<span>{formData["32"][1]}</span></p>,
    //     31: <p><span>Correspondence language: </span><span>{formData["31"][1]}</span></p>,
    //     33: <p>{formData["33"] === "Yes" ? <span>Applied for Permanent Residency</span> : null}</p>,
    //     34: <p><span>Permanent Residency Start Date: </span><span>{months[formData["34"].split("-")[1] -1]} {formData["34"].split("-")[2]}, {formData["34"].split("-")[0]}</span></p>,
    //     36: <p>
    //         <span>Country of Citizenship: {formData["36"].map((value, index) => {
    //             return (<span key={index}>{value.values["35"][1]}{index < formData["36"].length - 1 ? ", " : ""}</span>)
    //         })}</span>
    //     </p>
    // }

    // const order = ["title", "first_name", "middle_name", "family_name", "previous_family_name", "previous_first_name", "date_of_birth", "sex",
    //     "designated_group", "canadian_residency_status", "correspondence_language", "applied_for_permanent_residency", "permanent_residency_start_date", "country_of_citizenship"]

    // class FormatterTracker {
    //     #allValue = {}
    //     #formattedValue = {}
    //     #unFormattedValue = {}
    //
    //     constructor(value) {
    //         this.#allValue = {...value};
    //         this.#unFormattedValue = {...value}
    //     }
    //
    //     getAllValue() {
    //         return this.#allValue
    //     }
    //
    //     getUnFormattedValue() {
    //         return this.#unFormattedValue
    //     }
    //
    //     getFormattedValue() {
    //         return this.#formattedValue
    //     }
    //
    //     get(name) {
    //         const value = this.#allValue[name];
    //         if (value !== undefined) {
    //             delete this.#unFormattedValue[name];
    //             this.#formattedValue[name] = value;
    //             return value
    //         } else {
    //             return null
    //         }
    //     }
    //
    //     getValue(name) {
    //         const value = this.get(name);
    //         // console.log(name, value)
    //         if (value) {
    //             return this.format(value)
    //         }else {
    //             return null;
    //         }
    //     }
    //
    //     getLabel(name){
    //         const value = this.get(name);
    //         if (value){
    //             return <span className={"text-black"}>{value.label}: </span> ?? null
    //         }
    //         return null
    //     }
    //
    //     format(value) {
    //         if (value.type) {
    //             switch (value.type) {
    //                 case 'lov':
    //                     return value.value[1];
    //                 case "string":
    //                     return value.value;
    //                 case "monthday":
    //                     return months[value.value.split("/")[0]] + " " + value.value.split("/")[1];
    //                 case "date":
    //                     return months[value.value.split("-")[1] - 1] + " " + value.value.split("-")[2] + ", " + value.value.split("-")[0];
    //                 case "section":
    //                     let string = ""
    //                     value.value.forEach((val, i) => {
    //                         if (i < value.value.length - 1)
    //                             string += Object.keys(val).map(key => this.format(val[key])) + ", ";
    //                         else
    //                             string += Object.keys(val).map(key => this.format(val[key]));
    //                     })
    //                     return string
    //                 default:
    //                     return JSON.stringify(value.value)
    //             }
    //         }
    //     }
    //
    //     contains(...names) {
    //         let contain = false;
    //         names.forEach(name => {
    //             if (this.#allValue[name] !== undefined) {
    //                 contain = true;
    //             }
    //         })
    //         return contain
    //     }
    // }


    if (props.isFullScreenViewMode === true) {

        const mappedValue = FieldValueMapper(formData, schema);

        console.log(mappedValue)
        // console.log("--------")
        const ft = new FormatterTracker(mappedValue);
        // console.log(ft.getFormattedValue());
        // console.log(ft.getUnFormattedValue());
        // console.log(ft.get("title"));
        // console.log(ft.get("sex"));
        // console.log(ft.get("family_name"));
        // console.log(ft.get("first_name"));
        // console.log(ft.getFormattedValue());
        // console.log(ft.getUnFormattedValue());
        // console.log("--------")

        return (
            // use label not hardcode
            <div className="border border-red-300 m-2 rounded">
                {ft.contains("title", "first_name", "middle_name", "family_name") ?
                    <p>
                        <span>{ft.getValue("title")} {ft.getValue("first_name")} {ft.getValue("middle_name")} {ft.getValue("family_name")}</span>
                    </p> :
                    null}
                {ft.contains("previous_family_name") ?
                    <p>{ft.getLabel("previous_family_name")}{ft.getValue("previous_family_name")}</p> : null}
                {ft.contains("previous_first_name") ?
                    <p>{ft.getLabel("previous_first_name")}{ft.getValue("previous_first_name")}</p> : null}
                {ft.contains("date_of_birth") ? <p>{ft.getLabel("date_of_birth")}: {ft.getValue("date_of_birth")}</p> : null}
                {ft.contains("sex") ? <p>{ft.getLabel("sex")}{ft.getValue("sex")}</p> : null}
                {ft.contains("designated_group") ? <p>{ft.getLabel("designated_group")}: {ft.getValue("designated_group")}</p> : null}
                {ft.contains("correspondence_language") ?
                    <p>{ft.getLabel("correspondence_language")}{ft.getValue("correspondence_language")}</p> : null}
                {ft.contains("canadian_residency_status") ?
                    <p>{ft.getLabel("canadian_residency_status")}{ft.getValue("canadian_residency_status")}</p> : null}
                {ft.contains("permanent_residency_start_date") ?
                    <p>{ft.getLabel("permanent_residency_start_date")}{ft.getValue("permanent_residency_start_date")}</p> : null}
                {ft.contains("country_of_citizenship") ?
                    <p>{ft.getLabel("country_of_citizenship")}{ft.getValue("country_of_citizenship")}</p> : null}
                {Object.keys(ft.getUnFormattedValue()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedValue())}</p> : null
                }
            </div>
        )
    } else {
        // return (
        //     <React.Fragment>
        //         {sections[props.section]}
        //     </React.Fragment>
        // )
        //}
    }
}