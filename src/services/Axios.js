// 封装一下axios，统一管理接口
import axios from 'axios'

// 在请求的时候参数肯定是用json格式书写是最舒服的，但是请求的时候是字符串，所以，需要做一下序列化
import qs from 'qs'

const reg = /^[\u0391-\uFFE5%]+$/
// 在序列化的时候肯定要使用的请求时候的拦截器
axios.interceptors.request.use(request => {

  // 请求头中的Content-type有三种情况：1. application/x-www-form-urlencoded（参数只能是字符串所以这一种情况才需要序列化）
  // 顺便说一下另外的两种情况 2. application/json 这一种是可以直接传递json的所以他是而肯定不用序列化的
  // 3. multipart/form-data 一般在文件上传的时候我们会采用这一种type

  if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    request.data = qs.stringify(request.data, { allowDots: true })
  }

  // 如果get请求，一般来讲会对中文进行一次转码,并且加上时间戳

  if (request.method === 'get' && request.params) {
    let params = request.params
    for (let key in params) {
      let value = params[key]
      if (typeof value === 'string') {
        let newS = ''
        for (let i = 0; i < value.length; i++) {
          if (reg.test(value.charAt(i))) {
            newS += encodeURI(value.charAt(i))
          } else {
            newS += value.charAt(i)
          }
        }
        params[key] = newS
      }
      params['nocha'] = new Date().getTime()
    }
  }
  return request
})


// 如果在接收到数据之后有什么特殊的处理，需要在相应的时候使用一下拦截器

axios.interceptors.response.use(response => {
  return response
})

const CONTWXT = 'test' // 上下文

// 在平常的请求中get请求比较多，method默认给定get请求，baseUrl防止一个前端项目中会有对各后端的项目的情况，所以给定默认的一个上下文
export default function Axios ({method = 'get', url, params, data, baseUrl = CONTWXT}) {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      params,
      data,
      baseUrl
    })
    .then(res => {
      resolve(res)
    },err => {
      reject(err)
    })
    .catch(err => {
      reject(err)
    })
  })
}