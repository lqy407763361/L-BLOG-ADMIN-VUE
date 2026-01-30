import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    withCredentials: true,
});

//请求拦截器
httpRequest.interceptors.request.use(function(config){
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken && accessToken!==''){
        config.headers['accessToken'] = accessToken;
    }

    return config;
});

//响应拦截器
httpRequest.interceptors.response.use(function(response){
    const data = response.data;
    if(data){
        if(data.code === '500'){
            window.alert(data.msg);
            throw new Error(data.msg);
        }
    }

    return data;
});

export default httpRequest