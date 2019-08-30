
import Axios from './Axios'

export default {
  getList () {
    return Axios ({
      url:'/list',
      name:'列表页面数据获取'
    })
  }
}