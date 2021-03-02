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

export const FieldValueMapper = (value, schema, isSubsectionFormatter = false, order = null) => {
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
        if (field.name === 'order' && order) {
            result[field.name]['value'] = order;
        }
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
                            result[field.name]["value"].push(FieldValueMapper(subsectionValue.values, schema.subsections[subsectionID], false, subsectionValue.order))
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

export const reftableValueParser = (fieldValue, isViewModeSubsectionField = false, isInViewMode = false, needNotRequired = false) => {
    const format = (valueArray) => {
        let result = [];
        valueArray.forEach((value, index) => {
            if (value === 'Not Required' && !needNotRequired) {
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
        if (fieldValue && fieldValue[0].order) {
            fieldValue.sort((a, b) => (a.order > b.order ? 1 : -1));
        }
        fieldValue.forEach((val, index) => {
            const {order, ...fields} = val;
            Object.values(fields).forEach(field => {
                field.count++;
                Array.isArray(field.val) ? result.push(format(field.val), (index < fieldValue.length - 1 ? ', ' : '')) : result.push(field.val)
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
    return <span key={index}><strong className="mainValue">{fieldValue[0]}</strong><span
        className="baseValue">{fieldValue.slice(1)}</span></span>;
}

export const singleFieldSubsectionFormatter = (fieldValue, isBilingualItem = false) => {
    const result = [];
    if (fieldValue && fieldValue[0].order) {
        fieldValue.sort((a, b) => a.order > b.order ? 1 : -1);
    }
    fieldValue.forEach((val, index) => {
        const {order, ...field} = val;
        Object.values(field).forEach(subField => {
            if (isBilingualItem) {
                // const bilingualData = [];
                // Object.values(data).forEach(biliData => {
                //     if (biliData) {
                //         bilingualData.push(biliData)
                //     }
                // })
                // if (bilingualData.length > 1) {
                //     result.push(<span key={index}>{index === fieldValue.length - 1 ? <>{bilingualData[0]} <span
                //         className="secondLang">({bilingualData[1]})</span></> : <>{bilingualData[0]} <span
                //         className="secondLang">({bilingualData[1]})</span>, </>}</span>)
                // } else {
                //     result.push(<span
                //         key={index}>{index === fieldValue.length - 1 ? `${bilingualData[0]}` : `${bilingualData[0]}, `}</span>)
                // }
            } else {
                subField.count++;
                result.push(<span
                    key={index}>{index === fieldValue.length - 1 ? `${subField.val}` : `${subField.val}, `}</span>)
            }
        })
    })
    return result
}



export const multiFieldSubsectionFormatter = (fields, labels, tags, delimiters) => {
    const formatter = (value, tag) => {
        switch (tag) {
            case 's':
                return <strong>{value}</strong>
            case 'i':
                return <i>{value}</i>
            case 'u':
                return <u>{value}</u>
            default:
                return <span>{value}</span>
        }
    }

    return <>{
        Object.values(fields).map((field, index) => {
            field.count++;
            const firstDelimiter = (delimiters && Array.isArray(delimiters[index]) && delimiters[index].length > 1) ?
                <span>{delimiters[index][0]}</span> : null;
            const secondDelimiter = (delimiters && Array.isArray(delimiters[index]) && delimiters[index].length > 1) ?
                <span>{delimiters[index][1]}</span> : (delimiters ? <span>{delimiters[index]}</span> : null);
            return field.val ? (<>
                <span>{labels && labels[index]}</span>{firstDelimiter}{formatter(field.val, tags ? tags[index] : null)}{secondDelimiter}</>) : null
        })
    }</>
}

export class FormatterTracker {
    #fields = {}
    #isSubsectionFormatter = false

    constructor(fields, isSubsectionFormatter = false) {
        const tempFields = {...fields}
        this.#isSubsectionFormatter = isSubsectionFormatter;
        this.#fields = this.fieldsLoader(tempFields);
        // Object.keys(tempFields).forEach(key => {
        //     const field = tempFields[key];
        //     const value = field.value;
        //     this.#fields[key] = {
        //         val: (value !== undefined && value !== "" && value !== null) ? this.format(field) : undefined,
        //         lbl: field.label ?? undefined,
        //         type: field.type ?? undefined,
        //         subtype: field.subtype ?? undefined,
        //         rawValue: value ?? undefined,
        //         name: key,
        //         count: 0
        //     }
        // })
    }

    fieldsLoader = (fields) => {
        const fie = {};
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            const value = field.value;
            if (field.type === 'section') {
                fie[key] = {
                    val: (value !== undefined && value !== "" && value !== null) ? [].concat(value.map(subVal => this.fieldsLoader(subVal))) : undefined,
                    lbl: field.label ?? undefined,
                    type: field.type ?? undefined,
                    subtype: field.subtype ?? undefined,
                    rawValue: value ?? undefined,
                    name: key,
                    count: 0
                }
            } else {
                fie[key] = {
                    val: (value !== undefined && value !== "" && value !== null) ? this.format(field) : undefined,
                    lbl: field.label ?? undefined,
                    type: field.type ?? undefined,
                    subtype: field.subtype ?? undefined,
                    rawValue: value ?? undefined,
                    name: key,
                    count: 0
                }
            }
        })
        return fie;
    }

    getFields() {
        return this.#fields;
    }

    getUnFormattedField() {
        // Object.keys(this.#fields).forEach(key => {
        //     const field = this.#fields[key];
        //     if (field.count === 0 && field.rawValue && field.name !== "order") {
        //         result[key] = this.#fields[key]
        //     }
        // })
        return this.getUnFormattedFieldHelper(this.#fields)
    }

    getUnFormattedFieldHelper = (fields) => {
        const result = {};
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            if (field.count === 0 && field.rawValue && field.name !== 'order') {
                result[key] = fields[key];
            } else if (field.count !== 0 && field.type === 'section' && field.val) {
                field.val.forEach(subFields => {
                    const subFieldsResult = this.getUnFormattedFieldHelper(subFields);
                    if (Object.keys(subFieldsResult).length !== 0) {
                        if (!result[key]) {
                            result[key] = [].concat(subFieldsResult)
                        } else {
                            result[key].push(subFieldsResult)
                        }
                    }
                })
            }
        })
        return result
    }


    // getFieldValue(field, rawData = false) {
    //     if (!field)
    //         return null;
    //     if (rawData) {
    //         return this.#fields[field.name].rawValue;
    //     } else {
    //         return this.#fields[field.name].val;
    //     }
    // }

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
                        return field.value[1] === "Yes" ? field.label.replace('?', '') : null
                    } else {
                        return field.value[1];
                    }
                case "string":
                    return field.value;
                case 'year':
                    // TODO: handle option month and day
                    return field.value.split("/")[0]
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