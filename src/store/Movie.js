/* eslint-disable no-unused-vars */
import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});

export default createStore({
  state: {
    saveList: [],
    watchedList: [],
  },
  mutations: {
    saveMovie(state, movie) {
      const findMovie = state.saveList.find((m) => m.id === movie.id);
      console.log(findMovie);

      if (findMovie) {
        state.saveList = state.saveList.filter((m) => m.id !== movie.id);
      } else {
        state.saveList.push(movie);
      }
    },
    watchMovie(state, movie) {
      const findMovie = state.watchedList.find((m) => m.id === movie.id);
      console.log(findMovie);

      if (findMovie) {
        state.watchedList = state.watchedList.filter((m) => m.id !== movie.id);
      } else {
        state.watchedList.push(movie);
      }
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
  plugins: [vuexLocalStorage.plugin],
});
