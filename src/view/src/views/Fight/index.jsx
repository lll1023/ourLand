import React, { useState } from 'react'
import './index.css'
import Blood from '../../components/Blood'
import Button from '../../components/Button'
import Block from '../../components/Block'
import ReactAudioPlayer from 'react-audio-player'
import propsImg from '../../data/propsImg'
import propsInfo from '../../data/propsInfo'
import spiritsImg from '../../data/spiritsImg'
import { navigate } from '../../utils/utils'

// 战斗界面

export default function Fight (props) {
  const opponent = JSON.parse(localStorage.getItem('opponent'))
  const mySpirit = JSON.parse(localStorage.getItem('mySpirit'))
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
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
  let [isPropUsed, setPropUsed] = useState([false, false, false])

  // 精灵信息
  let [mybld, setMybld] = useState(mySpirit[0].blood)
  // let [myatk, setMyatk] = useState(mySpirit[0].attack)
  // let [mydfc, setMydfc] = useState(mySpirit[0].defence)
  let [myatk, setMyatk] = useState(5)
  let [mydfc, setMydfc] = useState(5)
  let [myspd, setMyspd] = useState(mySpirit[0].speed)

  let [opbld, setOpbld] = useState(opponent.blood)
  // let [opatk, setOpatk] = useState(opponent.attack)
  // let [opdfc, setOpdfc] = useState(opponent.defence)
  let [opatk, setOpatk] = useState(10)
  let [opdfc, setOpdfc] = useState(10)
  let [opspd, setOpspd] = useState(opponent.speed)

  // 技能相关
  // 数量
  let originTimes = [
    mySpirit[0].skills[0].times,
    mySpirit[0].skills[1].times,
    mySpirit[0].skills[2].times,
    mySpirit[0].skills[3].times
  ]
  let [times, setTimes] = useState(originTimes)

  // 技能使用记录
  let [skillLog, setLog] = useState('')

  // 计算伤害值
  /**
   *
   * @param {} hurt 伤害值
   * @param {*} my_attack 攻击方的attack
   * @param {*} op_defence 防御方的defence
   * @param {*} base 基准值
   */
  function calHurt (hurt, my_attack, op_defence, base) {
    if (hurt <= 0) return 0
    return hurt * my_attack - op_defence * base
  }

  // 精灵使用技能
  function useSkill (myskillIdx, opskillIdx) {
    // 设置遮罩
    setMask(true)
    // 我方攻击
    let newTimes = [...times]
    newTimes[myskillIdx]--
    setTimes(newTimes)
    setMyAttack(true)
    setTimeout(() => {
      setMyAttack(false)
      let hurt = calHurt(3, myatk, mydfc, 15)
      setOpbld(hurt < opbld ? opbld - hurt : 0)
    }, 2000)

    // 敌方攻击,延迟执行
    setTimeout(() => {
      setOpEnhance(true)
      setTimeout(() => {
        setOpEnhance(false)
        let hurt = calHurt(3, opatk, opdfc, 15)
        console.log(hurt)
        setMybld(hurt < mybld ? mybld - hurt : 0)
      }, 2000)
      setLog(
        `<li>敌方精灵使用了【${opponent.skills[opskillIdx].name}】</li>` +
          `<li>我方精灵使用了【${mySpirit[0].skills[myskillIdx].name}】</li>` +
          skillLog
      )
      setMask(false)
    }, 4000)
  }

  function useProp (idx, opSkillIdx) {}

  // UI
  return (
    <div className='f-container flex-between-center-col'>
      <ReactAudioPlayer
        autoPlay
        src={require('../../assets/audios/adventure.mp3').default}
        loop
      />
      <div className='f-blood flex-around-center'>
        <Blood
          name={`${mySpirit[0].name}(${mySpirit[0].nature})`}
          direction='left'
          rate={userInfo.exp / 100}
          all={mySpirit[0].blood}
          cur={mybld}
        />
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
          name={`${opponent.name}(${opponent.nature})`}
          rate={opponent.type === 'boss' ? '???' : userInfo.exp / 100}
          all={opponent.blood}
          cur={opbld}
        />
      </div>
      <div className='f-move flex-between-center'>
        <div className={myAttack ? 'my-attack' : myEnhance ? 'my-enhance' : ''}>
          <img
            className='spirit s-left'
            alt=''
            src={spiritsImg[mySpirit[0].id]}
          />
        </div>
        <div className={opAttack ? 'op-attack' : opEnhance ? 'op-enhance' : ''}>
          <img
            alt=''
            className='spirit s-right'
            src={spiritsImg[opponent.id]}
          />
        </div>
      </div>
      <div className='f-panel flex-between-center'>
        <div
          className='f-log'
          dangerouslySetInnerHTML={{ __html: skillLog }}
        ></div>
        {Ptype ? (
          // 技能面板
          <div className='f-left flex-around-center-wrap'>
            {mySpirit[0].skills.map((item, idx) => {
              return (
                <Button
                  onClick={
                    times[idx] > 0
                      ? useSkill.bind(this, idx, parseInt(Math.random() * 4))
                      : null
                  }
                  size='small'
                  pop='true'
                  poptip={item.description}
                >
                  {`${item.name}(${times[idx]})`}
                </Button>
              )
            })}
          </div>
        ) : (
          // 道具界面
          <div className='f-left flex-around-center-wrap'>
            {[0, 1, 2].map(item => {
              return (
                <Block
                  onClick={useProp.bind(
                    this,
                    item,
                    parseInt(Math.random() * 4)
                  )}
                  pop={true}
                  poptip={propsInfo[item].intro}
                  text={isPropUsed[item] ? '0' : '1'}
                  img={propsImg[item]}
                  size='small'
                ></Block>
              )
            })}
          </div>
        )}

        <div className='f-right flex-around-center-wrap'>
          <Button size='small' onClick={setType.bind(this, true)}>
            技能
          </Button>
          <Button size='small' onClick={setType.bind(this, false)}>
            道具
          </Button>
          <Button
            size='small'
            onClick={navigate.bind(
              this,
              props.history,
              '确定要逃跑吗？',
              '/game'
            )}
          >
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
