import React, {useState} from "react";
import Select from "react-select";
import WindowedSelect from "react-windowed-select";
import 'bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NumberFormat from "react-number-format";

/**
 * This is the custom widget for single input field
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function TextInputWidget(props) {
    // console.log("TextInputWidget", props);
    const [value, setValue] = useState(props.value);
    return (
        <input
            className={"form-control"}
            type="text"
            id={props.schema.id}
            value={value}
            required={props.required}
            onChange={(event) => {
                if (!props.rawErrors || props.rawErrors.length === 0) {
                    setValue(event.target.value);
                } else {
                    setValue(event.target.value);

                    props.onChange(event.target.value ?? undefined)
                }
            }}
            onBlur={(event) =>
                props.onChange(value)
            }
        />
    );
}

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function PhoneNumInputWidget(props){
    // console.log("phoneNumInputWidget", props);
    const [value, setValue] = useState(props.value);

    return (
        <NumberFormat
            className={"form-control"}
            type="text"
            id={props.schema.id}
            value={value}
            format={"+# (###) ###-####"}
            mask={"_"}
            onValueChange={(valueObj) => {
                if (!props.rawErrors || props.rawErrors.length === 0) {
                    setValue(valueObj.value);
                } else {
                    setValue(valueObj.value);
                    props.onChange(valueObj.value ?? undefined)
                }
            }}
            onBlur={() =>
                props.onChange(value)
            }
        />
    );
}

/**
 * This is the custom widget for single select field that use React-Select
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function SingleSelectWidget(props) {
    // console.log("SelectorWidget", props);
    const {options, onChange, value} = props;

    const handleChange = (value) => {
        console.log("Selected!!", value);
        if (value === null) {
            props.onChange(undefined);
        } else {
            props.onChange(value.value);
        }
    }
    return (
        <Select
            id={props.schema.id}
            options={options.enumOptions}
            defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                return e.value;
            }).indexOf(value)]}
            onChange={handleChange}
            isClearable={true}
        />
    );
}

/**
 * This is the custom widget for single select field that use React-Windowed-Select
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function WindowedSelectorWidget(props) {
    // console.log("WindowedSelectorWidget", props);
    const {options, onChange, value} = props;

    const handleChange = (value) => {
        console.log("Selected!!", value);
        if (value === null) {
            props.onChange(undefined);
        } else {
            props.onChange(value.value);
        }
    }

    return (
        <div>
            {/*<label htmlFor={props.schema.id} className="col-sm-2 col-form-label my-auto">{props.schema.title}</label>*/}
            <WindowedSelect
                isClearable={true}
                onChange={handleChange}
                defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                    return e.value;
                }).indexOf(value)]}
                options={options.enumOptions}
            />
        </div>
    );
}

/**
 * This is the custom widget for single multi-col select field that use React-Select
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function MultiColSelectorWidget(props) {
    // console.log("MultiColSelectorWidget", props);
    const {options, onChange, value} = props;
    const enumItems = options.enumOptions;

    const handleChange = (value) => {
        console.log("Selected!!", value);
        if (value === null) {
            props.onChange(undefined);
        } else {
            props.onChange(value.value);
        }
    }

    const formatOptionLabel = ({label, value}) => (
        <table className={"table"}>
            <tbody>
            <tr>
                {value.map((val, index)=>{
                    return(
                        <td className={"w-25 p-2"} key={index}>{val}</td>
                    )
                })}
            </tr>
            </tbody>
        </table>
    );

    return (
        <div>
            <Select
                options={enumItems}
                onChange={handleChange}
                formatOptionLabel={formatOptionLabel}
                defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                    return e.value.join('');
                }).indexOf((value) ? value.join('') : "")]}
                isClearable
            />
        </div>
    );
}

/**
 * This is the custom widget for single select field that use React-Select
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function FileInputWidget(props) {
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



export default TextInputWidget;
