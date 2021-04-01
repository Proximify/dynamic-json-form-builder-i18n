import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";
import {StyledBilingualItemContainer} from "../../../utils/styledComponents";
import {GenericSubsectionFormatter} from "../../../utils/GenericFormFormatter";

export default function LeavesOfAbsenceAndImpactOnResearch(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            leave_type: lt,
            start_date: sd,
            end_date: ed,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            absence_and_impact_description: aaid
        } = ft.getFields();
        return (
            <div>
                {any(lt, sd, ed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([lt, sd, ed], null, ['s', 's', 's'], [' '], [[0, 1, 2,
                        <strong> (</strong>], [1, 1, 2, <strong> - </strong>], [2, 1, 2, <strong>)</strong>]])}
                </p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {otori.val && <span>{otori.val}{otorit.val && ', '}</span>}
                    {otorit.val && <span>{otorit.val}{otoril.val && ', '}</span>}
                    {otoril.val && <span>{otoril.val}</span>}
                </p>}
                {any(aaid) && <>
                    {aaid.val.eng && <StyledBilingualItemContainer>
                        <p>{aaid.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: aaid.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {aaid.val.fre && <StyledBilingualItemContainer>
                        <p>{aaid.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: aaid.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            GenericSubsectionFormatter(props)
        )
    }
}