import React, { Component } from 'react'
import { Input, Button } from 'antd'
import './index.css'
export default class LoginPanel extends Component {
  state = {
    username: '',
    password: ''
  }
  toGame() {
    // this.props.history.push("/game")
    window.location.hash = 'game'
  }
  render () {
    return (
      <div className='panel-container flex-center-center'>
        <div className='panel flex-around-center-col'>
          <Input placeholder='请输入用户名' />
          <Input placeholder='请输入密码' />
          <div className='btn-panel flex-between-center'>
            <Button onClick={()=>this.toGame.apply(this)}>登录</Button>
            <Button type="primary">注册</Button>
          </div>
        </div>
      </div>
    )
  }
}
