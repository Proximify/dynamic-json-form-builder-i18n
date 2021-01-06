import React from "react";
import UserProfile from './UserProfile';

export default function CVFormatters(props) {
    console.log("CVFormatters",props);

    const forms = {
        "UserProfile": <UserProfile section={props.section} fields={props.fields} values={props.values}/>
    }

    return (
        <div>
            {forms[props.form]}
        </div>
    )
}