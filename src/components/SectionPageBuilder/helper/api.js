import axios from 'axios';

// const contentType = process.env.REACT_APP_CONTENT_TYPE ?? 'members';
// const contentId = process.env.REACT_APP_CONTENT_ID ?? '1';
// const viewType = process.env.REACT_APP_VIEW_TYPE ?? 'cv';
// const withFormat = process.env.react_app_with_format ?? 'true';

const api = axios.create({
    baseURL:
        'http://127.0.0.1:8000/'
});
export default api;
export const fetchCVSchema = (contentType,contentId, viewType, withFormat, callback) => {
    api.get(`profiles.php?action=display&editable=true&contentType=${contentType}&contentId=${contentId}&viewType=${viewType}&withFormat=${withFormat}`, {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        if (!res.data.error && res.data.sections) {
            callback(res, null)
            console.log("load success", res)
        } else {
            callback(null, res.data)
            console.log("loading err", res.data);
        }
    }).catch(err => {
        callback(null, err)
        console.log("loading err", err);
    })
}