import React from 'react'
import './index.css'
import Button from '../Button'
import spiritsImg from '../../data/spiritsImg'
import { getFight,navigate } from '../../utils/utils'
import { message } from 'antd'
import { withRouter } from 'react-router'

function StoryPanel (props) {
  let { close, name, story, id } = props
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  function toFight () {
    let hide = message.loading('正在加载战斗信息...')
    getFight(userInfo.id, id + 15).then(res => {
      hide()
      if (res.data.status == 200) {
        localStorage.setItem('opponent', JSON.stringify(res.data.data.bossInfo));
        localStorage.setItem('mySpirit', JSON.stringify(res.data.data.userInfo));
        message.success('加载成功！进入战斗中...')
        navigate(props.history,"确认挑战这个boss吗？",'/fight');
      } else {
        message.error(res.data.message)
      }
    })
  }
  return (
    <div className='sp-container flex-start-stretch-col'>
      <div className='sp-header flex-end-center' onClick={close}>
        X
      </div>
      <div className='sp-content flex-center-center'>
        <div className='sp-left flex-center-center'>
          <img src={spiritsImg[id + 15]} alt='' />
        </div>
        <div className='sp-right flex-between-center-col'>
          <div className='sp-title'>{name}</div>
          <div className='sp-story'>{story}</div>
          <Button onClick={toFight} size='small'>
            开始挑战
          </Button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(StoryPanel)
