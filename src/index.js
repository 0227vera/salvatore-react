// 项目入口文件

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
// import { counter, ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC } from './redux'
import  reducers  from '@/store/reducers'
// 中间键
import thunk from 'redux-thunk';

import { Provider } from 'react-redux'
// 创建store
const store =  createStore(reducers, compose(
  // 使用中间键
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension : f => f
))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
