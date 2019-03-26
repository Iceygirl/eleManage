// 后台接口

import { ajaxGet, ajaxGet1, ajaxPost, ajaxDelete } from 'api/axios'

//  登录
export function login(data) {

  let url = '/admin/login'
 
  return ajaxPost(url,data) 
}  


// 退出登录
export function logout() {

  let url = '/admin/signout'

  return ajaxGet(url) 
}  

 
// 获取用户列表
export function getUser(data) {

  let url = '/v1/users/list'

  return ajaxGet(url,data) 
}  


// 获取用户列表的总数
export function getUserCount() {

  let url = '/v1/users/count'

  return ajaxGet(url) 
}  

// 获取城市经纬度
export function getCityInfo(data) {

  let url = '/v1/cities' 

  return ajaxGet(url,data) 
}  


// 获取商品列表
export function getShop(data) {

  let url = '/shopping/restaurants' 

  return ajaxGet(url,data) 
}  


// 获取商品列表的总数
export function getShopCount() {

  let url = '/shopping/restaurants/count'

  return ajaxGet(url) 
}  

// 获取店铺分类
export function getShopCategory() {

  let url = '/shopping/v2/restaurant/category'

  return ajaxGet(url) 
}  


// 图片上传
export function upload(data) {

  let url = '/v1/addimg/shop'

  return ajaxPost(url,data) 
}  

// 地址搜索
export function getPosition(data) {

  let url = '/v1/pois'

  return ajaxGet(url,data) 
}  

// 修改商铺
export function editShop(data) {

  let url = '/shopping/updateshop'

  return ajaxPost(url,data) 
} 

// 删除
export function removeShop(id) {
 
  let url = '/shopping/restaurant/'

  return ajaxDelete(url,id) 
} 

// 添加商铺
export function addShop(data) {
 
  let url = '/shopping/addShop'

  return ajaxPost(url,data) 
} 


// 获取食品品类  
export function getCategory(id) {
 
  let url = '/shopping/getcategory/'

  return ajaxGet1(url,id) 
} 