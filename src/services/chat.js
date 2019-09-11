import Axios from './Axios'

export default {
  getMsgList (params) {
    return Axios ({
      url:'/user/getmsglist',
      name:'获取聊天列表的数据',
      params
    })
  },
  readMsg (data) {
    return Axios ({
      method:'post',
      url:'/user/readmsg',
      name:'消息已读',
      data
    })
  }
}