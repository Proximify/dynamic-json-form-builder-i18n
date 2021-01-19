import React from "react";

export default function Identification(props) {
    console.log("Identification", props)
    const rawData = props.rawData;
    // const rawData = props.rawData ?? props.values; ???

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
        "title": <span><strong>{rawData["title"]} </strong></span>,
        "first_name": <span><strong>{rawData["first_name"]} </strong></span>,
        "middle_name": <span><strong>{rawData["middle_name"]} </strong></span>,
        "family_name": <span><strong>{rawData["family_name"]} </strong></span>,
        "previous_family_name": <p><span>Previous Family Name: </span><span>{rawData["previous_family_name"]}</span></p>,
        "previous_first_name": <p><span>Previous First Name: </span><span>{rawData["previous_first_name"]}</span></p>,
        "date_of_birth": !isEmptyObject(rawData["date_of_birth"]) ? <p><span>Date of Birth: </span><span>{rawData["date_of_birth"]["month"]} {rawData["date_of_birth"]["day"]}</span></p> : <></>,
        "sex": <p><span>Sex: </span><span>{rawData["sex"]}</span></p>,
        "designated_group": <p><span>Designated Group: </span><span>{rawData["designated_group"]}</span></p>,
        "canadian_residency_status": <p>{rawData["canadian_residency_status"] === "Not Applicable" ? <span>Canadian Residency Status: </span> : null}<span>{rawData["canadian_residency_status"]}</span></p>,
        "correspondence_language": <p><span>Correspondence language: </span><span>{rawData["correspondence_language"]}</span></p>,
        "applied_for_permanent_residency": <p>{rawData["applied_for_permanent_residency"] === "Yes" ? <span>Applied for Permanent Residency</span> : null}</p>,
        "permanent_residency_start_date": <p><span>Permanent Residency Start Date: </span><span>{rawData["permanent_residency_start_date"]}</span></p>,
        "country_of_citizenship": !isEmptyObject(rawData["country_of_citizenship"]) ? <p><span>Country of Citizenship: </span>{!isEmptyObject(rawData["country_of_citizenship"]) ? rawData["country_of_citizenship"].map((value,index)=>{return ((index !== rawData["country_of_citizenship"].length - 1)?<span key={index}>{value["country_of_citizenship"]}, </span> : <span key={index}>{value["country_of_citizenship"]}</span>)}) : null}</p> : <></>
    }

    const order = ["title", "first_name", "middle_name", "family_name", "previous_family_name", "previous_first_name", "date_of_birth", "sex",
        "designated_group", "canadian_residency_status", "correspondence_language", "applied_for_permanent_residency", "permanent_residency_start_date", "country_of_citizenship"]

    // return (
    //     <React.Fragment>
    //         {
    //             order.map(orderedKey => {
    //                 return (Object.keys(props.fields).map((key, index) => {
    //                     const field = props.fields[key].id;
    //                     const fieldValue = props.values;
    //                     // console.log(field, orderedKey)
    //                     return  field === orderedKey ?
    //                         (
    //                             <div className="inline text-sm" key={index}>
    //                                 {formatter[field] ? (fieldValue[field] ? formatter[field] : "") : (fieldValue[field] ?? "")}
    //                             </div>
    //                         ) : null
    //                 }))
    //             })
    //
    //         }
    //
    //     </React.Fragment>
    // )

    if (props.isFullScreenViewMode === true) {
        return (
            order.map(orderKey => {
                return (Object.keys(rawData).map((key,index)=>{
                    // console.log(key,orderKey)
                    return key === orderKey ?
                        <div className="inline text-sm" key={index}>{formatter[key] ?? null}</div>
                        : null
                }))
            })
        )
    } else {
        // return (
        //     <React.Fragment>
        //         {sections[props.section]}
        //     </React.Fragment>
        // )
    }
}