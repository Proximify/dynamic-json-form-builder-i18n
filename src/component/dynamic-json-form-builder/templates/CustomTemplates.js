import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {PlusCircleIcon, PencilIcon, XIcon} from '@primer/octicons-react'
import Modal from 'react-modal';
import FileViewer from 'react-file-viewer';
import FileDownload from 'js-file-download';
import {useTranslation} from 'react-i18next';

Modal.setAppElement("#root");

/**
 * This is the custom template for single input or selection field
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function CustomFieldTemplate(props) {
    const {id, label, children, description, errors, help, required, rawErrors} = props;
    const style = props.formContext.style;
    // console.log("CustomFieldTemplate", props.children);
    return (
        <div className="form-group row justify-content-center mx-auto my-xl-3 my-lg-3 my-md-2 my-sm-2 my-0">
            <label htmlFor={id}
                   className="col-lg-4 col-md-3 col-sm-3 col-10 col-form-label">{label}{required ? "*" : null}</label>
            <div className="col-lg-8 col-md-9 col-sm-9 col-10">
                {children}
                {rawErrors ? rawErrors.map((error, index) => {
                    return (<li className={style.msgError} key={index}>{error}</li>)
                }) : null}
            </div>
        </div>
    );
}

/**
 * This is the custom template for array field
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function CustomArrayFieldTemplate(props) {
    const {title, items, canAdd, onAddClick, help, required, formData} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [itemIndex, setItemIndex] = useState(-1);
    const [isAddNew, setIsAddNew] = useState(false);
    const [currentData, setCurrentData] = useState(null);
    const {t, i18n} = useTranslation();

    // This function read the formData parsed in and extract the data and create HTML elements for each record
    const getItemList = () => {
        const listItem = []
        formData.forEach((element, i) => {
            let html;
            html = <li className={"list-group-item p-1"} key={i}>
                <div className={"row h-50"}>
                    <div className={"col-10"}>
                        <p className={"font-weight-normal m-0 d-inline-block text-truncate"}
                           style={{maxWidth: "100%"}}>
                            {element[Object.keys(element)[0]] ? (Array.isArray(element[Object.keys(element)[0]]) ? element[Object.keys(element)[0]].join(", ") : element[Object.keys(element)[0]]) : ""}
                        </p>
                    </div>
                    <div className={"col-2"}>
                        <a href="#"
                           id={`${title}_modal_item_edit_btn_${i}`}
                           className={"btn btn-outline-custom border-0 btn-small float-right py-0"}
                           onClick={(e) => {
                               setIsOpen(true);
                               setItemIndex(i);
                               setIsAddNew(false);
                               setCurrentData(props.items[i].children.props.formData);
                           }}
                        ><PencilIcon size={16}/>
                        </a>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-10"}>
                        <p className={"font-weight-light m-0 d-inline-block text-truncate"}
                           style={{maxWidth: "100%"}}>
                            {element[Object.keys(element)[1]] ? (Array.isArray(element[Object.keys(element)[1]]) ? element[Object.keys(element)[1]].join(", ") : element[Object.keys(element)[1]]) : ""}
                        </p>
                    </div>
                    <div className={"col-2"}>
                        <a href="#"
                           id={`${title}_modal_item_delete_btn_${i}`}
                           className={"btn btn-outline-custom border-0 btn-small float-right py-0"}
                           onClick={items[i].onDropIndexClick(items[i].index)}
                        ><XIcon size={16}/>
                        </a>
                    </div>
                </div>
            </li>
            listItem.push(html);
            if (Object.keys(element).length === 0) {
                const newItemBtnEle = document.getElementById(`${title}_modal_item_edit_btn_${i}`);
                // console.log(isOpen, itemIndex, i, isAddNew)
                if (newItemBtnEle && !isOpen && itemIndex !== i) {
                    setIsOpen(true);
                    setItemIndex(i);
                }
            }
        })
        return listItem;
    }

    function ModalFormValidator(formData) {
        let valid = false;
        if (Object.keys(formData).length === 0) {
            valid = false;
        }
        Object.keys(formData).forEach(element => {
            if (formData[element] !== undefined) {
                valid = true;
            }
        })
        return valid;
    }

    /**
     * This is the modal definition
     * @returns {JSX.Element}
     * @constructor
     */
    const ModalArrayFieldContent = () => {
        console.log(props)
        return (
            <Modal
                isOpen={isOpen}
                contentLabel={`${title} Modal`}
                id={`${title}_modal_${itemIndex}`}
                // style={props.formContext.modalStyle.modalArrayFieldContent ?? undefined}
                style={{height: "200px"}}
            >
                <div className={"pt-3"}>
                    {items[itemIndex].children}
                </div>
                <div className={"d-flex align-items-end justify-content-end"}>
                    <button className={"btn btn-outline-secondary mr-2 mt-3"}
                            onClick={(e) => {
                                if (isAddNew) {
                                    const deleteItemBtnEle = document.getElementById(`${title}_modal_item_delete_btn_${itemIndex}`);
                                    deleteItemBtnEle.click();
                                } else {
                                    props.items[itemIndex].children.props.onChange(currentData)
                                }
                                setItemIndex(-1);
                                setIsOpen(false);
                            }}>
                        {t('btn-cancel')}
                    </button>
                    <button className={"btn btn-outline-primary mt-3"}
                            disabled={ModalFormValidator(items[itemIndex].children.props.formData) === false}
                            onClick={(e) => {
                                setIsOpen(false)
                            }}>
                        {t('btn-save')}
                    </button>
                </div>
            </Modal>
        )
    }

    return (
        <div className="form-group row justify-content-center mx-auto my-xl-3 my-lg-3 my-md-2 my-sm-2 my-0">
            <label className="col-lg-4 col-md-3 col-sm-3 col-10 col-form-label">{title}{required ? "*" : null}</label>
            <div className="col-lg-8 col-md-9 col-sm-9 col-10">
                {canAdd &&
                <button type="button" className={"btn btn-light btn-link my-1"} onClick={() => {
                    setItemIndex(-1);
                    setIsAddNew(true);
                    return onAddClick();
                }}>< PlusCircleIcon
                    size={16}/></button>}
                <div>
                    <ul className={"list-group"}>
                        {getItemList()}
                    </ul>
                </div>
                <div id={`${title}_modal`}>
                    {isOpen ? <ModalArrayFieldContent/> : null}
                </div>
            </div>
        </div>
    )
}

