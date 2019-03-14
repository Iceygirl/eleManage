import Vue from 'vue'
import Router from 'vue-router'

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

export default new Router({
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
      path: '/home',
      name: 'Home',
      component: Home,
      children:[{
        path: '/main',
        name: 'Main',
        component: Main
      },{
        path: '/userList',
        name: 'UserList',
        component: UserList
      },{
        path: '/shopList',
        name: 'ShopList',
        component: ShopList
      },{
        path: '/addShop',
        name: 'AddShop',
        component: AddShop
      },{
        path: '/AddGoods',
        name: 'AddGoods',
        component: AddGoods
      },{
        path: '/user',
        name: 'User', 
        component: User
      },{ 
        path: '/edit',
        name: 'Edit',
        component: Edit
      },,{
        path: '/adminSet',
        name: 'AdminSet',
        component: AdminSet
      },{
        path: '/explain',
        name: 'Explain',
        component: Explain
      },
    ]
    }
  ]
})
