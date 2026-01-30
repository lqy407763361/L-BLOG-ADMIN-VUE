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

    return {setAuth, clearAuth, isLoggedIn}
});