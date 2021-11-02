import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import './App.css'
import Home from './views/Home/index'
import Main from './views/Main'

class App extends Component {
  constructor () {
    super()
  }
  render () {
    return (
      <HashRouter>
          <div className='frame'>
            <div className='canvas'>
              <Route component={Home} path='/' exact></Route>
              <Route component={Main} path="/game"></Route>
            </div>
          </div>
      </HashRouter>
    )
  }
}

export default App
