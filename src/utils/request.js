/*
封装通用请求和信息

*/
// 引入axios文件
import axios from 'axios'
import qs from 'qs'
import local from '@/utils/local.js'
import { Message } from 'element-ui'

// 设置baseUrl
axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.timeout = 5000

// 设置请求拦截
axios.interceptors.request.use(config => {
  const token = local.get('tk')
  if (token) {
    config.headers.authorization = token
  }
  return config
})

// 设置响应拦截
axios.interceptors.response.use(res => {
  const { code, msg } = res.data
  if (code === 0) {
    Message({
      message: msg || '',
      type: 'success',
      duration: 2000
    })
  } else if (code === 1) {
    Message({
      message: msg || '',
      type: 'error',
      duration: 2000
    })
  }
  return res
})

export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, reqbody) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(reqbody))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
