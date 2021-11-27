import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import './App.css'
import { route } from "./utils/route";

class App extends Component {
  render () {
    return (
      <HashRouter>
          <div className='frame'>
            <div className='canvas'>
              {
                route.map((item,index) => <Route key={index} component={item.component} path={item.path} exact={item.exact ? true : null}></Route>)
              }
            </div>
          </div>
      </HashRouter>
    )
  }
}

export default App
