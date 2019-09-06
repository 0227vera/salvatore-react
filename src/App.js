// 在App.js中做相关的一级路由跳转 和初始化store文件
import React from 'react';
import { connect } from 'react-redux'
import {closeMsg} from '@/store/notice'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '@/page/Login/index'
import Register from '@/page/Register/index'
import AuthRoute from '@/page/authRoute/index'
import Bossinfo from '@/page/bossInfo/index'
import WorkerInfo from '@/page/workerInfo/index'
import DashBorder from '@/page/dashBorder/index'
import Chat from '@/components/chat/chat'
import '@/assets/css/reset.css'
import '@/assets/css/common.scss'

@connect(
  state => state.notice,
  {closeMsg}
)
class App extends React.Component {
  constructor(props){
    super(props)
    this.closeMsg = this.closeMsg.bind(this)
    this.state = {
      timer:null
    }
  }
  closeMsg(){
    this.props.closeMsg()
  }
  render() {
    if (this.props.msg_show) {
      clearTimeout(this.state.timer)
      this.timer = setTimeout(() => {
        this.closeMsg()
      }, 3 * 1000);
      // 平均3字/s
    }
    return (
        <BrowserRouter>
          <div className="app">
            <p 
            onClick={this.closeMsg}
            className={[`app-notice-${this.props.msg_type}`, `app-notice-${this.props.msg_show}`, "app-notice" ].join(' ')}
            >{this.props.msg}</p>
            <AuthRoute></AuthRoute>
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/bossinfo" component={Bossinfo}></Route>
              <Route path="/workerinfo" component={WorkerInfo}></Route>
              <Route path="/chat/:userName" component={Chat}></Route>
              <Route component={DashBorder}></Route>
            </Switch>
          </div>
        </BrowserRouter>
    )
  }
}
export default App
