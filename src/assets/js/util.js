import dtime from 'time-formater'

// 获取从当前日期的前7天
export function preSevenDay() {
    let sevenDay = []
    for (let i = 6; i > -1; i--) {
        let date = ''
        date = dtime(new Date().getTime() - 24*60*60*i).format('YYYY-MM-DD')
        console.log(date)
        sevenDay.push(date)
    } 
    return sevenDay
}
 