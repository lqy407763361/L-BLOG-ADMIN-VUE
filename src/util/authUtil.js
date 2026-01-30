import { defineStore } from 'pinia'

export const authStore = defineStore('auth', () => {
    const setAuth = (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    }

    const clearAuth = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    const isLoggedIn = () => {
        const token = localStorage.getItem('accessToken');

        return token && token !== 'null';
    }

    // 添加获取方法
    const getAccessToken = () => localStorage.getItem('accessToken');
    const getRefreshToken = () => localStorage.getItem('refreshToken');

    return {setAuth, clearAuth, isLoggedIn, getAccessToken, getRefreshToken}
});