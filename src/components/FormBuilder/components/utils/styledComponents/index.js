import {css} from 'styled-components/macro'
import tw from "twin.macro";
import styled, {createGlobalStyle} from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import NumberFormat from "react-number-format";
import {CalendarContainer} from "react-datepicker";
import Select from "react-select";
import WindowedSelect from "react-windowed-select";

const baseFieldStyles = css`
  min-width: 16rem;
  ${tw`max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded`};
`

export const StyledTextarea = styled(TextareaAutosize)`
  ${tw`resize-none`};
  ${baseFieldStyles}
`;

export const StyledNumberInput = styled(NumberFormat)`
  ${baseFieldStyles}
`

export const StyledMultiNumberInput = styled(NumberFormat)`
  min-width: auto !important;
  ${baseFieldStyles};
`

export const StyledBooleanFieldContainer = styled.div`
  ${baseFieldStyles};
  ${tw`h-full items-center shadow-none`}
`

export const StyledSelect = styled(Select)`
  min-width: 16rem;
  ${tw`shadow-sm`}
`

export const StyledWindowedSelect = styled(WindowedSelect)`
  min-width: 16rem;

  ${tw`text-sm`}
  & > .react-select__control {
    ${tw`border-gray-300 rounded`}
  }
`

export const StyledMultiColWindowedSelect = styled(WindowedSelect)`
  min-width: 16rem;

  & > .react-select__control {
    ${tw`border-gray-300 rounded text-sm`}
  }

  & > .react-select__menu {
    min-width: 35rem;
    ${tw`text-sm`}
  }
`

export const StyledMultiColWindowedSelectMenuItem = styled.td`
  ${tw`flex-grow`};
  ${({numberOfCol}) => {
    switch (numberOfCol) {
      case 6:
        return tw`w-1/6`;
      case 5:
        return tw`w-1/5`;
      case 4:
        return tw`w-1/4`;
      case 3:
        return tw`w-1/3`;
      case 2:
        return tw`w-1/2`;
      default:
        return tw`w-10`
    }
  }}
`

export const StyledMultiColWindowedSelectValueContainer = styled.div`
  ${tw`my-1`};
  ${({numberOfCol}) => {
    switch (numberOfCol) {
      case 6:
        return tw`py-20`;
      case 5:
        return tw`py-16`;
      case 4:
        return tw`py-12`;
      case 3:
        return tw`py-9`;
      case 2:
        return tw`py-6`;
      default:
        return tw`py-3`
    }
  }}
`

export const StyledDatePickerCalendarContainer = styled(CalendarContainer)`
  ${tw`bg-white border border-gray-400 rounded`};

  .react-datepicker__navigation--previous {
    border-right-color: gray;
    ${tw`mt-1 mx-0 left-0.5`}
  }

  .react-datepicker__navigation--next {
    border-left-color: gray;
    ${tw`mt-1 mx-0 right-0.5`}
  }

  & > .react-datepicker__month-container {
    .react-datepicker__header {
      ${tw`pt-2`}
      .react-datepicker__current-month {
        ${tw`hidden`}
      }

      .react-datepicker__header__dropdown {
        ${tw`w-full text-sm flex justify-center`}
        .react-datepicker__month-dropdown-container {
          ${tw`border border-gray-400 bg-white w-1/2`}
          .react-datepicker__month-read-view .react-datepicker__month-read-view--down-arrow {
            ${tw`mr-2`}
          }
        }

        .react-datepicker__year-dropdown-container {
          ${tw`border border-gray-400 bg-white w-4/12`}
          .react-datepicker__year-read-view .react-datepicker__year-read-view--down-arrow {
            ${tw`mr-1`}
          }
        }
      }
    }

    .react-datepicker__month {
      .react-datepicker__week {
        .react-datepicker__day--outside-month {
          ${tw`text-gray-300`}
        }
      }
    }
  }

  .react-datepicker__today-button {
    ${tw`border-t rounded-b`}
  }
`

export const StyledDatePickerWrapper = createGlobalStyle`
  .date_picker {
    min-width: 16rem;
    width: 100%;

    ${tw`shadow-sm`}
    & > .react-datepicker__input-container {
      input {
        ${baseFieldStyles};
      }

      .react-datepicker__close-icon {
        ${tw`mr-1.5`}
        ::after {
          ${tw`pb-1 bg-transparent text-gray-300 text-xl`}
        }
      }
    }
  }
`

export const StyledSubsectionDataContainer = styled.div`
  min-width: 16rem;
  ${tw`max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 h-full`}
`