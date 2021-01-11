import React from "react";
import UserProfile from './UserProfile';

export default function CVFormatter(props) {
    // console.log("CVFormatters",props);

    const forms = {
        "UserProfile": <UserProfile section={props.section} fields={props.fields} values={props.values}/>
    }

    return (
        <React.Fragment>
            {forms[props.form]}
        </React.Fragment>
    )
}