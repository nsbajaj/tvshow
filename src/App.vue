<template>
  <div id="app" class="mx-auto">
    <div id="nav">
      <Navbar @search="search"></Navbar>
    </div>
    
    <router-view
      class="container-fluid"
      style="padding-top: 80px;"
      :searchResult="searchResult"
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
      searchResult: {
        shows: {
          data: null,
          type: "show"
        },
        people: {
          data: null,
          type: "people"
        }
      // searchResult: {
      //   data: null,
      //   type: null
      }
    };
  },
  methods: {
    search: function(data){
      this.searchShows(data);
      this.searchPeople(data);
      //console.log(JSON.stringify(this.searchResult));
    },
    searchShows: function(data){
      if(data && data.trim().length > 0){
        fetch('http://api.tvmaze.com/search/shows?q=' + data)
        .then(function (response){
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            this.searchResult.shows.data = data;
        })
        .catch(function(error) {
            console.log(error);
        })
      }
      else{
        console.log("Please enter data");
      }
    },
    searchPeople: function(data){
      if(data && data.trim().length > 0){
        fetch('http://api.tvmaze.com/search/people?q=' + data)
        .then(function (response){
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            this.searchResult.people.data = data;
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

