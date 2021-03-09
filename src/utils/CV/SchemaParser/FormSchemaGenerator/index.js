import FormValidationGenerator from "./FormValidationGenerator";
import {FieldValueMapper, FormatterTracker} from "../../../formatter/utils/helper";
import GenericFieldTemplate
    from "../../../../component/dynamic-json-form-builder/components/utils/GenericFieldTemplate";
import {ReorderableArrayFieldTemplate, ArrayFieldTemplate}
    from "../../../../component/dynamic-json-form-builder/components/ArrayField/ArrayFieldTemplate";
import HiddenFieldTemplate
    from "../../../../component/dynamic-json-form-builder/components/HiddenField/HiddenFieldTemplate";
import api from "../../../../api";

/**
 * This function use the given form schema, generate structure schema, data schema and UI schema
 * @param schema: schema for the form
 * @param lovOptions
 * @returns {{dataSchema: null, formSchema: null, uiSchema: null}}
 * @constructor
 */
export const SchemaGenerator = (schema, lovOptions) => {
    // console.log(schema)
    const result = {
        formSchema: null,
        uiSchema: null,
        dataSchema: null,
        validations: null
    }
    if (schema !== null) {
        result.formSchema = formStrSchemaGen(schema, lovOptions);
        result.dataSchema = formDataSchemaGen(schema);
        result.uiSchema = formUISchemaGen(schema);
        result.validations = FormValidationGenerator(result.formSchema ? result.formSchema.properties : null);
    }
    console.log(result);
    return result;
}

/**
 * This function generate the form structure schema
 * @param schema
 * @param lovOptions
 * @returns {{id, type: string, required: [], properties: {}}}
 */
const formStrSchemaGen = (schema, lovOptions) => {
    const required = [];
    const properties = {};
    const fields = schema.fields;
    Object.keys(fields).forEach(fieldKey => {
        const field = fields[fieldKey]
        if (field["not_null"] === "1") {
            required.push(field.name)
        }
        // const fieldSchema = fieldStrSchemaGen(field, schema, selectionOpts);
        // if (fieldSchema){
        //     properties[field.name] = fieldSchema;
        // }
        properties[field.name] = fieldStrSchemaGen(field, schema, lovOptions);
    })
    return {
        type: "object",
        id: schema.name,
        form_description: schema.description,
        required: required,
        properties: properties
    }
}

/**
 * This function generate the field structure schema
 * @param field: field schema
 * @param schema
 * @param lovOptions
 * @returns {{}}
 */
const fieldStrSchemaGen = (field, schema, lovOptions) => {
    // if (field.name === "order" && schema.asc_item_order === "1"){
    //     return null;
    // }
    // console.log(field.name, field, schema)
    const result = {}
    result["name"] = field.name ?? null;
    result["id"] = field.field_id ?? null;
    result["description"] = field.description ? field.description.replaceAll('<a/>', '</a>') : undefined;
    result["title"] = field.label;
    result["subtype_id"] = field.subtype_id;
    result["field_type"] = field.type;
    result["constraints"] = field.constraints;
    result["exclusive_with"] = field.exclusive_with;
    result["readOnly"] = field.constraints ? !!field.constraints["autoFill"] : false;
    switch (field.type) {
        case "lov": {
            const subtype_id = field.subtype_id;
            result["enum"] = lovOptions[subtype_id] ?? []
            break;
        }
        case "string":
            result["type"] = "string";
            result["max_char_count"] = field.max_char_count;
            break;
        case "integer":
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
            result["maxItems"] = field["max_char_count"] === null ? undefined : Number(schema["max_char_count"]);
            result["fullscreen"] = false;
            result["items"] = {}
            const subsectionId = field["subsection_id"];
            const subsections = schema.subsections
            if (subsectionId in subsections) {
                result["fields"] = subsections[subsectionId].fields;
                result["items"] = formStrSchemaGen(subsections[subsectionId], lovOptions);
            }
            break;
        case "reftable": {
            const subtype_id = field.subtype_id;
            result["enum"] = lovOptions[subtype_id] ?? []
            break;
        }
        default:
            break;
    }
    return result
}

const formDataSchemaGen = (schema) => {
    if (!schema.section_data) {
        return {}
    }
    // console.log(schema)
    const mapper = FieldValueMapper(schema.section_data[0].values, schema);
    const ft = new FormatterTracker(mapper);
    const fields = ft.getFields();
    // console.log(fields)
    const dataSchema = {}
    // console.log(mapper, ft.getFields())
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        // console.log(field)
        if (field.type === "section") {
            if (field.rawValue) {
                const values = [];
                field.rawValue.forEach(val => {
                    const subFieldDataSchema = {}
                    Object.keys(val).forEach(subFieldName => {
                        const subField = val[subFieldName];
                        if (subField.type === "bilingual") {
                            subFieldDataSchema[subFieldName] = JSON.stringify(val[subFieldName].value);
                        } else if (subField.type === "reftable") {
                            subFieldDataSchema[subFieldName] = val[subFieldName].value && val[subFieldName].value.length ? [val[subFieldName].value[0]].concat(val[subFieldName].value[1].split("|")) : undefined;
                        } else {
                            subFieldDataSchema[subFieldName] = val[subFieldName].value;
                        }
                        // subFieldDataSchema[subFieldName] = val[subFieldName].value;
                    })
                    values.push(subFieldDataSchema);
                })
                dataSchema[fieldName] = values;
            } else {
                dataSchema[fieldName] = [];
            }

        } else {
            if (field.type === "bilingual") {
                dataSchema[fieldName] = JSON.stringify(field.rawValue);
            } else if (field.type === "reftable") {
                dataSchema[fieldName] = field.rawValue && field.rawValue.length ? [field.rawValue[0]].concat(field.rawValue[1].split("|")) : undefined;
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

const customArrayTemplate = {
    reorderableArrayFieldTemplate: ReorderableArrayFieldTemplate,
    arrayFieldTemplate: ArrayFieldTemplate
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
    "bilingual": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "multiLangTextAreaFieldWidget"
    },
    "integer": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "numberInputWidget",
        // "ui:readonly": true
    },
    "elapsed-time": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "elapsedTimeWidget",
    }
}


const formUISchemaGen = (schema) => {
    // const title = schema.title ?? schema.label;
    //const fieldLanguages = ["en", "fr"]
    // TODO: check enums size, use windowed select
    // console.log(schema)
    const result = {}
    const fields = schema.fields;
    Object.keys(fields).forEach(fieldKey => {
        const field = fields[fieldKey];
        // console.log(field)
        const fieldName = field.name;
        if (field.type === 'section') {
            const subsectionId = field["subsection_id"];
            const subsections = schema.subsections;
            if (subsectionId in subsections) {
                result[fieldName] = {
                    "ui:ArrayFieldTemplate": subsections[subsectionId].asc_item_order === "1" ? customArrayTemplate.reorderableArrayFieldTemplate : customArrayTemplate.arrayFieldTemplate,
                    "items": formUISchemaGen(subsections[subsectionId])
                }
            }
        } else {
            if (field.name === "order" && schema.asc_item_order === "1") {
                result[fieldName] = {
                    "ui:FieldTemplate": customTemplates.hiddenFieldTemplate,
                    "ui:widget": "hiddenFieldWidget"
                }
            } else {
                result[fieldName] = fieldTypeWidgetMapper[field.type];
            }
        }
    })
    return result;
}