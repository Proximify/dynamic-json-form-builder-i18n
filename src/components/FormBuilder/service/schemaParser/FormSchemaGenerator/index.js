import isEmpty from 'lodash/isEmpty';
import FormValidationGenerator from "./FormValidationGenerator";
import {bilingualValueParser} from '../../formDataHandler'
import GenericFieldTemplate
    from "../../../components/utils/GenericFieldTemplate";
import {ArrayFieldTemplate}
    from "../../../components/utils/ArrayFieldTemplate";
import HiddenFieldTemplate
    from "../../../components/HiddenField/HiddenFieldTemplate";
import clone from 'clone';

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

const FieldValueMapper = (value, schema, isSubsectionFormatter = false, order = null) => {
    const fields = schema.fields
    const result = {}
    Object.keys(fields).forEach(fieldKey => {
        const field = fields[fieldKey];
        result[field.name] = {}
        result[field.name]["type"] = field["type"];
        result[field.name]["subtype"] = field["subtype"];
        result[field.name]["label"] = field["label"];
        result[field.name]["constraints"] = field["constraints"];
        if (field.name === 'order' && order) {
            result[field.name]['value'] = order;
        }
        if (!isSubsectionFormatter) {
            if (value[fieldKey]) {
                if (field["type"] !== "section") {
                    result[field.name]["value"] = value[fieldKey];
                } else {
                    result[field.name]["value"] = [];
                    const subsectionID = field.subsection_id;
                    if (schema.subsections[subsectionID]) {
                        value[fieldKey].forEach(subsectionValue => {
                            result[field.name]["value"].push(FieldValueMapper(subsectionValue.values, schema.subsections[subsectionID], false, subsectionValue.order))
                            result[field.name]["value"][result[field.name]["value"].length - 1]['itemId'] = subsectionValue.id;
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

class FormatterTracker {
    #fields = {}
    #isSubsectionFormatter = false

    constructor(fields, isSubsectionFormatter = false) {
        const tempFields = {...fields}
        this.#isSubsectionFormatter = isSubsectionFormatter;
        this.#fields = this.fieldsLoader(tempFields);
    }

    fieldsLoader = (fields) => {
        const fie = {};
        Object.keys(fields).forEach(key => {
            if (key !== 'itemId') {
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
                        constraints: field.constraints ?? undefined,
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
                        constraints: field.constraints ?? undefined,
                        count: 0
                    }
                }
            }
        })
        return fie;
    }

    getFields() {
        return this.#fields;
    }

    getUnformattedField() {
        return this.getUnFormattedFieldHelper(this.#fields)
    }

    getUnFormattedFieldHelper = (fields) => {
        const result = {};
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            if (field.count === 0 && field.rawValue && field.name !== 'order' && field.name !== 'itemId') {
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
        return result;
    }

    format(field) {
        if (!field.value) {
            return null;
        }
        if (field.type) {
            switch (field.type) {
                case 'lov':
                    const fieldValue = this.#isSubsectionFormatter ? JSON.parse(field.value) : field.value;
                    if (field.subtype && field.subtype === "Yes-No") {
                        return fieldValue[1] === "Yes" ? field.label.replace('?', '') : null
                    } else {
                        return fieldValue[1];
                    }
                case "string":
                case "elapsed-time":
                    return field.value;
                case 'year': {
                    const date = field.value.split("/").filter(time => /\d/.test(time));
                    if (date.length === 3) {
                        return Months[date[1] - 1] + " " + date[2] + ", " + date[0];
                    } else if (date.length === 2) {
                        return Months[date[1] - 1] + " " + date[0];
                    } else {
                        return date[0]
                    }
                }
                case "yearmonth":
                    const date = field.value.split("/").filter(time => /\d/.test(time));
                    if (date.length === 3) {
                        return Months[date[1] - 1] + " " + date[2] + ", " + date[0];
                    } else {
                        return Months[date[1] - 1] + " " + date[0];
                    }
                case "monthday":
                    return Months[field.value.split("/")[0]] + " " + field.value.split("/")[1];
                case "date":
                    return Months[field.value.split("-")[1] - 1] + " " + field.value.split("-")[2] + ", " + field.value.split("-")[0];
                case "section":
                    let result = [];
                    field.value.forEach((val, i) => {
                        result[i] = {};
                        Object.keys(val).forEach(key => result[i][key] = this.format(val[key]));
                    })
                    return result;
                case "integer":
                    const integer = Number(field.value);
                    return isNaN(integer) ? field.value : integer
                case "systable":
                    return this.#isSubsectionFormatter ? field.value : field.value.slice(1);
                case "reftable":
                    return this.#isSubsectionFormatter ? field.value : field.value[1].split('|');
                case "bilingual":
                    const eng = field.value["english"] ?? undefined;
                    const fre = field.value["french"] ?? undefined;
                    return {eng: eng, fre: fre}
                case "slider":
                    return field.value + '%';
                case 'boolean':
                    return field.value === "1" ? field.label.replace('?', '') : null;
                default:
                    return "unhandled format type of field:" + JSON.stringify(field)
            }
        }
    }
}

const fieldIdNameMapper = (schema) => {
    const {fields, subsections} = schema;
    const mapper = {};
    for (const [fieldId, field] of Object.entries(fields)) {
        mapper[fieldId] = {name: field.name, type: field.type};
        if (field.type === 'section') {
            mapper[fieldId]['subFields'] = fieldIdNameMapper(subsections[field.subsection_id])
        }
    }
    if (!Array.isArray(subsections) && !isEmpty(subsections)) {
        Object.values(subsections).forEach(subsection => {
            const subsectionFields = subsection.fields;
            for (const [subsectionFieldId, subsectionField] of Object.entries(subsectionFields)) {
                mapper[subsectionFieldId] = {
                    name: subsectionField.name,
                    type: subsectionField.type,
                    parentName: subsection.name,
                    isSubsectionField: true
                };
            }
        })
    }
    return mapper;
}

export const SchemaGenerator = (schema) => {
    const result = {
        formSchema: null,
        uiSchema: null,
        dataSchema: null,
        validations: null,
        fieldIdNameMapper: null
    }
    if (schema !== null) {
        // const fieldIdNameMapper =
        result.fieldIdNameMapper = fieldIdNameMapper(schema);
        result.formSchema = formStrSchemaGen(schema);
        result.dataSchema = formDataSchemaGen(schema);
        result.uiSchema = formUISchemaGen(schema);
        result.validations = FormValidationGenerator(result.formSchema?.properties || null);

    }
    console.log(result);
    return result;
}

/**
 * This function generate the form structure schema with order
 * @param schema
 * @returns {{id, type: string, required: [], properties: {}}}
 */
const formStrSchemaGen = (schema) => {
    const properties = {};
    const fields = schema.fields;
    const sortedFields = Object.entries(fields).sort(([, a], [, b]) => a.order_number - b.order_number)

    // get currency fields and put them together if necessary
    const currencyAssociateFields = [];
    sortedFields.forEach(([field_id, field], index) => {
        if (field.constraints?.autofill?.functionName === 'convertCurrency' && field.constraints?.autofill?.arguments) {
            currencyAssociateFields.push([]);
            // hasConvertedCurrencyField = true;
            field.constraints.autofill.arguments.forEach(argument => {
                const associateField = fields[argument.id];
                if (field.name.endsWith(associateField?.name) || associateField?.name.includes('currency')) {
                    if (!associateField.name.includes('currency')) {
                        // amount
                        const amountFieldIndex = sortedFields.findIndex(([, field]) => field.name === associateField.name);
                        if (amountFieldIndex !== -1) {
                            associateField['currencyField'] = 'amount';
                            currencyAssociateFields[currencyAssociateFields.length - 1].unshift({
                                field_id: associateField.field_id,
                                field_name: associateField.name,
                                index: amountFieldIndex,
                                fundingType: 'amount'
                            });
                        }
                    } else {
                        // converted amount
                        const currencyFieldIndex = sortedFields.findIndex(([, field]) => field.name === associateField.name)
                        if (currencyFieldIndex !== -1) {
                            associateField['currencyField'] = 'currency';
                            currencyAssociateFields[currencyAssociateFields.length - 1].push({
                                field_id: associateField.field_id,
                                field_name: associateField.name,
                                index: currencyFieldIndex,
                                fundingType: 'currency'
                            });
                        }
                    }
                }
            })
            field['currencyField'] = 'convertedAmount';
            currencyAssociateFields[currencyAssociateFields.length - 1].push({
                field_id: field.field_id,
                field_name: field.name,
                index: index,
                fundingType: 'convertedAmount'
            });
        }
    })

    // sort fields, put funding field together
    currencyAssociateFields.forEach(associateFields => {
        associateFields.forEach((associateField, index) => {
            if (index > 0) {
                if (associateField.index !== associateFields[0].index + index) {
                    sortedFields.splice(associateFields[0].index + index, 0, sortedFields.splice(associateFields[index].index, 1)[0]);
                }
            }
        })
    })

    sortedFields.forEach(([, field]) => {
        properties[field.name] = fieldStrSchemaGen(field, schema);
    })
    return {
        type: "object",
        id: schema.name,
        form_title: schema.title,
        form_description: schema.description,
        required: [],
        properties: properties,
        fundingFormGroupFields: currencyAssociateFields
    }
}

/**
 * This function generate the field structure schema
 * @param field: field schema
 * @param schema
 * @returns {{}}
 */
const fieldStrSchemaGen = (field, schema) => {
    const result = {}
    result["name"] = field.name ?? undefined;
    result["id"] = field.field_id ?? undefined;
    result["description"] = field.description ? field.description.replaceAll('<a/>', '</a>') : undefined;
    result["title"] = field.label;
    result["subtype_id"] = field.subtype_id;
    result["field_type"] = field.type;
    result["constraints"] = field.constraints;
    result["exclusive_with"] = field.exclusive_with;
    result["readOnly"] = field.constraints ? !!field.constraints["autoFill"] : false;
    result["order_number"] = field.order_number;
    result["mandatory"] = field['not_null'] === "1";
    if (field.currencyField) {
        result["currencyField"] = field.currencyField;
    }
    // add twClass for test
    // result["twClass"] = field.tw ?? 'bg-red-200';
    switch (field.type) {
        case "lov":
        case "reftable":
        case "systable": {
            result["type"] = "string";
            result['subtype_id'] = field.subtype_id;
            break;
        }
        case "string":
            result["type"] = "string";
            result["max_char_count"] = field.max_char_count;
            break;
        case "integer":
        case "boolean":
        case "slider":
            result["type"] = "string";
            break;
        case "elapsed-time":
            result["type"] = "string";
            break;
        case "monthday":
            result["type"] = "string";
            break;
        case "yearmonth":
            result["type"] = "string";
            break;
        case "year":
            result["type"] = "string";
            break;
        case "date":
            result["type"] = "string";
            break;
        case "bilingual":
            result["type"] = "string";
            break;
        case "section":
            result["type"] = "array";
            result["fullscreen"] = false;
            result["sectionFormat"] = "<p><strong>{area_of_research:label}</strong>: {area_of_research}</p>";
            result["items"] = {}
            const subsectionId = field["subsection_id"];
            const subsections = schema.subsections
            if (subsectionId in subsections) {
                result["fields"] = subsections[subsectionId].fields;
                result["maxItems"] = subsections[subsectionId]["max_item_count"] ?? undefined;
                result["sortable"] = subsections[subsectionId]['asc_item_order'] === "1";
                result["items"] = formStrSchemaGen(subsections[subsectionId]);
                if (result['items'].properties) {
                    result['items'].properties['itemId'] = {name: 'itemId', type: 'string'}
                }
            }
            break;
        default:
            break;
    }
    return result
}

const formDataSchemaGen = (schema) => {
    if (!schema.section_data) {
        return {}
    }
    const mapper = FieldValueMapper(schema.section_data[0].values, schema);
    const ft = new FormatterTracker(mapper);
    const fields = ft.getFields();
    const dataSchema = {}
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field.type === "section") {
            if (field.rawValue) {
                const values = [];
                field.rawValue.forEach(val => {
                    const subFieldDataSchema = {}
                    Object.keys(val).forEach(subFieldName => {
                        if (subFieldName === 'itemId') {
                            subFieldDataSchema[subFieldName] = val[subFieldName]
                        } else {
                            const subField = val[subFieldName];
                            if (subField.type === "bilingual") {
                                subFieldDataSchema[subFieldName] = JSON.stringify(val[subFieldName].value);
                            } else if (subField.type === "reftable") {
                                subFieldDataSchema[subFieldName] = val[subFieldName].value && val[subFieldName].value.length ? JSON.stringify([val[subFieldName].value[0]].concat(val[subFieldName].value[1].split("|"))) : undefined;
                            } else if (subField.type === 'lov' || subField.type === "systable") {
                                subFieldDataSchema[subFieldName] = val[subFieldName].value ? JSON.stringify(val[subFieldName].value) : undefined
                            } else {
                                subFieldDataSchema[subFieldName] = val[subFieldName].value;
                            }
                        }
                    })
                    values.push(subFieldDataSchema);
                })
                dataSchema[fieldName] = values;
            } else {
                dataSchema[fieldName] = [];
            }
        } else {
            if (field.type === "bilingual") {
                dataSchema[fieldName] = JSON.stringify(bilingualValueParser(field, field.rawValue, false, true));
            } else if (field.type === "reftable") {
                dataSchema[fieldName] = field.rawValue && field.rawValue.length ? JSON.stringify([field.rawValue[0]].concat(field.rawValue[1].split("|"))) : undefined;
            } else if (field.type === 'lov' || field.type === "systable") {
                dataSchema[fieldName] = field.rawValue ? JSON.stringify(field.rawValue) : undefined
            } else {
                dataSchema[fieldName] = field.rawValue;
            }
        }
    })
    return dataSchema;
}

const customTemplates = {
    genericFieldTemplate: GenericFieldTemplate,
    hiddenFieldTemplate: HiddenFieldTemplate
}

const fieldTypeWidgetMapper = {
    "lov": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "singleLargeSelectionWidget"
    },
    "string": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "stringInputWidget"
    },
    "monthday": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "monthDayInputWidget"
    },
    "yearmonth": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "yearMonthInputWidget"
    },
    "year": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "yearInputWidget"
    },
    "date": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "dateInputWidget"
    },
    "reftable": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "multiColLargeSelectionWidget"
    },
    "systable": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "multiColLargeSelectionWidget"
    },
    "bilingual": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "multiLangFieldWidget"
    },
    "integer": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "numberInputWidget",
    },
    "elapsed-time": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "elapsedTimeWidget",
    },
    "boolean": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "booleanInputWidget"
    },
    "slider": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "sliderInputWidget"
    }
}


