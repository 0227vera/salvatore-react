import services from '@/services'
import getRedirectPath from '@/utils/getRedirectPath'

const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const REGISTER_SUCCESS = "REGISTER_SUCCESS"
const ERROR_MSG = "ERROR_MSG"
const CLOSE_ERROR = 'CLOSE_ERROR'
const USER_INFO = 'USER_INFO'
const initState = {
  redirectTo:'',
  userName: '',
  userPass: '',
  userPassAgain:'',
  userType:'',
  phone:'',
  msg:'',
  msg_type:'',
  msg_show:false
}
export function auth (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS :
      return { ...state, isAuth: true, redirectTo:getRedirectPath(action.payload), ...action.payload }
    case REGISTER_SUCCESS :
      return { ...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
    case USER_INFO:
      return { ...state, isAuth: true, ...action.payload }
    case ERROR_MSG :
      return { ...state, isAuth:false, msg:action.msg, msg_type:action.msg_type, msg_show:true}
    case CLOSE_ERROR :
      return { ...state, msg:'', msg_type:'', msg_show:false }
    default:
      return state
  }
}

function registerSuccess (data){
  return {type:REGISTER_SUCCESS,payload:data}
}
function loginSuccess (data) {
  return {type:LOGIN_SUCCESS,payload:data}
}
function errorMsg ({msg,msg_type}) {
  return {msg,msg_type,type:ERROR_MSG}
}
export function userInfo (data) {
  return {type:USER_INFO,payload:data}
}
export function closeMsg () {
  return {type:CLOSE_ERROR}
}
// 注册
export function register({userName,userPass,userPassAgain,userType,phone}){
  if (!userName || !userPass) return errorMsg({msg:'请填写用户名和密码',msg_type:'warning'})
  if (userPass !== userPassAgain) return errorMsg({msg:'密码和确认密码不同',msg_type:'warning'})
  if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone.replace(/\s/g, ''))) return errorMsg({msg:'请输入正确的电话号码',msg_type:'warning'})
  
  return dispatch => {
    services.register({userName,userPass,userPassAgain,userType,phone})
    .then(res => {
      dispatch(registerSuccess({userName,userPass,userPassAgain,userType,phone}))
    })
    .catch(err => {
      dispatch(errorMsg({msg:err.msg || '请求出错',msg_type:'error'}))})
  }
}

// 登陆
export function login ({userName,userPass}) {
  if (!userName || !userPass) return errorMsg({msg:'请填写用户名和密码', msg_type:'warning'})
  return dispatch => {
    services.login({userName,userPass})
    .then (res => {
      dispatch(loginSuccess(res))
    })
    .catch(err => dispatch(errorMsg({msg:err.msg|| '请求出错',msg_type:'error'})))
  }
}