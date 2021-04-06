import React from "react";
import {
    FieldValueMapper,
    FormatterTracker,
    genericFieldFormatter
} from "../../../../utils/helper";
import {GenericSubsectionFormatter} from "../../../../utils/GenericFormFormatter";

export default function Bibliographies(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {

        } = ft.getFields();

        return (
            <div>
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
         GenericSubsectionFormatter(props)
        )
    }
}