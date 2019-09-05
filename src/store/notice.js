const ERROR_MSG = 'ERROR_MSG'
const CLOSE_ERROR = 'CLOSE_ERROR'


let initState = {
  msg:'',
  msg_type:'',
  msg_show:false
}


export function notice (state = initState, action) {
  switch (action.type) {
    case ERROR_MSG :
      return { msg:action.msg, msg_type:action.msg_type, msg_show:true}
    case CLOSE_ERROR :
      return { msg:'', msg_type:'', msg_show:false }
    default:
      return state
  }
}


export function errorMsg ({msg,msg_type}) {
  return { msg, msg_type, type:ERROR_MSG }
}
export function closeMsg () {
  return { type:CLOSE_ERROR }
}