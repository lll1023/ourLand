import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import './index.css'
import {User} from "../../utils/api";
import { withRouter } from 'react-router';
// 登录注册模块



class LoginPanel extends Component {
  constructor(props) {
    super(props)
    this.onStateChange = this.onStateChange.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }
  state = {
    username: '',
    password: ''
  }
  onStateChange(e) {
    this.setState({
      [e.target.dataset.name] : e.target.value
    })
  }

  // 注册
  register() {
    if(!this.state.username || !this.state.password) {
      message.warning("请输入相关信息！");
    }
    let data = new FormData();
    data.append('username',this.state.username);
    data.append('password',this.state.password);
    let loading = message.loading("正在注册...");
    User.register(data).then(res => {
      if(res.data.status === 200) {
        message.success(res.data.data);
      }else {
        message.error(res.data.message)
      }
      loading();
    })

  }

  // 登录
  login() {
    if(!this.state.username || !this.state.password) {
      message.warning("请输入相关信息！");
    }
    let data = new FormData();
    data.append('username',this.state.username);
    data.append('password',this.state.password);
    let loading = message.loading("正在登录...");
    let that = this;
    User.login(data).then(res => {
      if(res.data.status === 200) {
        message.success('登录成功!正在跳转');
        localStorage.setItem("userInfo",JSON.stringify(res.data.data));
        setTimeout(() => {
          that.props.history.push({
            pathname: '/game'
          });
        },1000);
      }else {
        message.error(res.data.message)
      }
      loading();
    })
  }

  render () {
    return (
      <div className='panel-container flex-center-center'>
        <div className='panel flex-around-center-col'>
          <Input data-name="username" onChange={this.onStateChange} placeholder='请输入用户名' />
          <Input.Password data-name="password"  onChange={this.onStateChange} placeholder='请输入密码' />
          <div className='btn-panel flex-between-center'>
            <Button onClick={this.login}>登录</Button>
            <Button type="primary" onClick={this.register}>注册</Button>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(LoginPanel);