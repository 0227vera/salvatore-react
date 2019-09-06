import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '@/components/logo/index'
import formChange from '@/components/HOC/formChange'
import { List, InputItem, WingBlank,WhiteSpace, Button } from 'antd-mobile';
import {login} from '@/store/auth'
import {errorMsg} from '@/store/notice'


@connect(
  state => state.auth,
  {login,errorMsg}
)
@formChange
class loginPage extends Component {
  register() {
    this.props.history.push('/register')
  }
  login(){
    if (!this.props.state.userName || !this.props.state.userPass) {
      this.props.errorMsg({msg:'请填写用户名和密码', msg_type:'warning'})
      return
    }
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div className="center">
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo />
        <WhiteSpace size={'xl'}></WhiteSpace>
        <WingBlank>
          <List renderHeader={() => ''}>
            <InputItem
              clear
              placeholder="用户名/电话/邮箱"
              onChange={ v=> this.props.onChangeForm('userName',v) }
              value={this.props.state.userName}
            >账号</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              clear
              placeholder="请输入密码"
              onChange={v=> this.props.onChangeForm('userPass',v)}
              value={this.props.state.userPass}
            >密码</InputItem>
          </List>
          <WhiteSpace size={'xl'}></WhiteSpace>
          <Button type="primary" onClick={this.login.bind(this)}>登陆</Button>
          <WhiteSpace size={'xl'}></WhiteSpace>
          <span className="app-jumpUrl" onClick={this.register.bind(this)}>没有账号，立即注册</span>
        </WingBlank>
      </div>
    )
  }
}
export default loginPage