import React from "react";
import {tw} from "twind";

export function ModalArrayItem(props) {
    const {state, setState, children, dropItem, title, itemValueValidator} = props;

    return (
        <>
            <div
                className={tw`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none focus:outline-none bg-gray-300 bg-opacity-70`}>
                <div
                    className={tw`relative w-full my-6 mx-auto max-w-3xl`}
                >
                    <div
                        className={tw`border rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none`}
                    >
                        <div
                            className={tw`flex items-start justify-between p-4 border-b border-solid border-gray-300 rounded-t h-16 items-center`}>
                            <h1 className={tw`text-2xl font-semibold`}>
                                {title}
                            </h1>
                        </div>
                        <div className={tw`relative pt-2 pb-5 px-10 flex-auto`}>
                            <div className={tw`my-4 text-gray-600 text-lg leading-relaxed`}>
                                {children}
                            </div>
                        </div>
                        <div
                            className={tw`flex items-center justify-between py-3 px-9 border-t border-solid border-gray-300`}>
                            <div>
                                {state.edit &&
                                <button
                                    className={tw`bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                                    onClick={() => {
                                        dropItem();
                                        setState({
                                            ...state,
                                            open: false,
                                            edit: false,
                                            index: -1
                                        })
                                    }}
                                >
                                    Delete
                                </button>}
                            </div>
                            <div>
                                <button
                                    className={tw`text-gray-500 font-bold uppercase px-5 py-2 text-sm outline-none focus:outline-none mr-1 mb-1`}
                                    onClick={() => {
                                        if (!state.edit) {
                                            dropItem();
                                            setState({
                                                ...state,
                                                open: false,
                                                edit: false,
                                                index: -1
                                            })
                                        } else {
                                            children.props.onChange(state.dataPrev ?? undefined);
                                            setState({
                                                ...state,
                                                open: false,
                                                edit: false,
                                                index: -1
                                            })
                                        }
                                    }}
                                >Cancel
                                </button>
                                <button
                                    className={tw`bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        if (itemValueValidator(state.index)){
                                            setState({
                                                ...state,
                                                open: false,
                                                edit: false,
                                                index: -1
                                            })
                                        }
                                    }}
                                >Save
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ModalDeleteConfirm(props) {
    const {state, changeState} = props;
    return (
        <div className={tw`fixed z-10 inset-0 overflow-y-auto`}>
            <div className={tw`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`}>
                <div className={tw`fixed inset-0 transition-opacity`} aria-hidden="true">
                    <div className={tw`absolute inset-0 bg-gray-500 opacity-75`}>
                    </div>
                </div>
                <span className={tw`hidden sm:inline-block sm:align-middle sm:h-screen`} aria-hidden="true">&#8203;</span>
                <div
                    className={tw`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className={tw`hidden sm:block absolute top-0 right-0 pt-4 pr-4`}>
                        <button type="button"
                                className={tw`bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                onClick={() => {
                                    changeState({
                                        ...state,
                                        shouldDeleteConfirmModalOpen: false,
                                        shouldDeleteForm: false
                                    });
                                }}>
                            <span className={tw`sr-only`}>Close</span>
                            <svg className={tw`h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className={tw`sm:flex sm:items-start`}>
                        <div
                            className={tw`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10`}>
                            <svg className={tw`h-6 w-6 text-red-600`} xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                        <div className={tw`mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left`}>
                            <h3 className={tw`text-lg leading-6 font-medium text-gray-900`} id="modal-headline">
                                Delete Form
                            </h3>
                            <div className={tw`mt-2`}>
                                <p className={tw`text-sm text-gray-500`}>
                                    This form contains data. Are you sure you want to delete this form? This action
                                    cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={tw`mt-5 sm:mt-4 sm:flex sm:flex-row-reverse`}>
                        <button type="button"
                                className={tw`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                onClick={() => {
                                    changeState({
                                        ...state,
                                        shouldDeleteConfirmModalOpen: false,
                                        shouldDeleteForm: true
                                    });
                                }}>
                            Delete
                        </button>
                        <button type="button"
                                className={tw`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm`}
                                onClick={() => {
                                    changeState({
                                        ...state,
                                        shouldDeleteConfirmModalOpen: false,
                                        shouldDeleteForm: false
                                    });
                                }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalArrayItem;