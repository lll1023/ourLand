import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import Block from '../../components/Block';
import SpiritBag from '../../components/SpiritBag';
import PropsBag from "../../components/PropsBag";

// 进入游戏之后的页面
export default function Main (props) {
  let [isSpiritBagShow, setSBShow] = useState(false);
  let [isPropsBagShow,setPBShow] = useState(false);
  return (
    <div className='main-container flex-between-stretch-col'>
      <div className='main-header flex-end-center'>
        <Link to='/user'>
          <Block
            img={require('../../assets/images/icons/avatar.jpg').default}
            size='small'
          />
        </Link>
      </div>
      <div className='main-content flex-around-center'>
        <Link to='adventure'>
          <Block
            img={require('../../assets/images/icons/adventure.jpg').default}
            size='big'
            text='冒险'
          />
        </Link>
        <Link to='fight'>
          <Block
            img={require('../../assets/images/icons/ring.jpg').default}
            size='big'
            text='训练'
          />
        </Link>
        <Link to='fight'>
          <Block
            img={require('../../assets/images/icons/catch.jpg').default}
            size='big'
            text='探索'
          />
        </Link>
      </div>
      <div className='main-footer flex-end-center'>
          <Block
            img={require('../../assets/images/icons/pet.png').default}
            size='small'
            onClick={setSBShow.bind(this,true)}
          />

          <Block
            img={require('../../assets/images/icons/bag.png').default}
            size='small'
            onClick={setPBShow.bind(this,true)}
          />
      </div>


      {/* 宠物面板 */}
      {
        isSpiritBagShow ? <SpiritBag onClick={setSBShow.bind(this,false)}/> : null
      }

      {/* 道具面板 */}
      {
        isPropsBagShow ? <PropsBag onClick={setPBShow.bind(this,false)}/> : null
      }
    </div>
  )
}
