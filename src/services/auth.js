// 权限认证的接口

import Axios from './Axios'

export default {
  getWho () {
    return Axios ({
      url:'/who',
      name:'who接口数据获取'
    })
  }
}