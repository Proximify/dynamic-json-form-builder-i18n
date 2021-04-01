import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {GenericSubsectionFormatter} from "../../../../utils/GenericFormFormatter";

export default function StaffSupervision(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            number_of_scientific_and_technical_staff: nosat,
            number_of_visiting_researchers: novr,
            number_of_highly_qualified_personnel_in_research_training: nohqpirt,
            number_of_personnel: nop,
            number_of_volunteers: nov
        } = ft.getFields();

        return (
            <div>
                {any(nosat) && <p>{nosat.lbl}: {nosat.val}</p>}
                {any(novr) && <p>{novr.lbl}: {novr.val}</p>}
                {any(nohqpirt) && <p>{nohqpirt.lbl}: {nohqpirt.val}</p>}
                {any(nop) && <p>{nop.lbl}: {nop.val}</p>}
                {any(nov) && <p>{nov.lbl}: {nov.val}</p>}
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
            GenericSubsectionFormatter(props)
        )
    }
}