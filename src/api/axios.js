import axios, {AxiosInstance as router} from 'axios'
import Qs from 'qs'

var isPro = process.env.NODE_ENV === 'production' // process.env.NODE_ENV用于区分是生产环境还是开发环境
axios.defaults.baseURL = isPro ? 'http://localhost:8080/houtai' : 'http://localhost:8080/houtai' // '/api'
// axios.defaults.baseURL = 'http://localhost:8080/houtai'
// 请求超时时间
axios.defaults.timeout = 5000
/**
axios.interceptors.request.use(
  config => {
    config.data = Qs.stringify(config.data)
    // 在这里添加请求头数据
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)
 */
axios.interceptors.response.use(responce => {
// 如果返回的码是2就跳转到登录页面，说明页面过期了
  if (responce.data.errCodes === 2) {
    router.put({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return responce
}, error => {
  return Promise.reject(error)
})

export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(responce => {
        resolve(responce.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post (
  url,
  data = {}) {
  const options = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  }
  return new Promise((resolve, reject) => {
    axios.post(url, Qs.stringify(data), options)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function postjson (
  url,
  data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function postfile (
  url,
  data = {},
  headers = {'Content-Type': 'multipart/form-data'}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, headers)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
