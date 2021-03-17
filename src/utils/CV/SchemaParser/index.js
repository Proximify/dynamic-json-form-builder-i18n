import {SchemaGenerator} from "./FormSchemaGenerator";


const getLovSubtypeIdHelper = (sectionSchema) => {
    if (!sectionSchema.fields) {
        return [];
    } else {
        const lovSubtypeIds = [];
        Object.keys(sectionSchema.fields).forEach(fieldID => {
            const field = sectionSchema.fields[fieldID];
            if (field.type === "lov") {
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

export const bilingualValueParser = (field, fieldData, dataToServer = false, dataFromServer = false) => {
    const result = {};
    if (dataToServer) {
        console.log(fieldData);
        const bilingualData = JSON.parse(fieldData);
        console.log(bilingualData);

        if (!field.constraints) {
            if (bilingualData.english) {
                result['eng'] = bilingualData.english;
                // formData.append(`data[${field.id}][english]`, bilingualData.english)
            }
            if (bilingualData.french) {
                result['fre'] = bilingualData.french;
                // formData.append(`data[${field.id}][french]`, bilingualData.french)
            }
        } else if (field.constraints.richText) {
            if (bilingualData.english) {
                let engData = bilingualData.english;
                engData = engData.replace('&nbsp;', ' ');
                engData = engData.replace('\n', '');
                engData = engData.replace('↵', '');
                engData = engData.replace(/^<p>/g, '');
                engData = engData.replace(/<\/p>/g, '');
                engData = engData.replace(/<p>/g, '<br>');
                engData = engData.replace(/<strong>/g, '<b>');
                engData = engData.replace(/<\/strong>/g, '</b>');
                engData = engData.replace(/<em>/g, '<i>');
                engData = engData.replace(/<\/em>/g, '</i>');
                engData = engData.replace(/<ins>/g, '<u>');
                engData = engData.replace(/<\/ins>/g, '</u>');


                // engData = engData.replace(/<\/em>/g,'</i>');
                result['eng'] = engData;

                // formData.append(`data[${field.id}][english]`, engData)
            }
            if (bilingualData.french) {
                let freData = bilingualData.french;

                freData = freData.replace(/<p>/g, '');
                freData = freData.replace(/<\/p>/g, '');
                freData = freData.replace(/<strong>/g, '<b>');
                freData = freData.replace(/<\/strong>/g, '</b>');
                freData = freData.replace(/<em>/g, '<i>');
                freData = freData.replace(/<\/em>/g, '</i>');
                freData = freData.replace(/<ins>/g, '<u>');
                freData = freData.replace(/<\/ins>/g, '</u>');
                freData = freData.replace('\n', '');
                freData = freData.replace('↵', '');

                result['fre'] = freData;

                // formData.append(`data[${field.id}][french]`, freData)
            }
        }
    }else if (dataFromServer){

    }
    console.log(result)
    return result

}

/**
 * @param schema: raw Response from Server
 * @param singleForm: single to identify the Response if for one form or full screen view mode
 * @param lovOptions
 * @returns {{dataSchema: null, formSchema: null, uiSchema: null}|[]}
 * @constructor
 */
export default function SchemaParser(schema, singleForm = false) {
    console.log(schema)
    const sections = schema.sections;
    // const selectionOptions = schema.default.selectionOptions;

    const result = []
    sections.forEach(section => result.push(sectionParser(section, null)))
    if (singleForm) {
        return SchemaGenerator(result[0]);
    } else
        return result;
}

