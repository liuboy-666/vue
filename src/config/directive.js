import Vue from 'vue'

Vue.directive('status', {
  bind(el, binding, vnode) {
    el.onclick = (e) => {
      let time = binding.value || 3000
      $(el).attr('disabled', 'disabled')
      $(el).addClass('is-disabled')
      setTimeout(() => {
        $(el).removeAttr('disabled')
        $(el).removeClass('is-disabled')
      }, time)
    }
  }
})
