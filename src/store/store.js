import {createStore} from 'vuex'

export default createStore({
    state: {
      selectedIndex: 0
    },
    mutations: {
      addIndex(state, payload) {
        state.selectedIndex = payload;
      },
    },
    actions: {
      getIndex(context, payload) {
        context.commit("ADD_INDEX", payload);
      },
    },
  });