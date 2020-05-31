<template>
  <div class="home row mx-2">
    <div class="col-2">
      <ShowsFilter
        v-if="shows"

        :showStatus="status"
        @statusFilter="setSelectedStatus"

        :genres="genres"
        @genresFilter="setSelectedGenres"
      ></ShowsFilter>
    </div>
    <div class="col-10">
      <h1>Shows:</h1>
      <!-- Shows -->
      <span v-if="filteredShows.length>0">
        <ul class="list-unstyled">
          <li
            class="media my-4"
            v-for="(item, index) in filteredShows"
            :key="item.id"
            :data-index="index"
          >
            <router-link :to="{ name: 'Show', params: { id: item.id } }">
              <img
                v-if="item.image"
                :src="item.image.medium"
                class="mr-3 img-fluid rounded"
                :alt="item.name"
              />
              <img
                v-else
                src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
                class="mr-3"
                :alt="item.name"
              />
            </router-link>
            <div class="media-body">
              <router-link :to="{ name: 'Show', params: { id: item.id } }">
                <h5 class="mt-0 mb-1">{{ item.name }}</h5>
              </router-link>
              Description: {{ item.summary | stripHTML }}
              <br />
              <br />

              Status: {{ item.status }}

              <br />
              <br />

              Genre:
              <span v-for="(genre, index) in item.genres" :key="index">
                {{ genre }}
              </span>
            </div>
          </li>
        </ul>
      </span>
      <span v-else>
        <ul class="list-unstyled">
          <li
            class="media my-4"
            v-for="(item, index) in shows"
            :key="item.id"
            :data-index="index"
          >
            <router-link :to="{ name: 'Show', params: { id: item.id } }">
              <img
                v-if="item.image"
                :src="item.image.medium"
                class="mr-3 img-fluid rounded"
                :alt="item.name"
              />
              <img
                v-else
                src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
                class="mr-3"
                :alt="item.name"
              />
            </router-link>
            <div class="media-body">
              <router-link :to="{ name: 'Show', params: { id: item.id } }">
                <h5 class="mt-0 mb-1">{{ item.name }}</h5>
              </router-link>
              Description: {{ item.summary | stripHTML }}
              <br />
              <br />

              Status:
              {{ item.status }}

              <br />
              <br />

              Genres:
              <span v-for="(genre, index) in item.genres" :key="index">
                {{ genre }}
              </span>
            </div>
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script>
import ShowsFilter from "./ShowsFilter.vue";

export default {
  name: "ShowList",
  data() {
    return {
      shows: null,
      status: [],
      genres: [],
      filteredShows: [],
      prevFilteredShows: []
    };
  },
  components: {
    ShowsFilter,
  },
  props: [],
  created() {
    this.getAllShows();
  },
  methods: {
    getAllShows: function() {
      fetch("http://api.tvmaze.com/shows")
        .then(function(response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          this.shows = data;

          //Getting Genres
          this.filterStatus();
          this.filterGenres();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filterStatus: function(){
      if (this.shows) {
        for (let i = 0; i < this.shows.length; i++) {
          if (!this.status.includes(this.shows[i].status)) {
            this.status.push(this.shows[i].status);
          }
        }
        this.status.sort();
      }
    },
    filterGenres: function() {
      if (this.shows) {
        for (let i = 0; i < this.shows.length; i++) {
          for (let j = 0; j < this.shows[i].genres.length; j++) {
            if (!this.genres.includes(this.shows[i].genres[j])) {
              this.genres.push(this.shows[i].genres[j]);
            }
          }
        }
        this.genres.sort();
      }
    },
    mergeData: function(data){
      console.log("before data length: " + data.length);
      console.log("before filtered shows length: " + this.filteredShows.length);
      if(this.filteredShows.length > 0 && data.length > 0){

        var filteredKeywords = data.filter((word) => !this.filteredShows.includes(word));
        for(let i = 0; i < filteredKeywords.length; i++){
          if(this.filteredShows.includes(filteredKeywords)){
            console.log("includes - " + filteredKeywords[i].name);
          }
          else{
            console.log("doesn't include - " + filteredKeywords[i].name);
            this.filteredShows.push(filteredKeywords[i]);
          }
        }

        // var temp = [];
        // for(let i = 0; i < data.length; i++){
        //   if(this.filteredShows.includes(data[i])){
        //     temp.push(data[i]);
        //     console.log("Includes - " + data[i].name);
        //   }
        //   else{
        //     console.log("Doesn't include - " + data[i].name);
            //this.filteredShows.push(data[i]);
        //     temp.push(data[i]);
        //   }
        // }
        // for(let i = 0; i < this.filteredShows.length; i++){
        //   if(!data.includes(this.filteredShows[i])){
        //     console.log("IF - " + this.filteredShows[i].name);
        //     temp.push(this.filteredShows[i]);
            //console.log("includes - " + this.filteredShows[i].name);
          // }
          // else{
          //   console.log("ELSE - " + this.filteredShows[i].name);
            //console.log("doesn't include - " + this.filteredShows[i].name);
          //}
        
        //this.filteredShows = [...temp];
        this.prevFilteredShows = [...this.filteredShows];
      }
      else if(data.length > 0 && this.filteredShows.length == 0){
        console.log("2");
        this.filteredShows = [...data];
      }
      else if(data.length == 0 && this.filteredShows.length == 0){
        console.log("3");
        this.filteredShows = [...this.shows];
      }
      else if(data.length == 0 && this.filteredShows.length > 0){
        console.log("4");
         this.filteredShows = [...this.shows];
        //this.filteredShows = [...this.prevFilteredShows];
      }
      console.log("after data length: " + data.length);
      console.log("after filtered shows length: " + this.filteredShows.length);
    },
    setSelectedStatus: function(data) {
      var temp = this.shows.filter(function(show){
        if(data.includes(show.status)){
          return true;
        }
        else{
          return false;
        }
      });
      this.mergeData(temp);
    },
    
    setSelectedGenres: function(data) {
      //this.filteredShows = [];
      var temp = [];
      if(data.length > 0){
        for(let i = 0; i < this.shows.length; i++){
          let show = this.shows[i];
          let result = show.genres.filter(genre => data.includes(genre));
          if(result.length > 0){
            temp.push(show);
          }
        }
      } 
      this.mergeData(temp); 
    },
  },
};
</script>
