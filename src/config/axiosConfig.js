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
httpRequest.interceptors.response.use(
    function(response){
        const data = response.data;
        if(data && data.code === '500'){
            window.alert(data.msg);
            throw new Error(data.msg);
        }

        return data;
    },

    async function(error){
        const originalRequest = error.config;

        //如果身份验证过期，返回401状态码
        if(error.response?.data?.code === '401' && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                //刷新accessToken
                const res = await httpRequest.post('/adminRefreshAccessToken');
                const newAccessToken = res.data.data;
                localStorage.setItem('adminAccessToken', newAccessToken);

                //重试请求
                originalRequest.headers['adminAccessToken'] = newAccessToken;

                return httpRequest(originalRequest);
            }catch(refreshError){
                //刷新失败，退出登录
                localStorage.removeItem('adminAccessToken');
                localStorage.removeItem('adminRefreshToken');
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default httpRequest