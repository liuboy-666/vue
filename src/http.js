import axios from 'axios'
import store from './store'
//请求拦截处理
axios.interceptors.request.use(
  config =>{
    if(!(config.url.includes('login'))){
      //请求头部处理
      config.headers = {
        "request-token": JSON.parse(localStorage.getItem('token')),
        "content-type": 'application/json'
      }
    }
    return config
  },
  error =>{
    return Promise.reject(error)
  }
)
//响应拦截处理
axios.interceptors.response.use(
  response =>{
    if(response.status ===200){
      return response.data
    }
    return response.data
  },
  error =>{//失败判断
    if(error.response.status){
      switch(error.response.status){
        case 403:
          localStorage.removeItem('token')
      }
    }
    return Promise.reject(error)
  }
)
