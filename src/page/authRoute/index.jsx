import { Component } from 'react'
import services from '@/services'
import { withRouter } from 'react-router-dom'
import { userInfo } from '@/store/auth'
@withRouter
class AuthRoute extends Component {
  
  componentDidMount(){
    const publicList = ['/login','/register']
    const currentRoute = this.props.location.pathname
    if (publicList.includes(currentRoute)) return
    services.getInfo()
    .then(res => {
      // 存储数据到redux
      console.log(res)
      userInfo(res)
    })
    .catch(err => {
      this.props.history.push('/login')
    })
  }
  render() {
    return null
  }
}
export default AuthRoute