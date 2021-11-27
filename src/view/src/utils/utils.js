export function navigate (history,confirmMsg,url) {
    let res = window.confirm(confirmMsg)
    if (res) {
      history.push({
        pathname: url
      })
    }
  }