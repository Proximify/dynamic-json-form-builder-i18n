import styled from "styled-components";
import {css} from 'styled-components/macro'
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

export const StyledMainValueContainer = styled.div`
  
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