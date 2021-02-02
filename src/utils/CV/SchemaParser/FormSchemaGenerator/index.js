import {FieldValueMapper, FormatterTracker} from "../../../formatter/utils/helper";

/**
 * This function use the given form schema, generate structure schema, data schema and UI schema
 * @param schema: schema for the form
 * @param selectionOpts
 * @returns {{dataSchema: null, formSchema: null, uiSchema: null}}
 * @constructor
 */
export const SchemaGenerator = (schema, selectionOpts) => {
    console.log(schema)
    const result = {
        formSchema: null,
        uiSchema: null,
        dataSchema: null
    }
    if (schema !== null) {
        result.formSchema = formStrSchemaGen(schema, selectionOpts);
        result.dataSchema = formDataSchemaGen(schema);
    }
    return result;
}

/**
 * This function generate the form structure schema
 * @param schema
 * @param selectionOpts
 * @returns {{id, type: string, title: *, required: [], properties: {}}}
 */
const formStrSchemaGen = (schema, selectionOpts) => {
    const type = "object";
    const title = schema.title ?? schema.label;
    const id = schema.name;
    //const fieldLanguages = ["en", "fr"]
    const required = [];
    const properties = {};
    const fields = schema.fields;
    Object.keys(fields).forEach(fieldKey => {
        const field = fields[fieldKey]
        if (field["not_null"] === "1") {
            required.push(field.name)
        }
        properties[field.name] = fieldStrSchemaGen(field, schema, selectionOpts);
    })
    return {
        type: type,
        id: id,
        title: title,
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
    const result = {}
    result["id"] = field.name ?? null;
    result["title"] = field.label;
    result["subtype_id"] = schema.subtype_id;

    switch (field.type) {
        case "lov":
            const selectionOptions = [];
            if (selectionOpts){
                const subtype_id = field.subtype_id;
                Object.keys(selectionOpts).forEach(id => {
                    if (subtype_id === id){
                        selectionOpts[id].forEach(option => {
                            selectionOptions.push(option)
                        })
                    }
                })
            }
            // result["type"] = "string";
            result["enum"] = selectionOptions;
            break;
        case "string":
            result["type"] = "string";
            break;
        case "monthday":
            // TODO: combine to single field, extra work inside form component
            result["type"] = "string";
            // result["type"] = "object";
            // result["properties"] = {
            //     month: {
            //         type: "string",
            //         id: "month",
            //         title: "Month",
            //         enum: [
            //             "January",
            //             "February",
            //             "March",
            //             "April",
            //             "May",
            //             "June",
            //             "July",
            //             "August",
            //             "September",
            //             "October",
            //             "November",
            //             "December"
            //         ]
            //     },
            //     day: {
            //         type: "integer",
            //         id: "day",
            //         title: "Day",
            //         enum: Array.from({length: 31}, (_, i) => i + 1)
            //     }
            // };
            break;
        case "date":
            result["type"] = "string";
            break;
        case "section":
            // result["type"] = schema["max_char_count"] === null ? "array" : "object";
            result["type"] = "array";
            result["fullscreen"] = false;
            result["items"] = {}
            const subsectionId = field["subsection_id"];
            const subsections = schema.subsections
            if (subsectionId in subsections) {
                result["items"] = formStrSchemaGen(subsections[subsectionId],selectionOpts)
            }
            break;
        default:
            break;
    }
    return result
}

const formDataSchemaGen = (schema) => {
    const mapper = FieldValueMapper(schema.section_data[0].values, schema);
    //console.log("--",mapper)
    const ft = new FormatterTracker(mapper);
    const fields = ft.getFields();
    // const val = ft.getValue(true);
    // console.log("fields", fields);
    const dataSchema = {}
    Object.keys(fields).forEach(fieldName => {
        dataSchema[fieldName] = fields[fieldName].rawValue;
    })
    // console.log("dataSchema", dataSchema);
    return dataSchema;
}