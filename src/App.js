// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC } from './redux'


// // 把store上面的属性挂载再props上
// // const mapStateProps = state => ({num:state})
// // 把store上面的方法挂载再props上
// // const actionCreateProps = {ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC}
// // App = connect(mapStateProps,actionCreateProps)(App)
// @connect(
//   // 把store上面的属性挂载再props上
//   state => ({num:state}),
//   // 把store上面的方法挂载再props上
//   {ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC}
// )
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <h1> 现在的数量状态是多少{this.props.num } </h1>
//         <button onClick={ this.props.ADD_NUMBER }>数字加1</button>
//         <button onClick={ this.props.REDUCE_NUMBER }>数字减1</button>
//         <button onClick={ this.props.ADD_NUMBER_ASYNC }>等一下再加</button>
//       </div>
//     )
//   }
// }
// export default App


// 在App.js中做相关的一级路由跳转 和初始化store文件
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
// import { counter, ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC } from './redux'
import  reducers  from './store/reducers'
// 中间键
import thunk from 'redux-thunk';

import {Provider} from 'react-redux'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Error from './page/Error'
import Login from './page/login'
import Content from './page/content'
import services from './services'
// 创建store
const store =  createStore(reducers, compose(
  // 使用中间键
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension : f => f
))

export default class App extends React.Component {
  render() {
    console.log(services)
    return (
      <Provider store={store}>
        <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/content" component={Content}></Route>
              <Route component={Error}></Route>
            </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
