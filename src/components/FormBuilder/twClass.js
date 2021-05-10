import {css, apply} from 'twind/css'
import {tw} from "twind";
import React from "react";

export const FormClass = css`
  > .form-group {
    > #root {
      > .field-error {
        ${apply('border')}
        .error-detail {
          ${apply('hidden')}
        }
      }
    }
  }

  .form-action {
    ${apply('md:(px-4 grid grid-cols-3 gap-x-6 border-t pt-5 mt-5 space-y-5)')}
    .form-error-list {
      ${apply('col-start-2 col-end-4 mr-10')}
    }

    .action-btn-container {
      ${apply('col-start-2 col-end-4 space-y-2')}
    }
  }
`

export const FormSubmitBtnClass = css`
  ${apply('text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1')}
`

export const FormCancelBtnClass = css`
  ${apply('inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500')}
`

export const FormDeleteBtnClass = css`
  ${apply('inline-flex items-center px-4 py-2 border border-red-200 uppercase text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500')}
`