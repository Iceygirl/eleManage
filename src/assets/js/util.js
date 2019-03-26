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

// 深拷贝一个Object
export function cloneObj(obj) {
    if (null == obj || "object" != typeof obj) return obj;
  
    if (obj instanceof Date) {
  
      var copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
  
    if (obj instanceof Array) {
      var copy = [];
      for (var i = 0, len = obj.length; i < len; ++i) {
        copy[i] = cloneObj(obj[i]);
      }
      return copy;
    }
  
    if (obj instanceof Object) {
      var copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = cloneObj(obj[attr]);
      }
      return copy;
    }
  
    throw new Error("Unable to copy obj! Its type isn't supported.");
}


// 返回登录页
export function backToLogin(type) {
    if(type === 'ERROR_SESSION') {
        setTimeout(() => {
            window.location.href = location.pathname
        }, 500) 
    }
}
  