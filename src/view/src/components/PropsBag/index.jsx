import React, {useState} from 'react'
import './index.css'
import Block from '../Block'
export default function PropsBag (props) {
  const { onClick } = props
  const [selected, setSelect] = useState(
    require('../../assets/images/spirit/2.png').default
  )
  function switchSpirit (img) {
    setSelect(img)
  }
  return (
    <div className='sb-container flex-start-stretch-col'>
      <div className='sp-header flex-end-center' onClick={onClick}>
        X
      </div>
      <div className='flex-around-center'>
        <div className='sb-left flex-around-center-wrap'>
          <Block
            onClick={switchSpirit.bind(
              this,
              require('../../assets/images/spirit/2.png').default
            )}
            text=''
            img={require('../../assets/images/spirit/2.png').default}
            size='medium'
          ></Block>
          <Block
            onClick={switchSpirit.bind(
              this,
              require('../../assets/images/spirit/1.png').default
            )}
            text=''
            img={require('../../assets/images/spirit/1.png').default}
            size='medium'
          ></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
          <Block text='' size='medium'></Block>
        </div>
        <div className='sb-right flex-around-center-col'>
          <div className='sb-title'>道具名称</div>
          <div className='sb-img'>
            <img src={selected} alt='' />
          </div>
          <div className='sb-props flex-center-center-wrap'>
              效果：技能使用次数加10
          </div>
        </div>
      </div>
    </div>
  )
}
