import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logout} from '../store/auth'

@connect(
  state => state.auth,
  {logout}
)
class content extends Component {
  render() {
    let redi = <Redirect to="/login"></Redirect>
    let content = <div>
      <span>内容页面</span>
      <button onClick={this.props.logout}>注销</button>
      </div>
    return (
      this.props.isAuth ?  content : redi
    )
  }
}
export default content
