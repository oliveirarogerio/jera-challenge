
<template>
  <div>
    <h1>Baseado no que voce assistiu!</h1>
  </div>
     <MovieList :movies="movies" />


</template>

<script>
/* eslint-disable no-unused-vars */
import { computed, ref } from "vue";
import env from "@/env.js";
import { useStore } from "vuex";
import MovieList from "@/components/MovieList.vue";
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";

export default {
  components:{
  MovieList
  },
  setup() {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
    const search = ref("");
    const movies = ref([]);

    const store = useStore();

    
    onBeforeMount(() => {
      //SearchRec()

      store.state.watchedList.map(movie =>{
        SearchRec(movie.id)
      })

    });



    const SearchRec = (id) => {
 
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${env.apikey}&language=en-US&page=1`
        )
          .then((response) => response.json())
          .then((data) => {
            movies.value.push(...data.results)
            console.log(data.results)
          });
      }
    
    return {
      search,
      movies,
      SearchRec,
    };
  },
};
</script>

<style lang="scss"></style>
