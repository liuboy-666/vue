import Vue from 'vue'
import Router from 'vue-router'
const layout = () => import('@/components/layout')
// 登录页
const reload = () => import('@/components/reLoad')
const upload =()=> import('@/views/upload')

const main = () => import('@/views/index')
Vue.use(Router)
// 固定的路由表
export const fixedRouter = [{
    path: '',
    component: reload,
    hidden: true
  },
  {
    path: '',
    component: main, //整体页面的布局(包含左侧菜单跟主内容区域)
    children: [{
      path: 'main',
      component: main,
      meta: {
        roles: ['user', 'admin'], //当前菜单哪些角色可以看到
      }
    }]
  },
  {
    path: '',
    component: upload, //整体页面的布局(包含左侧菜单跟主内容区域)
    children: [{
      path: 'upload',
      component: upload,
      meta: {
        roles: ['user', 'admin'], //当前菜单哪些角色可以看到
      }
    }]
  },
]

export default new Router({
  routes: fixedRouter

})
