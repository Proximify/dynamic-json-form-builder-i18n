import React from "react";
import ArtisticExhibitions from "./ArtisticExhibitions";
import AudioRecordings from "./AudioRecordings";
import ExhibitionCatalogues from "./ExhibitionCatalogues";
import MusicalCompositions from "./MusicalCompositions";
import MusicalPerformances from "./MusicalPerformances";
import RadioAndTVPrograms from "./RadioAndTVPrograms";
import Scripts from "./Scripts";
import Fiction from "./Fiction";
import TheatrePerformancesAndProductions from "./TheatrePerformancesAndProductions";
import VideoRecordings from "./VideoRecordings";
import VisualArtworks from "./VisualArtworks";

export default function ArtisticContributions(props) {
    const subsections = {
        "artistic_exhibitions": <ArtisticExhibitions structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode}
                                                     schema={props.schema}
                                                     rawData={props.rawData}/>,
        "audio_recordings": <AudioRecordings structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,
        "exhibition_catalogues": <ExhibitionCatalogues structureChain={props.structureChain}
                                                       isFullScreenViewMode={props.isFullScreenViewMode}
                                                       schema={props.schema}
                                                       rawData={props.rawData}/>,
        "musical_compositions": <MusicalCompositions structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode}
                                                     schema={props.schema}
                                                     rawData={props.rawData}/>,
        "musical_performances": <MusicalPerformances structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode}
                                                     schema={props.schema}
                                                     rawData={props.rawData}/>,
        "radio_and_tv_programs": <RadioAndTVPrograms structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode}
                                                     schema={props.schema}
                                                     rawData={props.rawData}/>,
        "scripts": <Scripts structureChain={props.structureChain}
                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                            rawData={props.rawData}/>,
        "short_fiction": <Fiction structureChain={props.structureChain}
                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                  rawData={props.rawData}/>,
        "theatre_performances_and_productions": <TheatrePerformancesAndProductions structureChain={props.structureChain}
                                                                                   isFullScreenViewMode={props.isFullScreenViewMode}
                                                                                   schema={props.schema}
                                                                                   rawData={props.rawData}/>,
        "video_recordings": <VideoRecordings structureChain={props.structureChain}
                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                  rawData={props.rawData}/>,
        "visual_artworks": <VisualArtworks structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,

    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}