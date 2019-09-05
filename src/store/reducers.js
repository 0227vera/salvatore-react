// 合并所有的resucer并且返回
import { combineReducers } from 'redux'
import { auth } from './auth'
import { notice } from './notice'
export default combineReducers({ auth, notice })
