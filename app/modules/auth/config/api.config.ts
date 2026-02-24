export const API_CONFIG =  {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    withCredentials: true,
}

export const AUTH_ENDPOINTS = {
    LOGIN: 'api/login',
    REGISTER: 'api/register',
    LOGOUT: 'api/logout',
    REFRESH: 'api/v1/me/refresh',
    PROFILE: 'api/v1/me',
}
