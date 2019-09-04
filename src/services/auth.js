// 权限认证的接口

import Axios from './Axios'

export default {
  getInfo () {
    return Axios ({
      url:'/user/info',
      name:'用户信息'
    })
  },
  register(data){
    return Axios ({
      method:'post',
      url:'/user/register',
      name:'用户注册',
      data
    })
  },
  login(data){
    return Axios ({
      method:'post',
      url:'/user/login',
      name:'用户登陆',
      data
    })
  }
}