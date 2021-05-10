import {css, apply} from 'twind/css'
import {styled} from "@twind/react"

const baseFieldStyles = css`
  min-height: 2.4rem;
  ${apply('shadow-sm border border-gray-300 rounded w-72 text-sm')};
`

const baseTextAreaStyles = css`
  ${apply('py-2 px-2.5 resize-none leading-5')}
`

export const TextAreaInputStyle = css`
  ${baseFieldStyles};
  ${baseTextAreaStyles};
`

export const NumberInputStyle = css`
  ${baseFieldStyles};
  ${apply('px-2.5')}
`

export const MultiNumberInputStyle = css`
  min-width: 5rem;
  ${baseFieldStyles};
  ${apply('px-2.5')};
`

export const WindowedSelectStyle = css`
  & > .react-select__menu {
    ${apply('text-sm')}
  }
  
  & > .react-select__control {
    ${baseFieldStyles};
  }
`

export const MultiColWindowedSelectStyle = css`
  & > .react-select__menu {
    min-width: 35rem;
    ${apply('text-sm')}
  }

  & > .react-select__control {
    ${baseFieldStyles}
  }
`

export const BilingualContainerStyle = css`
  ${apply('w-72')};

  & > div {
    min-height: 2.4rem;
  }
`

export const MultiLangTextareaStyle = css`
  width: calc(100% - 2.3rem);
  ${baseTextAreaStyles};
  ${apply('border border-gray-300 rounded-l text-sm shadow-sm')};
`

export const MultiLangBtnContainerStyle = css`
  width: 2.3rem;
  ${apply(`border border-l-0 border-gray-300 rounded-r align-middle text-gray-500 shadow-sm`)}
`

export const MultiLangRichTextInputStyle = css`
  .rdw-editor-wrapper {
    ${apply(`border border-gray-300 rounded`)};

    .rdw-editor-toolbar {
      ${apply(`h-8 py-0 px-1 border-0 border-b border-gray-300 rounded-t-md justify-between`)};

      .rdw-inline-wrapper {
        ${apply(`m-0`)}
      }
    }

    .rdw-editor-main {
      min-height: 6rem;

      ${apply(`px-1.5 pb-1 text-sm`)}
      .DraftEditor-root {
        ${apply(`z-0`)}
      }

      .public-DraftStyleDefault-block {
        ${apply(`m-0`)}
      }
    }
  }
`

export const BooleanFieldContainerStyle = css`
  min-height: 2.4rem;
  ${apply('flex items-center px-3 shadow-none w-72 text-sm')};
`

export const DatePickerContainerStyle = css`
  ${apply('w-72')};

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
  ${apply('w-72')}
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
  min-height: 3.5rem;
  ${apply('md:(px-4 grid grid-cols-3 gap-6 py-2)')}
`

export const FieldLabelContainer = css`
  ${apply('flex h-full items-center justify-end')}
`

export const FieldControlContainer = css`
  ${apply('flex flex-wrap h-full')}
  .fieldControl {
    ${apply('flex items-center')}
  }

  .subsectionFieldControl {
    ${apply('flex')}
  }

  .currencyFieldControl {
    min-height: 2.4rem;
    ${apply('flex w-72 items-center')}
  }
`

export const FieldActionContainer = css`
  ${apply('')}
`

export const FundingNumberInputStyle = css`
  ${apply('border border-gray-300 rounded-l px-2.5 w-36 h-full text-sm shadow-sm')};
`

export const FundingCurrencySelectStyle = css`
  & > .react-select__control {
    border-radius: 0 0.25rem 0.25rem 0;
    ${apply('border-l-0 border-gray-300 h-full w-36 text-sm shadow-sm')}
  }
`