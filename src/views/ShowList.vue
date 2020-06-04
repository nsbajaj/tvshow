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
    <div class="col-10" v-if="showComponent">
      <!-- Shows -->
      <span v-if="filtersApplied.status.length==0 && filtersApplied.genres.length==0">
        <h1>Shows ({{ shows.length }}):</h1>
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

      <!-- Filtered Shows -->
      <span v-else-if="filteredShows.length>0">
        <h1>Shows ({{ filteredShows.length }}):</h1>
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
      <!-- No shows found -->
      <span v-else>
        <h1>No shows found matching your criteria.</h1>
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
      filtersApplied: {
        status: [],
        genres: []
      },
      showComponent: false
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
          this.showComponent = true;
          
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
    mergeData: function(){
      this.filteredShows = [];
      for(let i = 0; i < this.shows.length; i++){
        let show = this.shows[i];
        let result = show.genres.filter(genre => this.filtersApplied.genres.includes(genre));
        if(result.length > 0){
          this.filteredShows.push(show);
        }
      }
            
      var result = [];
      if(this.filteredShows.length > 0){
        if(this.filtersApplied.status.length > 0){
          result = this.filteredShows.filter(show => this.filtersApplied.status.includes(show.status));
          if(result.length > 0){
            this.filteredShows = [...result];
          }
          else{
            this.filteredShows = [];
          }
        }
      }
      else{
        if(this.filtersApplied.status.length > 0){
          result = this.shows.filter(show => this.filtersApplied.status.includes(show.status));
          if(result.length > 0){
            this.filteredShows = [...result];
          }
          else{
            this.filteredShows = [];
          }
        }
      }
    },
    setSelectedStatus: function(data) {
      if(data.length > 0){
        this.filtersApplied.status = [];
        for(let i = 0; i < data.length; i++){
          if(!this.filtersApplied.status.includes(data[i])){
            this.filtersApplied.status.push(data[i]);
          }
        }
      }
      else{
        this.filtersApplied.status = [];
      }
      this.mergeData();
    },
    setSelectedGenres: function(data) {
      if(data.length > 0){
        this.filtersApplied.genres = [];
        for(let i = 0; i < data.length; i++){
          this.filtersApplied.genres.push(data[i]);
        }
      }
      else{
        this.filtersApplied.genres = [];
      }
      this.mergeData();
    },
  },
};
</script>
