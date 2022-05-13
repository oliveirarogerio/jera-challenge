import { createStore } from "vuex";

export default createStore({
  state: {
    saveList: [],
    watchedList: [],
  },
  mutations: {
    saveMovie(state, movie) {
      state.saveList.push(movie);
    },
    watchMovie(state, movie) {
      state.watchedList.push(movie);
    },
  },
  actions: {
    saveMovie({ commit }, movie) {
      commit("saveMovie", movie);
    },
    watchMovie({ commit }, movie) {
      commit("watchMovie", movie);
    },
  },
  getters: {},
  modules: {},
});
