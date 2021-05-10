import isEmpty from 'lodash/isEmpty';

export default function FormValidationGenerator(fields) {
    if (!fields || Object.keys(fields).length === 0) {
        return null;
    }
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
    const validations = [];
    if (field.constraints) {
        Object.keys(field.constraints).forEach(constraintName => {
            const constraint = field.constraints[constraintName];
            switch (constraintName) {
                case "Validate Dataset Field": {
                    const dependantField = getFieldById(fields, constraint.dependantFieldID.toString());
                    const equals = constraint["equals"] ? constraint["equals"] !== "No" : null;
                    const optionCodes = constraint.code ? (Array.isArray(constraint.code) ? constraint.code : [constraint.code]) : null;
                    validations[validations.length] = {
                        validateMethod: (formData) => {
                            if (formData[field.name] && formData[field.name].length && formData[dependantField.name] && formData[dependantField.name].length) {
                                const hasVal = optionCodes.indexOf(Number(JSON.parse(formData[dependantField.name])[0])) >= 0;
                                return hasVal ? equals : !equals;
                            } else {
                                return true;
                            }
                        },
                        getErrMsg: (formData) => {
                            return `Cannot have a value when ${dependantField.title} is ${JSON.parse(formData[dependantField.name]).slice(1)}`
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
                        getErrMsg: () => {
                            return `This field has error`
                        }
                    };
                    break;
                default:
                    break;
            }
        })
    }

    if (field.exclusive_with) {
        const dependantField = getFieldById(fields, field.exclusive_with);
        validations[validations.length] = {
            validateMethod: (formData) => {
                return formData === undefined || (!(formData[field.name] && formData[field.name].length && formData[dependantField.name] && formData[dependantField.name] !== ''));
            },
            getErrMsg: () => {
                return `Cannot have a value when ${dependantField.title} has a value`
            }
        };
    }

    if (field.field_type === "elapsed-time") {
        validations[validations.length] = {
            validateMethod: (formData) => {
                return formData === undefined || !(formData[field.name] && formData[field.name].split(':').filter(time => /\d/.test(time)).length !== 2);
            },
            getErrMsg: () => {
                return `Incomplete ${field.title}`
            }
        };
    }

    if (field.mandatory) {
        validations[validations.length] = {
            validateMethod: (formData, needCheck) => {
                if (!needCheck) {
                    return true;
                } else {
                    return isEmpty(formData) ? true : !!formData[field.name]
                }
            },
            getErrMsg: () => {
                return `${field.title} is required`
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
}