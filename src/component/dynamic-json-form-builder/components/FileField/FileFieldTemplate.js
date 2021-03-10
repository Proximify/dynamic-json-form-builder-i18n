// import React, {useState, useEffect} from "react";
// import {AiOutlinePlusCircle} from "react-icons/ai";
// import FileViewer from 'react-file-viewer';
// import FileDownload from 'js-file-download';
// import {BsTrashFill, BsCloudDownload} from "react-icons/bs";
// import Formatter from "../../../../utils/formatter";
// import {ModalFileField} from "../utils/Modals";
//
// export default function FileFieldTemplate(props) {
//     const {id, label, children, required, formContext, schema} = props;
//     const [state, setState] = useState({
//         isLoading: true,
//         fileList: null,
//         selectFileIndex: null,
//         isUploadModalOpen: false,
//         isPreviewModalOpen: false
//     })
//     console.log("FileFieldTemplate", props)
//     useEffect(() => {
//         const getFileList = () => {
//             props.formContext.api.get("file/").then(res => {
//                 const files = res.data.data;
//                 setState({...state, isLoading: false, fileList: files})
//             }).catch(err => {
//                 console.log("err", err);
//                 setState({...state, isLoading: false})
//             })
//         }
//         if (state.isLoading) {
//             getFileList();
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [state.isLoading]);
//
//     if (state.isLoading) {
//         return (
//             <div className="flex flex-wrap justify-center pt-3">
//                 <label htmlFor={id}
//                        className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2 pl-2">{label}{required ? "*" : null}</label>
//                 <div className="flex-grow" style={{maxWidth: "20rem"}}>
//                     <div className="sectionData">
//                         <a type="button" className="text-blue-600" onClick={() => {
//                             setState({...state, isUploadModalOpen: true});
//                         }}>< AiOutlinePlusCircle />
//                         </a>
//                         <div>Loading...</div>
//                     </div>
//
//                 </div>
//             </div>
//         );
//     }
//
//     // const ModalFileUpload = () => {
//     //     return (
//     //         <Modal
//     //             isOpen={state.isUploadModalOpen}
//     //             contentLabel="File Add Modal"
//     //             id={`${label}_add_modal`}
//     //             style={props.formContext.modalStyle.modalFileUpload ?? undefined}
//     //         >
//     //             <div className={"container"}>
//     //                 {children}
//     //                 <div className={"d-flex justify-content-end"}>
//     //                     <button className={"btn btn-outline-secondary mt-3"}
//     //                             onClick={() => {
//     //                                 setState({...state, isLoading: true, fileList: null, isUploadModalOpen: false});
//     //                             }}>
//     //                         {t('btn-close')}
//     //                     </button>
//     //                 </div>
//     //             </div>
//     //         </Modal>
//     //     )
//     // }
//
//     const previewContent = () => {
//         return (
//             <React.Fragment>
//                 <div className="w-full h-full">
//                     <h2 className="text-xl my-1">File Content</h2>
//                     <div className="bg-gray-200" style={{height: '100%'}}>
//                         <FileViewer
//                             fileType={state.fileList[state.selectFileIndex].split('.').pop()}
//                             filePath={`${props.formContext.api.defaults.baseURL}file/${state.fileList[state.selectFileIndex]}`}
//                         />
//                     </div>
//                 </div>
//                 <div className="mt-3">
//                     <a href="#"
//                        className="bg-indigo-500 text-white text-sm font-bold py-2 px-2 rounded inline-flex items-center"
//                        onClick={() => {
//                            handleFileDownload(state.selectFileIndex);
//                        }}
//                     >
//                         <BsCloudDownload size={"1rem"}/>
//                         <span className="ml-1">Download</span>
//                     </a>
//                 </div>
//             </React.Fragment>
//         )
//     }
//
//     // const ModalFilePreview = () => {
//     //     return (
//     //         <Modal
//     //             isOpen={state.isPreviewModalOpen}
//     //             contentLabel="File Edit Modal"
//     //             id={`${label}_edit_modal`}
//     //             closeOnEscape={true}
//     //             style={props.formContext.modalStyle.ModalFilePreview ?? undefined}
//     //         >
//     //             <div className={"row h-100"}>
//     //                 <div className={"col col-2"}>
//     //                     <button className={"btn btn-outline-primary mt-2 mr-2"} onClick={() => {
//     //                         setState({...state, selectFileIndex: null, isPreviewModalOpen: false});
//     //                     }}>Close
//     //                     </button>
//     //                     <a href="#"
//     //                        className={"btn btn-outline-success mt-2 mr-2"}
//     //                        onClick={() => {
//     //                            handleFileDownload(state.selectFileIndex);
//     //                        }}
//     //                     >Download</a>
//     //                 </div>
//     //                 <div className={"col col-10"}>
//     //                     <h2>File Content</h2>
//     //                     <div className={"border border-secondary h-75 p-2 py-2"}>
//     //                         <FileViewer
//     //                             fileType={state.fileList[state.selectFileIndex].split('.').pop()}
//     //                             filePath={`${props.formContext.api.defaults.baseURL}file/${state.fileList[state.selectFileIndex]}`}
//     //                         />
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </Modal>
//     //     )
//     // }
//
//     const handleFileDownload = (index) => {
//         let fileName = state.fileList[index];
//         props.formContext.api.get(`/file/${fileName}`, {responseType: 'blob'}).then(res => {
//             console.log(window.URL.createObjectURL(new Blob([res.data])))
//
//             FileDownload(res.data, fileName);
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//
//     const handleFileDelete = (index) => {
//         let fileName = state.fileList[index];
//         props.formContext.api.delete(`/file/${fileName}`).then(res => {
//             setState({...state, isLoading: true, fileList: null});
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//
//     return (
//         <div className="flex flex-wrap justify-center pt-3">
//             <label htmlFor={id}
//                    className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2 pl-2">{label}{required ? "*" : null}</label>
//             <div className="flex-grow" style={{maxWidth: "20rem"}}>
//                 <div className="sectionData">
//                     <a type="button" className="text-blue-600" onClick={() => {
//                         setState({...state, isUploadModalOpen: true});
//                     }}>< AiOutlinePlusCircle />
//                     </a>
//                     <div className={`${state.fileList && state.fileList.length >0  ? "border border-gray-300 rounded mt-1" : "hidden"}`}>
//                         <ul>
//                             <p className="border-b px-2 border-gray-300">{label}:</p>
//                             {state.fileList ? state.fileList.map((element, index) => {
//                                 return (
//                                     <li className={"flex justify-between py-1 mx-2"} key={index}>
//                                         <div className={"hover:text-gray-600"}
//                                              onClick={(event) => {
//                                                  setState({
//                                                      ...state,
//                                                      selectFileIndex: index,
//                                                      isPreviewModalOpen: true
//                                                  });
//                                              }}>
//                                             <Formatter app={formContext.app} form={formContext.form} section={schema.id}
//                                                        fields={null} values={element}/>
//                                         </div>
//                                         <div>
//                                             <a type="button"
//                                                className="text-gray-500"
//                                                data-toggle={"tooltip"}
//                                                data-placement={"left"}
//                                                title={"Delete this file"}
//                                                onClick={(event) => handleFileDelete(index)}
//                                             > <BsTrashFill size={"0.8em"}/>
//                                             </a>
//                                         </div>
//                                     </li>
//                                 )
//                             }) : null}
//                         </ul>
//                     </div>
//                 </div>
//                 {/*state, setState, children, title, fullScreen, isUpload*/}
//
//                 <div id={`${label}_add_modal`}>
//                     {state.isUploadModalOpen ?
//                         // <ModalFileUpload />
//                         <ModalFileField state={state} setState={setState} children={children} title={label}
//                                         fullScreen={!!(schema.hasOwnProperty("fullScreen") && schema.fullScreen)}
//                                         isUpload={true}/>
//                         : null}
//                 </div>
//                 <div id={`${label}_edit_modal`}>
//                     {state.isPreviewModalOpen ?
//                         // <ModalFilePreview/>
//                         <ModalFileField state={state} setState={setState} children={
//                             previewContent()
//                         } title={label}
//                                         fullScreen={!!(schema.hasOwnProperty("fullScreen") && schema.fullScreen)}
//                                         isUpload={false}/>
//                         : null}
//                 </div>
//             </div>
//         </div>
//     )
// }