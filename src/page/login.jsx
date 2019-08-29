import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login_auth} from '../store/auth'
@connect(
  state => state.auth,
  {login_auth}
)
class login extends Component {
  render() {
    return (
      <div>
        {this.props.isAuth ? <Redirect to="/content"></Redirect> : null}
        <span>登陆页面</span>
        <button onClick={this.props.login_auth}>登陆</button>
      </div>
    )
  }
}
export default login