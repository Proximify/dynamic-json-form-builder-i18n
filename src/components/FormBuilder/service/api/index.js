import axios from 'axios';

const contentType = process.env.REACT_APP_CONTENT_TYPE ?? 'members';
const contentId = process.env.REACT_APP_CONTENT_ID ?? '3';
const viewType = process.env.REACT_APP_VIEW_TYPE ?? 'cv';
const withFormat = process.env.react_app_with_format ?? 'true';

const api = axios.create({
    baseURL:
        'http://127.0.0.1:8000/'
});
export default api;

export const fetchFormSchema = (section, itemId, parentItemId, parentFieldId, callback) => {
    const url = `profiles.php?action=edit&editable=true&contentType=${contentType}&contentId=${contentId}&viewType=${viewType}${section !== null ? '&section=' + section : ""}${itemId !== null ? '&itemId=' + itemId : ""}${parentItemId !== null ? '&parentItemId=' + parentItemId : ""}${parentFieldId !== null ? '&parentFieldId=' + parentFieldId : ""}`;
    api.get(url, {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        console.log("fetch single schema success:", res);
        callback(res.data)
    }).catch(err => {
        console.error("fetch single schema err:", err);
    })
}

export const fetchLovOptions = (subtypeIds, callback) => {
    const urlTemplate = `profiles.php?action=subtypeOptions&contentType=${contentType}&subtypeId=`;
    const urls = []
    subtypeIds.forEach(id => {
        if (Array.isArray(id)) {
            urls.push(api.get(`${urlTemplate}${id[0]}&dependencies=${id[0].replaceAll(',', '%2C')}`))
        } else {
            urls.push(api.get(`${urlTemplate}${id}`))
        }
    })
    axios.all(urls).then(axios.spread((...responses) => {
        const res = {};
        subtypeIds.forEach((subtypeId, index) => {
            res[Array.isArray(subtypeId) ? subtypeId[0] : subtypeId] = responses[index].data;
        })
        callback(res);
    })).catch(err => {
        console.log(err)
    })
}

export const submitFormData = (formData, responseHandler) => {
    api.post('profiles.php', formData, {
        headers: {'Content-Type': 'application/json'}
    }).then((res) => {
        responseHandler(res, null);
    }, (error) => {
        responseHandler(null, error);
    });
}