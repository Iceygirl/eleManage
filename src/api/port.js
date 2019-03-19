// 后台接口

import { ajaxPost, ajaxGet } from 'api/axios'

//  登录
export function login(data) {

  let url = '/admin/login'

  return ajaxPost(url,data) 
}  


// 退出登录
export function logout() {

  let url = '/admin/signout'

  return ajaxPost(url) 
}  

 
// 获取用户列表
export function getUser() {

  let url = '/v1/users/list'

  return ajaxGet(url) 
}  





