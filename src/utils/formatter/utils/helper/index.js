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

export const FieldValueMapper = (value, schema, isSubsectionFormatter = false) => {
    // console.log(schema,value)
    const fields = schema.fields
    // console.log(schema,value)
    const result = {}
    // console.log(value, schema)
    Object.keys(fields).forEach(fieldKey => {
        const field = fields[fieldKey];
        result[field.name] = {}
        result[field.name]["type"] = field["type"];
        result[field.name]["subtype"] = field["subtype"];
        result[field.name]["label"] = field["label"];
        if (!isSubsectionFormatter) {
            if (value[fieldKey]) {
                // console.log(fieldKey, value[fieldKey]);
                if (field["type"] !== "section") {
                    result[field.name]["value"] = value[fieldKey];
                } else {
                    result[field.name]["value"] = [];
                    // console.log("--",field)
                    const subsectionID = field.subsection_id;
                    if (schema.subsections[subsectionID]) {
                        // console.log("===", schema.subsections[subsectionID])
                        value[fieldKey].forEach(subsectionValue => {
                            // id? order?
                            result[field.name]["value"].push(FieldValueMapper(subsectionValue.values, schema.subsections[subsectionID]))
                        })
                    }
                }
            }
        } else {
            if (value[field.name]) {
                if (field.type === 'bilingual') {
                    result[field.name]["value"] = JSON.parse(value[field.name]);
                } else {
                    result[field.name]["value"] = value[field.name];
                }
            }
        }
    })
    return result
}

export const reftableValueParser = (fieldValue, isViewModeSubsectionField = false, isInViewMode = false, delimiter = ' - ') => {
    const format = (valueArray) => {
        let result = [];
        valueArray.forEach((value, index) => {
            if (value === 'Not Required') {
                return;
            }
            if (index === 0) {
                result.push(value);
                if (valueArray.length > 1) {
                    result.push(' (')
                }
            } else if (index === valueArray.length - 1) {
                result.push(value);
                if (valueArray.length > 1) {
                    result.push(')')
                }
            } else {
                result.push(value + ' - ')
            }
        })
        return result;
    }

    if (!fieldValue) {
        return null;
    }
    const result = [];
    if (isViewModeSubsectionField) {
        fieldValue.forEach((val, index) => {
            const {order, ...data} = val;
            Object.values(data).forEach(data => {
                Array.isArray(data) ? result.push(format(data), (index < fieldValue.length - 1 ? ', ' : '')) : result.push(data)
            })
        })
    } else {
        isInViewMode ? result.push(format(fieldValue)) : result.push(format(fieldValue.slice(1)))
    }
    return result
}

export const reftableValueFormatter = (fieldValue, index) => {
    // console.log(fieldValue)
    if (!fieldValue)
        return;
    if (!Array.isArray(fieldValue))
        return <span key={index} className="baseValue">{fieldValue}</span>
    return <span key={index}><strong className="mainValue">{fieldValue[0]}</strong><span className="baseValue">{fieldValue.slice(1)}</span></span>;
}


export class FormatterTracker {
    #fields = {}
    #isSubsectionFormatter = false

    constructor(fields, isSubsectionFormatter = false) {
        const tempFields = {...fields}
        this.#isSubsectionFormatter = isSubsectionFormatter;
        Object.keys(tempFields).forEach(key => {
            const field = tempFields[key];
            const value = field.value;
            this.#fields[key] = {
                val: (value !== undefined && value !== "" && value !== null) ? this.format(field) : undefined,
                lbl: field.label ?? undefined,
                type: field.type ?? undefined,
                subtype: field.subtype ?? undefined,
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
            if (field.count === 0 && field.rawValue && field.name !== "order") {
                result[key] = this.#fields[key]
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
                    if (field.subtype && field.subtype === "Yes-No") {
                        return field.value[1] === "Yes" ? field.label : null
                    } else {
                        return field.value[1];
                    }
                case "string":
                    return field.value;
                case "yearmonth":
                    return Months[field.value.split("/")[1] - 1] + " " + field.value.split("/")[0];
                case "monthday":
                    return Months[field.value.split("/")[0]] + " " + field.value.split("/")[1];
                case "date":
                    return Months[field.value.split("-")[1] - 1] + " " + field.value.split("-")[2] + ", " + field.value.split("-")[0];
                case "section":
                    // console.log("----", field)
                    let result = [];
                    field.value.forEach((val, i) => {
                        result[i] = {};
                        Object.keys(val).forEach(key => result[i][key] = this.format(val[key]));
                    })
                    return result;
                //
                // let string = "";
                // field.value.forEach((val, i) => {
                //     Object.keys(val).map(key => console.log(val, this.format(val[key])))
                //     if (i < field.value.length - 1)
                //         string += Object.keys(val).map(key => this.format(val[key])) + ", ";
                //     else
                //         string += Object.keys(val).map(key => this.format(val[key]));
                // })
                // return string;
                case "integer":
                    const integer = Number(field.value);
                    return isNaN(integer) ? field.value : integer
                case "reftable":
                    return this.#isSubsectionFormatter ? field.value : field.value[1].split('|');
                case "bilingual":
                    const eng = field.value["english"] ?? undefined;
                    const fre = field.value["french"] ?? undefined;
                    return {eng: eng, fre: fre}
                default:
                    return "unhandled format type of field:" + JSON.stringify(field)
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