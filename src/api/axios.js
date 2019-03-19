/* axios */

import axios from 'axios'
import { httpURL} from './config.js'

export function ajaxPost(url, data) {
  url = `${httpURL}${url}`
  return axios({
      method: 'post',
      url: url,
      data
    })
    .then((res) => {
      return Promise.resolve(res.data) 
    }) 
    .catch((error) => {
      console.log(error)
    })
}

export function ajaxGet(url, data) {
  url = `${httpURL}${url}`
  return axios({
      method: 'get',
      url: url,
      data
    })
    .then((res) => {
      return Promise.resolve(res.data) 
    }) 
    .catch((error) => {
      console.log(error)
    })
}
