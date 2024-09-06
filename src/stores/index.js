import { createStore } from 'vuex';

export default createStore({
  state: {
    userFile: null, // Global state for userFile
  },
  mutations: {
    SET_USER_FILE(state, userFile) {
      state.userFile = userFile;
    },
  },
  actions: {
    updateUserFile({ commit }, userFile) {
      commit('SET_USER_FILE', userFile);
    },
  },
  getters: {
    getUserFile: (state) => state.userFile,
  },
});