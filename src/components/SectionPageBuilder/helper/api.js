import axios from 'axios';

const api = axios.create({
    baseURL:
        'http://127.0.0.1:8000/'
});
export default api;

export const fetchCVSchema = (state, callback) => {
    api.get("profiles.php?action=display&editable=true&contentType=members&contentId=1&viewType=cv&withFormat=true", {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        // setState({...state, schema: res.data, isReady: true})
        callback({...state, schema: res.data, isReady: true})
        console.log("load success", res)
    }).catch(err => {
        // setState({...state, isReady: false, rawError: err})
        callback({...state, isReady: false, rawError: err})

        console.log("loading err", err);
    })
}

export const fetchFormSchema = (section, itemId, parentItemId, parentFieldId, callback) => {
    const url = `profiles.php?action=edit&editable=true&contentType=members&contentId=1&viewType=cv${section !== null ? '&section=' + section : ""}${itemId !== null ? '&itemId=' + itemId : ""}${parentItemId !== null ? '&parentItemId=' + parentItemId : ""}${parentFieldId !== null ? '&parentFieldId=' + parentFieldId : ""}`;
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
    const urlTemplate = 'profiles.php?action=subtypeOptions&contentType=members&subtypeId=';
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