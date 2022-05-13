<template>
  <div class="home">
    <router-link to="/movie/recommendation">
      <h1>Recomendações</h1>
    </router-link>

    <form @submit.prevent="SearchMovies()" class="search-box">
      <input
        type="text"
        placeholder="What are you looking for? "
        v-model="search"
      />
      <input type="submit" value="Search" />
    </form>

    <div>
      <h1>Filmes salvos</h1>
      <MovieList :movies="savedList" />
    </div>
    <div>
      <h1>Filmes assistidos</h1>
      <MovieList :movies="watchedMovies" />
    </div>
    <div>
      <h1>Lista de Filmes</h1>
      <MovieList :movies="movies" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import env from "@/env.js";
import { useStore } from "vuex";
import MovieList from "@/components/MovieList.vue";
export default {
  components: {
    MovieList,
  },
  setup() {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
    const search = ref("");
    const movies = ref([]);

    const store = useStore();

    const watchedMovies = computed(() => {
      return store.state.watchedList;
    });

    const savedList = computed(() => {
      return store.state.saveList;
    });

    function getImageFullURL(path) {
      return `${IMAGE_URL}${path}`;
    }

    function saveMovie(movie) {
      store.dispatch("saveMovie", movie);
    }

    function watchMovie(movie) {
      store.dispatch("watchMovie", movie);
    }

    const SearchMovies = () => {
      if (search.value != "") {
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${env.apikey}&page=1&query=${search.value}`
        )
          .then((response) => response.json())
          .then((data) => {
            movies.value = data.results;

            search.value = "";
          });
      }
    };

    return {
      search,
      movies,
      SearchMovies,
      getImageFullURL,
      saveMovie,
      watchMovie,
      watchedMovies,
      savedList,
    };
  },
};
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16x;
      }

      p {
        color: #fff;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42b883;
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  }
}
</style>
