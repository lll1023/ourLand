import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import Block from '../../components/Block'

export default class Main extends Component {
  render () {
    return (
      <div className='main-container flex-between-stretch-col'>
        <div className='main-header flex-end-center'>
          <Link to='user'>
            <Block
              img={require('../../assets/images/icons/avatar.jpg').default}
              size="small"
            />
          </Link>
        </div>
        <div className='main-content flex-around-center'>
        <Link to='user'>
            <Block
              img={require('../../assets/images/icons/adventure.jpg').default}
              size="big"
            />
          </Link>
        <Link to='user'>
            <Block
              img={require('../../assets/images/icons/ring.jpg').default}
              size="big"
            />
          </Link>
        <Link to='user'>
            <Block
              img={require('../../assets/images/icons/catch.jpg').default}
              size="big"
            />
          </Link>
        </div>
        <div className='main-footer flex-end-center'>
          <Link to='collect'>
            <Block
              img={require('../../assets/images/icons/book.png').default}
              size="small"
            />
          </Link>
          <Link to='pets'>
            <Block
              img={require('../../assets/images/icons/pet.png').default}
              size="small"
            />
          </Link>
          <Link to='bag'>
            <Block
              img={require('../../assets/images/icons/bag.png').default}
              size="small"
            />
          </Link>
        </div>
      </div>
    )
  }
}
