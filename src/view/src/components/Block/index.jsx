import React from 'react';
import "./index.css"
export default function Block(props) {
    let {size,img,children} = props;
    let w,h;
    switch(size) {
        case 'small': {
            [w,h] = [80,80];
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
        <div className="block" style={{backgroundImage: `url(${img})`,width: w,height:h}}>
            {children}
        </div>
    )
}