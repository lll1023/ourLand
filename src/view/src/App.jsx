import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import './App.css'
import { route } from './utils/route'
import background from './data/background'
import { message, Progress } from 'antd'
class App extends Component {
  state = {
    loading: 0,
    status: '',
    message: "正在加载资源中..."
  }
  componentDidMount () {
    let promises = []
    background.forEach(item => {
      let that = this;
      promises.push(
        new Promise((resolve,reject) => {
          let img = new Image()
          img.src = item
          img.onload = function () {
            that.setState({
              loading: that.state.loading + 15
            })
            resolve('ok')
          }
          img.onerror =- function() {
            resolve('err');
          }
        })
      )
    })
    Promise.all(promises).then(() => {
        this.setState({
          loading: 100,
          message: "加载完成！"
        })
    }).catch(err => {
      this.setState({
        status : 'exception',
        message: "加载失败，请检查网络状况"
      })
    })
  }
  render () {
    if (this.state.loading < 100) {
      return (
        <div className='frame'>
          <div className="loading flex-center-center-col">
            <Progress type='circle' percent={this.state.loading} />
            <p>{this.state.message}</p>
          </div>
        </div>
      )
    } else {
      return (
        <HashRouter>
          <div className='frame'>
            <div className='canvas'>
              {route.map((item, index) => (
                <Route
                  key={index}
                  component={item.component}
                  path={item.path}
                  exact={item.exact ? true : null}
                ></Route>
              ))}
            </div>
          </div>
        </HashRouter>
      )
    }
  }
}

export default App
