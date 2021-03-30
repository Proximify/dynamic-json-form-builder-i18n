import React from "react";
import {css} from 'styled-components/macro'
import tw from "twin.macro";
import {StyledTextarea} from "../utils/styledComponents";

export default function ReadOnlyFieldWidget(props) {
    return (
        <StyledTextarea
            minRows={1}
            readOnly={true}
            id={props.schema.id}
            value={props.value}
            css={[tw`bg-gray-200`]}
        />
    );
}