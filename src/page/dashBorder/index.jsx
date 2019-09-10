// 二级路由入口

import React, { Component } from 'react'
import Boss from './boss/boss'
import Worker from './worker/worker'
import Msg from './msg/msg'
import PersonalCenter from './pc/pc'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import Footer from '@/components/footer/footer'
import { Route } from 'react-router-dom'
import { getMsgList,recvMsg } from '@/store/chat'


@connect(
  state => state,
  { getMsgList,recvMsg }
)
class index extends Component {
  componentDidMount(){
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    const navList = [
      {
        path:'/boss',
        text:'求职者', // 底部icon的名称
        title: '求职者列表', // 头部title
        component:Boss, // 中间需要显示的组件
        hide: this.props.auth.userType === 'worker' // 如果是boss,worker不显示
      },
      {
        path:'/worker',
        text:'BOSS', 
        title:'BOSS列表', 
        component:Worker, 
        hide: this.props.auth.userType === 'boss' 
      },
      {
        path:'/msg',
        text:'消息', 
        title:'消息列表', 
        component:Msg
      },
      {
        path:'/personalCenter',
        text:'我',
        title:'个人中心', 
        component:PersonalCenter
      }
    ]
    return (
      <div className="detail">
        <header>
          <NavBar mode="dark">
            { navList.find(item => item.path === this.props.location.pathname).title }
          </NavBar>
        </header>
        <main>
          {
            navList.map(item => 
              <Route key={item.path} path={item.path} component={item.component}></Route> 
            )
          }            
        </main>
        <Footer data={navList}></Footer>
      </div>
    )
  }
}
export default index
