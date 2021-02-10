import React, {useEffect, useRef} from "react";
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import TooltipTrigger from "react-popper-tooltip";
import Tooltip from "../../../../Tooltip";


export function ModalArrayItem(props) {
    console.log("ModalRegular", props);
    const {fieldItems, setFieldItems, index, items, dropItem, context, title, fullScreen, reorder} = props;
    const item = fieldItems[index];
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
                                {items[index].children}
                            </div>

                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-between py-3 px-9 border-t border-solid border-gray-300">
                            <div>
                                {item.edit &&
                                <button
                                    className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    onClick={() => {
                                        const fi = [...fieldItems];
                                        fi.splice(index, 1);
                                        setFieldItems(fi);
                                        dropItem();
                                        if (reorder !== undefined) {
                                            reorder(index);
                                        }
                                    }}>
                                    Delete
                                </button>}
                            </div>
                            <div>
                                <button
                                    className="text-gray-500 font-bold uppercase px-5 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{transition: "all .15s ease"}}
                                    onClick={() => {
                                        if (!item.edit) {
                                            const fi = [...fieldItems];
                                            fi.splice(index, 1);
                                            setFieldItems(fi);
                                            dropItem();
                                        } else {
                                            items[index].children.props.onChange(item.data);
                                            const fi = [...fieldItems];
                                            fi[index].open = false;
                                            fi[index].edit = false;
                                            setFieldItems(fi);
                                        }
                                    }}
                                >Cancel
                                </button>
                                <button
                                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{transition: "all .15s ease"}}
                                    onClick={() => {
                                        const fi = [...fieldItems];
                                        fi[index].open = false;
                                        setFieldItems(fi);
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
                    <h1 className="text-2xl flex font-semibold text-black border-b-2 border-gray-200 py-3 items-center justify-between">
                        {title}
                        {content.props.formSchema && content.props.formSchema.form_description && <Tooltip
                            placement="left"
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
                            <AiOutlineQuestionCircle className="text-gray-400"/>
                        </Tooltip>}
                    </h1>
                    <div className="pt-2 pb-5 my-4">
                        {content}
                    </div>
                </div>
            </div>

        </>
    );
}

export default ModalArrayItem;