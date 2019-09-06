import React, { Component } from 'react'
import Logo from '@/components/logo/index'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button,Toast,Radio } from 'antd-mobile';
import { connect } from 'react-redux'
import { register } from '@/store/auth'
import { errorMsg } from '@/store/notice'
import formChange from '@/components/HOC/formChange'

@connect(
  state => state.auth,
  {register,errorMsg}
)
@formChange
class Index extends Component {
  constructor(props){
    super(props)
    this.props.onChangeForm('userType','worker')
  }
  state = {
    hasError:false
  }
  login(){
    this.props.history.push('/login')
  }
  register(){
    if (!this.props.state.userName || !this.props.state.userPass) {
      this.props.errorMsg({msg:'请填写用户名和密码',msg_type:'warning'})
      return
    }
    if (this.props.state.userPass !== this.props.state.userPassAgain)  {
      this.props.errorMsg({msg:'密码和确认密码不同',msg_type:'warning'})
      return
    }
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.props.state.phone.replace(/\s/g, '')))  {
      this.props.errorMsg({msg:'请输入正确的电话号码',msg_type:'warning'})
      return
    }
    this.props.register(this.props.state)
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
  onErrorClick (){
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
        <List>
            <InputItem
              clear
              placeholder="请输入用户名"
              onChange={v => this.props.onChangeForm('userName',v)}
              value={this.props.state.userName}
            >用户名</InputItem>
            <WhiteSpace />
            <InputItem
              type="phone"
              clear
              placeholder="请输入电话号码"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick.bind(this)}
              onChange={v => this.props.onChangeForm('phone',v)}
              value={this.props.state.phone}
            >电话</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              clear
              placeholder="请输入密码"
              onChange={v => this.props.onChangeForm('userPass',v)}
              value={this.props.state.userPass}
            >密码</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              clear
              placeholder="请再次输入密码"
              onChange={v => this.props.onChangeForm('userPassAgain',v)}
              value={this.props.state.userPassAgain}
            >确认密码</InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem key="1" checked={this.props.state.userType === 'worker'} onChange={v => this.props.onChangeForm('userType','worker')}> 求职者 </RadioItem>
            <RadioItem key="2" checked={this.props.state.userType === 'boss'} onChange={v => this.props.onChangeForm('userType','boss')}> BOSS </RadioItem>
          </List>
          <WhiteSpace size={'xl'} />
          <Button type="primary" onClick={this.register.bind(this)}>注册</Button>
          <WhiteSpace size={'xl'} />
          <span className="app-jumpUrl" onClick={this.login.bind(this)}>已有账号，去登陆</span>
        </WingBlank>
      </div>
    )
  }
}
export default Index
