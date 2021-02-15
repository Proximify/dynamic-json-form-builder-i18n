import FormValidationGenerator from "./FormValidationGenerator";
import {FieldValueMapper, FormatterTracker} from "../../../formatter/utils/helper";
import GenericFieldTemplate
    from "../../../../component/dynamic-json-form-builder/components/utils/GenericFieldTemplate";
import {ReorderableArrayFieldTemplate, ArrayFieldTemplate}
    from "../../../../component/dynamic-json-form-builder/components/ArrayField/ArrayFieldTemplate";
import HiddenFieldTemplate
    from "../../../../component/dynamic-json-form-builder/components/HiddenField/HiddenFieldTemplate";

/**
 * This function use the given form schema, generate structure schema, data schema and UI schema
 * @param schema: schema for the form
 * @param selectionOpts
 * @returns {{dataSchema: null, formSchema: null, uiSchema: null}}
 * @constructor
 */
export const SchemaGenerator = (schema, selectionOpts) => {
    // console.log(schema)
    const result = {
        formSchema: null,
        uiSchema: null,
        dataSchema: null,
        dataValidation: null
    }
    if (schema !== null) {
        result.formSchema = formStrSchemaGen(schema, selectionOpts);
        result.dataSchema = formDataSchemaGen(schema);
        result.uiSchema = formUISchemaGen(schema);
        result.dataValidation = FormValidationGenerator(result.formSchema ? result.formSchema.properties : null);
    }
    // console.log(result.formSchema);
    return result;
}

/**
 * This function generate the form structure schema
 * @param schema
 * @param selectionOpts
 * @returns {{id, type: string, required: [], properties: {}}}
 */
const formStrSchemaGen = (schema, selectionOpts) => {
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
        properties[field.name] = fieldStrSchemaGen(field, schema, selectionOpts);
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
 * @param selectionOpts
 * @returns {{}}
 */
const fieldStrSchemaGen = (field, schema, selectionOpts) => {
    // if (field.name === "order" && schema.asc_item_order === "1"){
    //     return null;
    // }
    // console.log(field.name, field, schema)
    const result = {}
    result["name"] = field.name ?? null;
    result["id"] = field.field_id ?? null;
    result["description"] = field.description ? field.description.replaceAll('<a/>', '</a>') : null;
    result["title"] = field.label;
    result["subtype_id"] = field.subtype_id;
    result["field_type"] = field.type;
    result["constraints"] = field.constraints;
    const selectionOptions = [];
    switch (field.type) {
        case "lov":
            if (selectionOpts) {
                const subtype_id = field.subtype_id;
                Object.keys(selectionOpts).forEach(id => {
                    if (subtype_id === id) {
                        selectionOpts[id].forEach(option => {
                            selectionOptions.push(option)
                        })
                    }
                })
            }
            result["enum"] = selectionOptions.length > 0 ? selectionOptions : ["no option found", "opt 1"];
            break;
        case "string":
            result["type"] = "string";
            result["max_char_count"] = field.max_char_count;
            break;
        case "integer":
            result["type"] = "integer";
            break;
        case "monthday":
            result["type"] = "string";
            break;
        case "yearmonth":
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
                result["items"] = formStrSchemaGen(subsections[subsectionId], selectionOpts);
            }
            break;
        case "reftable":
            if (selectionOpts) {
                const subtype_id = field.subtype_id;
                Object.keys(selectionOpts).forEach(id => {
                    if (subtype_id === id) {
                        selectionOpts[id].forEach(option => {
                            selectionOptions.push(option)
                        })
                    }
                })
            }
            result["enum"] = selectionOptions.length > 0 ? selectionOptions : [[1, 2], [2, 3], [3, 4]];
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
        // console.log(field)
        if (field.type === "section") {
            if (field.rawValue) {
                const values = [];
                field.rawValue.forEach(val => {
                    const subField = {}
                    Object.keys(val).forEach(subFieldName => {
                        subField[subFieldName] = val[subFieldName].value;
                    })
                    values.push(subField);
                })
                dataSchema[fieldName] = values;
            } else {
                dataSchema[fieldName] = [];
            }

        } else {
            if (field.type === "bilingual") {
                dataSchema[fieldName] = JSON.stringify(field.rawValue);
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
        "ui:widget": "singleSelectionWidget"
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
    "date": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "dateInputWidget"
    },
    "reftable": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "multiColLargeSelectionWidget"
    },
    "bilingual": {
        "richText": {
            "ui:FieldTemplate": customTemplates.genericFieldTemplate,
            "ui:widget": "multiLangTextAreaFieldWidget"
        }, "plainText": {
            "ui:FieldTemplate": customTemplates.genericFieldTemplate,
            "ui:widget": "multiLangFieldWidget"
        }
    },
    "integer": {
        "ui:FieldTemplate": customTemplates.genericFieldTemplate,
        "ui:widget": "numberInputWidget"
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
                if (field.type === "bilingual") {
                    result[fieldName] = fieldTypeWidgetMapper["bilingual"][field.constraints.richText ? "richText" : "plainText"];
                }else {
                    result[fieldName] = fieldTypeWidgetMapper[field.type];
                }
            }
        }
    })
    return result;
}