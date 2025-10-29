import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9090',
});

export const API_BASE_URL = 'http://localhost:9090';
export default api;