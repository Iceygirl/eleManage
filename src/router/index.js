import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from 'pages/Login'
import Home from 'pages/Home'
import Main from 'pages/Main'
import UserList from 'pages/DataManage//UserList'
import ShopList from 'pages/DataManage/ShopList'
import AddShop from 'pages/AddData/AddShop'
import AddGoods from 'pages/AddData/AddGoods'
import User from 'pages/Chart/User'
import Edit from 'pages/Edit' 
import AdminSet from 'pages/AdminSet'
import Explain from 'pages/Explain'
 
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/', 
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login', 
      component: Login
    },
    {
      path: '',
      name: 'Home',
      component: Home,
      children:[{
        path: '/main',
        name: 'Main',
        component: Main,
        meta:[]
      },{
        path: '/userList',
        name: 'UserList',
        component: UserList,
        meta:['数据管理','用户列表']
      },{
        path: '/shopList',
        name: 'ShopList',
        component: ShopList,
        meta:['数据管理','商铺列表']
      },{
        path: '/addShop',
        name: 'AddShop',
        component: AddShop,
        meta:['添加数据','添加商铺']
      },{
        path: '/AddGoods',
        name: 'AddGoods',
        component: AddGoods,
        meta:['添加数据','添加商品']
      },{
        path: '/user',
        name: 'User', 
        component: User,
        meta:['图表','用户分布']
      },{ 
        path: '/edit',
        name: 'Edit',
        component: Edit,
        meta:['编辑','文本编辑']
      },,{
        path: '/adminSet',
        name: 'AdminSet',
        component: AdminSet,
        meta:['设置','管理员设置']
      },{
        path: '/explain',
        name: 'Explain',
        component: Explain,
        meta:['说明','说明']
      },
    ]
    }
  ]
})
 
router.beforeEach((to,from,next)=>{
  store.commit('set_routerName',to.name)
  next()
})

export default router