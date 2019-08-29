import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC } from './redux'


// 把store上面的属性挂载再props上
// const mapStateProps = state => ({num:state})
// 把store上面的方法挂载再props上
// const actionCreateProps = {ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC}
// App = connect(mapStateProps,actionCreateProps)(App)
@connect(
  // 把store上面的属性挂载再props上
  state => ({num:state}),
  // 把store上面的方法挂载再props上
  {ADD_NUMBER, REDUCE_NUMBER, ADD_NUMBER_ASYNC}
)
class App extends Component {
  render() {
    return (
      <div>
        <h1> 现在的数量状态是多少{this.props.num } </h1>
        <button onClick={ this.props.ADD_NUMBER }>数字加1</button>
        <button onClick={ this.props.REDUCE_NUMBER }>数字减1</button>
        <button onClick={ this.props.ADD_NUMBER_ASYNC }>等一下再加</button>
      </div>
    )
  }
}
export default App



