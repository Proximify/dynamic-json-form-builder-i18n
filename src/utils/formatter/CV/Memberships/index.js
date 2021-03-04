import React from "react";
import CommitteeMemberships from "./CommitteeMemberships";
import OtherMemberships from "./OtherMemberships";


export default function Memberships(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "committee_memberships": <CommitteeMemberships structureChain={props.structureChain}
                           isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                           rawData={props.rawData}/>,
        "other_memberships": <OtherMemberships structureChain={props.structureChain}
                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                    rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}