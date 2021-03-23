// import React, {useState} from "react";
// import Formatter from '../../../../utils/formatter';
// import './ObjectField.css'
// import ModalArrayItem from "../utils/Modals";
//
// export function ObjectFieldTemplate(props) {
//     const {id, schema, title, required, rawErrors, properties, formData, formContext} = props;
//     console.log("ObjectFieldTemplate", props)
//     const [state, setState] = useState({
//         open: false,
//         edit: false,
//         dataPrevious: (formData && Object.keys(formData).length > 0) ? formData : null
//     });
//
//     function isFormDataEmpty() {
//         if (!formData) {
//             return true;
//         } else if (formData && Object.keys(formData).length === 0) {
//             return true;
//         } else {
//             let noValue = true
//             Object.values(formData).forEach(value => {
//                 if (value && value !== "" && value !== undefined) {
//                     noValue = false;
//                 }
//             })
//             return noValue
//         }
//     }
//
//     return (
//         <div className="flex flex-wrap justify-center pt-3">
//             <label htmlFor={id}
//                    className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2 pl-2">
//                 {title}{required ? "*" : null}
//             </label>
//             <div className="flex-grow" style={{maxWidth: "20rem"}}>
//                 <div className="objectField space-x-2">
//                     <>{properties[0].content}</>
//                     <>{properties[1].content}</>
//                 </div>
//             </div>
//             <div className={`${rawErrors} ? 'hidden' : ''`}>
//                 {rawErrors ? rawErrors.map((error, index) => {
//                     return (<li className="text-red-600" key={index}>{error}</li>)
//                 }) : null}
//             </div>
//         </div>
//     )
// }
//
// export function ObjectItemTemplate(props) {
//     return (
//         <React.Fragment>
//             {props.children}
//         </React.Fragment>
//     );
// }