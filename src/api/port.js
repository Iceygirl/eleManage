// 后台接口

import { axiosGet, axiosPost } from 'api/axios'

//  登录
export function login(data) {

  let url = '/admin/login'
 
  return axiosPost(url,data) 
}  


// 退出登录
export function logout() {

  let url = '/admin/signout'

  return axiosGet(url) 
}  

 
// 获取用户列表
export function getUser(data) {

  let url = '/v1/users/list'

  return axiosGet(url,data) 
}  


// 获取用户列表的总数
export function getUserCount() {

  let url = '/v1/users/count'

  return axiosGet(url) 
}  

// 获取城市经纬度
export function getCityInfo(data) {

  let url = '/v1/cities' 

  return axiosGet(url,data) 
}  


// 获取商品列表
export function getShop(data) {

  let url = '/shopping/restaurants' 

  return axiosGet(url,data) 
}  


// 获取商品列表的总数
export function getShopCount() {

  let url = '/shopping/restaurants/count'

  return axiosGet(url) 
}  

// 获取店铺分类
export function getShopCategory() {

  let url = '/shopping/v2/restaurant/category'

  return axiosGet(url) 
}  


// 图片上传
export function upload(data) {

  let url = '/v1/addimg/shop'

  return axiosPost(url,data) 
}  

// 地址搜索
export function getPosition(data) {

  let url = '/v1/pois'

  return axiosGet(url,data) 
}  

// 修改商铺
export function editShop(data) {

  let url = '/shopping/updateshop'

  return axiosPost(url,data) 
} 



