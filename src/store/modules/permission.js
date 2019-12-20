import * as types from '../mutation-types'
import { asyncRouterMap, constantRouterMap } from '@/router'

// 通过meta.role判断是否与当前用户权限匹配
function hasPermission(roles,route){
  if(route.meta && route.meta.roles){
    return roles.some(role =>route.meta.roles.indexOf(role) >=0)
  }else{
    return true
  }
}


const permission ={
  state:{
    routers:null,
    addRouters: []
  },
  getters:{

  },
  mutations:{
    [types.SET_ROUTERS](state,data){
      state.addRouters = data
      state.routers = constantRouterMap.concat(data)
    }
  },
  actions:{
    GenerateRoutes({commit},data){
      return new Promise(rosolve =>{
        const {roles} = data
        let accessedRouters
        if(roles.indexOf('admin') >= 0){
          accessedRouters = asyncRouterMap
        }else{
          accessedRouters = filterAsyncRouter(asyncRouterMap,roles)
        }
        commit([types.SET_ROUTERS],accessedRouters)
        resolve()
      })
    }
  }
}
