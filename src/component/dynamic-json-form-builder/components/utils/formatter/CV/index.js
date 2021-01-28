import React from "react";

import UserProfile from './UserProfile';
import PersonalInformation from './PersonalInformation'
import Recognitions from "./Recognitions";

export default function CVFormatter(props) {
    console.log("CVFormatters", props);

    const subsections = {
        "user_profile": <UserProfile/>,
        "personal_information": <PersonalInformation structureChain={props.structureChain} isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema} rawData={props.rawData}/>,
        "recognitions": <Recognitions/>
    }

    return (
        <React.Fragment>
            {subsections[props.structureChain.shift()]}
        </React.Fragment>
    )
}