import isObject from 'lodash/isObject';
import api, {submitFormData} from "../api";

export const handleFormSubmit = (state, sectionId, itemId, parentItemId, parentFieldId, contentType, contentId, viewType, responseHandler) => {
    const {formData: data, initialFormData: initialData, initialFormSchema: schema, newForm} = state;
    const formData = new FormData();
    formData.append('action', newForm ? 'insert' : 'update');
    // remove funding group
    removeFundingGroupData(data);

    formDataBuilder(data, initialData, schema, formData, sectionId, itemId, parentItemId, parentFieldId, contentType, contentId, viewType);
    submitFormData(formData, responseHandler);
}

export const handleFormDelete = (state, sectionId, itemId, parentItemId, parentFieldId, contentType, contentId, viewType, responseHandler) => {
    const {formData: data, initialFormData: initialData, formSchema: schema} = state;
    const formData = new FormData();
    formData.append('action', 'delete');
    formDataBuilder(data, initialData, schema, formData, sectionId, itemId, parentItemId, parentFieldId, contentType, contentId, viewType);
    submitFormData(formData, responseHandler);
}

const removeFundingGroupData = (data) => {
    for (const [fieldName, fieldData] of Object.entries(data)) {
        if (Array.isArray(fieldData)) {
            fieldData.forEach(arrayFieldData => {
                removeFundingGroupData(arrayFieldData);
            })
        } else {
            if (fieldName.startsWith('fundingGroup')) {
                Object.keys(fieldData).forEach(fundingGroupFieldName => {
                    data[fundingGroupFieldName] = fieldData[fundingGroupFieldName];
                })
                delete data[fieldName];
            }
        }
    }
}

