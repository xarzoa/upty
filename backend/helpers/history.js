function checkFor(down, oldDown, nowTime, oldTime, oldFor){
  if(down === oldDown){
    return oldTime !== 0 || oldTime ? oldFor + nowTime - oldTime : 0
  }else if(down !== oldDown){
    return 0
  }else{
    return 0
  }
}

function checkSince(down, oldDown, newDate, oldDate){
  if(down === oldDown){
    return oldDate ? oldDate : newDate
  }else if(down !== oldDown){
    return newDate
  }else{
    return newDate
  }
}

function historyInt(code, message, monitor, name, url) {
  const newDate = new Date()
  const nowTime = Date.now()
  return {
    down: code > 399,
    name,
    url,
    incident: message,
    code,
    for: checkFor(code > 399, monitor.down, nowTime, monitor.checked_at, monitor.for),
    checked_at: nowTime,
    last_checked: newDate,
    since: checkSince(code > 399, monitor.down, newDate, monitor.last_checked)
  };
}

module.exports = { historyInt }