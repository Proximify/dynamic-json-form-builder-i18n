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
import SoundDesign from "./SoundDesign";
import SetDesign from "./SetDesign";
import LightDesign from "./LightDesign";
import Choreography from "./Choreography";
import MuseumExhibitions from "./MuseumExhibitions";
import PerformanceArt from "./PerformanceArt";
import Poetry from "./Poetry";
import OtherArtisticContributions from "./OtherArtisticContributions";
import {
    FieldValueMapper,
    FormatterTracker,
    genericFieldFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";
import {GenericFormFormatter} from "../../../utils/GenericFormFormatter";
import SoundRecording from "./SoundRecording";

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
        "sound_design": <SoundDesign structureChain={props.structureChain}
                                           isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                           rawData={props.rawData}/>,
        "set_design": <SetDesign structureChain={props.structureChain}
                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                     rawData={props.rawData}/>,
        "light_design": <LightDesign structureChain={props.structureChain}
                                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                 rawData={props.rawData}/>,
        "choreography": <Choreography structureChain={props.structureChain}
                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                     rawData={props.rawData}/>,
        "museum_exhibitions": <MuseumExhibitions structureChain={props.structureChain}
                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                      rawData={props.rawData}/>,
        "performance_art": <PerformanceArt structureChain={props.structureChain}
                                                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                 rawData={props.rawData}/>,
        "poetry": <Poetry structureChain={props.structureChain}
                                           isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                           rawData={props.rawData}/>,
        "other_artistic_contributions": <OtherArtisticContributions structureChain={props.structureChain}
                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                          rawData={props.rawData}/>,
        "sound_recording": <SoundRecording structureChain={props.structureChain}
                                                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                    rawData={props.rawData}/>
    }
    
    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : GenericFormFormatter(props)}
        </React.Fragment>
    )
}