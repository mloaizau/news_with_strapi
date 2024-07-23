import { API_HOST, TOKEN } from "../utils/constants";

export const getNewsApi = () => {
    const url = API_HOST + "/noticias?_sort=created_at:DESC?_limit=100";

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: TOKEN
        }
    };

    return fetch(url, options)
        .then(response => { return response.json()})
        .then(response => { return response.data })
        .catch(err => {return err});
}
