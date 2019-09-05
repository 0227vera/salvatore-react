import services from '@/services'
import {errorMsg} from './notice'
const LIST="LIST"

let initState = {
  userList:[]
}

export function list (state = initState,action) {
  switch(action.type){
    case LIST:
      return {...state, userList:action.paylolad}
    default :
    return state
  }
}

function listSuccess(data){
  return {type:LIST,paylolad:data}
}

export function getList(userType) {
  return dispatch => {
    services.getList({userType})
    .then(res => {
      dispatch(listSuccess(res))
    })
    .catch(err =>
      dispatch(errorMsg({msg:err.msg || '请求出错',msg_type:'error'}))
    )
  }
}