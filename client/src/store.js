import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Hello Vue App'
  },
  mutations: {
    change (state, title) {
      state.title = title
    }
  },
  getters: {
    title: state => state.title
  }
})
