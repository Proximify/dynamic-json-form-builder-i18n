import * as OriSchema from '../cvSchema.json'

const sectionParser = (section, parent_id) => {
    const result = {}

    result["section_id"] = section["section_id"];
    result["parent_id"] = parent_id;
    result["title"] = section["label"];
    if (section.hasOwnProperty("has_fields")) {
        if (section.has_fields === "0") {
            result["type"] = "section";
            result["subsections"] = {}
            Object.keys(section["subsections"]).forEach(key => {
                result["subsections"][key] = sectionParser(section["subsections"][key], section["section_id"])
            })
        } else {
            result["type"] = "form";
            result["multiplicity"] = section["max_item_count"] === "1" ? "single" : "multiple";
        }
    }
    if (section.hasOwnProperty("items")) {
        result["section_data"] = section.items;
    }
    if (section.hasOwnProperty("view_type")) {
        result["view_type"] = section.view_type;
    }
    if (section.hasOwnProperty("fields")) {
        result["fields"] = section.fields;
    }
    if (section.hasOwnProperty("name")) {
        result["name"] = section.name;
    }
    // Object.keys(sections).forEach(key => {
    //     const section = sections[key];
    //     result[key] = {};
    //     result[key]["section_id"] = section["section_id"];
    //     result[key]["parent_id"] = parent_id;
    //     if (section.hasOwnProperty("has_fields")) {
    //         result[key]["title"] = section["label"];
    //         if (section.has_fields === "0") {
    //             result[key]["type"] = "section";
    //             result[key]["subsections"] = sectionParser(section["subsections"], section["section_id"]);
    //         } else {
    //             result[key]["type"] = "form";
    //             result[key]["multiplicity"] = section["max_item_count"] === "1" ? "single" : "multiple";
    //         }
    //     }
    //     if (section.hasOwnProperty("items")) {
    //         result[key]["section_data"] = section.items;
    //     }
    //     if (section.hasOwnProperty("view_type")) {
    //         result[key]["view_type"] = section.view_type;
    //     }
    //     if (section.hasOwnProperty("fields")) {
    //         result[key]["fields"] = section.fields;
    //     }
    //     if (section.hasOwnProperty("name")) {
    //         result[key]["name"] = section.name;
    //     }
    // })

    // console.log(result)
    return result;
}

export default function SchemaParser() {
    // const schema = {};
    // const data = {};
    const sections = OriSchema.sections;
    // console.log(sections[1])
    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)))
    //result.push(sections.forEach(section => sectionParser(section, null)))
    // console.log(result);
    return result

    // //console.log("sections",sections)
    // Object.keys(sections).forEach(key => {
    //     const section = sections[key]
    //
    //     schema[key] = {
    //         type: section["has_fields"] === "0" ? "section" : "form",
    //         title: section["label"]
    //     }
    //     if (section["has_fields"] === "0") {
    //         schema[key]["subSection"] = {};
    //         Object.keys(section["fields"]).forEach(subSectionKey => {
    //             const subsection = section["fields"][subSectionKey]
    //             if (subsection["has_fields"] === "0") {
    //                 schema[key]["subSection"]["subSection"] = {};
    //             } else {
    //                 schema[key]["subSection"][subSectionKey] = {
    //                     type: subsection["has_fields"] === "0" ? "section" : "form",
    //                     title: subsection["label"],
    //                     multiplicity: subsection["max_item_count"] === "1" ? "single" : "multiple",
    //                 }
    //             }
    //         })
    //         data[key] = section["items"][0]["values"];
    //         // if (section[key]["items"][0]["values"].length === 0){
    //         //
    //         // }else {
    //         //     data[key] =
    //         // }
    //     } else {
    //         schema[key]["multiplicity"] = section["max_item_count"] === "1" ? "single" : "multiple";
    //         data[key] = section["items"];
    //     }
    // })
    //
    // console.log(schema)
    // return {schema: schema, data: data}
}