import axios, { AxiosResponse } from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import router from '../router/index'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['Authorization'] = `Bearer ${UserModule.token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: name or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (res.state !== 'success') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 500 || res.code === 503) {
        MessageBox.confirm(
          '你已经退出登录,是否需要重新登录',
          '登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      } else {
        Message.error(res.msg)
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else if (res.code === 203) {
      UserModule.ResetToken()
      return res
    } else {
      return res
    }
  },
  ({ response }: { response: AxiosResponse}) => {
    if (response.status === 401) {
      UserModule.ResetToken()
      router.replace(`/login?redirect=${router.currentRoute.path}`)
    }
    Message({
      message: response.data.errMessage,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(response.data)
  }
)

export default service
