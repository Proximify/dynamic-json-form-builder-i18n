import {styled} from "@twind/react";

export const StyledSubsectionFormatterContainer = styled("div",{})


// export const StyledSubsectionFormatterContainer = styled.div`
//   & > div{
//     ${tw`ml-6 py-1 border-b border-dotted border-gray-300`}
//     & > p:first-child{
//       ${tw`font-bold`}
//     }
//     & > div > div{
//       ${tw`mb-4`}
//     }
//     & > div > div:last-child{
//       ${tw`mb-0`}
//     }
//   }
// `
//
export const StyledLink = styled("a",{
    base: `text-blue-500 hover:underline`
})

export const StyledMainValueText = styled("strong",{
    base: `font-semibold text-gray-500`,
    variants: {
        block: {
            true: `block`
        }
    }
})


export const StyledBaseValueText = styled("span",{
    base: `text-sm`
})

export const StyledBilingualItemContainer = styled("div",{})

// export const StyledBilingualItemContainer = styled.div`
//   ${tw`mt-1 mb-2`}
//   & > p:first-child {
//     ${tw`font-semibold text-gray-700`}
//   }
// `
//

export const StyledSecondLangText = styled("span",{
    base: `text-gray-400`
})