import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import Block from '../../components/Block'
import SpiritBag from '../../components/SpiritBag'
import PropsBag from '../../components/PropsBag'
import ReactAudioPlayer from 'react-audio-player'
import { navigate } from '../../utils/utils'
import { Spirit } from '../../utils/api'
import { message } from 'antd'
// 进入游戏之后的页面
export default function Main (props) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  let [isSpiritBagShow, setSBShow] = useState(false)
  let [isPropsBagShow, setPBShow] = useState(false)

  // 探索野怪
  function getRandomMonster () {
    let hide = message.loading('正在搜寻野怪...')
    Spirit.getRandomMonster().then(res => {
      if (res.data.status === 200) {
        let data = new FormData()
        data.append('id', res.data.data)
        Spirit.getSpiritById(data).then(res2 => {
          hide()
          if (res2.data.status == 200) {
            localStorage.setItem('opponent', JSON.stringify(res2.data.data))
            navigate(props.history, '确定要进入探索吗？', '/fight')
          } else {
            message.error(res2.data.message)
          }
        })
      } else {
        message.error(res.data.message)
      }
    })
  }

  // 训练
  function toTrain () {
    if (localStorage.getItem('ready') == null) {
      alert('请先前往精灵背包设置出战精灵')
      return
    }
    localStorage.setItem('opponent', localStorage.getItem('ready'))
    navigate(props.history, '确定要进入训练吗？', '/fight')
  }
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
          onClick={navigate.bind(
            this,
            props.history,
            '确定要退出登录吗？',
            '/'
          )}
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
            <div>LV.{userInfo.exp / 100}</div>
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
            pop={true}
            poptip={'挑战BOSS'}
          />
        </Link>

        <Block
          img={require('../../assets/images/icons/ring.jpg').default}
          size='big'
          text='训练'
          onClick={toTrain.bind(this)}
          pop={true}
          poptip={'挑战自己，提升等级'}
        />

        <Block
          img={require('../../assets/images/icons/catch.jpg').default}
          size='big'
          text='探索'
          onClick={getRandomMonster}
          poptip={'捕捉更多精灵'}
          pop={true}
        />
      </div>
      <div className='main-footer flex-end-center'>
        <Block
          img={require('../../assets/images/icons/pet.png').default}
          size='small'
          onClick={setSBShow.bind(this, true)}
          poptip={'精灵背包'}
          pop={true}
        />

        <Block
          img={require('../../assets/images/icons/bag.png').default}
          size='small'
          onClick={setPBShow.bind(this, true)}
          poptip={'道具背包'}
          pop={true}

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
