import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://eduplatformapi.herokuapp.com/'
});

export default instance;