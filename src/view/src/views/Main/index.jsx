import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import Block from '../../components/Block'
import SpiritBag from '../../components/SpiritBag'
import PropsBag from '../../components/PropsBag'
import ReactAudioPlayer from 'react-audio-player'
import { navigate } from '../../utils/utils'

// 进入游戏之后的页面
export default function Main (props) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let [isSpiritBagShow, setSBShow] = useState(false)
  let [isPropsBagShow, setPBShow] = useState(false)
  return (
    <div className='main-container flex-between-stretch-col'>
      <ReactAudioPlayer
        autoPlay
        src={require('../../assets/audios/home.mp3').default}
        loop
      />
      <div className='main-header flex-between-center'>
        <svg
          t='1637583937747'
          viewBox='0 0 1024 1024'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          p-id='2611'
          width='40'
          height='40'
          onClick={navigate.bind(this,props.history,'确定要退出登录吗？','/')}
        >
          <path
            d='M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m158.4 674.4L625.6 784l-272-272 272-272 45.6 45.6L444 512l226.4 226.4z'
            p-id='2612'
            fill='#ffffff'
          ></path>
        </svg>

        <div className='flex-end-center'>
          <div className='user-panel'>
            <div>{userInfo.user_name}</div>
            <div>LV.{userInfo.exp/100}</div>
          </div>
          <Block
            img={require('../../assets/images/icons/avatar.jpg').default}
            size='small'
          />
        </div>
      </div>
      <div className='main-content flex-around-center'>
        <Link to='adventure'>
          <Block
            img={require('../../assets/images/icons/adventure.jpg').default}
            size='big'
            text='冒险'
          />
        </Link>

        <Block
          img={require('../../assets/images/icons/ring.jpg').default}
          size='big'
          text='训练'
          onClick={navigate.bind(this,props.history,'确定要进入训练吗？','/fight')}
        />

        <Block
          img={require('../../assets/images/icons/catch.jpg').default}
          size='big'
          text='探索'
          onClick={navigate.bind(this,props.history,'确定要进入探索吗？','/fight')}
        />
      </div>
      <div className='main-footer flex-end-center'>
        <Block
          img={require('../../assets/images/icons/pet.png').default}
          size='small'
          onClick={setSBShow.bind(this, true)}
        />

        <Block
          img={require('../../assets/images/icons/bag.png').default}
          size='small'
          onClick={setPBShow.bind(this, true)}
        />
      </div>

      {/* 宠物面板 */}
      {isSpiritBagShow ? (
        <SpiritBag onClick={setSBShow.bind(this, false)} />
      ) : null}

      {/* 道具面板 */}
      {isPropsBagShow ? (
        <PropsBag onClick={setPBShow.bind(this, false)} />
      ) : null}
    </div>
  )
}
