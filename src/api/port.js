// 后台接口

import { ajax } from 'api/axios'

//  登录
export function login(data) {

  let url = '/admin/login'

  return ajax(url,data) 
}  


// 退出登录
export function logout() {

  let url = '/admin/signout'

  return ajax(url) 
}  




