import styled from "styled-components";
import {tw} from "twind";

export const SectionLabel = styled.p`
  ${tw`py-0.5 px-2 rounded`};
  ${({TopSectionLabel}) => TopSectionLabel ? tw`mr-1 mb-1 bg-color-primary text-color-transparent text-TopSectionLabel font-TopSectionLabel inline-block` : tw`text-color-secondary text-SectionLabel font-SectionLabel`}
`;

export const StyledSectionContainer = styled.div`
  ${({layer}) => {
    switch (layer) {
      case 3:
        return tw`mb-6 mt-1 mx-3`;
      case 2:
        return tw`mb-2 pl-4 py-1`;
      case 1:
        return tw`mb-1 pl-4 py-1`;
      default:
        return tw``
    }
  }}
`