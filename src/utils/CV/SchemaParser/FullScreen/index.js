import * as OriSchema from '../cvSchema.json'
import * as Identification from '../identification.json';

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

export default function SchemaParser() {
    const sections = OriSchema.sections;
    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)))
    return result
}

export function FormSchemaParser(){
    const sections = Identification.sections;
    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)))
    return result
}