<template>
  <header>
    <router-link to="/">
      <button type="button" @click="menu" class="menu"></button>
      <h1><span>Vue</span>Movies</h1>
    </router-link>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>


export default {
  setup(){

    const menu = () => {



    }
return{menu}
  }

}

</script>

<style lang="scss">

  .menu{
    position: absolute;
    left: 20px;
  }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;

  &::selection {
    background: transparentize(#42b883, 0.5);
  }
}

body {
  background-color: #35495e;
}

a {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background-color: #2c3d4e;
  box-shadow: Opx 0px 6px rgba(0, 0, 0, 0.2);

  h1{
    color: #FFF;
    font-size: 28px;
  }

  span{
    color: #42B883
  }
}
</style>
