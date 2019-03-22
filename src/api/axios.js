/* axios */

import axios from 'axios'
import { httpURL} from './config.js'

export function axiosGet(url, data) {
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
      this.$Notice.info({
          title:error.message
      })
    })
}

export function axiosPost(url, data) {
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
      this.$Notice.info({
          title:error.message
      })
    })
}