import React from "react";

export default function LanguageSkill(props) {
    console.log("LanguageSkill", props);
    const rawData = props.rawData;

    const sections = {}

    const formatter = {
        "language": <p>{rawData["language"]}</p>
    }
    const order = ["language"]

    if (props.isFullScreenViewMode === true) {
        return (
            order.map(orderKey => {
                return (Object.keys(rawData).map((key,index)=>{
                    // console.log(key,orderKey)
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
                255555
            </React.Fragment>
        )
    }
}