import React, { Component } from 'react'
import Logo from '@/components/logo/index'
import { List, InputItem, WingBlank, WhiteSpace, Button,Toast,Radio } from 'antd-mobile';


export default class index extends Component {
  constructor(props){
    super(props)
    this.login = this.login.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangePass = this.onChangePass.bind(this)
    this.onChangePhone = this.onChangePhone.bind(this)
    this.onChangePassAgain = this.onChangePassAgain.bind(this)
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
  onChangeName(userName) {
    this.setState({userName})
  }
  onChangePass(userPass) {
    this.setState({userPass})
  }
  onChangePassAgain(userPassAgain){
    this.setState({userPassAgain})
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
  changeType(userType){
    this.setState({userType})
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div className="center">
        <Logo></Logo>
        <WhiteSpace size={'xl'}></WhiteSpace>
        <WingBlank>
        <List renderHeader={() => ''}>
            <InputItem
              clear
              placeholder="请输入用户名"
              onChange={this.onChangeName}
              value={this.state.userName}
            >用户名</InputItem>
            <WhiteSpace />
            <InputItem
              type="phone"
              clear
              placeholder="请输入电话号码"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick}
              onChange={this.onChangePhone}
              value={this.state.phone}
            >电话</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              clear
              placeholder="请输入密码"
              onChange={this.onChangePass}
              value={this.state.userPass}
            >密码</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              clear
              placeholder="请再次输入密码"
              onChange={this.onChangePassAgain}
              value={this.state.userPassAgain}
            >确认密码</InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem key="1" checked={this.state.userType === 'worker'} onChange={this.changeType.bind(this,'worker')}> 求职者 </RadioItem>
            <RadioItem key="2" checked={this.state.userType === 'boss'} onChange={this.changeType.bind(this,'boss')}> BOSS </RadioItem>
          </List>
          <WhiteSpace size={'xl'} />
          <Button type="primary">注册</Button>
          <WhiteSpace size={'xl'} />
          <span className="app-jumpUrl" onClick={this.login}>已有账号，去登陆</span>
        </WingBlank>
      </div>
    )
  }
}
