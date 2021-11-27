import React from 'react'
import './index.css'
import { Popover } from 'antd'

function Button (props) {
  let { size, children, onClick, pop,poptip } = props
  let btn_w, btn_h
  switch (size) {
    case 'medium': {
      btn_w = 400
      btn_h = 200
      break
    }
    case 'small': {
      btn_w = 100
      btn_h = 40
      break
    }
    case 'skill': {
      btn_w = 200
      btn_h = 80
      break
    }

    default: {
      btn_w = 200
      btn_h = 100
    }
  }
  return pop ? (
    <Popover content={poptip} trigger='hover'>
        <button onClick={onClick} className="btn" style={{width : btn_w,height : btn_h}}>
            {children}
        </button>
    </Popover>
  ) : (
    <button
      onClick={onClick}
      className='btn'
      style={{ width: btn_w, height: btn_h }}
    >
      {children}
    </button>
  )
}

export default Button
