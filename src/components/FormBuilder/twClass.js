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
    ${apply('md:(px-4 grid grid-cols-3 gap-x-6 py-2)')}
    .form-error-list {
      ${apply('w-72')}
      .error-list {
        ${apply('border p-2 rounded-lg bg-red-200 text-sm')}
      }
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
  ${apply('text-gray-500 font-bold uppercase px-5 py-2 text-sm outline-none focus:outline-none mr-1 mb-1')}
`

export const FormDeleteBtnClass = css`
  ${apply('bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1')}
`