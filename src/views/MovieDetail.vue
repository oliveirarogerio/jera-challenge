<template>
  <div class="movie-detail">
    <h2>{{ movie.title }}</h2>
    <p>{{ movie.release_date }}</p>
    <img
      :src="getImageFullURL(movie.poster_path)"
      alt="Movie Poster"
      class="featured-img"
    />
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

    function getImageFullURL(path) {
      return `${IMAGE_URL}${path}`;
    }

    onBeforeMount(() => {
      console.log(route)
      fetch(
        `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${env.apikey}&language=en-US`
      )
        .then((response) => response.json())
        .then((data) => {
          movie.value = data;
          
        });
    });

    return {
      movie,
      getImageFullURL,
    };
  },
};
</script>

<style lang="scss">
.movie-detail {
  padding: 16px;
  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .featured-img {
    display: block;
    max-width: 200px;
    margin-bottom: 16px;
  }

  p {
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }
}
</style>
