<template>
  <div id="app" class="mx-auto">
    <div id="nav">
      <Navbar @search="searchShow"></Navbar>
      <!-- <router-link to="/show">Show</router-link> | -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/navbar">Navbar</router-link> -->
    </div>
    
    <router-view
      :shows="shows"
    ></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  data: function(){
    return {
      shows: null
    };
  },
  methods: {
    searchShow: function(element){
      fetch('http://api.tvmaze.com/search/shows?q=' + element)
      .then(function (response){
          if(!response.ok){
              throw Error(response.statusText);
          }
          return response;
      })
      .then(response => response.json())
      .then(data => {
          this.shows = data;
      })
      .catch(function(error) {
          console.log(error);
      })
    }      
  },
  mounted: function(){
  
  }
}
</script>

