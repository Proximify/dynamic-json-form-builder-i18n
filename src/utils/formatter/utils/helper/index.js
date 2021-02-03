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

export const FieldValueMapper = (value, schema, isSubsection = false) => {
    const fields = schema.fields
    const result = {}
    // console.log(value, schema)
    Object.keys(fields).forEach(fieldKey => {
        const field = fields[fieldKey];
        result[field.name] = {}
        result[field.name]["type"] = field["type"];
        result[field.name]["label"] = field["label"];
        Object.keys(value).forEach(valueKey => {
            if (!isSubsection){
                if (fieldKey === valueKey) {
                    if (Array.isArray(value[valueKey]) && field["type"] === "section") {
                        result[field.name]["value"] = []
                        value[valueKey].forEach(val => {
                            if (val.values) {
                                // result[fields[fieldKey].name]["value"] = []
                                Object.keys(schema.subsections).forEach(key => {
                                    result[field.name]["value"].push(FieldValueMapper(val.values, schema.subsections[key]))
                                })
                            }
                        })
                    } else {
                        result[fields[fieldKey].name]["value"] = value[valueKey];
                    }
                }
            }else {
                if (valueKey === field.name){
                    result[fields[fieldKey].name]["value"] = value[valueKey];
                }
            }
        })
    })
    return result
}

export class FormatterTracker {
    #fields = {}

    constructor(fields) {
        const tempFields = {...fields}
        Object.keys(tempFields).forEach(key => {
            const field = tempFields[key];
            const value = field.value;
            this.#fields[key] = {
                val: (value !== undefined && value !== "" && value !== null) ? this.format(field) : undefined,
                lbl: field.label ?? undefined,
                type: field.type ?? undefined,
                rawValue: value ?? undefined,
                name: key,
                count: 0
            }
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

    getFieldValue(field, rawData = false) {
        if (!field)
            return null;
        if (rawData) {
            return this.#fields[field.name].rawValue;
        } else {
            return this.#fields[field.name].val;
        }
    }

    // getLabel(field) {
    //     const result = {};
    //     Object.keys(this.#fields).forEach(key => {
    //         result[key] = <span className="font-bold text-black">{this.#fields[key].label}: </span>
    //     })
    //     return result
    // }

    format(field) {
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
                    return Months[field.value.split("/")[0]] + " " + field.value.split("/")[1];
                case "date":
                    return Months[field.value.split("-")[1] - 1] + " " + field.value.split("-")[2] + ", " + field.value.split("-")[0];
                case "section":
                    let string = "";
                    field.value.forEach((val, i) => {
                        if (i < field.value.length - 1)
                            string += Object.keys(val).map(key => this.format(val[key])) + ", ";
                        else
                            string += Object.keys(val).map(key => this.format(val[key]));
                    })
                    return string;
                case "integer":
                    const integer = Number(field.value);
                    return isNaN(integer) ? field.value : integer
                case "reftable":
                    return field.value[1];
                case "bilingual":
                    const eng = field.value["english"] ? "English: " + field.value["english"] : "";
                    const fre = field.value["french"] ? "French: " + field.value["french"] : "";
                    return eng + " " + fre
                default:
                    return JSON.stringify(field.value)
            }
        }
    }
}

export function any(...fields) {
    if (fields.length === 0) {
        return false;
    } else {
        let contain = false;
        for (let field of fields) {
            if (field.rawValue) {
                contain = true;
                break;
            }
        }
        if (!contain) {
            return null;
        } else {
            for (let field of fields) {
                if (field.rawValue)
                    field.count++;
            }
            return true;
        }
    }
}