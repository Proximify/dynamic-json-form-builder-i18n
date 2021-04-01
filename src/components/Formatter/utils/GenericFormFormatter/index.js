import {FieldValueMapper, FormatterTracker, genericFieldFormatter} from "../helper";
import React from "react";

export const GenericFormFormatter = (props) => {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        return (
            <div>
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return GenericSubsectionFormatter(props);
    }
}
 export const GenericSubsectionFormatter = (props) => {
     const rawData = props.rawData;
     const formData = rawData.values;
     const schema = props.schema;

     const mappedValue = FieldValueMapper(rawData, schema, true);
     const ft = new FormatterTracker(mappedValue, true);
     const subsection = props.structureChain[0];

     if (subsection) {
         let formattedValue = null;
         switch (subsection) {
             default:
                 formattedValue = genericFieldFormatter(ft.getUnformattedField(), true);
                 break;
         }
         return formattedValue
     } else {
         return (
             <React.Fragment>
                 {JSON.stringify(props.rawData)}
             </React.Fragment>
         )
     }
 }