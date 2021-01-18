import React from "react";


export default function Recognitions(props) {
    console.log("Recognitions", props);
    const rawData = props.rawData;

    const sections = {}

    const formatter = {
        "recognition_type": <p>Recognition Type: {rawData["recognition_type"]}</p>
    }
    const order = ["recognition_type"]

    if (props.isFullScreenViewMode === true) {
        return (
            order.map(orderKey => {
                return (Object.keys(props.rawData).map((key,index)=>{
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