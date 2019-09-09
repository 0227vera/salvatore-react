import Axios from './Axios'

export default {
  getMsgList (params) {
    return Axios ({
      url:'/user/getmsglist',
      name:'获取聊天列表的数据',
      params
    })
  }
}