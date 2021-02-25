export default function FormValidationGenerator(fields) {
    if (!fields || Object.keys(fields).length === 0) {
        return null;
    }
    // console.log(fields);
    const validations = {};
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field.field_type === "section") {
            validations[field.name] = FormValidationGenerator(field.items.properties);
        } else {
            const fieldValidations = fieldConstraintsHandler(field, fields);
            if (fieldValidations && fieldValidations.length > 0) {
                validations[field.name] = fieldValidations;
            }
        }
    })
    return validations;
}


const fieldConstraintsHandler = (field, fields) => {
    if (!field.constraints && !field.exclusive_with) {
        return null;
    }
    const validations = [];
    if (field.constraints){
        Object.keys(field.constraints).forEach(constraintName => {
            const constraint = field.constraints[constraintName];
            // console.log(field.name, constraintName, constraint);
            switch (constraintName) {
                case "Validate Dataset Field": {
                    const dependantField = getFieldById(fields, constraint.dependantFieldID.toString());
                    const mandatory = constraint.mandatory ? constraint.mandatory !== "No" : null;
                    const equals = constraint["equals"] ? constraint["equals"] !== "No" : null;
                    const optionCodes = constraint.code ? (Array.isArray(constraint.code) ? constraint.code : [constraint.code]) : null;
                    validations[validations.length] = {
                        validateMethod: (formData) => {
                            if (formData[field.name] && formData[field.name].length && formData[dependantField.name] && formData[dependantField.name].length) {
                                const hasVal = optionCodes.indexOf(Number(formData[dependantField.name][0])) >= 0;
                                return hasVal ? equals : !equals;
                            } else {
                                return true;
                            }
                        },
                        getErrMsg: (formData) => {
                            return `Cannot have a value when ${dependantField.title} is ${formData[dependantField.name].slice(1)}`
                        }
                    };
                    break;
                }
                case "one word":
                    validations[validations.length] = {
                        validateMethod: (formData) => {
                            if (formData[field.name]) {
                                return formData[field.name].match(/^[\w-]+$/);
                            } else {
                                return true;
                            }
                        },
                        getErrMsg: (formData) => {
                            return `This field has error`
                        }
                    };
                    break;
                // case "exclusive_with": {
                //     const dependantField = getFieldById(fields, constraint["exclusive_with"].toString());
                //     validations[validations.length] = {
                //         validateMethod: (formData) => {
                //             return formData === undefined || (!(formData[field.name] && formData[field.name].length && formData[dependantField.name] && formData[dependantField.name] !== ''));
                //         },
                //         getErrMsg: (formData) => {
                //             return `This field has error`
                //         }
                //     };
                //     break;
                // }
                //TODO: missing autoSum
                default:
                    // console.log("unhandled constraint", constraintName);
                    break;
            }
            // if (constraint.dependantFieldID) {
            //     console.log(constraint, getFieldNameById(fields, constraint.dependantFieldID.toString()))
            //
            // }

        })
    }

    if (field.exclusive_with) {
        const dependantField = getFieldById(fields, field.exclusive_with);
        // console.log(field.name, dependantField);
        validations[validations.length] = {
            validateMethod: (formData) => {
                return formData === undefined || (!(formData[field.name] && formData[field.name].length && formData[dependantField.name] && formData[dependantField.name] !== ''));
            },
            getErrMsg: (formData) => {
                return `Cannot have a value when ${dependantField.title} has a value`
            }
        };
    }

    return validations;
}

const getFieldById = (fields, id) => {
    for (let i = 0; i < Object.keys(fields).length; i++) {
        const field = fields[Object.keys(fields)[i]];
        if (field.field_type === 'section') {

        } else {
            if (field.id === id) {
                return field;
            }
        }
    }
    return null;


    // return Object.keys(fields).forEach(fieldName => {
    //     const field = fields[fieldName];
    //     let dependantFieldName = null;
    //     console.log(field, id)
    //     if (field.field_type === 'section'){
    //
    //     }else {
    //         if (field.id === id){
    //             return  field.name;
    //         }
    //     }
    //     // return dependantFieldName;
    // })
}