import axios from 'axios'
import md5 from 'crypto-js/md5.js'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3006'

const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config) => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData) {
            const {key, secret} = userData
            const {method, url, data} = config
            config.headers['Key'] = key
            config.headers['Sign'] = md5(`${method.toUpperCase()}${url}${data ? JSON.stringify(data) : ''}${secret}`).toString()
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    (response) => response,
    ({response: {data}}) => {
        return Promise.reject(data?.error || data?.message)
    }
)

export default instance
