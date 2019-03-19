import time from 'time-formater'

// 获取从当前日期的前7天
export function preSevenDay() {
    let sevenDay = []
    for (let i = 6; i > -1; i--) {
        let date = ''
        date = time(new Date().getTime()-86400000*i).format('YYYY-MM-DD')
        sevenDay.push(date)
    } 
    return sevenDay
}
  