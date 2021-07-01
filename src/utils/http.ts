import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string,
    data?: object
}

// endpoint:请求路径
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
        if (response.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({ message: '请重新登录' })
        } else {
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        }
    })
}

// 以http方法为基础的自动携带token的方法
export const useHttp = () => {
    const { user } = useAuth();
    // Parameters:TS Utility Types
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}
