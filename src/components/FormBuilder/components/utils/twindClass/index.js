import {css, apply} from 'twind/css'
import {styled} from "@twind/react"

const baseFieldStyles = css`
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
  ${apply('text-sm px-2.5 mb-1.5')}
`

export const MultiNumberInputStyle = css`
  min-width: 5rem;
  min-height: 2.4rem;
  ${apply('shadow-sm border border-gray-300 rounded text-sm px-2.5')};
`

export const BilingualContainerStyle = css`
  min-height: 2.4rem;
  ${apply('shadow-sm text-sm flex mb-1.5')};
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
  min-height: 2.4rem;
  ${baseTextAreaStyles} ${apply(`border border-gray-300 rounded-l align-middle h-full resize-none`)}
`

export const MultiLangBtnContainerStyle = css`
  width: 2.3rem;
  ${apply(`border border-l-0 border-gray-300 rounded-r align-middle text-gray-500`)}
`

export const BooleanFieldContainerStyle = css`
  min-height: 2.4rem;
  ${apply('w-full shadow-sm h-full flex items-center shadow-none space-x-2')};
`

export const WindowedSelectStyle = css`
  ${apply(`w-full text-sm shadow-sm mb-1.5`)}
  & > .react-select__control {
    min-height: 2.4rem;
    ${apply('border border-gray-300')}
  }
`

export const MultiColWindowedSelectStyle = css`
  ${apply(`w-full text-sm shadow-sm mb-1.5`)}
  & > .react-select__menu {
    min-width: 35rem;
  }

  & > .react-select__control {
    min-height: 2.4rem;
    ${apply('border border-gray-300')}
  }
`

export const DatePickerContainerStyle = css`

  ${apply('w-full mb-1.5')};

  .react-datepicker-wrapper {
    ${apply(`w-full`)}
    .react-datepicker__input-container {
      min-height: 2.4rem;

      ${apply('text-sm w-full h-full border border-gray-300 rounded shadow-sm')}
      .date_picker {
        ${apply(`w-full rounded py-2 px-2.5   `)}
      }

      .react-datepicker__close-icon {
        ${apply(`mr-1 h-full`)}
      }

      ::after {
        color: #CCCCCC;
        ${apply(`pb-1 bg-transparent text-xl`)}
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
  ${apply('w-full h-full mb-1.5 pt-2')}
  & > div {
    ${apply('shadow-sm')}
  }
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

export const MultiColWindowedSelectValueContainer = styled("div", {
    base: `
    my-1
  `,

    variants: {
        numOfCol: {
            1: `py-3`,
            2: `py-6`,
            3: `py-9`,
            4: `py-12`,
            5: `py-16`,
            6: `py-20`,
        }
    },

    defaults: {
        numOfCol: "1"
    }
})

export const FieldContainer = css`
  ${apply('2xl:(ml-14 mr-10) xl:(ml-14 mr-10) lg:(ml-8 mr-4) md:(ml-2 flex my-3) sm:(ml-12 mr-10 my-1)')}
`

export const FieldLabelContainer = css`
  ${apply('pt-1 flex 2xl:(w-5/12 mr-6) xl:(w-5/12 mr-5) lg:(w-5/12 mr-5 text-sm) md:(w-5/12 mr-4 text-sm justify-end) sm:(my-1 font-semibold)')}
`

export const FieldControlContainer = css`
  max-width: 18rem;
  ${apply('2xl:(w-6/12 mr-2) xl:(w-6/12 mr-2) lg:(w-6/12 mr-2) md:(w-6/12 mr-1)')}
`

export const FieldActionContainer = css`
  max-width: 2rem;
  ${apply('2xl:(pt-2.5) xl:(pt-2.5) lg:(pt-2.5) md:(pt-2.5) sm:()')}
`

export const FundingNumberInputStyle = css`
  min-height: 2.4rem;
  ${apply('w-full shadow-sm border border-gray-300 rounded-l text-sm px-2.5 mb-1.5')};
`

export const FundingCurrencySelectStyle = css`
  ${apply(`w-full text-sm shadow-sm mb-1.5`)}
  & > .react-select__control {
    border-radius: 0 0.25rem 0.25rem 0;
    min-height: 2.4rem;
    ${apply('border-l-0')}
  }
`