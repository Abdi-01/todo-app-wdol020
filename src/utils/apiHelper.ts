import axios from "axios";

export const BASE_URL_API: string = "https://properlettuce-us.backendless.app";

export const apiCall = axios.create({
    baseURL: BASE_URL_API
});