import React from "react";
import JournalArticles from "./JournalArticles";
import JournalIssues from "./JournalIssues";
import Books from "./Books";
import BookChapters from "./BookChapters";
import BookReviews from "./BookReviews";
import Translations from "./Translations";
import Dissertations from "./Dissertations";
import SupervisedStudentPublications from "./SupervisedStudentPublications";
import Litigations from "./Litigations";
import NewspaperArticles from "./NewspaperArticles";
import NewsletterArticles from "./NewsletterArticles";
import EncyclopediaEntries from "./EncyclopediaEntries";
import MagazineEntries from "./MagazineEntries";
import DictionaryEntries from "./DictionaryEntries";
import Reports from "./Reports";
import WorkingPapers from "./WorkingPapers";
import Manuals from "./Manuals";
import OnlineResources from "./OnlineResources";
import Tests from "./Tests";
import ClinicalCareGuidelines from "./ClinicalCareGuidelines";
import ConferencePublications from "./ConferencePublications";

export default function Publications(props) {
    const subsections = {
        "journal_articles": <JournalArticles structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,
        "journal_issues": <JournalIssues structureChain={props.structureChain}
                                         isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                         rawData={props.rawData}/>,
        "books": <Books structureChain={props.structureChain}
                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                        rawData={props.rawData}/>,
        "book_chapters": <BookChapters structureChain={props.structureChain}
                                       isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                       rawData={props.rawData}/>,
        "book_reviews": <BookReviews structureChain={props.structureChain}
                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                     rawData={props.rawData}/>,
        "translations": <Translations structureChain={props.structureChain}
                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                      rawData={props.rawData}/>,
        "dissertations": <Dissertations structureChain={props.structureChain}
                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                        rawData={props.rawData}/>,
        "supervised_student_publications": <SupervisedStudentPublications structureChain={props.structureChain}
                                                                          isFullScreenViewMode={props.isFullScreenViewMode}
                                                                          schema={props.schema}
                                                                          rawData={props.rawData}/>,
        "litigations": <Litigations structureChain={props.structureChain}
                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                    rawData={props.rawData}/>,
        "newspaper_articles": <NewspaperArticles structureChain={props.structureChain}
                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                    rawData={props.rawData}/>,
        "newsletter_articles": <NewsletterArticles structureChain={props.structureChain}
                                                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                 rawData={props.rawData}/>,
        "encyclopedia_entries": <EncyclopediaEntries structureChain={props.structureChain}
                                                   isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                   rawData={props.rawData}/>,
        "magazine_entries": <MagazineEntries structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                     rawData={props.rawData}/>,
        "dictionary_entries": <DictionaryEntries structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,
        "reports": <Reports structureChain={props.structureChain}
                                                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                 rawData={props.rawData}/>,
        "working_papers": <WorkingPapers structureChain={props.structureChain}
                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                            rawData={props.rawData}/>,
        "manuals": <Manuals structureChain={props.structureChain}
                                         isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                         rawData={props.rawData}/>,
        "online_resources": <OnlineResources structureChain={props.structureChain}
                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                            rawData={props.rawData}/>,
        "tests": <Tests structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,
        "clinical_care_guidelines": <ClinicalCareGuidelines structureChain={props.structureChain}
                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                        rawData={props.rawData}/>,
        "conference_publications": <ConferencePublications structureChain={props.structureChain}
                                                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                            rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}