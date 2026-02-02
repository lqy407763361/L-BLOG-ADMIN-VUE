import { defineStore } from 'pinia'

export const authStore = defineStore('auth', () => {
    const setAuth = (data) => {
        localStorage.setItem('adminAccessToken', data.accessToken);
        localStorage.setItem('adminRefreshToken', data.refreshToken);
    }

    const clearAuth = () => {
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
    }

    const isLoggedIn = () => {
        const token = localStorage.getItem('adminAccessToken');

        return token && token !== 'null';
    }

    return {setAuth, clearAuth, isLoggedIn}
});