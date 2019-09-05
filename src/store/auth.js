import services from '@/services'
import getRedirectPath from '@/utils/getRedirectPath'
import {errorMsg} from './notice'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const USER_INFO = 'USER_INFO'
const initState = {
  redirectTo:'',
  userName: '',
  userPass: '',
  userType:'',
  phone:''
}
export function auth (state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS :
      return { ...state,redirectTo:getRedirectPath(action.payload), ...action.payload }
    case USER_INFO:
      return { ...state,...action.payload }
    default:
      return state
  }
}

function authSuccess (data){
  return {type:AUTH_SUCCESS,payload:data}
}

export function userInfo (data) {
  return {type:USER_INFO,payload:data}
}
// 注册
export function register({userName,userPass,userType,phone}){
  return dispatch => {
    services.register({userName,userPass,userType,phone})
    .then(res => {
      dispatch(authSuccess({userName,userPass,userType,phone}))
    })
    .catch(err => 
      dispatch(errorMsg({msg:err.msg || '请求出错',msg_type:'error'}))
    )
  }
}

// 登陆
export function login ({userName,userPass}) {
  return dispatch => {
    services.login({userName,userPass})
    .then (res => {
      dispatch(authSuccess(res))
    })
    .catch(err => 
      dispatch(errorMsg({msg:err.msg|| '请求出错',msg_type:'error'}))
    )
  }
}

// 更新信息
export function update (data) {
  return dispatch => {
    services.update(data)
    .then(res => {
      console.log(res)
        dispatch(authSuccess(res))
    })
    .catch(err =>
      dispatch(errorMsg({msg:err.msg|| '请求出错',msg_type:'error'}))
    )
  }
}