import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    withCredentials: true,
});

//请求拦截器
httpRequest.interceptors.request.use(function(config){
    const adminAccessToken = localStorage.getItem('adminAccessToken');
    const adminRefreshToken = localStorage.getItem('adminRefreshToken');
    if(adminAccessToken && adminAccessToken!==''){
        config.headers['adminAccessToken'] = adminAccessToken;
    }
    if(adminRefreshToken && adminRefreshToken!==''){
        config.headers['adminRefreshToken'] = adminRefreshToken;
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