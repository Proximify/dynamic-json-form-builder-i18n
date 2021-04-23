import {styled} from "@twind/react";

// export const SectionLabel = styled.p`
//   ${tw`py-0.5 px-2 rounded`};
//   ${({TopSectionLabel}) => TopSectionLabel ? tw`mr-1 mb-1 bg-color-primary text-color-transparent text-TopSectionLabel font-TopSectionLabel inline-block` : tw`text-color-secondary text-SectionLabel font-SectionLabel`}
// `;

export const SectionLabel = styled("p", {
    base: `py-0.5 px-2 rounded`,
    variants:{
        topSectionLabel: {
            true: `mr-1 mb-1 bg-color-primary text-color-transparent text-TopSectionLabel font-TopSectionLabel inline-block`,
            false: `text-color-secondary text-SectionLabel font-SectionLabel`
        }
    },
    defaults:{
        topSectionLabel: false
    }
})

export const StyledSectionContainer = styled("div", {
    base: ``,

    variants: {
        layer: {
            1: `mb-1 pl-4 py-1 text-red-200`,
            2: `mb-2 pl-4 py-1`,
            3: `mb-6 mt-1 mx-3`
        }
    }
})

// export const StyledSectionContainer = styled.div`
//   ${({layer}) => {
//     switch (layer) {
//       case 3:
//         return tw`mb-6 mt-1 mx-3`;
//       case 2:
//         return tw`mb-2 pl-4 py-1`;
//       case 1:
//         return tw`mb-1 pl-4 py-1`;
//       default:
//         return tw``
//     }
//   }}
// `

// export  const StyledSectionContainer = styled("div",{
//   base: `
//     my-1
//   `,
//
//   variants:{
//     numOfCol: {
//       1: `py-3`,
//       2: `py-6`,
//       3: `py-9`,
//       4: `py-12`,
//       5: `py-16`,
//       6: `py-20`,
//     }
//   },
//
//   defaults:{
//     numOfCol: "1"
//   }
// })