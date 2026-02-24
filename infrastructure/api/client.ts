'use client'

import Cookies from 'js-cookie'
import { API_CONFIG, AUTH_ENDPOINTS } from "@/app/modules/auth/config/api.config";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) promise.reject(error);
        else if (token) promise.resolve(token);
    });
    failedQueue = [];
};

export const apiClient = axios.create({
    baseURL: API_CONFIG.baseURL,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const xsrfToken = Cookies.get('XSRF-TOKEN');
        if (xsrfToken && config.headers) {
            config.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
        if (config.headers) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        const accessToken = Cookies.get('accessToken');
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean
        }


        if (error.response?.status === 401 && originalRequest.url?.includes(AUTH_ENDPOINTS.LOGIN)) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                        }
                        return apiClient(originalRequest)
                    })
                    .catch((err) => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {

                const response = await axios.post(
                    `${API_CONFIG.baseURL}${AUTH_ENDPOINTS.REFRESH}`,
                    {},
                    { withCredentials: true }
                )

                const { accessToken } = response.data

                Cookies.set('accessToken', accessToken, {
                    expires: 7,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                })

                processQueue(null, accessToken)

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                }

                return apiClient(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null)
                Cookies.remove('accessToken')


                if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
                    window.location.href = '/auth/login'
                }

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

// apiClient.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         const originalRequest = error.config as InternalAxiosRequestConfig & {
//             _retry?: boolean
//         }

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject })
//                 })
//                     .then((token) => {
//                         if (originalRequest.headers) {
//                             originalRequest.headers.Authorization = `Bearer ${token}`
//                         }
//                         return apiClient(originalRequest)
//                     })
//                     .catch((err) => Promise.reject(err))
//             }

//             originalRequest._retry = true
//             isRefreshing = true

//             try {
//                 const response = await axios.post(
//                     `${API_CONFIG.baseURL}${AUTH_ENDPOINTS.REFRESH}`,
//                     {},
//                     { withCredentials: true }
//                 )

//                 const { accessToken } = response.data

//                 Cookies.set('accessToken', accessToken, {
//                     expires: 7,
//                     secure: process.env.NODE_ENV === 'production',
//                     sameSite: 'strict',
//                 })

//                 processQueue(null, accessToken)

//                 if (originalRequest.headers) {
//                     originalRequest.headers.Authorization = `Bearer ${accessToken}`
//                 }

//                 return apiClient(originalRequest)
//             } catch (refreshError) {
//                 processQueue(refreshError as AxiosError, null)

//                 Cookies.remove('accessToken')

//                 if (typeof window !== 'undefined') {
//                     window.location.href = '/auth/login'
//                 }

//                 return Promise.reject(refreshError)
//             } finally {
//                 isRefreshing = false
//             }
//         }

//         return Promise.reject(error)
//     }
// )
