import React, { useState } from 'react'
import './index.css'

import Button from '../../components/Button'
import LoginPanel from '../../components/LoginPanel'

function Home () {
  let [isClick, setClick] = useState(false)
  if (isClick) {
    return (
      <div className='home-container flex-around-center-col'>
        <div className='title'>@信安1班——红橙黄绿青蓝紫队</div>
        <LoginPanel />
      </div>
    )
  } else {
    return (
      <div className='home-container flex-around-center-col'>
        <div className='title'>@信安1班——红橙黄绿青蓝紫队</div>
        <Button onClick={() => setClick(!isClick)}>
          <a>进入游戏</a>
        </Button>
      </div>
    )
  }
}

export default Home
