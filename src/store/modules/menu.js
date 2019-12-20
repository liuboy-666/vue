import * as types from '../mutation-types'

const menu ={
  state :{
    nums:null
  },
  getters:{
    getNums(state){
      return state.nums
    }
  },
  mutations:{
    [types.NUMS](state,data){
      state.nums = data
    }
  }
}

export default menu
