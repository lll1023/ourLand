import React, { useState } from 'react'
import './index.css'
import Block from '../Block';
import Button from "../Button"
import spiritsImg from "../../data/spiritsImg"

import {Spirit} from "../../utils/api"
import { message } from 'antd';

export default function SpiritBag (props) {
  const { onClick } = props;
  const [selected,setSelect] = useState(spiritsImg[1]);
  const [sp_info,setInfo] = useState({});
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  console.log(userInfo);
  const spirits = userInfo.spirits_bag;
  function switchSpirit(img,id) {
    setSelect(img);
    let data = new FormData();
    data.append("id",id);
    Spirit.getSpiritById(data).then(res => {
      if(res.data.status == 200) {
        let info = res.data;
        setInfo(info.data);
      }else {
        message.error(res.data.message);
      }
    })
  }
  return (
    <div className='sb-container flex-start-stretch-col'>
      <div className='sp-header flex-end-center' onClick={onClick}>
        X
      </div>
      <div className='flex-around-center'>
        <div className='sb-left flex-around-center-wrap'>
          {
            spirits.map((item) => {
                return <Block key={item} onClick={switchSpirit.bind(this,spiritsImg[item],item)} text='' img={spiritsImg[item]} size='medium'></Block>
            })
          }
        </div>
        <div className='sb-right flex-between-center-col'>
          <div className='sb-title'>{sp_info.name}</div>
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
