import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '@/store/auth'
import { Result, WhiteSpace, WingBlank,List,Button,Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies'
const myImg = src => <img style={{width:50,height:50}} src={src} className="spe am-icon am-icon-md" alt="" />
@connect(
  state => state.auth,
  {logout}
)
class pc extends Component {
  logout(){
    let alert = Modal.alert
    let self = this
    alert('退出登陆','确认要退出登陆吗？',[
      { text: '取消' },
      { text: '确定', onPress() {
        // 清除cookie
        browserCookies.erase('userid')
        self.props.logout()
      } }
    ])
  }
  render() {
    return this.props.userName ? (
      <WingBlank>
        <WhiteSpace/>
        <Result
          img={myImg(require(`@/assets/img/headImg/icon${this.props.headImg}.png`))}
          title={this.props.userName}
          message={this.props.company||''}
        />
        <WhiteSpace/>
        <List renderHeader={() => '个人信息'}>
          <List.Item extra={this.props.phone}>电话</List.Item>
          <List.Item extra={this.props.money}>期望薪资</List.Item>
          <List.Item extra={this.props.title} multipleLine>{this.props.userType === 'boss' ? '需求职等' : '职等'}</List.Item>
          <List.Item >{this.props.userType === 'boss' ? '技术需求' : '技术栈'}</List.Item>
          <List.Item wrap multipleLine>{this.props.desc.split('\n').map((item,index) => <p key={index}>{index+1}.{item}</p> )}</List.Item>
        </List>
        <WhiteSpace/>
        <Button type="primary" onClick={this.logout.bind(this)}>退出登陆</Button>
      </WingBlank>
    ) : <Redirect to={this.props.redirectTo}></Redirect>
  }
}
export default pc
