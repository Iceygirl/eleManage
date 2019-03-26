/* axios */

import axios from 'axios'
import { httpURL} from './config.js'

export function ajaxGet(url, data) {
  url = `${httpURL}${url}`
  return axios.get(url,{
      params: { 
        ...data
      }
    })
    .then((res) => {
      return Promise.resolve(res.data) 
    }) 
    .catch((error) => {
      console.log(error)
    })
}

export function ajaxGet1(url, id) {
  url = `${httpURL}${url}${id}`
  return axios.get(url)
    .then((res) => {
      return Promise.resolve(res.data) 
    }) 
    .catch((error) => {
      console.log(error)
    })
}

export function ajaxPost(url, data) {
  url = `${httpURL}${url}`
  return axios({
      method:'post',
      url,
      data
    })
    .then((res) => {
      return Promise.resolve(res.data) 
    }) 
    .catch((error) => {
      console.log(error)
    })
}

export function ajaxDelete(url, id) {
  url = `${httpURL}${url}${id}`
  return axios.delete(url)
    .then((res) => {
      return Promise.resolve(res.data) 
    }) 
    .catch((error) => {
      console.log(error)
    })
}