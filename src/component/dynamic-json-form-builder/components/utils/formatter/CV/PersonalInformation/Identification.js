import React from "react";

export default function Identification(props) {
    console.log("Identification", props)

    const isEmptyObject = (obj) => {
        if (!obj) {
            return true;
        } else if (obj && Object.keys(obj).length === 0) {
            return true;
        } else {
            let noValue = true
            Object.values(obj).forEach(value => {
                if (value && value !== "" && value !== undefined) {
                    noValue = false;
                }
            })
            return noValue
        }
    }

    const formatter = {
        "title": <span><strong>{props.values["title"]} </strong></span>,
        "first_name": <span><strong>{props.values["first_name"]} </strong></span>,
        "middle_name": <span><strong>{props.values["middle_name"]} </strong></span>,
        "family_name": <span><strong>{props.values["family_name"]} </strong></span>,
        "previous_family_name": <p><span>Previous Family Name: </span><span>{props.values["previous_family_name"]}</span></p>,
        "previous_first_name": <p><span>Previous First Name: </span><span>{props.values["previous_first_name"]}</span></p>,
        "date_of_birth": !isEmptyObject(props.values["date_of_birth"]) ? <p><span>Date of Birth: </span><span>{props.values["date_of_birth"]["month"]} {props.values["date_of_birth"]["day"]}</span></p> : <></>,
        "sex": <p><span>Sex: </span><span>{props.values["sex"]}</span></p>,
        "designated_group": <p><span>Designated Group: </span><span>{props.values["designated_group"]}</span></p>,
        "canadian_residency_status": <p>{props.values["canadian_residency_status"] === "Not Applicable" ? <span>Canadian Residency Status: </span> : null}<span>{props.values["canadian_residency_status"]}</span></p>,
        "correspondence_language": <p><span>Correspondence language: </span><span>{props.values["correspondence_language"]}</span></p>,
        "applied_for_permanent_residency": <p>{props.values["applied_for_permanent_residency"] === "Yes" ? <span>Applied for Permanent Residency</span> : null}</p>,
        "permanent_residency_start_date": <p><span>Permanent Residency Start Date: </span><span>{props.values["permanent_residency_start_date"]}</span></p>,
        "country_of_citizenship": !isEmptyObject(props.values["country_of_citizenship"]) ? <p><span>Country of Citizenship: </span>{!isEmptyObject(props.values["country_of_citizenship"]) ? props.values["country_of_citizenship"].map((value,index)=>{return ((index !== props.values["country_of_citizenship"].length - 1)?<span key={index}>{value["country_of_citizenship"]}, </span> : <span key={index}>{value["country_of_citizenship"]}</span>)}) : null}</p> : <></>
    }

    const order = ["title", "first_name", "middle_name", "family_name", "previous_family_name", "previous_first_name", "date_of_birth", "sex",
        "designated_group", "canadian_residency_status", "correspondence_language", "applied_for_permanent_residency", "permanent_residency_start_date", "country_of_citizenship"]

    return (
        <React.Fragment>
            {
                order.map(orderedKey => {
                    return (Object.keys(props.fields).map((key, index) => {
                        const field = props.fields[key].id;
                        const fieldValue = props.values;
                        // console.log(field, orderedKey)
                        return  field === orderedKey ?
                             (
                                <div className="inline text-sm" key={index}>
                                    {formatter[field] ? (fieldValue[field] ? formatter[field] : "") : (fieldValue[field] ?? "")}
                                </div>
                            ) : null
                    }))
                })

            }

        </React.Fragment>
    )
}