import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8000'
});

instance.interceptors.request.use((config)=>{

    const accessToken = localStorage.getItem('AccessToken')
    if (accessToken) {
        config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config
})