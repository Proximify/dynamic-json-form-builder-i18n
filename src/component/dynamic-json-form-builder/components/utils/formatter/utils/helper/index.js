
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
        Object.keys(value).forEach(valueKey => {
            if (fieldKey === valueKey) {
                result[fields[fieldKey].name] = {value: value[valueKey], type: fields[fieldKey]["type"], label:fields[fieldKey]["label"]}
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
            }
        })
    })
    return result
}

export class FormatterTracker {
    #allValue = {}
    #formattedValue = {}
    #unFormattedValue = {}

    constructor(value) {
        this.#allValue = {...value};
        this.#unFormattedValue = {...value}
    }

    getAllValue() {
        return this.#allValue
    }

    getUnFormattedValue() {
        return this.#unFormattedValue
    }

    getFormattedValue() {
        return this.#formattedValue
    }

    get(name) {
        const value = this.#allValue[name];
        if (value !== undefined) {
            delete this.#unFormattedValue[name];
            this.#formattedValue[name] = value;
            return value
        } else {
            return null
        }
    }

    getValue(name) {
        const value = this.get(name);
        // console.log(name, value)
        if (value) {
            return this.format(value)
        } else {
            return null;
        }
    }

    getLabel(name) {
        const value = this.get(name);
        if (value) {
            return <span className="font-bold text-black">{value.label}: </span> ?? null
        }
        return null
    }

    format(value) {
        if (value.type) {
            switch (value.type) {
                case 'lov':
                    return value.value[1];
                case "string":
                    return value.value;
                case "monthday":
                    return Months[value.value.split("/")[0]] + " " + value.value.split("/")[1];
                case "date":
                    return Months[value.value.split("-")[1] - 1] + " " + value.value.split("-")[2] + ", " + value.value.split("-")[0];
                case "section":
                    let string = ""
                    value.value.forEach((val, i) => {
                        if (i < value.value.length - 1)
                            string += Object.keys(val).map(key => this.format(val[key])) + ", ";
                        else
                            string += Object.keys(val).map(key => this.format(val[key]));
                    })
                    return string;
                case "integer":
                    const integer = Number(value.value);
                    return isNaN(integer) ? value.value : integer
                case "reftable":
                    return value.value[1];
                case "bilingual":
                    const eng =  value.value["english"] ? "English: " + value.value["english"] : "";
                    const fre = value.value["french"] ? "French: " + value.value["french"] : "";
                    return  eng + " " + fre
                default:
                    return JSON.stringify(value.value)
            }
        }
    }

    contains(...names) {
        let contain = false;
        names.forEach(name => {
            if (this.#allValue[name] !== undefined) {
                contain = true;
            }
        })
        return contain
    }
}