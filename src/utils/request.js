import axios from 'axios'
import { message as Msg } from 'antd'
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers.icode = 'helloqianduanxunlianying'
        // if (store.getters.token) {
        //     // 如果token存在 注入token
        // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        // }
        return config // 必须返回配置
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const { success, message, data } = response.data
        //   要根据success的成功与否决定下面的操作
        if (success) {
            return data
        } else {
            Msg.error(message)
            // TODO：业务错误
            return Promise.reject(new Error(message))
        }
    },
    (error) => {
        // 处理 token 超时问题
        if (
            error.response &&
            error.response.data &&
            error.response.data.code === 401
        ) {
            // TODO: token超时
            // store.dispatch('user/logout')
        }
        Msg.error(error.response.data.message)
        // TODO: 提示错误消息
        return Promise.reject(error)
    }
)

export default service
