import {SchemaGenerator} from "./FormSchemaGenerator";

const getLovSubtypeIdHelper = (sectionSchema) => {
    if (!sectionSchema.fields) {
        return [];
    } else {
        const lovSubtypeIds = [];
        Object.keys(sectionSchema.fields).forEach(fieldID => {
            const field = sectionSchema.fields[fieldID];
            if (field.type === "lov" || field.type === 'systable') {
                lovSubtypeIds.push(field.subtype_id);
            } else if (field.type === "reftable") {
                lovSubtypeIds.push([field.subtype_id, field.dependencies]);
            }
        })
        return lovSubtypeIds;
    }
}

export const getLovSubtypeId = (schema) => {
    const sections = schema.sections;
    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)));
    const formSchema = result[0];
    const lovSubtypeIds = getLovSubtypeIdHelper(formSchema);
    Object.keys(formSchema.subsections).forEach(subsectionID => {
        lovSubtypeIds.push(...getLovSubtypeIdHelper(formSchema.subsections[subsectionID]));
    })
    return (lovSubtypeIds);
}

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
    result["disabled"] = section.disabled;
    result["primary_item"] = section.primary_item;
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
 * @returns {{dataSchema: null, formSchema: null, uiSchema: null}|[]}
 * @constructor
 */
export default function SchemaParser(schema) {
    const sections = schema.sections;

    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)))
    return SchemaGenerator(result[0]);
}

