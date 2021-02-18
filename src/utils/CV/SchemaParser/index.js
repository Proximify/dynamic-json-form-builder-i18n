import {SchemaGenerator} from "./FormSchemaGenerator";

/**
 * This function extract useful information from the form schema recursively
 * @param section: schema for a single section(a form or one of the subsections in the form)
 * @param parent_id: null for form and not null for form's subsections
 * @returns {{}}
 */
const sectionParser = (section, parent_id) => {
    const result = {}
    result["section_id"] = section["section_id"];
    result["parent_id"] = parent_id;
    result["title"] = section["label"];
    result.section_data = section.items;
    result["view_type"] = section.view_type;
    result["fields"] = section.fields;
    result["name"] = section.name;
    result["description"] = section.description;
    if (section.has_fields) {
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
    return result;
}

/**
 * @param schema: raw Response from Server
 * @param singleForm: single to identify the Response if for one form or full screen view mode
 * @returns {{dataSchema: null, formSchema: null, uiSchema: null}|[]}
 * @constructor
 */
export default function SchemaParser(schema, singleForm = false) {
    // console.log(schema)
    const sections = schema.sections;
    // const selectionOptions = schema.default.selectionOptions;
    const selectionOptions = null;

    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)))
    if (singleForm) {
        return SchemaGenerator(result[0], selectionOptions);
    } else
        return result;
}

