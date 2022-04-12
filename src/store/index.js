import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    authToken: null,
    currentUser: {},
    userId: localStorage.getItem("userId"),
  },
  getters: {},
  mutations: {
    SET_CURRENT_USER_IN_STATE(state, data) {
      state.currentUser = data;
    },
    SET_IS_LOGGED_IN(state, data) {
      state.authToken = data.accessToken;
    },
    SET_USER_ID(state, data) {
      state.userId = data._id;
    },
    UPDATE_CURRENT_USER_IN_STATE(state, data) {
      state.currentUser = data;
    },
    CLEAR_CURRENT_USER(state) {
      state.currentUser = null;
      state.authToken = null;
      state.userId = null;
    },
    // SET_USER_ROLE_IN_STATE(state, data) {
    //   state.role = data.role;
    // },
  },
  actions: {
    setCurrentUserInState({ commit }, data) {
      commit("SET_CURRENT_USER_IN_STATE", data);
    },
    setIsLoggedIn({ commit }, data) {
      commit("SET_IS_LOGGED_IN", data);
    },
    setUserId({ commit }, data) {
      commit("SET_USER_ID", data);
    },
    updateCurrentUserInState({ commit }, user) {
      commit("UPDATE_CURRENT_USER_IN_STATE", user);
    },
    clearCurrentUser({ commit }) {
      commit("CLEAR_CURRENT_USER");
    },
  },
  modules: {},
});
