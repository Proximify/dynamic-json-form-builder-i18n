export const formatBuilder = (itemValue, format, subFields) => {
    return parseTpl(format, itemValue, subFields);
}


function get(variable, itemValue, subFields, fb = `$\{${variable}}`) {
    let requestFieldName;
    let requestLabel = false;
    if (variable.match(/.+:label/g)) {
        requestFieldName = variable.split(':')[0];
        requestLabel = true;
    } else {
        requestFieldName = variable;
    }
    let result = "";
    if (itemValue[requestFieldName]) {
        for (const [subFieldId, subField] of Object.entries(subFields)) {
            if (subField.name === requestFieldName) {
                if (requestLabel) {
                    result = subField.label;
                } else {
                    result = formatter(subField, itemValue[requestFieldName])
                }
            }
        }
    }
    return result;
}

function parseTpl(template, itemValue, subFields, fallback) {
    return template.replace(/\{.+?}/g, (match) => {
        const variable = match.substr(1, match.length - 2).trim();
        return get(variable, itemValue, subFields, fallback);
    });
}


const formatter = (field, value) => {
    if (field.type === 'lov' || field.type === 'reftable' || field.type === 'systable') {
        return JSON.parse(value).slice(1).join(' - ');
    }
    return value;
}