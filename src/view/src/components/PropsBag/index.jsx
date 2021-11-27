import React, { useState } from 'react'
import './index.css'
import Block from '../Block'
import imgs from '../../data/propsImg'
import propsInfo from '../../data/propsInfo'
export default function PropsBag (props) {
  const { onClick } = props
  const [selected, setSelect] = useState(
    require('../../assets/images/props/ball.png').default
  )
  const [prop, setProp] = useState({
    name: '精灵球',
    intro: '捕捉野生精灵，捕捉率为30%'
  })

  function switchSpirit (img, name, intro) {
    setSelect(img)
    setProp({ name, intro })
  }
  return (
    <div className='sb-container flex-start-stretch-col'>
      <div className='sp-header flex-end-center' onClick={onClick}>
        X
      </div>
      <div className='flex-around-center'>
        <div className='sb-left flex-around-center-wrap'>
          {[0, 1, 2].map((item) => {
            return (
              <Block
                onClick={switchSpirit.bind(
                  this,
                  imgs[item],
                  propsInfo[item].name,
                  propsInfo[item].intro
                )}
                text=''
                img={imgs[item]}
                size='medium'
              ></Block>
            )
          })}
        </div>
        <div className='sb-right flex-around-center-col'>
          <div className='sb-title'>{prop.name}</div>
          <div className='sb-img'>
            <img src={selected} alt='' />
          </div>
          <div className='sb-props flex-center-center-wrap'>
            效果：{prop.intro}
          </div>
        </div>
      </div>
    </div>
  )
}
