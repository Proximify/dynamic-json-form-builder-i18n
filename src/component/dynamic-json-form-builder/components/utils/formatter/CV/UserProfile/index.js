import React from "react";
import Address from './Address';
import Education from "./Education";
import Resume from "./Resume";

export default function UserProfile(props) {
    // sub
    console.log("UserProfile",props);

    const sections = {
        "address": <Address fields={props.fields} values={props.values}/>,
        "education": <Education fields={props.fields} values={props.values}/>,
        "resume": <Resume fields={props.fields} values={props.values}/>
    }

    return (
        <React.Fragment>
            {sections[props.section]}
        </React.Fragment>
    )
}