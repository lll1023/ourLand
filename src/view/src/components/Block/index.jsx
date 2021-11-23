import React from 'react';
import "./index.css"
export default function Block(props) {
    let {size,img,text,onClick} = props;
    let w,h;
    switch(size) {
        case 'small': {
            [w,h] = [80,80];
            break;
        }
        case 'mid': {
            [w,h] = [150,150];
            break;
        }
        case 'big' : {
            [w,h] = [200,200];
            break;
        }
        default :{
            [w,h] = [100,100];
        }
    }
    return (
        <div onClick={onClick} className="block flex-center-center" style={{backgroundImage: `url(${img})`,width: w,height:h}}>
            {text ? <div className="block-text">{text}</div> : null}
        </div>
    )
}