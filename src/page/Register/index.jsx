import React, { Component } from 'react'
import Logo from '@/components/logo/index'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button,Toast,Radio } from 'antd-mobile';
import { connect } from 'react-redux'
import { register } from '@/store/auth'
import { errorMsg } from '@/store/notice'

@connect(
  state => state.auth,
  {register,errorMsg}
)
class Index extends Component {
  constructor(props){
    super(props)
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
  }
  state = {
    userName: '',
    userPass: '',
    userPassAgain:'',
    userType:'worker',
    phone:'',
    hasError:false
  }
  login(){
    this.props.history.push('/login')
  }
  register(){
    if (!this.state.userName || !this.state.userPass) {
      this.props.errorMsg({msg:'请填写用户名和密码',msg_type:'warning'})
      return
    }
    if (this.state.userPass !== this.state.userPassAgain)  {
      this.props.errorMsg({msg:'密码和确认密码不同',msg_type:'warning'})
      return
    }
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.state.phone.replace(/\s/g, '')))  {
      this.props.errorMsg({msg:'请输入正确的电话号码',msg_type:'warning'})
      return
    }
    this.props.register(this.state)
  }
  onChangeForm(key,value){
    this.setState({
      [key]:value
    })
  }
  onChangePhone (value) {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      phone:value,
    });
  }
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('请正确输入11位数的电话号码');
    }
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div className="center">
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <WhiteSpace size={'xl'}></WhiteSpace>
        <WingBlank>
        <List renderHeader={() => ''}>
            <InputItem
              clear
              placeholder="请输入用户名"
              onChange={v => this.onChangeForm('userName',v)}
              value={this.state.userName}
            >用户名</InputItem>
            <WhiteSpace />
            <InputItem
              type="phone"
              clear
              placeholder="请输入电话号码"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick}
              onChange={v => this.onChangeForm('phone',v)}
              value={this.state.phone}
            >电话</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              clear
              placeholder="请输入密码"
              onChange={v => this.onChangeForm('userPass',v)}
              value={this.state.userPass}
            >密码</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              clear
              placeholder="请再次输入密码"
              onChange={v => this.onChangeForm('userPassAgain',v)}
              value={this.state.userPassAgain}
            >确认密码</InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem key="1" checked={this.state.userType === 'worker'} onChange={v => this.onChangeForm('userType','worker')}> 求职者 </RadioItem>
            <RadioItem key="2" checked={this.state.userType === 'boss'} onChange={v => this.onChangeForm('userType','boss')}> BOSS </RadioItem>
          </List>
          <WhiteSpace size={'xl'} />
          <Button type="primary" onClick={this.register}>注册</Button>
          <WhiteSpace size={'xl'} />
          <span className="app-jumpUrl" onClick={this.login}>已有账号，去登陆</span>
        </WingBlank>
      </div>
    )
  }
}
export default Index