/**
 * This is the custom template for file upload field, it use React's useStare and useEffect feature that can use
 * axois.get() to get file list and display the list of file.
 * When user upload file, it will invoke the field's widget to handle upload event
 * When the user click the individual file, it send HTTP get request that fetch the file data from server
 * When the user click delete button, it send a HTTP delete request to the server
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function CustomUploadFieldTemplate(props) {
    const {id, label, children, required, title} = props;
    const {t, i18n} = useTranslation();
    const [state, setState] = useState({
        isLoading: true,
        fileList: null,
        selectFileIndex: null,
        isUploadModalOpen: false,
        isPreviewModalOpen: false
    })

    useEffect(() => {
        const getFileList = () => {
            props.formContext.api.get("file/").then(res => {
                const files = res.data.data;
                setState({...state, isLoading: false, fileList: files})
            }).catch(err => {
                console.log("err", err);
                setState({...state, isLoading: false})
            })
        }
        if (state.isLoading) {
            getFileList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isLoading]);

    if (state.isLoading) {
        return (
            <div className="form-group row justify-content-center mx-auto my-xl-3 my-lg-3 my-md-2 my-sm-2 my-0">
                <label htmlFor={id}
                       className="col-lg-4 col-md-3 col-sm-3 col-10 col-form-label">{label}{required ? "*" : null}</label>
                <div className="col-lg-8 col-md-9 col-sm-9 col-10">
                    <button type="button" className={"btn btn-light btn-link my-1"} onClick={() => {
                        setState({...state, isUploadModalOpen: true});
                    }}>< PlusCircleIcon
                        size={16}/></button>
                    <div>Loading...</div>
                </div>
            </div>
        );
    }

    const ModalFileUpload = () => {
        return (
            <Modal
                isOpen={state.isUploadModalOpen}
                contentLabel="File Add Modal"
                id={`${title}_add_modal`}
                style={props.formContext.modalStyle.modalFileUpload ?? undefined}
            >
                <div className={"container"}>
                    {children}
                    <div className={"d-flex justify-content-end"}>
                        <button className={"btn btn-outline-secondary mt-3"}
                                onClick={() => {
                                    setState({...state, isLoading: true, fileList: null, isUploadModalOpen: false});
                                }}>
                            {t('btn-close')}
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }

    const ModalFilePreview = () => {
        return (
            <Modal
                isOpen={state.isPreviewModalOpen}
                contentLabel="File Edit Modal"
                id={`${title}_edit_modal`}
                closeOnEscape={true}
                style={props.formContext.modalStyle.ModalFilePreview ?? undefined}
            >
                <div className={"row h-100"}>
                    <div className={"col col-2"}>
                        <button className={"btn btn-outline-primary mt-2 mr-2"} onClick={() => {
                            setState({...state, selectFileIndex: null, isPreviewModalOpen: false});
                        }}>Close
                        </button>
                        <a href="#"
                           className={"btn btn-outline-success mt-2 mr-2"}
                           onClick={() => {
                               handleFileDownload(state.selectFileIndex);
                           }}
                        >Download</a>
                    </div>
                    <div className={"col col-10"}>
                        <h2>File Content</h2>
                        <div className={"border border-secondary h-75 p-2 py-2"}>
                            <FileViewer
                                fileType={state.fileList[state.selectFileIndex].split('.').pop()}
                                filePath={`${props.formContext.api.defaults.baseURL}file/${state.fileList[state.selectFileIndex]}`}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    const handleFileDownload = (index) => {
        let fileName = state.fileList[index];
        props.formContext.api.get(`/file/${fileName}`, {responseType: 'blob'}).then(res => {
            console.log(window.URL.createObjectURL(new Blob([res.data])))

            FileDownload(res.data, fileName);
        }).catch(err => {
            console.log(err)
        })
    }

    const handleFileDelete = (index) => {
        let fileName = state.fileList[index];
        props.formContext.api.delete(`/file/${fileName}`).then(res => {
            setState({...state, isLoading: true, fileList: null});
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="form-group row justify-content-center mx-auto my-xl-3 my-lg-3 my-md-2 my-sm-2 my-0">
            <label htmlFor={id}
                   className="col-lg-4 col-md-3 col-sm-3 col-10 col-form-label">{label}{required ? "*" : null}</label>
            <div className="col-lg-8 col-md-9 col-sm-9 col-10">
                <button type="button" className={"btn btn-light btn-link my-1"} onClick={() => {
                    setState({...state, isUploadModalOpen: true});
                }}>< PlusCircleIcon
                    size={16}/></button>
                <div>
                    <ul className={"list-group"}>
                        {state.fileList ? state.fileList.map((element, index) => {
                            return (
                                <li className={"list-group-item p-1"} key={index}>
                                    <div className={"row"}>
                                        <div className={"col col-10 py-0"}>
                                            <p className={"m-0 text-truncate"}
                                               style={{maxWidth: "100%"}}
                                               onClick={(event) => {
                                                   setState({
                                                       ...state,
                                                       selectFileIndex: index,
                                                       isPreviewModalOpen: true
                                                   });
                                               }}>{element}
                                            </p>
                                        </div>
                                        <div className={"col col-2"}>
                                            <a href="#"
                                               className={"btn btn-outline-custom border-0 btn-small float-right py-0 px-0"}
                                               onClick={(event) => handleFileDelete(index)}
                                            ><XIcon size={16}/></a>
                                        </div>
                                    </div>
                                </li>
                            )
                        }) : null}
                    </ul>
                </div>
                <div id={`${title}_add_modal`}>
                    {state.isUploadModalOpen ? <ModalFileUpload/> : null}
                </div>
                <div id={`${title}_edit_modal`}>
                    {state.isPreviewModalOpen ? <ModalFilePreview/> : null}
                </div>
            </div>
        </div>
    )
}

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function CombinedFieldTemplateFirst(props) {
    console.log("CombinedFieldTemplateFirst", props);
    const {id, label, children, required, rawErrors} = props;
    const style = props.formContext.style;
    return (
        <div>
            {children}
            {rawErrors ? rawErrors.map((error, index) => {
                return (<li className={style.msgError} key={index}>{error}</li>)
            }) : null}
        </div>

    );
}

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function CombinedFieldTemplateSecond(props) {
    const {id, label, children, required, rawErrors} = props;
    const style = props.formContext.style;
    return (
        <div>
            {children}
        </div>
    );
}

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function BundleFieldTemplate(props) {
    const {id, label, title, required, rawErrors} = props;
    const style = props.formContext.style;
    return (
        <div className="form-group row justify-content-center mx-auto my-xl-3 my-lg-3 my-md-2 my-sm-2 my-0">
            <label htmlFor={id}
                   className="col-lg-4 col-md-3 col-sm-3 col-10 col-form-label">{title}{required ? "*" : null}</label>
            <div className="col-lg-8 col-md-9 col-sm-9 col-10">
                <div className="input-group">
                    {props.properties.map((element, index) => {
                        return (<div className={`col-${12 / props.properties.length} px-0 ${index > 0 ? "pl-2" : ""}`}
                                     key={index}>{element.content}</div>)
                    })}
                </div>
                {rawErrors ? rawErrors.map((error, index) => {
                    return (<li className={style.msgError} key={index}>{error}</li>)
                }) : null}
            </div>
        </div>
    )
}

export default CustomFieldTemplate;

