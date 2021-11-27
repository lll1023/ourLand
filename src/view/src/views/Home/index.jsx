import React, { useState } from 'react'
import './index.css'

import Button from '../../components/Button'
import LoginPanel from '../../components/LoginPanel';
import ReactAudioPlayer from 'react-audio-player';
// 主页模块
function Home () {
  let [isClick, setClick] = useState(false);
  if (isClick) {
    return (
      <div className='home-container flex-around-center-col'>
        <div className='title'>@信安1班——红橙黄绿青蓝紫队</div>
        <LoginPanel />
        <ReactAudioPlayer src={require("../../assets/audios/login.mp3").default} autoPlay/>
      </div>
    )
  } else {
    return (
      <div className='home-container flex-around-center-col'>
        <div className='title'>@信安1班——红橙黄绿青蓝紫队</div>
        <Button onClick={() => setClick(!isClick)}>
          <a>进入游戏</a>
        </Button>
        <ReactAudioPlayer src={require("../../assets/audios/login.mp3").default} autoPlay loop/>
      </div>
    )
  }
}

export default Home