const formUISchemaGen = (schema) => {
    const result = {}
    const fields = schema.fields;
    Object.keys(fields).forEach(fieldKey => {
        const field = fields[fieldKey];
        const fieldName = field.name;
        if (field.type === 'section') {
            const subsectionId = field["subsection_id"];
            const subsections = schema.subsections;
            if (subsectionId in subsections) {
                result[fieldName] = {
                    "ui:ArrayFieldTemplate": ArrayFieldTemplate,
                    "items": formUISchemaGen(subsections[subsectionId])
                }
                result[fieldName]['items']['itemId'] = {
                    "ui:FieldTemplate": customTemplates.hiddenFieldTemplate,
                    "ui:widget": "hiddenFieldWidget"
                }
            }
        } else {
            if (field.name === "order" && schema.asc_item_order === "1") {
                result[fieldName] = {
                    "ui:FieldTemplate": customTemplates.hiddenFieldTemplate,
                    "ui:widget": "hiddenFieldWidget"
                }
            } else if (field.disabled && field.disabled === '1') {
                result[fieldName] = {
                    "ui:FieldTemplate": customTemplates.hiddenFieldTemplate,
                    "ui:widget": "hiddenFieldWidget"
                }
            } else if (field.constraints && field.constraints.autoSum) {
                result[fieldName] = {
                    "ui:FieldTemplate": customTemplates.genericFieldTemplate,
                    "ui:widget": "readOnlyFieldWidget"
                }
            } else {
                result[fieldName] = clone(fieldTypeWidgetMapper[field.type]);
            }
        }
    })
    return result;
}