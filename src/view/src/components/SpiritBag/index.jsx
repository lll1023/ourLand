import React, { useState } from 'react'
import './index.css'
import Block from '../Block';
import Button from "../Button"

export default function SpiritBag (props) {
  const { onClick } = props;
  const [selected,setSelect] = useState(require("../../assets/images/spirit/2.png").default);
  function switchSpirit(img) {
    setSelect(img);
  }
  return (
    <div className='sb-container flex-start-stretch-col'>
      <div className='sp-header flex-end-center' onClick={onClick}>
        X
      </div>
      <div className='flex-around-center'>
        <div className='sb-left flex-around-center-wrap'>
          <Block onClick={switchSpirit.bind(this,require("../../assets/images/spirit/2.png").default)} text='' img={require("../../assets/images/spirit/2.png").default} size='medium'></Block>
          <Block onClick={switchSpirit.bind(this,require("../../assets/images/spirit/1.png").default)} text='' img={require("../../assets/images/spirit/1.png").default} size='medium'></Block>
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
        <div className='sb-right flex-between-center-col'>
          <div className='sb-title'>精灵名称</div>
          <div className='sb-img'>
            <img src={selected} alt="" />
          </div>
          <div className="sb-props flex-center-center-wrap">
              <div className="sb-prop">攻击：100</div>
              <div className="sb-prop">防御：100</div>
              <div className="sb-prop">血量：100</div>
              <div className="sb-prop">速度：100</div>
              <div className="sb-prop">属性：草</div>
              <div className="sb-prop">攻击：100</div>
          </div>
          <div className="sb-panel">
              <Button size="small">出战</Button>
          </div>
        </div>
      </div>
    </div>
  )
}