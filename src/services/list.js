
import Axios from './Axios'

export default {
  getList (params) {
    return Axios ({
      url:'/user/list',
      name:'列表页面数据获取',
      params
    })
  }
}