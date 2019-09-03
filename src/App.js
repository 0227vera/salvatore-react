// 在App.js中做相关的一级路由跳转 和初始化store文件
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
// import { counter, ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC } from './redux'
import  reducers  from './store/reducers'
// 中间键
import thunk from 'redux-thunk';

import {Provider} from 'react-redux'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Error from '@/page/Error/index'
import Login from '@/page/Login/index'
import Register from '@/page/Register/index'
import '@/assets/css/reset.css'
import '@/assets/css/common.scss'
// 创建store
const store =  createStore(reducers, compose(
  // 使用中间键
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension : f => f
))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route component={Error}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
