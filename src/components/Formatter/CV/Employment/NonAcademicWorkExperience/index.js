import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../utils/helper";
import {StyledBilingualItemContainer, StyledSubsectionFormatterContainer} from "../../../utils/styledComponents";

export default function NonAcademicWorkExperience(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            position_title: pti,
            position_status: ps,
            start_date: sd,
            end_date: ed,
            work_description: wd,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            unit_division: ud,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa,
        } = ft.getFields();
        return (
            <div>
                {any(pti, ps, sd, ed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([pti, ps, sd, ed], null, ['s', 's', 's', 's'], [', '], [[1, 2, 3,
                        <strong> (</strong>], [2, 2, 3, <strong> - </strong>], [3, 2, 3, <strong>)</strong>]])}
                </p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {otori.val && <span>{otori.val}{otorit.val && ', '}</span>}
                    {otorit.val && <span>{otorit.val}{otoril.val && ', '}</span>}
                    {otoril.val && <span>{otoril.val}</span>}
                </p>}
                {any(wd) && <>
                    {wd.val.eng && <StyledBilingualItemContainer>
                        <p>{wd.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: wd.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {wd.val.fre && <StyledBilingualItemContainer>
                        <p>{wd.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: wd.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                {any(ud) && <p>{ud.val}</p>}
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
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
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