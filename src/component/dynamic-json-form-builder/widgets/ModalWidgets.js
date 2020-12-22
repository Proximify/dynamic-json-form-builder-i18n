import React from "react";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function ModalRegular(props) {
    console.log(props);
    const {state, setState,items,title} = props;
    // const [showModal, setShowModal] = React.useState(false);
    // setShowModal(props.open)
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t h-1 align-items-center">
                            <h3 className="text-3xl font-semibold">
                                Modal Title
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => {
                                    setState({
                                        ...state,
                                        open: false
                                    })
                                }}
                            >
                            <span
                                className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            x
                            </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className="my-4 text-gray-600 text-lg leading-relaxed">
                                {/*I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception*/}
                                {/*of themselves! They're slowed down by their perception of*/}
                                {/*themselves. If you're taught you can’t do anything, you*/}
                                {/*won’t do anything. I was taught I could do everything.*/}
                                {items[state.index].children}
                            </div>

                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                            <button
                                className="cancelBtn background-transparent"
                                type="button"
                                style={{transition: "all .15s ease"}}
                                // onClick={() => {
                                //     setState({
                                //         ...state,
                                //         open: false
                                //     })
                                // }}
                                onClick={() => {
                                    if (!state.edit) {
                                        const deleteItemBtnEle = document.getElementById(`${title}_modal_item_delete_btn_${state.index}`);
                                        deleteItemBtnEle.click();
                                    } else {
                                        props.items[state.index].children.props.onChange(state.dataPrevious)
                                    }
                                        setState({
                                            ...state,
                                            index:-1,
                                            open: false
                                        })
                                }}>

                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{transition: "all .15s ease"}}
                                onClick={() => {
                                    setState({
                                        ...state,
                                        open: false,
                                        index : -1
                                    })
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </>
    );
}