export const bilingualValueParser = (field, fieldData, dataToServer = false, dataFromServer = false) => {
    const result = {};
    if (dataToServer) {
        const bilingualData = JSON.parse(fieldData);
        if (!field.constraints) {
            if (bilingualData.english) {
                result['eng'] = bilingualData.english;
            }
            if (bilingualData.french) {
                result['fre'] = bilingualData.french;
            }
        } else if (field.constraints.richText) {
            if (bilingualData.english) {
                let engData = JSON.stringify(bilingualData.english);
                engData = engData.replace(/^\"/g, '');
                engData = engData.replace(/\"$/g, '');
                engData = engData.replace(/\\n$/g, '');
                engData = engData.replace(/<p>/g, '');
                engData = engData.replace(/<\/p>/g, '');
                engData = engData.replace(/\\n/g, '<br>');
                engData = engData.replace(/<br><br>/g, '<br>');
                engData = engData.replace(/<strong>/g, '<b>');
                engData = engData.replace(/<\/strong>/g, '</b>');
                engData = engData.replace(/<em>/g, '<i>');
                engData = engData.replace(/<\/em>/g, '</i>');
                engData = engData.replace(/<ins>/g, '<u>');
                engData = engData.replace(/<\/ins>/g, '</u>');

                result['eng'] = engData;
            }
            if (bilingualData.french) {
                let freData = JSON.stringify(bilingualData.french);
                freData = freData.replace(/^\"/g, '');
                freData = freData.replace(/\"$/g, '');
                freData = freData.replace(/\\n$/g, '');
                freData = freData.replace(/<p>/g, '');
                freData = freData.replace(/<\/p>/g, '');
                freData = freData.replace(/\\n/g, '<br>');
                freData = freData.replace(/<br><br>/g, '<br>');
                freData = freData.replace(/<strong>/g, '<b>');
                freData = freData.replace(/<\/strong>/g, '</b>');
                freData = freData.replace(/<em>/g, '<i>');
                freData = freData.replace(/<\/em>/g, '</i>');
                freData = freData.replace(/<ins>/g, '<u>');
                freData = freData.replace(/<\/ins>/g, '</u>');

                result['fre'] = freData;
            }
        }
    } else if (dataFromServer) {
        if (fieldData === undefined || Object.keys(fieldData).length < 1) {
            return undefined;
        }
        const bilingualData = fieldData;
        if (!field.constraints) {
            if (bilingualData.english) {
                result['english'] = bilingualData.english;
            }
            if (bilingualData.french) {
                result['french'] = bilingualData.french;
            }
        } else if (field.constraints.richText) {
            if (bilingualData.english) {
                let engData = bilingualData.english;
                engData = '<p>' + engData + '</p>';
                engData = engData.replace(/<br>/g, '</p>\n<p>');
                engData = engData.replace(/<b>/g, '<strong>');
                engData = engData.replace(/<\/b>/g, '</strong>');
                engData = engData.replace(/<i>/g, '<em>');
                engData = engData.replace(/<\/i>/g, '</em>');
                engData = engData.replace(/<u>/g, '<ins>');
                engData = engData.replace(/<\/u>/g, '</ins>');
                result['english'] = engData;
            }
            if (bilingualData.french) {
                let freData = (bilingualData.french);
                freData = '<p>' + freData + '</p>';
                freData = freData.replace(/<br>/g, '</p>\n<p>');
                freData = freData.replace(/<b>/g, '<strong>');
                freData = freData.replace(/<\/b>/g, '</strong>');
                freData = freData.replace(/<i>/g, '<em>');
                freData = freData.replace(/<\/i>/g, '</em>');
                freData = freData.replace(/<u>/g, '<ins>');
                freData = freData.replace(/<\/u>/g, '</ins>');

                result['french'] = freData;
            }
        }
    }
    // console.log(result)
    return result

}

const formDataBuilder = (data, initialData, schema, formData, sectionId, itemId, parentItemId, parentFieldId, contentType, contentId, viewType) => {
    formData.append('contentType', contentType);
    formData.append('contentId', contentId);
    formData.append('viewType', viewType);
    formData.append('sectionId', sectionId);
    formData.append('itemId', itemId);
    if (parentItemId) {
        formData.append('parentItemId', parentItemId);
    }
    if (parentFieldId) {
        formData.append('parentFieldId', parentFieldId);
    }
    Object.keys(schema.properties).forEach(fieldName => {
        const field = schema.properties[fieldName]
        const fieldData = data[fieldName];
        switch (field.field_type) {
            case 'string':
            case 'integer':
            case 'elapsed-time':
            case 'slider':
            case "monthday":
            case "yearmonth":
            case "year":
            case "boolean":
            case "date":
                formData.append(`data[${field.id}]`, fieldData ?? "");
                break;
            case 'lov':
            case 'systable':
            case 'reftable':
                if (fieldData) {
                    const lovData = JSON.parse(fieldData);
                    if (field.field_type === 'lov') {
                        lovData.forEach(data => {
                            formData.append(`data[${field.id}][]`, data)
                        })
                    } else {
                        formData.append(`data[${field.id}][]`, lovData[0])
                        formData.append(`data[${field.id}][]`, lovData.slice(1).join('|'))
                    }
                } else {
                    formData.append(`data[${field.id}]`, "")
                }
                break;
            case 'bilingual':
                if (fieldData) {
                    const bilingualData = bilingualValueParser(field, fieldData, true, false);
                    if (bilingualData.eng) {
                        formData.append(`data[${field.id}][english]`, bilingualData.eng)
                    }
                    if (bilingualData.fre) {
                        formData.append(`data[${field.id}][french]`, bilingualData.fre)
                    }
                    if (Object.keys(bilingualData).length === 0) {
                        formData.append(`data[${field.id}]`, "")
                    }
                } else {
                    formData.append(`data[${field.id}]`, "")
                }
                break;
            case 'section': {
                if (fieldData) {
                    const newFieldData = [...fieldData];
                    const oldFieldData = initialData[fieldName] ? [...initialData[fieldName]] : [];
                    let insertItemCount = 1;
                    let processCount = 0;
                    while (newFieldData.length > 0) {
                        const template = `data[${field.id}][${processCount}]`;
                        const nfd = newFieldData[0];
                        let oldFieldDataIndexTracker = -1;
                        if (!nfd.itemId) {
                            // console.log(" insert new data", nfd);
                            // console.log(`${field.id}-new${insertItemCount}-action insert`);
                            formData.append(`${template}[itemId]`, `new${insertItemCount}`)
                            formData.append(`${template}[action]`, `insert`)

                            const subsectionFields = field.fields;
                            Object.keys(subsectionFields).forEach(fieldId => {
                                const subsectionField = subsectionFields[fieldId];
                                Object.keys(nfd).forEach(nfdId => {
                                    const newFieldData = nfd[nfdId];
                                    if (nfdId === subsectionField.name) {
                                        if (newFieldData) {
                                            if (subsectionField.type === 'lov') {
                                                const subsectionLovData = JSON.parse(newFieldData);
                                                subsectionLovData.forEach(data => {
                                                    formData.append(`${template}[data][${fieldId}][]`, data)
                                                })
                                            } else if (subsectionField.type === 'reftable' || subsectionField.type === 'systable') {
                                                const subsectionLovData = JSON.parse(newFieldData);
                                                formData.append(`${template}[data][${fieldId}][]`, subsectionLovData[0])
                                                formData.append(`${template}[data][${fieldId}][]`, subsectionLovData.slice(1).join('|'))
                                            } else if (subsectionField.type === 'bilingual') {
                                                const bilingualData = bilingualValueParser(subsectionField, newFieldData, true, false);
                                                if (bilingualData.eng) {
                                                    formData.append(`${template}[data][${fieldId}][english]`, bilingualData.eng)
                                                }
                                                if (bilingualData.fre) {
                                                    formData.append(`${template}[data][${fieldId}][french]`, bilingualData.fre)
                                                }
                                                if (Object.keys(bilingualData).length === 0) {
                                                    formData.append(`${template}[data][${fieldId}]`, '');
                                                }
                                            } else {
                                                formData.append(`${template}[data][${fieldId}]`, newFieldData)
                                            }
                                        } else {
                                            formData.append(`${template}[data][${fieldId}]`, '');
                                        }
                                    }
                                })
                            })
                            newFieldData.shift();
                            insertItemCount++;
                        } else {
                            let found = false;
                            oldFieldData.forEach((ofd, index) => {
                                if (ofd.itemId === nfd.itemId) {
                                    formData.append(`${template}[itemId]`, ofd.itemId)
                                    found = true;
                                    if (JSON.stringify(ofd) !== JSON.stringify(nfd)) {
                                        formData.append(`${template}[action]`, `update`)
                                        // console.log(" update form data", nfd);
                                    } else {
                                        // console.log(" no change form data", nfd);
                                        formData.append(`${template}[action]`, `none`)
                                    }
                                    const subsectionFields = field.fields;
                                    Object.keys(subsectionFields).forEach(fieldId => {
                                        const subsectionField = subsectionFields[fieldId];
                                        Object.keys(nfd).forEach(nfdId => {
                                            const newFieldData = nfd[nfdId];
                                            if (nfdId === subsectionField.name) {
                                                if (newFieldData) {
                                                    if (subsectionField.type === 'lov') {
                                                        const subsectionLovData = JSON.parse(newFieldData);
                                                        subsectionLovData.forEach(data => {
                                                            formData.append(`${template}[data][${fieldId}][]`, data)
                                                        })
                                                    } else if (subsectionField.type === 'reftable' || subsectionField.type === 'systable') {
                                                        const subsectionLovData = JSON.parse(newFieldData);
                                                        formData.append(`${template}[data][${fieldId}][]`, subsectionLovData[0])
                                                        formData.append(`${template}[data][${fieldId}][]`, subsectionLovData.slice(1).join('|'))
                                                    } else if (subsectionField.type === 'bilingual') {
                                                        const bilingualData = bilingualValueParser(subsectionField, newFieldData, true, false);
                                                        if (bilingualData.eng) {
                                                            formData.append(`${template}[data][${fieldId}][english]`, bilingualData.eng)
                                                        }
                                                        if (bilingualData.fre) {
                                                            formData.append(`${template}[data][${fieldId}][french]`, bilingualData.fre)
                                                        }
                                                    } else {
                                                        formData.append(`${template}[data][${fieldId}]`, newFieldData)
                                                    }
                                                } else {
                                                    formData.append(`${template}[data][${fieldId}]`, '');
                                                }
                                            }
                                        })
                                    })
                                    newFieldData.shift();
                                    oldFieldDataIndexTracker = index;
                                }
                            })
                            if (oldFieldDataIndexTracker !== -1) {
                                oldFieldData.splice(oldFieldDataIndexTracker, 1);
                            }
                            if (!found) {
                                console.error("cannot find newdata itemId from old data", nfd, oldFieldData);
                                newFieldData.shift();
                            }
                        }
                        processCount++;
                    }
                    if (oldFieldData.length > 0) {
                        oldFieldData.forEach(ofd => {
                            const template = `data[${field.id}][${processCount}]`;
                            const subsectionFields = field.fields;

                            formData.append(`${template}[itemId]`, ofd.itemId);
                            formData.append(`${template}[action]`, `delete`);

                            Object.keys(subsectionFields).forEach(fieldId => {
                                const subsectionField = subsectionFields[fieldId];
                                Object.keys(ofd).forEach(nfdId => {
                                    const oldFieldData = ofd[nfdId];
                                    if (nfdId === subsectionField.name) {

                                        if (oldFieldData) {
                                            if (subsectionField.type === 'lov') {
                                                const subsectionLovData = JSON.parse(oldFieldData);
                                                subsectionLovData.forEach(data => {
                                                    formData.append(`${template}[data][${fieldId}][]`, data)
                                                })
                                            } else if (subsectionField.type === 'reftable' || subsectionField.type === 'systable') {
                                                const subsectionLovData = JSON.parse(oldFieldData);
                                                formData.append(`${template}[data][${fieldId}][]`, subsectionLovData[0])
                                                formData.append(`${template}[data][${fieldId}][]`, subsectionLovData.slice(1).join('|'))
                                            } else if (subsectionField.type === 'bilingual') {
                                                const bilingualData = bilingualValueParser(subsectionField, oldFieldData, true, false);
                                                if (bilingualData.eng) {
                                                    formData.append(`${template}[data][${fieldId}][english]`, bilingualData.eng)
                                                }
                                                if (bilingualData.fre) {
                                                    formData.append(`${template}[data][${fieldId}][french]`, bilingualData.fre)
                                                }
                                            } else {
                                                formData.append(`${template}[data][${fieldId}]`, oldFieldData)
                                            }
                                        } else {
                                            formData.append(`${template}[data][${fieldId}]`, '');
                                        }

                                    }
                                })

                            })
                            processCount++;
                        })
                    }
                }
                break;
            }
            default:
                console.warn("unhandled field type when send formdata", field);
                formData.append(`data[${field.id}]`, "")
                break;
        }
    })
}