<template>
  <div id="app" class="mx-auto">
    <div id="nav" class="row">
      <Navbar @search="searchShow"></Navbar>
      <!-- <router-link to="/show">Show</router-link> | -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/navbar">Navbar</router-link> -->
    </div>
    
    <router-view class="container" style="padding-top: 80px;"
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
    searchShow: function(data){
      if(data && data.trim().length > 0){
        fetch('http://api.tvmaze.com/search/shows?q=' + data)
        .then(function (response){
            if(!response.ok){
                console.log(response.statusText);
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
      else{
        console.log("Please enter data");
      }
    }      
  },
  mounted: function(){
  
  }
}
</script>

