import React from 'react';
import "./index.css";
import Button from "../Button"

function StoryPanel(props) {
    let {close} = props;
    return (
        <div className="sp-container flex-start-stretch-col">
            <div className="sp-header flex-end-center" onClick={close} >
                X
            </div>
            <div className="sp-content flex-center-center">
                <div className="sp-left">
                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D7d3b43bbae773912c4738d65cd29aa2e%2F71cf3bc79f3df8dc5a388a97ca11728b471028aa.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640174499&t=7f601ab11df570725d86bb366c4f31c7" alt="" />
                </div>
                <div className="sp-right flex-between-center-col">
                    <div className="sp-title">森林污染</div>
                    <div className="sp-story">森林幻想神，是地球森林的守护者，因人类的过度砍伐，导致全世界的森林面积急剧减少，居住在森林中的动物们都无家可归，逐渐灭迹，因此，森林守护神出现了。</div>
                    <Button size="small">开始挑战</Button>
                </div>
            </div>
        </div>
    )
}

export default StoryPanel