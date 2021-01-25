import React from "react";
import Section0 from './0';

import UserProfile from './UserProfile';
import PersonalInformation from './PersonalInformation'
import Recognitions from "./Recognitions";

export default function CVFormatter(props) {
    console.log("CVFormatters",props);

    const section = {
        "user_profile": <UserProfile rawData={props.rawData} isFullScreenViewMode={props.isFullScreenViewMode} fields={props.fields} values={props.values}/>,
        "personal_information": <PersonalInformation form={props.form} rawData={props.rawData} isFullScreenViewMode={props.isFullScreenViewMode} fields={props.fields} values={props.values}/>,
        "recognitions": <Recognitions rawData={props.rawData} isFullScreenViewMode={props.isFullScreenViewMode} fields={props.fields} values={props.values}/>,
        0:<Section0 />
    }

    return (
        <React.Fragment>
            {section[props.section]}
        </React.Fragment>
    )
}