import React from "react";
// import './index.css'

import UserProfile from './UserProfile';
import PersonalInformation from './PersonalInformation'
import Recognitions from "./Recognitions";
import Education from "./Education";
import Employment from "./Employment";
import ResearchFundingHistory from "./ResearchFundingHistory";
import Activities from "./Activities";
import Memberships from "./Memberships";
import MostSignificantContributions from "./MostSignificantContributions";
import Contributions from "./Contributions";
import {GenericFormFormatter} from "../utils/GenericFormFormatter";

export default function CVFormatter(props) {
    const subsections = {
        "personal_information": <PersonalInformation structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode}
                                                     schema={props.schema} rawData={props.rawData}/>,
        "education": <Education structureChain={props.structureChain} isFullScreenViewMode={props.isFullScreenViewMode}
                                schema={props.schema} rawData={props.rawData}/>,
        "recognitions": <Recognitions structureChain={props.structureChain}
                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                      rawData={props.rawData}/>,
        "user_profile": <UserProfile structureChain={props.structureChain}
                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                     rawData={props.rawData}/>,
        "employment": <Employment structureChain={props.structureChain}
                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                  rawData={props.rawData}/>,
        "research_funding_history": <ResearchFundingHistory structureChain={props.structureChain}
                                                            isFullScreenViewMode={props.isFullScreenViewMode}
                                                            schema={props.schema}
                                                            rawData={props.rawData}/>,
        "activities": <Activities structureChain={props.structureChain}
                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                  rawData={props.rawData}/>,
        "memberships": <Memberships structureChain={props.structureChain}
                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                    rawData={props.rawData}/>,
        "most_significant_contributions": <MostSignificantContributions structureChain={props.structureChain}
                                                                        isFullScreenViewMode={props.isFullScreenViewMode}
                                                                        schema={props.schema}
                                                                        rawData={props.rawData}/>,
        "contributions": <Contributions structureChain={props.structureChain}
                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                        rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : GenericFormFormatter(props)}
        </React.Fragment>
    )
}