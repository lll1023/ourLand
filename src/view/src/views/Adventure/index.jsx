import React, { Component } from 'react'
import './index.css'
import Block from '../../components/Block'
import StoryPanel from '../../components/StoryPanel'
import { Link } from 'react-router-dom'
import adventure from '../../utils/adventure'

// 冒险页面
export default class Adventure extends Component {
  render () {
    return (
      <div className='adventure-container flex-start-stretch-col'>
        <div className='main-header flex-end-center'>
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
              className="adv-item"
              img={require('../../assets/images/icons/adventure.jpg').default}
              key={item.id}
              size='big'
              text={item.name}
            ></Block>
          ))}
        </div>
        <StoryPanel />
      </div>
    )
  }
}
