import React, { useState } from 'react'
import './index.css'
import Block from '../Block'
import Button from '../Button'
import spiritsImg from '../../data/spiritsImg'

import { Spirit } from '../../utils/api'
import { message } from 'antd'

export default function SpiritBag (props) {
  const { onClick } = props
  const [selected, setSelect] = useState(spiritsImg[1])
  const [sp_info, setInfo] = useState()
  // 出战
  const [readySp,setReadySp] = useState(JSON.parse(localStorage.getItem('ready')).id);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const spirits = userInfo.spirits_bag;
  // 切换精灵
  function switchSpirit (img, id) {
    setSelect(img)
    let hide = message.loading("获取信息中...");
    let data = new FormData()
    data.append('id', id)
    Spirit.getSpiritById(data).then(res => {
      hide();
      if (res.data.status == 200) {
        let info = res.data
        setInfo(info.data)
      } else {
        message.error(res.data.message)
      }
    })
  }

  // 设置精灵
  function setReady(id) {
    let flag = window.confirm('确定设置为出战精灵吗？');
    if(flag) {
      localStorage.setItem('ready',JSON.stringify(sp_info));
      setReadySp(id)
    }
  }

  return (
    <div className='sb-container flex-start-stretch-col'>
      <div className='sp-header flex-end-center' onClick={onClick}>
        X
      </div>
      <div className='flex-around-center'>
        <div className='sb-left flex-around-center-wrap'>
          {spirits.map((item,idx)=> {
            return (
              <Block
                key={item}
                onClick={switchSpirit.bind(this, spiritsImg[item], item)}
                text={item == readySp ? '战' : ''}
                img={spiritsImg[item]}
                size='medium'
                key={idx}
              ></Block>
            )
          })}
        </div>
        <div className='sb-right flex-between-center-col'>
          {sp_info ? (
            <>
              <div className='sb-title' style={{ color : sp_info.isRare === 0 ? 'black' : 'gold' }}>{sp_info.isRare === 1 ? `${sp_info.name}(稀有)` : sp_info.name}</div>
              <div className='sb-img'>
                <img src={selected} alt='' />
              </div>
              <div className='sb-props flex-between-center-wrap'>
                <div className='sb-prop'>ID：{sp_info.id}</div>
                <div className='sb-prop'>属性：{sp_info.nature}</div>
                <div className='sb-prop'>攻击：{sp_info.attack}</div>
                <div className='sb-prop'>防御：{sp_info.defence}</div>
                <div className='sb-prop'>血量：{sp_info.blood}</div>
                <div className='sb-prop'>速度：{sp_info.speed}</div>
              </div>
              <div className='sb-props '>
                {sp_info.skills.map((item, idx) => {
                  return (
                    <Button size='small' pop='true' poptip={item.description} key={idx}>
                      {item.name}
                    </Button>
                  )
                })}
              </div>
              <div className='sb-panel'>
                <Button size='small' onClick={setReady.bind(this,sp_info.id)}>出战</Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
