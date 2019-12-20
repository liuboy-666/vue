import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n) // 通过插件的形式挂载
import zh from './common/zh'
import en from './common/en'

//创建实例i18n
const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh,   // 中文语言包
    en   // 英文语言包
  }
})

export default i18n;
