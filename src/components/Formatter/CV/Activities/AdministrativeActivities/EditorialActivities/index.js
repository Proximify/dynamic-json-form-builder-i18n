import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {StyledBilingualItemContainer, StyledSubsectionFormatterContainer} from "../../../../utils/styledComponents";

export default function EditorialActivities(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            publication_type: pt,
            publication_name: pn,
            start_date: sd,
            end_date: ed,
            activity_description: ad,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa
        } = ft.getFields();

        return (
            <div>
                {any(ro, pt, pn, sd, ed) && <p>
                    {singleLineMultiFieldValueFormatter([ro, pt, pn, sd, ed], null, ['s'], [', ', ', '], [[2, 3, 4, ' ('], [3, 3, 4, ' - '], [4, 3, 4, ')']])}
                </p>}
                {any(ad) && <>
                    {ad.val.eng && <StyledBilingualItemContainer>
                        <p>{ad.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {ad.val.fre && <StyledBilingualItemContainer>
                        <p>{ad.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                <StyledSubsectionFormatterContainer>
                    {any(rd) && <div><p>{rd.lbl}</p>
                        {reftableValueParser(rd.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                    {any(aor) && <div><p>{aor.lbl}</p>
                        {reftableValueParser(aor.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                    {any(foa) && <div><p>{foa.lbl}</p>
                        {reftableValueParser(foa.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                </StyledSubsectionFormatterContainer>
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            research_discipline: rd,
            area_of_research: aor,
            field_of_application: foa
        } = ft.getFields();

        if (subsection) {
            let formattedValue = null;
            switch (subsection) {
                case 'research_disciplines':
                    formattedValue = <p>{reftableValueParser(rd.val).map((val, index) => {
                        return reftableValueFormatter(val, index, true)
                    })}</p>
                    break;
                case 'areas_of_research':
                    formattedValue = <p>{reftableValueParser(aor.val).map((val, index) => {
                        return reftableValueFormatter(val, index, true)
                    })}</p>
                    break;
                case 'fields_of_application':
                    formattedValue = <p>{reftableValueParser(foa.val).map((val, index) => {
                        return reftableValueFormatter(val, index, true)
                    })}</p>
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