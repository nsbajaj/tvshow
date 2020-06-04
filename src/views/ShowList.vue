<template>
  <div class="home row mx-2">
    <div class="col-2">
      <ShowsFilter
        v-if="shows"

        :showStatus="status"
        @statusFilter="setSelectedStatus"
        
        :genres="genres"
        @genreFilter="setSelectedGenres"
        
        :languages="languages"
        @languageFilter="setSelectedLanguages"

        :types="types"
        @typeFilter="setSelectedTypes"
      ></ShowsFilter>
    </div>
    <div class="col-10" v-if="showComponent">
      <!-- Shows -->
      <span
        v-if="
          filtersApplied.status.length == 0 && 
          filtersApplied.genres.length == 0 && 
          filtersApplied.languages.length == 0 &&
          filtersApplied.types.length == 0
        "
      >
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

              Genres:
              <span v-for="(genre, index) in item.genres" :key="index">
                {{ genre }}
              </span>

              <br />

              Language:
              {{ item.language }}

              <br />

              Type:
              {{ item.type }}
            </div>
          </li>
        </ul>
      </span>

      <!-- Filtered Shows -->
      <span v-else-if="filteredShows.length > 0">
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

              Genres:
              <span v-for="(genre, index) in item.genres" :key="index">
                {{ genre }}
              </span>

              <br />

              Language:
              {{ item.language }}

              <br />

              Type:
              {{ item.type }}
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
      shows: null, //Full list of shows (remains unmodified)
      filteredShows: [], //List of filtered shows (once a filter or selection has been made)

      //List of properties extracted from the shows, distinct and sorted.
      status: [],
      genres: [],
      languages: [],
      types: [],

      //Filters being applied will be stored in fittersApplied
      filtersApplied: {
        status: [],
        genres: [],
        languages: [],
        types: []
      },
      showComponent: false, //Used to display component once data has been fetched.
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
          if (this.shows.length > 0) {
            this.showComponent = true;
          }

          //Generating content for the filters using the list of shows
          this.filterStatus();
          this.filterGenres();
          this.filterLanguages();
          this.filterTypes();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filterStatus: function() {
      if (this.shows.length > 0) {
        for (let i = 0; i < this.shows.length; i++) {
          if (!this.status.includes(this.shows[i].status)) {
            this.status.push(this.shows[i].status);
          }
        }
        this.status.sort();
      }
    },
    filterGenres: function() {
      if (this.shows.length > 0) {
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
    filterLanguages: function() {
      if (this.shows.length > 0) {
        for (let i = 0; i < this.shows.length; i++) {
          if (!this.languages.includes(this.shows[i].language)) {
            this.languages.push(this.shows[i].language);
          }
        }
        this.languages.sort();
      }
    },
    filterTypes: function(){
      if (this.shows.length > 0) {
        for (let i = 0; i < this.shows.length; i++) {
          if (!this.types.includes(this.shows[i].type)) {
            this.types.push(this.shows[i].type);
          }
        }
        this.types.sort();
      }
    },
    mergeData: function() {
      //Genre filter
      this.filteredShows = [];
      if(this.shows.length > 0){
        for (let i = 0; i < this.shows.length; i++) {
          let show = this.shows[i];
          let result = show.genres.filter((genre) => this.filtersApplied.genres.includes(genre));
          if (result.length > 0) {
            this.filteredShows.push(show);
          }
        }
      }

      //Status filter
      var statusResult = [];
      if (this.filteredShows.length > 0) {
        if (this.filtersApplied.status.length > 0) {
          statusResult = this.filteredShows.filter((show) => this.filtersApplied.status.includes(show.status));
          if (statusResult.length > 0) {
            this.filteredShows = [...statusResult];
          }
          else {
            this.filteredShows = [];
          }
        }
      } else {
        if (this.filtersApplied.status.length > 0) {
          statusResult = this.shows.filter((show) => this.filtersApplied.status.includes(show.status));
          if (statusResult.length > 0) {
            this.filteredShows = [...statusResult];
          }
          else {
            this.filteredShows = [];
          }
        }
      }

      //Language filter
      var languageResult = [];
      if (this.filteredShows.length > 0) {
        if (this.filtersApplied.languages.length > 0) {
          languageResult = this.filteredShows.filter((show) => this.filtersApplied.languages.includes(show.language));
          if (languageResult.length > 0) {
            this.filteredShows = [...languageResult];
          }
          else {
            this.filteredShows = [];
          }
        }
      }
      else {
        if (this.filtersApplied.languages.length > 0) {
          languageResult = this.shows.filter((show) => this.filtersApplied.languages.includes(show.language));
          if (languageResult.length > 0) {
            this.filteredShows = [...languageResult];
          }
          else {
            this.filteredShows = [];
          }
        }
      }

      //Types filter
      var typesResult = [];
      if (this.filteredShows.length > 0) {
        if (this.filtersApplied.types.length > 0) {
          typesResult = this.filteredShows.filter((show) => this.filtersApplied.types.includes(show.type));
          if (typesResult.length > 0) {
            this.filteredShows = [...typesResult];
          }
          else {
            this.filteredShows = [];
          }
        }
      }
      else {
        if (this.filtersApplied.types.length > 0) {
          typesResult = this.shows.filter((show) => this.filtersApplied.types.includes(show.type));
          if (typesResult.length > 0) {
            this.filteredShows = [...typesResult];
          }
          else {
            this.filteredShows = [];
          }
        }
      }

      //TODO: runtime, premier (yearly, monthly), rating,
    },
    setSelectedStatus: function(data) {
      if (data.length > 0) {
        this.filtersApplied.status = [];
        for (let i = 0; i < data.length; i++) {
          if (!this.filtersApplied.status.includes(data[i])) {
            this.filtersApplied.status.push(data[i]);
          }
        }
      } else {
        this.filtersApplied.status = [];
      }
      this.mergeData();
    },
    setSelectedGenres: function(data) {
      if (data.length > 0) {
        this.filtersApplied.genres = [];
        for (let i = 0; i < data.length; i++) {
          this.filtersApplied.genres.push(data[i]);
        }
      } else {
        this.filtersApplied.genres = [];
      }
      this.mergeData();
    },
    setSelectedLanguages: function(data) {
      if (data.length > 0) {
        this.filtersApplied.languages = [];
        for (let i = 0; i < data.length; i++) {
          if (!this.filtersApplied.languages.includes(data[i])) {
            this.filtersApplied.languages.push(data[i]);
          }
        }
      } else {
        this.filtersApplied.languages = [];
      }
      this.mergeData();
    },
    setSelectedTypes: function(data){
      if (data.length > 0) {
        this.filtersApplied.types = [];
        for (let i = 0; i < data.length; i++) {
          if (!this.filtersApplied.types.includes(data[i])) {
            this.filtersApplied.types.push(data[i]);
          }
        }
      } else {
        this.filtersApplied.types = [];
      }
      this.mergeData();
    }
  },
};
</script>
