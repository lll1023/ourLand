import React, { useState, useEffect } from "react";
import "./index.css";
import { message } from "antd";
import { withRouter } from "react-router";
import { Fight } from "../../utils/api";
import Blood from "../../components/Blood";
import Button from "../../components/Button";
import Block from "../../components/Block";
import ReactAudioPlayer from "react-audio-player";
import propsImg from "../../data/propsImg";
import propsInfo from "../../data/propsInfo";
import spiritsImg from "../../data/spiritsImg";
import { navigate, getRestrain } from "../../utils/utils";
// 战斗界面

function FightC(props) {
  const opponent = JSON.parse(localStorage.getItem("opponent"));
  const readySp = JSON.parse(localStorage.getItem("ready"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const origin_blood = readySp.blood + (userInfo.exp / 100) * 6;
  const oppnent_blood =
    opponent.type !== "boss"
      ? opponent.blood + (userInfo.exp / 100) * 6
      : opponent.blood;
  const my_level = userInfo.exp / 100;
  const opponent_level = opponent.type !== "boss" ? my_level : 100;

  // 捕捉概率
  const catch_p =
    opponent.type === "boss" ? 0 : opponent.type === "稀有" ? 10 : 30;

  // 克制系数的计算
  const my_base = getRestrain(readySp.nature, opponent.nature);
  const opponent_base = getRestrain(opponent.nature, readySp.nature);

  // 是否遮罩
  let [isMask, setMask] = useState(false);
  // 面板类型
  let [Ptype, setType] = useState(true);

  // 动画
  let [myAttack, setMyAttack] = useState(false);
  let [opAttack, setOpAttack] = useState(false);
  let [myEnhance, setMyEnhance] = useState(false);
  let [opEnhance, setOpEnhance] = useState(false);
  let [myCatch, setMyCatch] = useState(false);

  // 道具数量
  let [isPropUsed, setPropUsed] = useState([3, 3, 3]);

  // 精灵信息
  let [mybld, setMybld] = useState(origin_blood);
  let [myatk, setMyatk] = useState(readySp.attack);
  let [mydfc, setMydfc] = useState(readySp.defence);
  let [myspd, setMyspd] = useState(readySp.speed);

  let [opbld, setOpbld] = useState(oppnent_blood);
  let [opatk, setOpatk] = useState(opponent.attack);
  let [opdfc, setOpdfc] = useState(opponent.defence);
  let [opspd, setOpspd] = useState(opponent.speed);


  // 开始场景
  let [isStart,setStart] = useState(false);

  // 定时器
  var timer = null;
  useEffect(() => {
    if (timer) return;
    timer = setInterval(() => {
      checkIfOver();
    }, 1000);
    setTimeout(() => {
      setStart(true)
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  });

  // 技能相关
  // 数量
  let originTimes = [
    readySp.skills[0].times,
    readySp.skills[1].times,
    readySp.skills[2].times,
    readySp.skills[3].times,
  ];
  let [times, setTimes] = useState(originTimes);

  // 技能使用记录
  let [skillLog, setLog] = useState("");

  // 计算伤害值
  /**
   *
   * @param {} hurt 伤害值
   * @param {*} my_attack 攻击方的attack
   * @param {*} op_defence 防御方的defence
   * @param {*} base 克制系数
   */
  function calHurt(lv, hurt, my_attack, op_defence, base) {
    let p1 = lv * 0.4 + 2;
    let p2 = p1 * hurt * my_attack;
    let p3 = p2 / op_defence / 50 + 2;
    let p4 = p3 * 1.2 * base;
    let random = (Math.random() * (255 - 217) + 217) / 255;
    let res = parseInt(p4 * random);
    console.log(p1, p2, p3, p4, random);
    console.log(res);
    return res > 0 ? res : 0;
  }

  // 检查游戏是否结束
  function checkIfOver() {
    if (opbld <= 0) {
      clearInterval(timer);
      alert("恭喜您胜利了！");
      saveResult(true, false);
    } else if (mybld <= 0) {
      clearInterval(timer);
      alert("失败！再去提升一下等级吧！");
      saveResult(false, false);
    }
  }

  // 使用伤害型技能
  /**
   *
   * @param {*} role true为我方，false为对方
   */
  function hurtSkill(role, skillIdx) {
    if (role) {
      // 我方攻击
      let newTimes = [...times];
      newTimes[skillIdx]--;
      setTimes(newTimes);
      // 播放动画
      setMyAttack(true);
      let baseHurt = parseInt(
        readySp.skills[skillIdx].description.split("威力")[1]
      );
      let hurt = calHurt(my_level, baseHurt, myatk, mydfc, my_base);
      if (hurt == 0) {
        message.warning("我方伤害太低啦！用属性提升技能提升攻击！");
      }
      setOpbld(opbld - hurt < 0 ? 0 : opbld - hurt);
      // checkIfOver();
      setTimeout(() => {
        setMyAttack(false);
      }, 2000);
    } else {
      // 敌方攻击
      setOpAttack(true);
      let baseHurt = parseInt(
        opponent.skills[skillIdx].description.split("威力")[1]
      );
      let hurt = calHurt(opponent_level, baseHurt, opatk, opdfc, opponent_base);
      setMybld(mybld - hurt < 0 ? 0 : mybld - hurt);
      // checkIfOver();
      setTimeout(() => {
        setOpAttack(false);
      }, 2000);
    }
  }

  // 使用增益型技能
  function enhanceSkill(role, skillIdx) {
    if (role) {
      // 我方增强
      let newTimes = [...times];
      newTimes[skillIdx]--;
      setTimes(newTimes);
      setMyEnhance(true);
      let skill = readySp.skills[skillIdx].description;
      if (skill.indexOf("全属性") == -1) {
        let effects = skill.split(",");
        effects.map((item) => {
          let map = item.split("+");
          if (map[0] == "攻击") {
            setMyatk(myatk + parseInt(map[1]));
          } else if (map[0] == "防御") {
            setMydfc(mydfc + parseInt(map[1]));
          } else if (map[0] == "速度") {
            setMyspd(myspd + parseInt(map[1]));
          }
        });
      } else {
        // 全属性提升
        setMyatk(myatk + 1);
        setMydfc(mydfc + 1);
        setMyspd(myspd + 1);
      }
      setTimeout(() => {
        setMyEnhance(false);
      }, 2000);
    } else {
      // 敌方增强
      setOpEnhance(true);
      let skill = opponent.skills[skillIdx].description;
      if (skill.indexOf("全属性") == -1) {
        let effects = skill.split(",");
        effects.map((item) => {
          let map = item.split("+");
          if (map[0] == "攻击") {
            setOpatk(opatk + parseInt(map[1]));
          } else if (map[0] == "防御") {
            setOpdfc(opdfc + parseInt(map[1]));
          } else if (map[0] == "速度") {
            setOpspd(opspd + parseInt(map[1]));
          }
        });
      } else {
        // 全属性提升
        setOpatk(opatk + 1);
        setOpdfc(opdfc + 1);
        setOpspd(opspd + 1);
      }
      setTimeout(() => {
        setOpEnhance(false);
      }, 2000);
    }
  }

  // 精灵使用技能
  function useSkill(myskillIdx, opskillIdx) {
    // 设置遮罩
    setMask(true);
    // 判断敌我速度
    console.log(myspd, opspd);
    if (myspd >= opspd) {
      // 我方操作
      if (readySp.skills[myskillIdx].type === "伤害型") {
        hurtSkill(true, myskillIdx);
      } else {
        enhanceSkill(true, myskillIdx);
      }

      // 敌方操作,延迟执行
      setTimeout(() => {
        if (opponent.skills[opskillIdx].type === "伤害型") {
          hurtSkill(false, opskillIdx);
        } else {
          enhanceSkill(false, opskillIdx);
        }
        setLog(
          `<li>敌方精灵使用了【${opponent.skills[opskillIdx].name}】,${opponent.skills[opskillIdx].description}</li>` +
            `<li>我方精灵使用了【${readySp.skills[myskillIdx].name}】,${readySp.skills[myskillIdx].description}</li>` +
            skillLog
        );
        setMask(false);
      }, 4000);
    } else {
      // 敌方操作
      if (opponent.skills[opskillIdx].type === "伤害型") {
        hurtSkill(false, opskillIdx);
      } else {
        enhanceSkill(false, opskillIdx);
      }

      // 我方操作,延迟执行
      setTimeout(() => {
        if (readySp.skills[myskillIdx].type === "伤害型") {
          hurtSkill(true, myskillIdx);
        } else {
          enhanceSkill(true, myskillIdx);
        }
        setLog(
          `<li>我方精灵使用了【${readySp.skills[myskillIdx].name}】,${readySp.skills[myskillIdx].description}</li>` +
            `<li>敌方精灵使用了【${opponent.skills[opskillIdx].name}】,${opponent.skills[opskillIdx].description}</li>` +
            skillLog
        );
        setMask(false);
      }, 4000);
    }
  }

  // 我方使用道具
  function useProp(idx, opskillIdx) {
    let newUsed = [...isPropUsed];
    newUsed[idx]--;
    setPropUsed(newUsed);
    // 设置遮罩
    setMask(true);
    let propname = "";
    // 我方操作
    if (idx == 1) {
      propname = "血包";
      setMyEnhance(true);
      setTimeout(() => {
        setMyEnhance(false);
        setMybld(origin_blood);
        setMask(false);
      }, 2000);
      return;
    } else if (idx == 2) {
      propname = "补给";
      setMyEnhance(true);
      setTimeout(() => {
        setMyEnhance(false);
        setTimes(originTimes);
      }, 2000);
    } else {
      // 捕捉精灵
      propname = "精灵球";
      setMyCatch(true);
      let isCatch = Math.random() * 100 < catch_p;
      setTimeout(() => {
        setMyCatch(false);
        if (isCatch) {
          message.success("捉到啦!");
          saveResult(false, true);
        } else {
          message.error("捕捉失败！");
        }
      }, 2000);
    }

    // 敌方操作，延迟执行
    setTimeout(() => {
      if (opponent.skills[opskillIdx].type === "伤害型") {
        hurtSkill(false, opskillIdx);
      } else {
        enhanceSkill(false, opskillIdx);
      }

      setLog(
        `<li>敌方精灵使用了【${opponent.skills[opskillIdx].name}】</li>` +
          `<li>我方精灵使用了【${propname}】</li>` +
          skillLog
      );
      setMask(false);
    }, 4000);
  }

  // 保存战斗结果
  /**
   *
   * @param {*} isWin 是否胜利
   * @param {*} isCatch 是否捕捉
   */
  function saveResult(isWin, isCatch) {
    let data = new FormData();
    data.append("userId", userInfo.id);
    data.append("bossId", opponent.id);
    data.append("isWin", isWin);
    data.append("isCatch", isCatch);
    Fight.saveFightRes(data).then((res) => {
      if (res.data.status === 200) {
        if (isCatch) {
          message.success("恭喜您捕捉到新的精灵！去背包看看吧！");
        }
      } else {
        message.error(res.data.message);
      }
      props.history.push({
        pathname: "/game",
      });
    });
  }

  // UI
  return (
    <div className={isStart ? "f-container flex-between-center-col" : "f-container flex-between-center-col start-scene"}>
      <ReactAudioPlayer
        autoPlay
        src={require("../../assets/audios/adventure.mp3").default}
        loop
      />
      <div className="f-blood flex-around-center">
        <Blood
          name={`${readySp.name}(${readySp.nature})`}
          direction="left"
          rate={userInfo.exp / 100}
          all={origin_blood}
          cur={mybld}
          isRare={readySp.isRare}
          attack={myatk}
          defence={mydfc}
          speed={myspd}
        />
        <svg
          t="1637586215597"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3842"
          width="50"
          height="50"
        >
          <path
            d="M427.52 323.84C410.88 318.08 392.96 327.04 387.84 343.68L290.56 634.88 193.28 343.68c-5.76-16.64-23.68-25.6-40.32-19.84-16.64 5.76-25.6 23.68-19.84 40.32l127.36 381.44c4.48 12.8 16.64 21.76 30.08 21.76s25.6-8.96 30.08-21.76L448 364.16C453.76 347.52 444.16 329.6 427.52 323.84zM480 64C215.04 64 0 279.04 0 544 0 808.96 215.04 1024 480 1024c264.96 0 480-215.04 480-480C960 279.04 744.96 64 480 64zM480 960C250.24 960 64 773.76 64 544 64 314.24 250.24 128 480 128 709.76 128 896 314.24 896 544 896 773.76 709.76 960 480 960zM608.64 385.92c56.32 0 95.36 26.24 95.36 63.36 0 17.28 14.08 32 32 32 17.92 0 32-14.08 32-32 0-73.6-67.2-127.36-159.36-127.36-97.92 0-159.36 48.64-159.36 127.36 0 76.16 64 127.36 159.36 127.36C624.64 576.64 704 579.84 704 640c0 55.04-60.16 63.36-95.36 63.36-56.32 0-95.36-26.24-95.36-63.36 0-17.28-14.08-32-32-32-17.28 0-32 14.08-32 32 0 73.6 67.2 127.36 159.36 127.36 97.92 0 159.36-48.64 159.36-127.36 0-76.16-64-127.36-159.36-127.36-16 0-95.36-3.2-95.36-63.36C513.28 394.24 572.8 385.92 608.64 385.92z"
            p-id="3843"
            fill="#ffffff"
          ></path>
        </svg>
        <Blood
          direction="right"
          name={`${opponent.name}(${opponent.nature})`}
          rate={opponent.type === "boss" ? "???" : userInfo.exp / 100}
          all={opponent.type === "boss" ? opponent.blood : oppnent_blood}
          cur={opbld}
          isRare={readySp.isRare}
          attack={opatk}
          defence={opdfc}
          speed={opspd}
        />
      </div>
      <div className="f-move flex-between-center">
        <div className={myAttack ? "my-attack" : myEnhance ? "my-enhance" : ""}>
          <img className="spirit s-left" alt="" src={spiritsImg[readySp.id]} />
        </div>
        <div
          className={
            opAttack
              ? "op-attack"
              : opEnhance
              ? "op-enhance"
              : myCatch
              ? "my-catch"
              : ""
          }
        >
          <img
            alt=""
            className="spirit s-right"
            src={spiritsImg[opponent.id]}
          />
        </div>
      </div>
      <div className="f-panel flex-between-center">
        <div
          className="f-log"
          dangerouslySetInnerHTML={{ __html: skillLog }}
        ></div>
        {Ptype ? (
          // 技能面板
          <div className="f-left flex-around-center-wrap">
            {readySp.skills.map((item, idx) => {
              return (
                <Button
                  onClick={
                    times[idx] > 0
                      ? useSkill.bind(this, idx, parseInt(Math.random() * 4))
                      : null
                  }
                  size="small"
                  pop="true"
                  poptip={item.description}
                  key={idx}
                >
                  {`${item.name}(${times[idx]})`}
                </Button>
              );
            })}
          </div>
        ) : (
          // 道具界面
          <div className="f-left flex-around-center-wrap">
            {[0, 1, 2].map((item, idx) => {
              return (
                <Block
                  onClick={
                    isPropUsed[item] > 0
                      ? useProp.bind(this, item, parseInt(Math.random() * 4))
                      : null
                  }
                  pop={true}
                  poptip={propsInfo[item].intro}
                  text={isPropUsed[item]}
                  img={propsImg[item]}
                  size="small"
                  key={idx}
                ></Block>
              );
            })}
          </div>
        )}

        <div className="f-right flex-around-center-wrap">
          <Button size="small" onClick={setType.bind(this, true)}>
            技能
          </Button>
          <Button size="small" onClick={setType.bind(this, false)}>
            道具
          </Button>
          <Button
            size="small"
            onClick={navigate.bind(
              this,
              props.history,
              "确定要逃跑吗？",
              "/game"
            )}
          >
            逃跑
          </Button>
        </div>
      </div>

      {/* 遮罩 */}
      <div
        className="p-mask"
        style={{ display: isMask ? "block" : "none" }}
      ></div>
    </div>
  );
}

export default withRouter(FightC);
