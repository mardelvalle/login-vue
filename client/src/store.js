import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      sum: 0
    },
  
    actions: {
      increment(context) {
        context.commit("increment")
      },
      decrement(context) {
        context.commit("decrement")
      }
    },
  
    mutations: {
      increment(state, payload) {
        state.sum++
      },
      decrement(state, payload) {
        state.sum--
      }
    },
  
    getters: {
      sum: function(state) {
        return state.sum
      }
    }
  })
