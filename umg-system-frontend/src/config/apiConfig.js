import axios from 'axios';

const api = axios.create({
    baseURL: 'https://umg-system-production.up.railway.app',
});

export const API_BASE_URL = 'https://umg-system-production.up.railway.app';
export default api;
