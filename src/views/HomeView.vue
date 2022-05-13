<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/438631-dune">
        <img
          src="https://upload.wikimedia.org/wikipedia/pt/c/c0/Dune_2020.jpeg"
          alt="Dune Poster"
          class="featured-img"
        />
        <div class="detail">
          <h3>Dune</h3>
          <p>
            Paul Atreides, a brilliant and gifted young man born into a great
            destiny beyond his understanding, must travel to the most dangerous
            planet in the universe to ensure the future of his family and his
            people. As malevolent forces explode into conflict over the planet's
            exclusive supply of the most precious resource in existence-a
            commodity capable of unlocking humanity's greatest potential-only
            those who can conquer their fear will survive.
          </p>
        </div>
      </router-link>
    </div>
    <form @submit.prevent="SearchMovies()" class="search-box">
      <input
        type="text"
        placeholder="What are you looking for? "
        v-model="search"
      />
      <input type="submit" value="Search" />
    </form>
      
      <div class="save-list">
      
      <div class="movie" v-for="movie in {{$store.state.saveList}}" :key="movie.id">
      <div class="movie-link">
  <div>
  
    </div>
        <div class="product-image">
          <router-link :to="'/movie/' + movie.id" class="movie-link">
            <img :src="getImageFullURL(movie.poster_path)" alt="Movie Poster" />
            </router-link>
            <div class="type">{{ movie.type }}</div>
          </div>

          <div class="detail">
            <p class="y">{{ movie.release_date }}</p>
            <h3>{{ movie.title }}</h3>
            
             <button @click="saveMovie(movie)" class="saveButton">
               <bookmark-icon size="24"/>
             </button>

             <button @click="watchMovie(movie)" class="watchButton">
               <eye-icon size="24"/>
             </button>
          </div>
            </div>
           
      </div>
    </div>
    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.id">
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

             <button @click="saveMovie(movie)" class="saveButton">
               <bookmark-icon size="24"/>
             </button>

             <button @click="watchMovie(movie)" class="watchButton">
               <eye-icon size="24"/>
             </button>
          </div>
            </div>
           
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import env from "@/env.js";
import {useStore} from 'vuex'
import { BookmarkIcon, EyeIcon } from "@vue-icons/feather";
export default {
  components: {
    "bookmark-icon":BookmarkIcon,
    "eye-icon": EyeIcon
  },
  setup() {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
    const search = ref("");
    const movies = ref([]);

    const store = useStore()

    function getImageFullURL(path) {
      return `${IMAGE_URL}${path}`;
    }

    function saveMovie(movie) {
      console.log(movie)
      console.log( store)
      store.dispatch("saveMovie", movie)
    }

     function watchMovie(movie) {
      console.log(movie)
      console.log( store)
      store.dispatch("watchMovie", movie)
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
      watchMovie
      
    };
  },
};
</script>

<style lang="scss">
.home {

   .saveButton{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       padding: 5px;
       background-color: #496583;
       border: 0;

       
    }

    .watchButton{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       padding: 5px;
       background-color: #496583;
       border: 0;

       
    }

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

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;

    .movie {
      max-width: 25%;
      flex: 2 2 50%;
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
            object-fit: cover;
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
}
</style>