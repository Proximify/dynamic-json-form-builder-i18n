import React from "react";
import {FieldValueMapper, FormatterTracker, any, genericFieldFormatter} from "../../../utils/helper";
import {GenericSubsectionFormatter} from "../../../utils/GenericFormFormatter";
import {StyledLink} from "../../../utils/styledComponents";

export default function Website(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            url: u,
            website_type: wt
        } = ft.getFields();

        return (
            <div>
                {any(u, wt) &&
                <p>
                    <>{wt.val && <strong>{`${wt.val}: `}</strong>}</>
                    <StyledLink href={u}>{u.val}</StyledLink>
                </p>}
                {genericFieldFormatter(ft.getUnformattedField())}

            </div>
        )
    } else {
        return (
            GenericSubsectionFormatter(props)
        )
    }
}