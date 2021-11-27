import React from 'react'
import './index.css'

// 血条
export default function Blood (props) {
  let { direction, rate, all, cur, name, isRare } = props
  let rest = parseInt((cur / all) * 100)
  return (
    <div className='blood-container flex-between-center-col'>
      <div className='blood-all'>
        {/* 血条方向不同 */}
        <div
          className='blood-cur'
          style={
            direction === 'left'
              ? { transform: `translateX(-${100 - rest}%)` }
              : { transform: `translateX(${100 - rest}%)` }
          }
        ></div>
      </div>
      <div className='blood-info flex-between-center'>
        <span
          className='bld-title'
          style={{ color: isRare === 0 ? 'white' : 'gold' }}
        >
          {name}
        </span>
        <span>LV.{rate}</span>
        <span>
          {cur}/{all}
        </span>
      </div>
    </div>
  )
}
