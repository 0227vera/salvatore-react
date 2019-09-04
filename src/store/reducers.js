// 合并所有的resucer并且返回
import { combineReducers } from 'redux'
import { auth } from './auth'
export default combineReducers({ auth })
