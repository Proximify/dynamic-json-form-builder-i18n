import {css} from 'styled-components/macro'
import tw from "twin.macro";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import NumberFormat from "react-number-format";

const baseFieldStyles = css`
  min-width: 16rem;
  ${tw`max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded`};
`

export const StyledTextarea = styled(TextareaAutosize)`
  ${baseFieldStyles}
`;

export const StyledNumberInput = styled(NumberFormat)`
  ${baseFieldStyles}
`

export const StyledMultiFieldNumberInput = styled(NumberFormat)`
  min-width: auto !important;
  ${baseFieldStyles};
`