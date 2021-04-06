import styled from "styled-components";
import tw from "twin.macro";

export const StyledSubsectionFormatterContainer = styled.div`
  & > div{
    ${tw`ml-6 py-1 border-b border-dotted border-gray-300`}
    & > p:first-child{
      ${tw`font-bold`}
    }
    & > div > div{
      ${tw`mb-4`}
    }
    & > div > div:last-child{
      ${tw`mb-0`}
    }
  }
`

export const StyledLink = styled.a`
  ${tw`text-blue-500 hover:underline`}
`

export const StyledMainValueText = styled.strong`
  ${tw`font-semibold text-gray-500`}
          ${({ block }) => block && tw`block`}
`

export const StyledBaseValueText = styled.span`
  ${tw`text-sm`}
`

export const StyledBilingualItemContainer = styled.div`
  ${tw`mt-1 mb-2`}
  & > p:first-child {
    ${tw`font-semibold text-gray-700`}
  }
`

export const StyledSecondLangText = styled.span`
  ${tw`text-gray-400`}
`