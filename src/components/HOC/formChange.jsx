import React, { Component } from 'react'

export default function formChange(Comp) {
  return class wrapperFrom extends Component {
    constructor(props){
      super(props)
      this.state = {}
      this.onChangeForm = this.onChangeForm.bind(this)
    }
    onChangeForm (key,value) {
      this.setState({
        [key] : value
      })
    }
    render () {
      return <Comp onChangeForm={this.onChangeForm} state={this.state} {...this.props}></Comp>
    }
  }
}