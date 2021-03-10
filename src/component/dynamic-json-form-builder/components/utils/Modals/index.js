import React, {useEffect, useRef} from "react";
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import TooltipTrigger from "react-popper-tooltip";
import Tooltip from "../../../../Tooltip";


export function ModalArrayItem(props) {
    console.log("ModalRegular", props);
    const {state, setState, children, dropItem, context, title, fullScreen} = props;

    // const deleteHelper = (index) => {
    //     return items[index].onReorderClick(1,0);
    // }

    return (
        <>
            <div
                className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none focus:outline-none bg-gray-300 bg-opacity-70`}
            >
                <div
                    className={"relative w-full my-6 mx-auto max-w-2xl"}
                >
                    <div
                        className={"border rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"}
                    >
                        <div
                            className="flex items-start justify-between p-4 border-b border-solid border-gray-300 rounded-t h-16 align-items-center">
                            <h1 className="text-2xl font-semibold">
                                {title}
                            </h1>
                        </div>
                        {/*body*/}
                        <div className="relative pt-2 pb-5 px-10 flex-auto">
                            <div className="my-4 text-gray-600 text-lg leading-relaxed">
                                {children}
                            </div>

                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-between py-3 px-9 border-t border-solid border-gray-300">
                            <div>
                                {state.edit &&
                                <button
                                    className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
                                    className="text-gray-500 font-bold uppercase px-5 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{transition: "all .15s ease"}}
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
                                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{transition: "all .15s ease"}}
                                    onClick={() => {
                                        setState({
                                            ...state,
                                            open: false,
                                            edit: false,
                                            index: -1
                                        })
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

export function ModalConfirm(props){
    const {state, changeState} = props;
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                Delete Form
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    This form contains data. Are you sure you want to delete this form? This action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={()=>{
                                changeState({shouldDeleteConfirmModalOpen: false, shouldDeleteForm: true});
                            }}>
                            Delete
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={()=>{
                                    changeState({shouldDeleteConfirmModalOpen: false, shouldDeleteForm: false});
                                }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function ModalFileField(props) {
    console.log("ModalFileField", props);
    const {state, setState, children, title, fullScreen, isUpload} = props;

    return (
        <>
            <div
                // className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-300 bg-opacity-70"
                // className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden"
                className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 ${fullScreen ? "w-full h-full top-0 left-0 " : "inset-0 outline-none focus:outline-none bg-gray-300 bg-opacity-70"}`}
            >
                <div
                    // className="relative w-full my-6 mx-auto max-w-2xl"
                    className={`${fullScreen ? "absolute w-full h-full bg-white opacity-100" : "relative w-full my-6 mx-auto max-w-2xl"}`}
                >
                    <div
                        className={`${fullScreen ? "max-w-2xl h-full mx-auto" : "border rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"}`}
                        // className="border rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
                    >
                        <div
                            className="flex items-start justify-between p-4 border-b border-solid border-gray-300 rounded-t h-16 align-items-center">
                            <h1 className="text-2xl font-semibold">
                                {title}
                            </h1>
                            {/*<button*/}
                            {/*    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"*/}
                            {/*    onClick={() => {*/}
                            {/*        setState({*/}
                            {/*            ...state,*/}
                            {/*            open: false*/}
                            {/*        })*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*<span*/}
                            {/*    className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">*/}
                            {/*x*/}
                            {/*</span>*/}
                            {/*</button>*/}
                        </div>
                        {/*body*/}
                        <div className="relative pt-3 pb-4 px-6">
                            {children}
                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end py-3 px-9 border-t border-solid border-gray-300 rounded-b">
                            <button
                                className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{transition: "all .15s ease"}}
                                onClick={() => {
                                    if (isUpload)
                                        setState({...state, isLoading: true, fileList: null, isUploadModalOpen: false});
                                    else
                                        setState({...state, selectFileIndex: null, isPreviewModalOpen: false});
                                }}
                            >Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ModalFullScreen(props) {
    // console.log("ModalFullScreen", props);
    const {content, title} = props;

    return (
        <>
            <div className="overflow-y-auto fixed z-50 w-full h-full top-0 left-0 bg-white">
                <div className="max-w-2xl h-full w-full mx-auto py-5">
                    <div className="flex border-b-2 border-gray-200 py-3 items-center space-x-3">
                        <h1 className="text-2xl font-semibold text-black ml-20">{title}</h1>
                        {content.props.formSchema && content.props.formSchema.form_description && <Tooltip
                            placement="right"
                            trigger="hover"
                            delayHide={200}
                            tooltip={
                                <div className="mx-2 my-1">
                                    <p className="mb-1"><strong>{title}</strong></p>
                                    {content.props.formSchema &&
                                    <p>{content.props.formSchema.form_description ?? null}</p>}
                                </div>
                            }
                            hideArrow={true}
                            modifiers={[
                                {
                                    name: "offset",
                                    enabled: true,
                                    options: {
                                        offset: [0, 10]
                                    }
                                }
                            ]}
                        >
                            <AiOutlineQuestionCircle className="text-red-600" size={"1.5em"}/>
                        </Tooltip>}
                    </div>
                    <div className="pt-2 pb-5 my-4">
                        {content}
                    </div>
                </div>
            </div>

        </>
    );
}

export default ModalArrayItem;