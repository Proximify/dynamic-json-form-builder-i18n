import React from "react";

export default function UserProfile(props) {
    console.log("UserProfile", props);
    const rawData = props.rawData;

    const sections = {}

    const formatter = {
        "researcher_status": <p>{rawData["researcher_status"]}</p>
    }
    const order = ["researcher_status"]

    if (props.isFullScreenViewMode === true) {
        return (
            order.map(orderKey => {
                return (Object.keys(props.rawData).map((key,index)=>{
                    console.log(key,orderKey)
                    return key === orderKey ?
                        <div key={index}>{formatter[key] ?? null}</div>
                        : null
                }))
            })
        )
    } else {
        return (
            <React.Fragment>
                {sections[props.section]}
            </React.Fragment>
        )
    }
}