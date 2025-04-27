import axios from "axios";

export const axiosHost = axios.create({
    baseURL: 'http://localhost:5000'
})

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

axiosHost.interceptors.request.use(authInterceptor)