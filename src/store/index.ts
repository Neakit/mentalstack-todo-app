import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    addItem(state, item) {
      state.list.push(item);
    },
    removeItem(state, id) {
      const index = state.list.find(i => i.id === id);
      state.list = state.list.splice(index, 1);
    }
  },
  actions: {
    getList({ commit }, { url = 'http://localhost:3000/summerLiteratureList' }) {
      fetch(url)
          .then(response => response.json())
          .then(list => {
              commit('setList', list);
          });
    }
  },
  modules: {
  }
})
