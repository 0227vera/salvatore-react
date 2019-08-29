import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
// import { counter, ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC } from './redux'
import { counter } from './redux'
// 中间键
import thunk from 'redux-thunk';

import {Provider} from 'react-redux'
// 创建store
const store =  createStore(counter, compose(
  // 使用中间键
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension : f => f
))


let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root')
  )
}
render()
// 状态订阅
store.subscribe(render)

serviceWorker.unregister();
