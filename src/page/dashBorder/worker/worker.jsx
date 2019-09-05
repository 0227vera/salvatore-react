import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getList} from '@/store/list'
import UserList from '@/components/userList/userList'

@connect(
  state => state.list,
  {getList}
)
class worker extends Component {
  componentDidMount(){
    this.props.getList('boss')
  }
  render() {
    return <UserList data={this.props.userList}></UserList>
  }
}
export default worker

