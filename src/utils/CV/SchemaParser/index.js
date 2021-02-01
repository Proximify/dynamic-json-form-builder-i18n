import {FieldValueMapper, FormatterTracker} from "../../formatter/utils/helper";

const sectionParser = (section, parent_id) => {
    const result = {}

    result["section_id"] = section["section_id"];
    result["parent_id"] = parent_id;
    result["title"] = section["label"];
    // if (section.hasOwnProperty("has_fields")) {
    if (section["has_fields"] !== undefined) {
        if (section.has_fields === "0") {
            result["type"] = "section";
            result["subsections"] = {}
            Object.keys(section["subsections"]).forEach(key => {
                result["subsections"][key] = sectionParser(section["subsections"][key], section["section_id"])
            })
        } else {
            result["type"] = "form";
            result["multiplicity"] = section["max_item_count"] === "1" ? "single" : "multiple";
            result["subsections"] = section.subsections;
        }
    }

    result.section_data = section.items;
    result["view_type"] = section.view_type;
    result["fields"] = section.fields;
    result["name"] = section.name;

    return result;
}

const fieldSchemaGenerator = (field, schema) => {
    // "lov": {type: "string", enum: ["option 1", "option 2", "option 3"]},
    // "string": {type: "string"},
    // "monthday": {type: "string"},
    // "date" : {type: "string"},
    // "section": {type: "object"}
    // console.log(field.name + "in" + schema)
    const result = {}
    result["id"] = field.name ?? null;
    result["title"] = field.label;
    switch (field.type) {
        case "lov":
            result["type"] = "string";
            result["enum"] = ["option 1", "option 2", "option 3"];
            break;
        case "string":
            result["type"] = "string";
            break;
        case "monthday":
            result["type"] = "object";
            result["properties"] = {
                month: {
                    type: "string",
                    id: "month",
                    title: "Month",
                    enum: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ]
                },
                day: {
                    type: "integer",
                    id: "day",
                    title: "Day",
                    enum: Array.from({length: 31}, (_, i) => i + 1)
                }
            };
            break;
        case "date":
            result["type"] = "string";
            break;
        case "section":
            result["type"] = schema["max_char_count"] === null ? "array" : "object";
            result["fullscreen"] = false;
            result["items"] = {}
            const subsectionId = field["subsection_id"];
            const subsections = schema.subsections
            if (subsectionId in subsections) {
                result["items"] = formSchemaGenerator(subsections[subsectionId])
            }
    }
    // console.log(result)
    return result
}

const formSchemaGenerator = (schema) => {
    console.log("++",schema)
    const type = "object";
    const title = schema.title ?? schema.label;
    const id = schema.name;
    //const fieldLanguages = ["en", "fr"]
    const required = [];
    const properties = {};
    const fields = schema.fields;
    Object.keys(fields).forEach(fieldKey => {
        const field = fields[fieldKey]
        if (field["not_null"] === "1"){
            required.push(field.name)
        }
        properties[field.name] = fieldSchemaGenerator(field, schema)
    })
    const formSchema = {
        type: type, id: id, title: title, required: required,
        properties: properties
    }
    //return {type: type, title: title, required : required: }
    // console.log(JSON.stringify(formSchema))
    return formSchema
}

const schemaGenerator = (schema) => {
    // console.log(schema)
    const result = {
        formSchema: null,
        uiSchema: null,
        dataSchema: null
    }
    if (schema !== null) {
        result.formSchema = formSchemaGenerator(schema);
        const mapper = FieldValueMapper(schema.section_data[0].values,schema);
        console.log("--",mapper)
        const ft = new FormatterTracker(mapper);
        const fields = ft.getFields();
        const val = ft.getValue(true);
        // console.log("fields", fields, val, lbl);
        const dataSchema = {}
        Object.keys(fields).forEach(fieldName => {
            // console.log(fieldName,val[fieldName]);
            dataSchema[fieldName] = val[fieldName];

        })
        console.log(dataSchema)

    }
    return result;
}

export default function SchemaParserFullScreen(schema) {
    const sections = schema.default.sections;
    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)))
    return result
}

export function SchemaParserPerForm(schema) {

    const sections = schema.default.sections;
    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)))

    return schemaGenerator(result[0])

}