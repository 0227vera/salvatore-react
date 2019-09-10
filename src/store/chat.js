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
  users:{},
  unread:0
}

export function chat(state = initState,action){
  switch(action.type){
    case MSG_LIST :
      return {...state,users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(item => !item.read&&item.to === action.payload.userid).length}
    case MSG_RECV:
        const unread = action.payload.to === action.userid ? state.unread+1:state.unread
        return {...state, chatmsg:[...state.chatmsg,action.payload],unread}
    case MSG_READ :
      return
    default :
    return state
  }
}


function msgList(msgs,users,userid){
  return {type:MSG_LIST,payload:{msgs,users,userid}}
}

function msgRecv(data,userid) {
  return {type:MSG_RECV,payload:data,userid}
}

export function sendMsg(data) {
  return dispatch => {
    socket.emit('sendmsg',data)
  }
}

export function recvMsg(){
  return (dispatch,getState) => {
    socket.on('recvmsg',data => {
      let userid = getState().auth._id
      dispatch(msgRecv(data,userid))
    })
  }
}
export function getMsgList () {
  return (dispatch, getState) => {
    services.getMsgList()
    .then(res => {
      let userid = getState().auth._id
      dispatch(msgList(res.msgs,res.users,userid))
    })
    .catch(err => 
      dispatch(errorMsg({msg:err.msg || '请求出错',msg_type:'error'}))  
    )
  }
}