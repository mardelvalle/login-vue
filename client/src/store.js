import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    password: ''
  },
  mutations: {
    change (state, userName, password) {
      state.userName = userName,
      state.password = password
    }
  },
  getters: {
    userName: state => state.userName,
    password: state => state.password
  }
})
