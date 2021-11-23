import React, { Component } from 'react';
import "./index.css"

function Button(props) {
    let {size,children,onClick} = props;
    let btn_w,btn_h;
    switch(size) {
        case "medium" : {
            btn_w = 400;
            btn_h = 200;
            break;
        }
        default : {
            btn_w = 200;
            btn_h = 100;
        }
    }
    return (
        <button onClick={onClick} className="btn" style={{width : btn_w,height : btn_h}}>
            {children}
        </button>
    )
}

export default Button;