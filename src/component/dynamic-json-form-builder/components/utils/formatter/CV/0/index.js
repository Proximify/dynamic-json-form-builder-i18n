import React from "react";
import Subsection67 from "./67";

export default function Section0(props) {
    console.log("Section0",props);

    const subsection = {
        "67": <Subsection67 />
    }

    return (
        <React.Fragment>
            {/*{form[props.form] ?? (Object.keys(props.rawData).map((key,index) => {*/}
            {/*    return (*/}
            {/*        <div key={index}>*/}
            {/*            <span className="font-bold">{key}</span>: {props.rawData[key]}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}))}*/}
            -Section 0-
        </React.Fragment>
    )
}