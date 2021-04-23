import {css, apply} from 'twind/css'
import {tw} from "twind";
import { styled } from "@twind/react"


const baseFieldStyles_old = css`
  min-width: 16rem;
  ${tw`max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm border border-gray-300 rounded`};
`

const baseFieldStyles = css`
  min-width: 16rem;
  min-height: 2.4rem;
  ${apply('w-full shadow-sm border border-gray-300 rounded')};
`

const baseTextAreaStyles = css`
  ${apply('text-sm py-2 px-2.5')}
`

export const TextAreaInputStyle = css`
  ${baseFieldStyles};
  ${baseTextAreaStyles};
  ${apply('resize-none')};
`

export const NumberInputStyle = css`
  ${baseFieldStyles};
  ${apply('text-sm px-2.5')}
`

export const MultiNumberInputStyle = css`
  min-width: 5rem;
  min-height: 2.4rem;
  ${apply('shadow-sm border border-gray-300 rounded text-sm px-2.5')};
`

export const BilingualContainerStyle = css`
  min-width: 16rem;
  min-height: 2.4rem;
  ${apply('shadow-sm text-sm flex')};
`

export const MultiLangRichTextInputStyle = css`
  ${apply('w-full h-full text-sm')};

  .rdw-editor-wrapper {
    min-height: 8rem;
    ${apply(`border border-gray-300 rounded mt-0.5`)};

    .rdw-editor-toolbar {
      ${apply(`h-8 py-0 px-1 border-0 border-b border-gray-300 rounded-t-md justify-between`)};

      .rdw-inline-wrapper {
        ${apply(`m-0`)}
      }
    }

    .rdw-editor-main {
      ${apply(`px-2 pb-1`)}
      .DraftEditor-root {
        ${apply(`z-0`)}
      }

      .public-DraftStyleDefault-block {
        ${apply(`m-0`)}
      }
    }
  }
`

export const MultiLangTextareaStyle = css`
  width: calc(100% - 2.3rem);
  min-width: 16rem;
  min-height: 2.4rem;
  ${baseTextAreaStyles} ${apply(`border border-gray-300 rounded-l align-middle h-full resize-none`)}
`

export const MultiLangBtnContainerStyle = css`
  width: 2.3rem;
  ${apply(`border border-l-0 border-gray-300 rounded-r align-middle text-gray-500`)}
`

export const BooleanFieldContainerStyle = css`
  min-width: 16rem;
  min-height: 2.4rem;
  ${apply('w-full shadow-sm h-full flex items-center shadow-none space-x-2')};
`

export const WindowedSelectStyle = css`
  min-width: 16rem;
  ${apply(`text-sm`)}

  & > .react-select__control {
    min-height: 2.4rem;
    ${apply('border border-gray-300')}
  }
`

export const MultiColWindowedSelectStyle = css`
  min-width: 16rem;
  ${apply(`text-sm`)}

  & > .react-select__menu {
    min-width: 35rem;
  }

  & > .react-select__control {
    min-height: 2.4rem;
    ${apply('border border-gray-300')}
  }
`

export const DatePickerContainerStyle = css`
  min-width: 16rem;
  min-height: 2.4rem;
  ${apply('h-full')};

  .react-datepicker-wrapper {
    ${apply(`h-full w-full`)}
    .react-datepicker__input-container {
      ${apply('shadow-sm text-sm border border-gray-300 rounded h-full w-full')}
      .date_picker {
        ${apply(`h-full w-full rounded py-2 px-2.5`)}
      }

      .react-datepicker__close-icon {
        ${apply(`mr-0.5`)}
      }

      ::after {
        ${apply(`pb-1 bg-transparent text-gray-300 text-xl`)}
      }
    }
  }
`

export const DatePickerCalendarContainerStyle = css`
  ${apply(`bg-white border border-gray-400 rounded text-sm`)};

  .react-datepicker__navigation--previous {
    border-right-color: gray;
    ${apply(`mt-1 mx-0 left-0.5`)}
  }

  .react-datepicker__navigation--next {
    border-left-color: gray;
    ${apply(`mt-1 mx-0 right-0.5`)}
  }

  & > .react-datepicker__month-container {
    .react-datepicker__header {
      ${apply(`pt-2`)}
      .react-datepicker__current-month {
        ${apply(`hidden`)}
      }

      .react-datepicker__header__dropdown {
        ${apply(`w-full text-sm flex justify-center`)}
        .react-datepicker__month-dropdown-container {
          ${apply(`border border-gray-400 bg-white w-1/2`)}
          .react-datepicker__month-read-view .react-datepicker__month-read-view--down-arrow {
            ${apply(`mr-2`)}
          }
        }

        .react-datepicker__year-dropdown-container {
          ${apply(`border border-gray-400 bg-white w-4/12`)}
          .react-datepicker__year-read-view .react-datepicker__year-read-view--down-arrow {
            ${apply(`mr-1`)}
          }
        }
      }
    }

    .react-datepicker__month {
      .react-datepicker__week {
        .react-datepicker__day--outside-month {
          ${apply(`text-gray-300`)}
        }
      }
    }
  }

  .react-datepicker__today-button {
    ${apply(`border-t rounded-b`)}
  }
`

export const SubsectionFormatterContainerStyle = css`
  min-width: 16rem;
  ${apply('block w-full h-full')}
`

export const MultiColWindowedSelectMenuItem = styled("td", {
  base: `
    flex-grow
  `,

  variants: {
    width: {
      1: `w-10`,
      2: `w-1/2`,
      3: `w-1/3`,
      4: `w-1/4`,
      5: `w-1/5`,
      6: `w-1/6`,
    }
  },

  defaults: {
    width: "1"
  }
})






// export const StyledMultiColWindowedSelectMenuItem = styled.td`
//   ${tw`flex-grow`};
//   ${({numberOfCol}) => {
//     switch (numberOfCol) {
//       case 6:
//         return tw`w-1/6`;
//       case 5:
//         return tw`w-1/5`;
//       case 4:
//         return tw`w-1/4`;
//       case 3:
//         return tw`w-1/3`;
//       case 2:
//         return tw`w-1/2`;
//       default:
//         return tw`w-10`
//     }
//   }}
// `

export  const MultiColWindowedSelectValueContainer = styled("div",{
  base: `
    my-1
  `,

  variants:{
    numOfCol: {
      1: `py-3`,
      2: `py-6`,
      3: `py-9`,
      4: `py-12`,
      5: `py-16`,
      6: `py-20`,
    }
  },

  defaults:{
    numOfCol: "1"
  }
})

// export const StyledMultiColWindowedSelectValueContainer = styled.div`
//   ${tw`my-1`};
//   ${({numberOfCol}) => {
//     switch (numberOfCol) {
//       case 6:
//         return tw`py-20`;
//       case 5:
//         return tw`py-16`;
//       case 4:
//         return tw`py-12`;
//       case 3:
//         return tw`py-9`;
//       case 2:
//         return tw`py-6`;
//       default:
//         return tw`py-3`
//     }
//   }}
// `

