import axios from "axios";

export const api = axios.create({
    baseURL:'http://192.168.1.3:3001',
    //headers: {'Cache-Control': 'no-cache',} //resolve: error:304
});

export const youtube = axios.create({
    baseURL:'',
});

