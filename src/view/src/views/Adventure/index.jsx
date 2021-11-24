import React, { Component, useState } from 'react'
import './index.css'
import Block from '../../components/Block'
import StoryPanel from '../../components/StoryPanel'
import { Link } from 'react-router-dom'
import adventure from '../../utils/adventure'


// 冒险页面
export default function Adventure (props) {
  const [isShow,setShow] = useState(false);
  return (
    <div className='adventure-container flex-start-stretch-col'>
      <div className='main-header flex-between-center'>
        <Link to="/game" className="return"><svg t="1637583937747" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2611" width="40" height="40"><path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m158.4 674.4L625.6 784l-272-272 272-272 45.6 45.6L444 512l226.4 226.4z" p-id="2612" fill="#ffffff"></path></svg></Link>
        <Link to='/user'>
          <Block
            img={require('../../assets/images/icons/avatar.jpg').default}
            size='small'
          />
        </Link>
      </div>
      <div className='adventure-content'>
        {adventure.map(item => (
          <Block
            className='adv-item'
            img={require('../../assets/images/icons/adventure.jpg').default}
            key={item.id}
            size='big'
            text={item.name}
            onClick={setShow.bind(this,true)}
          ></Block>
        ))}
      </div>
      {isShow ? <StoryPanel close={setShow.bind(this,false)}/> : null}
    </div>
  )
}
