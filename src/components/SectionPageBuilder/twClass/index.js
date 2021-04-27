import {styled} from "@twind/react";

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