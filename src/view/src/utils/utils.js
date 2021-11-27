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