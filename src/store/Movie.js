import { createStore } from "vuex";

export default createStore({
  state: {
    saveList: [],
    watchedList: [],
  },
  mutations: {
    saveMovie(state, movie) {
      state.saveList.push(movie);
      console.log(" Save", state.saveList);
    },
    watchMovie(state, movie) {
      state.watchedList.push(movie);
      console.log("Watched ", state.watchedList);
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
