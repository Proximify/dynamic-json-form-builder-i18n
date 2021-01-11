import React, {useState, useEffect, useRef} from "react";
import {toast, ToastContainer} from "react-toastify";

export default function FileFieldWidget(props) {
    // console.log("FileInputWidget", props);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [loaded, setLoaded] = useState(0);

    // list allow mime type
    const types = ['application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/png', 'image/jpeg', 'image/jpg']

    const checkMimeType = (event) => {
        let files = event.target.files
        let err = []
        for (let x = 0; x < files.length; x++) {
            if (!types.includes(files[x].type)) {
                err[x] = files[x].type + ' is not a supported format\n';
            }
        }
        for (let z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }

    const maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 5) {
            const msg = 'Only 5 images can be uploaded at a time'
            event.target.value = null
            toast.warn(msg)
            return false;
        }
        return true;
    }

    const checkFileSize = (event) => {
        let files = event.target.files
        let size = 2000000
        let err = [];
        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + 'is too large, please pick a smaller file\n';
            }
        }
        for (let z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }

    const onChangeHandler = event => {
        let files = event.target.files
        if (maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)) {
            setSelectedFiles(files);
            setLoaded(0);
        }
    }

    const onClickHandler = () => {
        if (!selectedFiles)
            return;
        const data = new FormData();
        for (let x = 0; x < selectedFiles.length; x++) {
            data.append('files', selectedFiles[x])
        }
        props.formContext.api.post("/file/", data, {
            onUploadProgress: ProgressEvent => {
                setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100);
            },
        })
            .then(res => { // then print response status
                toast.success('upload success');
            })
            .catch(err => { // then print response status
                toast.error('upload fail');
            })
    }

    return (
        <div className={"container p-2"}>
            <div className={"row"}>
                <input className={"py-1"} type="file" name="file" id={`${props.id}_input`}
                       accept={types} onChange={onChangeHandler} multiple/>
                <a className={"btn btn-primary"} onClick={onClickHandler}>UPLOAD</a>
            </div>
            <div className={"row mt-1"}>
                <ToastContainer/>
                <div className={`progress ${selectedFiles ? "visible" : "invisible"}`}
                     style={{width: '26%', height: '10px'}}>
                    <div className={"progress-bar progress-bar-striped progress-bar-animated"} role={"progressbar"}
                         style={{width: `${loaded}%`}}
                         aria-valuenow={loaded} aria-valuemin="0"
                         aria-valuemax="100">{Number(loaded.toFixed(2))}%
                    </div>
                </div>
            </div>
        </div>
    )
}
