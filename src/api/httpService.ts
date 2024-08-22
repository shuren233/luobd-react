// 对于axios函数库进行二次封装？
// 二次封装的目的什么？
// 1. 利用axios请求，响应拦截器功能   2. 请求拦截器，可以在请求头中携带公共参数token

import axios from 'axios'
import {message} from "antd";
import {getToken, removeToken} from "@/utils/token";




const request = axios.create({
    baseURL: 'http://127.0.0.1:8080/',
    timeout: 5000
})


// 请求拦截器
request.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},(error) => {
    return Promise.reject(new Error(error))
})


// 响应拦截器
request.interceptors.response.use((res) => {
    if(res.data.code >= 500) {
        message.error(res.data.msg)
    }
    if(res.data.code === 401) {
        removeToken();
        window.location.href = '/login';
        removeToken();
    }
    return res.data;
},(error) => {


    if (error.code === 'ERR_NETWORK') {
        message.error('后端服务异常');
    }else {
        const status = error.response.status;
        switch (status) {
            case 404:
                message.error('Not found');
                break;
            case 401:
                message.error('Unauthorized');
                window.location.href = '/login';
                removeToken();
                break;
            default:
                message.error('Server error');
                break;
        }
    }
    return Promise.reject(new Error((error.message)))
})

export default request