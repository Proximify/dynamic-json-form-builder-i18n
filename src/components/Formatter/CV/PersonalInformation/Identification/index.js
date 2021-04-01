import React from "react";
import {
    FieldValueMapper,
    FormatterTracker,
    any,
    reftableValueParser,
    singleFieldSubsectionFormatter,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../utils/helper";
import {css} from 'styled-components/macro'
import tw from "twin.macro";
import {StyledSubsectionFormatterContainer} from "../../../utils/styledComponents";
import {GenericSubsectionFormatter} from "../../../utils/GenericFormFormatter";

export default function Identification(props) {
    const {rawData, schema} = props;
    const formData = rawData.values;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            applied_for_permanent_residency: afpr,
            canadian_residency_status: crs,
            correspondence_language: cl,
            country_of_citizenship: coc,
            date_of_birth: dob,
            designated_group: dg,
            family_name: fan,
            first_name: fin,
            middle_name: mn,
            permanent_residency_start_date: prsd,
            previous_family_name: pfan,
            previous_first_name: pfin,
            sex: s,
            title: t,
        } = ft.getFields();

        return (
            <div>
                {any(t, fin, mn, fan) &&
                <p>
                    {singleLineMultiFieldValueFormatter([t, fin, mn, fan], null, ['s', 's', 's', 's'], [' ', ' ', ' '])}
                </p>}
                {any(pfan) &&
                <p>{pfan.lbl}: {pfan.val}</p>}
                {any(pfin) &&
                <p>{pfin.lbl}: {pfin.val}</p>}
                {any(dob) && <p>{dob.lbl}: {dob.val}</p>}
                {any(s) && <p>{s.lbl}: {s.val}</p>}
                {any(dg) &&
                <p>{dg.lbl}: {dg.val}</p>}
                {any(cl) &&
                <p>{cl.lbl}: {cl.val}</p>}
                {any(crs) &&
                <p>{crs.lbl}: {crs.val}</p>}
                {any(prsd) &&
                <p>{prsd.lbl}: {prsd.val}</p>}
                {any(afpr) && <p>{afpr.lbl}</p>}
                <StyledSubsectionFormatterContainer>
                    {any(coc) &&
                    <p>{coc.lbl}: {singleFieldSubsectionFormatter(coc.val)}</p>}
                </StyledSubsectionFormatterContainer>
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            country_of_citizenship: coc
        } = ft.getFields();

        if (subsection) {
            let formattedValue;
            switch (subsection) {
                case 'country_of_citizenship':
                    formattedValue = <p>{singleFieldSubsectionFormatter(coc.val, true)}</p>;
                    break;
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
}