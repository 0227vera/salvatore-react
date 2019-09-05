import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getList} from '@/store/list'
import UserList from '@/components/userList/userList'

@connect(
  state => state.list,
  {getList}
)
class boss extends Component {
  componentDidMount(){
    this.props.getList('worker')
  }
  render() {
    return <UserList data={this.props.userList}></UserList>
  }
}
export default boss
