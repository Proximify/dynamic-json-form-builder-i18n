import React from "react";

import UserProfile from './UserProfile';
import PersonalInformation from './PersonalInformation'
import Recognitions from "./Recognitions";

export default function CVFormatter(props) {
    // console.log("CVFormatters", props);

    const subsections = {
        "user_profile": <UserProfile structureChain={props.structureChain} isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema} rawData={props.rawData}/>,
        "personal_information": <PersonalInformation structureChain={props.structureChain} isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema} rawData={props.rawData}/>,
        "recognitions": <Recognitions structureChain={props.structureChain} isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema} rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}