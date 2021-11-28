import { Fight } from "./api";

export function navigate (history,confirmMsg,url) {
    let res = window.confirm(confirmMsg)
    if (res) {
      history.push({
        pathname: url
      })
    }
  }


export function getFight(userId,bossId) {
  let data = new FormData();
  data.append("userId",userId);
  data.append("bossId",bossId);
  return Fight.getFightInfo(data)
}

// 获取克制系数
export function getRestrain(my_prop,op_prop) {
  if(my_prop == op_prop) return 1;
  if(my_prop == '草') {
    if(op_prop == '水') return 2;
    else return 0.7;
  }else if(my_prop == '火') {
    if(op_prop == '草') return 2;
    else return 0.7;
  }else {
    if(op_prop == '火') return 2;
    else return 0.7;
  }
}