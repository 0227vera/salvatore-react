import React, { Component } from 'react'
import logo from '@/assets/img/logo.jpg'
export default class Logo extends Component {
  render() {
    return (
      <div className="app-logo">
          <img src={logo} alt=""/>
      </div>
    )
  }
}
