import io from 'socket.io-client'
import services from '@/services'
import {errorMsg} from './notice'
const socket = io('ws://localhost:3227')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

let initState = {
  chatmsg:[],
  unread:0
}

export function chat(state = initState,action){
  switch(action.type){
    case MSG_LIST :
      return {...state, chatmsg:action.payload, unread:action.payload.filter(item => !item.read).length}
    case MSG_RECV:
        return {...state, chatmsg:[...state.chatmsg,action.payload],unread:state.unread+1}
    case MSG_READ :
      return
    default :
    return state
  }
}


function msgList(msgs){
  return {type:MSG_LIST,payload:msgs}
}

function msgRecv(data) {
  return {type:MSG_RECV,payload:data}
}

export function sendMsg(data) {
  return dispatch => {
    socket.emit('sendmsg',data)
  }
}

export function recvMsg(){
  return dispatch => {
    socket.on('recvmsg',data => {
      dispatch(msgRecv(data))
    })
  }
}
export function getMsgList () {
  return dispatch => {
    services.getMsgList()
    .then(res => {
      dispatch(msgList(res))
    })
    .catch(err => 
      dispatch(errorMsg({msg:err.msg || '请求出错',msg_type:'error'}))  
    )
  }
}