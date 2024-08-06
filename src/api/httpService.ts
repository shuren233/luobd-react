// 对于axios函数库进行二次封装？
// 二次封装的目的什么？
// 1. 利用axios请求，响应拦截器功能   2. 请求拦截器，可以在请求头中携带公共参数token

import axios from 'axios'
import {message} from "antd";


const request = axios.create({
    baseURL: 'http://47.108.50.14:8080/',
    timeout: 5000
})


// 请求拦截器
request.interceptors.request.use((config) => {
    return config;
})


// 响应拦截器
request.interceptors.response.use((res) => {
    if(res.data.code === 500) {
        message.warning(res.data.msg)
    }
    return res.data;
},(error) => {
    let status = error.response.status;
    switch (status) {
        case 404:
            message.error('Not found');
            break
    }
    return Promise.reject(new Error((error.message)))
})

export default request