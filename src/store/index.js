import vue from 'vue'
import vuex from 'vuex'
import menu from './modules/menu'



vue.use(vuex)
export default new vuex.Store({
  modules:{
      menu
  }
})

