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
    ${apply('2xl:(ml-14 mr-10) xl:(ml-14 mr-10) lg:(ml-8 mr-4) md:(ml-2 my-3) sm:(ml-12 mr-10 my-1)')}
    .form-error-list {
      ${apply('flex justify-end mb-2')}
      .error-list {
        ${apply('border p-2 rounded-lg bg-red-200 text-sm')}
      }
    }

    .action-btn-container {
      ${apply('flex justify-between pt-2 px-4')}
    }
  }
`


export const FormSubmitBtnClass = css`
  ${apply('bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1')}
`

export const FormCancelBtnClass = css`
  ${apply('text-gray-500 font-bold uppercase px-5 py-2 text-sm outline-none focus:outline-none mr-1 mb-1')}
`

export const FormDeleteBtnClass = css`
  ${apply('bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1')}
`