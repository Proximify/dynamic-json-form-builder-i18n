export const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const FieldValueMapper = (value, schema) => {
    const fields = schema.fields
    const result = {}
    Object.keys(fields).forEach(fieldKey => {
        let hasValue = false;
        Object.keys(value).forEach(valueKey => {
            if (fieldKey === valueKey) {
                result[fields[fieldKey].name] = {
                    value: value[valueKey],
                    type: fields[fieldKey]["type"],
                    label: fields[fieldKey]["label"]
                }
                if (Array.isArray(value[valueKey]) && fields[fieldKey]["type"] === "section") {
                    result[fields[fieldKey].name]["value"] = []
                    value[valueKey].forEach(val => {
                        if (val.values) {
                            // result[fields[fieldKey].name]["value"] = []
                            Object.keys(schema.subsections).forEach(key => {
                                result[fields[fieldKey].name]["value"].push(FieldValueMapper(val.values, schema.subsections[key]))
                            })
                        }
                    })
                }
                hasValue = true;
            }
        })
        if (!hasValue) {
            result[fields[fieldKey].name] = {
                type: fields[fieldKey]["type"],
                label: fields[fieldKey]["label"]
            }
        }
    })
    return result
}

export class FormatterTracker {
    #fields = {}

    constructor(fields) {
        this.#fields = {...fields}
        Object.keys(this.#fields).forEach(key => {
            this.#fields[key].count = 0;
        })
    }

    getFields() {
        return this.#fields;
    }

    getUnFormattedField() {
        const result = {}
        Object.keys(this.#fields).forEach(key => {
            const field = this.#fields[key];
            if (field.count === 0 && field.value) {
                result.key = this.#fields[key]
            }
        })
        return result
    }

    getValue(rawData = false) {
        const result = {};
        Object.keys(this.#fields).forEach(key => {
            result[key] = this.format(this.#fields[key], rawData)
        })
        return result
    }

    getLabel() {
        const result = {};
        Object.keys(this.#fields).forEach(key => {
            result[key] = <span className="font-bold text-black">{this.#fields[key].label}: </span>
        })
        return result
    }

    format(field, rawData = false) {
        if (!field.value) {
            return null;
        }
        if (field.type) {
            switch (field.type) {
                case 'lov':
                    return field.value[1];
                case "string":
                    return field.value;
                case "monthday":
                    if (rawData)
                        return field.value
                    return Months[field.value.split("/")[0]] + " " + field.value.split("/")[1];
                case "date":
                    if (rawData)
                        return field.value
                    return Months[field.value.split("-")[1] - 1] + " " + field.value.split("-")[2] + ", " + field.value.split("-")[0];
                case "section":
                    let string = "";
                    let value = [];
                    if (rawData) {
                        value.push(field.value.map(value => {
                            return (
                                Object.keys(value).map(key => {
                                    return this.format(value[key])
                                })
                            )
                        }))
                        // console.log(value)
                    }else {
                        field.value.forEach((val, i) => {
                            if (i < field.value.length - 1)
                                string += Object.keys(val).map(key => this.format(val[key])) + ", ";
                            else
                                string += Object.keys(val).map(key => this.format(val[key]));
                        })
                    }
                    return rawData ? value : string;
                case "integer":
                    const integer = Number(field.value);
                    return isNaN(integer) ? field.value : integer
                case "reftable":
                    return field.value[1];
                case "bilingual":
                    if (rawData)
                        return field.value
                    const eng = field.value["english"] ? "English: " + field.value["english"] : "";
                    const fre = field.value["french"] ? "French: " + field.value["french"] : "";
                    return eng + " " + fre
                default:
                    return JSON.stringify(field.value)
            }
        }
    }

    // any(...names) {
    //     let contain = false;
    //     names.forEach(name => {
    //         const field = this.#fields[name];
    //         if (field !== undefined) {
    //             field.count++;
    //             contain = true;
    //         }
    //     })
    //     return contain
    // }
}

export function any(...fields) {
    let contain = false;

    for (let field of fields) {
        if (field.value !== undefined)
            contain = true;
    }

    if (!contain)
        return false;

    for (let field of fields) {
        if (field.value !== undefined)
            field.count++;
    }

    return true;
}