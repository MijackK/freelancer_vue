import axios from 'axios';

const ajaxR = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

export default ajaxR;