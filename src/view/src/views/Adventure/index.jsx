import React, {  useState } from 'react'
import './index.css'
import Block from '../../components/Block'
import StoryPanel from '../../components/StoryPanel'
import { Link } from 'react-router-dom'
import adventure from '../../data/adventure'
import ReactAudioPlayer from 'react-audio-player'
import adventures from '../../data/adventure'
import levelImgs from "../../data/levelImgs";
// 冒险页面
export default function Adventure (props) {
  const [isShow,setShow] = useState(false);
  const [level_info,setLevelInfo] = useState(adventures[0]);
  function switchLevel(id) {
    setLevelInfo(adventure[id]);
    setShow(true);
  }
  return (
    <div className='adventure-container flex-start-stretch-col'>
      <ReactAudioPlayer autoPlay src={require("../../assets/audios/adventure.mp3").default} loop/>
      <div className='main-header flex-between-center'>
        <Link to="/game" className="return"><svg t="1637583937747" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2611" width="40" height="40"><path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m158.4 674.4L625.6 784l-272-272 272-272 45.6 45.6L444 512l226.4 226.4z" p-id="2612" fill="#ffffff"></path></svg></Link>
      </div>
      <div className='adventure-content'>
        {adventure.map((item,idx) => (
          <Block
            className='adv-item'
            img={levelImgs[idx]}
            key={item.id}
            size='big'
            text={item.name}
            onClick={switchLevel.bind(this,idx)}
          ></Block>
        ))}
      </div>
      {isShow ? <StoryPanel close={setShow.bind(this,false) } name={level_info.name} story={level_info.story} id={level_info.id}/> : null}
    </div>
  )
}
