<template>
  <div class="movies-list">
    <div class="movie" v-for="movie in props.movies" :key="movie.id">
      <div class="movie-link">
        <div class="product-image">
          <router-link :to="'/movie/' + movie.id" class="movie-link">
            <img :src="getImageFullURL(movie.poster_path)" alt="Movie Poster" />
          </router-link>
          <div class="type">{{ movie.type }}</div>
        </div>

        <div class="detail">
          <p class="y">{{ movie.release_date }}</p>
          <h3>{{ movie.title }}</h3>

          <div class="botao">
            <button @click="saveMovie(movie)" class="saveButton">
              <bookmark-icon size="24" />
            </button>

            <button @click="watchMovie(movie)" class="watchButton">
              <eye-icon size="24" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { BookmarkIcon, EyeIcon } from "@vue-icons/feather";

export default {
  components: {
    "bookmark-icon": BookmarkIcon,
    "eye-icon": EyeIcon,
  },

  props: {
    movies: {
      required: true,
      type: Array,
    },
  },
  setup(props) {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
    const store = useStore();

    function getImageFullURL(path) {
      return `${IMAGE_URL}${path}`;
    }

    function saveMovie(movie) {
      store.dispatch("saveMovie", movie);
    }

    function watchMovie(movie) {
      store.dispatch("watchMovie", movie);
    }
    return {
      props,
      getImageFullURL,
      saveMovie,
      watchMovie,
    };
  },
};
</script>

<style scoped lang="scss">
.movies-list {

  display: flex;
  flex-wrap: wrap;
  margin: 0px 8px;

  .botao{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    background-color: #496583;
  

    & button{
      background-color: transparent;
      border: 0;
    }
  }
  .movie {
    max-width: 10%;
    flex: 1 1 10%;
    padding: 16px 8px;

    .movie-link {
      display: flex;
      flex-direction: column;
      height: 100%;

      .product-image {
        position: relative;
        display: block;

        img {
          display: block;
          width: 100%;
          height: 275px;
          object-fit: contain;
        }

        .type {
          position: absolute;
          padding: 8px 16px;
          background-color: #42b883;
          color: #fff;
          bottom: 16px;
          left: 0px;
          text-transform: capitalize;
        }
      }

      .detail {
        background-color: #496583;
        padding: 16px 8px;
        flex: 1 1 100%;
        border-radius: 0px 0px 8px 8px;

        .y {
          color: #aaa;
          font-size: 14px;
        }

        h3 {
          color: #fff;
          font-weight: 600;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
