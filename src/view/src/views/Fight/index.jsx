import React, { useState } from 'react'
import './index.css'
import Blood from '../../components/Blood'
import Button from '../../components/Button'
import Block from '../../components/Block'
import ReactAudioPlayer from 'react-audio-player'
import propsImg from "../../data/propsImg";
import propsInfo from "../../data/propsInfo"
import { navigate } from '../../utils/utils'

// 战斗界面

export default function Fight (props) {
  // 是否遮罩
  let [isMask, setMask] = useState(false)
  // 面板类型
  let [Ptype, setType] = useState(true)

  // 动画
  let [myAttack, setMyAttack] = useState(false)
  let [opAttack, setOpAttack] = useState(false)
  let [myEnhance, setMyEnhance] = useState(false)
  let [opEnhance, setOpEnhance] = useState(false)


  // 道具数量
  let [isBloodUsed,setBloodUsed] = useState(false);
  let [isBallUsed,setBallUsed] = useState(false);
  let [isPPUsed,setPPUsed] = useState(false);

  // 播放战斗动画
  function switchStatus (func, func2) {
    setMask(true)
    func(true)
    setTimeout(() => {
      func(false)
      func2(true)
      setTimeout(() => {
        func2(false)
        setMask(false)
      }, 2000)
    }, 2000)
  }
  return (
    <div className='f-container flex-between-center-col'>
      <ReactAudioPlayer
        autoPlay
        src={require('../../assets/audios/adventure.mp3').default}
        loop
      />
      <div className='f-blood flex-around-center'>
        <Blood name='烈焰星星' direction='left' rate='100' all='100' cur='60' />
        <svg
          t='1637586215597'
          viewBox='0 0 1024 1024'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          p-id='3842'
          width='50'
          height='50'
        >
          <path
            d='M427.52 323.84C410.88 318.08 392.96 327.04 387.84 343.68L290.56 634.88 193.28 343.68c-5.76-16.64-23.68-25.6-40.32-19.84-16.64 5.76-25.6 23.68-19.84 40.32l127.36 381.44c4.48 12.8 16.64 21.76 30.08 21.76s25.6-8.96 30.08-21.76L448 364.16C453.76 347.52 444.16 329.6 427.52 323.84zM480 64C215.04 64 0 279.04 0 544 0 808.96 215.04 1024 480 1024c264.96 0 480-215.04 480-480C960 279.04 744.96 64 480 64zM480 960C250.24 960 64 773.76 64 544 64 314.24 250.24 128 480 128 709.76 128 896 314.24 896 544 896 773.76 709.76 960 480 960zM608.64 385.92c56.32 0 95.36 26.24 95.36 63.36 0 17.28 14.08 32 32 32 17.92 0 32-14.08 32-32 0-73.6-67.2-127.36-159.36-127.36-97.92 0-159.36 48.64-159.36 127.36 0 76.16 64 127.36 159.36 127.36C624.64 576.64 704 579.84 704 640c0 55.04-60.16 63.36-95.36 63.36-56.32 0-95.36-26.24-95.36-63.36 0-17.28-14.08-32-32-32-17.28 0-32 14.08-32 32 0 73.6 67.2 127.36 159.36 127.36 97.92 0 159.36-48.64 159.36-127.36 0-76.16-64-127.36-159.36-127.36-16 0-95.36-3.2-95.36-63.36C513.28 394.24 572.8 385.92 608.64 385.92z'
            p-id='3843'
            fill='#ffffff'
          ></path>
        </svg>
        <Blood
          direction='right'
          name='烈焰星星'
          rate='100'
          all='100'
          cur='80'
        />
      </div>
      <div className='f-move flex-between-center'>
        <div className={myAttack ? 'my-attack' : myEnhance ? 'my-enhance' : ''}>
          <img
            className='spirit s-left'
            alt=""
            src={require('../../assets/images/spirit/1.png').default}
          />
        </div>
        <div className={opAttack ? 'op-attack' : opEnhance ? 'op-enhance' : ''}>
          <img
          alt=""
            className='spirit s-right'
            src={require('../../assets/images/spirit/21.png').default}
          />
        </div>
      </div>
      <div className='f-panel flex-between-center'>
        <div className='f-log'>
          <li>我方精灵使用了【火焰车】</li>
        </div>
        {Ptype ? (
          // 技能面板
          <div className='f-left flex-around-center-wrap'>
            <Button
              onClick={switchStatus.bind(this, setMyAttack, setOpAttack)}
              size='small'
              pop='true'
              poptip='技能1'
            >
              技能1
            </Button>
            <Button
              onClick={switchStatus.bind(this, setMyEnhance, setOpEnhance)}
              size='small'
              pop='true'
              poptip='技能1'
            >
              技能2
            </Button>
            <Button size='small' pop='true' poptip='技能1'>
              技能1
            </Button>
            <Button size='small' pop='true' poptip='技能1'>
              技能1
            </Button>
          </div>
        ) : (
          // 道具界面
          <div className='f-left flex-around-center-wrap'>
            <Block onClick={switchStatus.bind(this,setBallUsed,setOpAttack)} pop={true} poptip={propsInfo[0].intro} text={isBallUsed ? "0" : "1"} img={propsImg[0]} size='small'></Block>
            <Block onClick={switchStatus.bind(this,setBloodUsed,setOpAttack)} pop={true} poptip={propsInfo[1].intro} text={isBloodUsed ? "0" : "1"} img={propsImg[1]} size='small'></Block>
            <Block onClick={switchStatus.bind(this,setPPUsed,setOpAttack)} pop={true} poptip={propsInfo[2].intro} text={isPPUsed ? "0" : "1"} img={propsImg[2]} size='small'></Block>
          </div>
        )}

        <div className='f-right flex-around-center-wrap'>
          <Button size='small' onClick={setType.bind(this, true)}>
            技能
          </Button>
          <Button size='small' onClick={setType.bind(this, false)}>
            道具
          </Button>
          <Button size='small' onClick={navigate.bind(this,props.history,'确定要逃跑吗？','/game')}>
            逃跑
          </Button>
        </div>
      </div>

      {/* 遮罩 */}
      <div
        className='p-mask'
        style={{ display: isMask ? 'block' : 'none' }}
      ></div>
    </div>
  )
}
