import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker
} from "../../utils/helper";
import {StyledBilingualItemContainer} from "../../utils/styledComponents";

export default function MostSignificantContributions(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            title: ti,
            contribution_date: cd,
            description_contribution_value_impact: dcvi
        } = ft.getFields();

        return (
            <div>
                {any(ti) && <>
                    {ti.val.eng && <StyledBilingualItemContainer>
                        <p>{ti.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ti.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {ti.val.fre && <StyledBilingualItemContainer>
                        <p>{ti.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ti.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                {any(cd) && <p>({cd.val})</p>}
                {any(dcvi) && <>
                    {dcvi.val.eng && <StyledBilingualItemContainer>
                        <p>{dcvi.lbl}</p>
                        <p>{dcvi.val.eng}</p>
                    </StyledBilingualItemContainer>}
                    {dcvi.val.fre && <StyledBilingualItemContainer>
                        <p>{dcvi.lbl} (French)</p>
                        <p>{dcvi.val.fre}</p>
                    </StyledBilingualItemContainer>}
                </>}
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                MostSignificantContributions
            </React.Fragment>
        )
    }
}