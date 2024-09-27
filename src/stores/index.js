import { createStore } from 'vuex';

export default createStore({
  state: {
    userFile: null, // Global state for userFile
    role: null,
  },

  mutations: {
    SET_USER_FILE(state, userFile) {
      state.userFile = userFile;
    },
    SET_USER_ROLE(state, role) {
      state.role = role;
    },
  },
  actions: {
    updateUserFile({ commit }, userFile) {
      commit('SET_USER_FILE', userFile);
    },
    updateUserRole({ commit }, role) {
      commit('SET_USER_ROLE', role);
    },
  },
  getters: {
    getUserFile: (state) => state.userFile,
    getUserRole: (state) => state.role,
  },
});