import axios from "axios"
import { baseURL } from './config'

let Axios = axios.create({
    baseURL,
    timeout: 1000*60,
    withCredentials: true, //是否允许带cookie
    // httpsAgent: new https.Agent({// 忽略 SSL 的属性
    //     rejectUnauthorized: false
    // })
})
// response.setContentType("application/json;charset=utf-8");	application/x-www-form-urlencoded
Axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";
Axios.interceptors.request.use(
    config => {
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        if (config.method == 'post'){
            console.log(store.state.CSRFToken)
            // config.headers['X-CSRFToken'] = store.state.CSRFToken;
        }
        console.log(baseURL)
        console.log(config.url)
        return config
    },
    error =>  hideLoading() && Promise.error(error)
)

Axios.interceptors.response.use(
    res => {
        return (res.status === 200 ? Promise.resolve(res) : Promise.reject(res))
    },
    error => Promise.reject(response)
)

//方便使用封装get方法
export const get = (url, params, loading = false) => new Promise((resolve, reject) => 
        Axios.get(url, { params }).then( res => resolve(res.data)).catch(error => reject(error)))


//方便使用封装post方法
export const post = (url, params, loading = false) => new Promise((resolve, reject) => {
    Axios.post(url,  params ).then( res => resolve(res.data)).catch(error => reject(error))
})

export default Axios;

