import React from "react";
import Address from './Address';

export default function UserProfile(props) {
    // sub
    console.log("UserProfile",props);

    const sections = {
        "address": <Address fields={props.fields} values={props.values}/>,

    }

    return (
        <React.Fragment>
            {sections[props.section]}
        </React.Fragment>
    )
}