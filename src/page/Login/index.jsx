import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import { login_auth} from '@/store/auth'

import Logo from '@/components/logo/index'
import { List, InputItem, WingBlank,WhiteSpace, Button } from 'antd-mobile';


@connect(
  state => state.auth,
  {login_auth}
)
class login extends Component {
  constructor(props){
    super(props)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangePass = this.onChangePass.bind(this)
    this.register = this.register.bind(this)

  }
  state = {
    userName: '',
    userPass: '',
  }
  onChangeName(userName) {
    this.setState({userName})
  }
  onChangePass(userPass) {
    this.setState({userPass})
  }
  register() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div className="center">
        <Logo />
        <WhiteSpace size={'xl'}></WhiteSpace>
        <WingBlank>
          <List renderHeader={() => ''}>
            <InputItem
              clear
              placeholder="用户名/电话/邮箱"
              onChange={this.onChangeName}
              value={this.state.userName}
            >账号</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              clear
              placeholder="请输入密码"
              onChange={this.onChangePass}
              value={this.state.userPass}
            >密码</InputItem>
          </List>
          <WhiteSpace size={'xl'}></WhiteSpace>
          <Button type="primary">登陆</Button>
          <WhiteSpace size={'xl'}></WhiteSpace>
          <span className="app-jumpUrl" onClick={this.register}>没有账号，立即注册</span>
        </WingBlank>
      </div>
    )
  }
}
export default login