import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, unformattedFieldFormatter
} from "../../../../utils/helper";

export default function OtherAdministrativeActivities(props) {
    // console.log("Recognitions", props);
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
                {unformattedFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
            <p>
                CaseDevelopment
            </p>
        )
    }
}