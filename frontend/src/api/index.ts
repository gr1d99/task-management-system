import axios from "axios";
import {getItem} from "../utils/local-storage-utils.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getItem('accessToken');

        if (accessToken.value) {
            config.headers.Authorization = `Bearer ${accessToken.value}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export {
    axiosInstance
}
