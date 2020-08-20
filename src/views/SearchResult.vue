<template>
  <div>
    <div class="home row mx-2" v-if="showComponent">
      <div class="col-2 animated fadeInLeft">
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
          :runtime="runtime"
          @runtimeFilter="setSelectedRuntime"
        ></ShowsFilter>
      </div>
      <!-- Layout credit: https://bootsnipp.com/snippets/vr6qd -->
      <div class="col-10 animated fadeInRight">
        <!-- Shows -->
        <section
          class="movies"
          id="movies"
          v-if="
            filtersApplied.status.length == 0 &&
              filtersApplied.genres.length == 0 &&
              filtersApplied.languages.length == 0 &&
              filtersApplied.types.length == 0 &&
              filtersApplied.runtime == 0
          "
        >
          <h1>Shows ({{ shows.length }}):</h1>
          <div class="row">
            <div
              class="col-lg-2 col-md-4 col-sm-6 my-2"
              v-for="(item, index) in shows"
              :key="item.id"
              :data-index="index"
            >
              <article class="card">
                <header class="title-header">
                  <router-link :to="{ name: 'Show', params: { id: item.id } }">
                    <h3>{{ item.name }}</h3>
                  </router-link>
                </header>
                <div class="card">
                  <router-link :to="{ name: 'Show', params: { id: item.id } }">
                    <img
                      v-if="item.image"
                      :src="item.image.original"
                      class="w-100 mr-3 card-img-top rounded imgDimensions"
                      :alt="item.name"
                    />
                    <img
                      v-else
                      src="https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-21.png"
                      class="w-100 mr-3 card-img-top rounded imgDimensions"
                      :alt="item.name"
                    />
                  </router-link>
                </div>
              </article>
            </div>
          </div>

          <!-- People -->
          <h1>People ({{ people.length }}):</h1>
          <div class="row">
            <div
              class="col-lg-2 col-md-4 col-sm-6 my-2"
              v-for="(item, index) in people"
              :key="item.id"
              :data-index="index"
            >
              <article class="card">
                <header class="title-header">
                  <router-link :to="{ name: 'Person', params: { id: item.id } }">
                    <h3>{{ item.name }}</h3>
                  </router-link>
                </header>
                <div class="card">
                  <router-link :to="{ name: 'Person', params: { id: item.id } }">
                    <img
                      v-if="item.image"
                      :src="item.image.original"
                      class="w-100 mr-3 card-img-top rounded imgDimensions"
                      :alt="item.name"
                    />
                    <img
                      v-else
                      src="https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-21.png"
                      class="w-100 mr-3 card-img-top rounded imgDimensions"
                      :alt="item.name"
                    />
                  </router-link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Filtered Shows & People -->
        <section
          class="movies"
          id="movies"
          v-else-if="filteredShows.length > 0"
        >
          <h1>Shows ({{ filteredShows.length }}):</h1>
          <div class="row">
            <div
              class="col-lg-2 col-md-4 col-sm-6 my-2"
              v-for="(item, index) in filteredShows"
              :key="item.id"
              :data-index="index"
            >
              <article class="card">
                <header class="title-header">
                  <router-link :to="{ name: 'Show', params: { id: item.id } }">
                    <h3>{{ item.name }}</h3>
                  </router-link>
                </header>
                <div class="card">
                  <router-link :to="{ name: 'Show', params: { id: item.id } }">
                    <img
                      v-if="item.image"
                      :src="item.image.original"
                      class="w-100 mr-3 card-img-top rounded imgDimensions"
                      :alt="item.name"
                    />
                    <img
                      v-else
                      src="https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-21.png"
                      class="w-100 mr-3 card-img-top rounded imgDimensions"
                      :alt="item.name"
                    />
                  </router-link>
                </div>
              </article>
            </div>
          </div>

          <!-- <h1>People ({{ filteredPeople.length }}):</h1>
          <div class="row">
            <div
              class="col-lg-2 col-md-4 col-sm-6 my-2"
              v-for="(item, index) in filteredPeople"
              :key="item.person.id"
              :data-index="index"
            >
              <article class="card">
                <header class="title-header">
                  <router-link :to="{ name: 'Person', params: { id: item.person.id } }">
                    <h3>{{ item.person.name }}</h3>
                  </router-link>
                </header>
                <div class="card">
                  <router-link :to="{ name: 'Person', params: { id: item.person.id } }">
                    <img
                      v-if="item.person.image"
                      :src="item.person.image.original"
                      class="w-100 mr-3 card-img-top rounded imgDimensions"
                      :alt="item.person.name"
                    />
                    <img
                      v-else
                      src="https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-21.png"
                      class="w-100 mr-3 card-img-top rounded imgDimensions"
                      :alt="item.person.name"
                    />
                  </router-link>
                </div>
              </article>
            </div>
          </div> -->
        </section>

        <!-- No shows found -->
        <section v-else class="movies" id="movies">
          <h1>No shows found matching your criteria.</h1>
        </section>
      </div>
    </div>
    <div v-else>
      <div v-if="!shows || !filteredShows" class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ShowsFilter from "./ShowsFilter.vue";

export default {
  name: "Home",
  data() {
    return {
      shows: [], //Full list of shows (remains unmodified)
      people: [],

      //Shows
      //List of properties extracted from the shows, distinct and sorted.
      status: [],
      genres: [],
      languages: [],
      types: [],
      runtime: [],

      filteredShows: null,
      filteredPeople: null,

      //Filters being applied will be stored in fittersApplied
      filtersApplied: {
        status: [],
        genres: [],
        languages: [],
        types: [],
        runtime: 0
      },

      showComponent: false, //Used to display component once data has been fetched.
    };
  },
  components: {
    ShowsFilter,
  },
  props: [
    "id"
  ],
  created() {
      this.searchShows(this.id);
      this.searchPeople(this.id);
  },
  methods: {
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
          if(data.length > 0){
            for(let i = 0; i < data.length; i++){
              this.shows.push(data[i].show);
            }
          }

          //Generating content for the filters using the list of shows
          this.filterStatus();
          this.filterGenres();
          this.filterLanguages();
          this.filterTypes();
          this.filterRuntime();
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
            if(data.length > 0){
            for(let i = 0; i < data.length; i++){
              this.people.push(data[i].person);
            }
          }
            this.showComponent = true;
        })
        .catch(function(error) {
            console.log(error);
        })
      }
      else{
        console.log("Please enter data");
      }
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
    filterTypes: function() {
      if (this.shows.length > 0) {
        for (let i = 0; i < this.shows.length; i++) {
          if (!this.types.includes(this.shows[i].type)) {
            this.types.push(this.shows[i].type);
          }
        }
        this.types.sort();
      }
    },
    filterRuntime: function() {
      if (this.shows.length > 0) {
        for (let i = 0; i < this.shows.length; i++) {
          if (!this.runtime.includes(this.shows[i].runtime)) {
            this.runtime.push(this.shows[i].runtime);
          }
        }
        this.runtime.sort((a, b) => a - b);
      }
    },
    mergeData: function() {
      //Genre filter
      this.filteredShows = [];
      if (this.shows.length > 0) {
        for (let i = 0; i < this.shows.length; i++) {
          let show = this.shows[i];
          let result = show.genres.filter((genre) =>
            this.filtersApplied.genres.includes(genre)
          );
          if (result.length > 0) {
            this.filteredShows.push(show);
          }
        }
      }
      
      //Status filter
      var statusResult = [];
      if (this.filteredShows.length > 0) {
        if (this.filtersApplied.status.length > 0) {
          statusResult = this.filteredShows.filter((show) =>
            this.filtersApplied.status.includes(show.status)
          );
          if (statusResult.length > 0) {
            this.filteredShows = [...statusResult];
          } else {
            this.filteredShows = [];
          }
        }
      } else {
        if (this.filtersApplied.status.length > 0) {
          statusResult = this.shows.filter((show) =>
            this.filtersApplied.status.includes(show.status)
          );
          if (statusResult.length > 0) {
            this.filteredShows = [...statusResult];
          } else {
            this.filteredShows = [];
          }
        }
      }

      //Language filter
      var languageResult = [];
      if (this.filteredShows.length > 0) {
        if (this.filtersApplied.languages.length > 0) {
          languageResult = this.filteredShows.filter((show) =>
            this.filtersApplied.languages.includes(show.language)
          );
          if (languageResult.length > 0) {
            this.filteredShows = [...languageResult];
          } else {
            this.filteredShows = [];
          }
        }
      } else {
        if (this.filtersApplied.languages.length > 0) {
          languageResult = this.shows.filter((show) =>
            this.filtersApplied.languages.includes(show.language)
          );
          if (languageResult.length > 0) {
            this.filteredShows = [...languageResult];
          } else {
            this.filteredShows = [];
          }
        }
      }

      //Types filter
      var typesResult = [];
      if (this.filteredShows.length > 0) {
        if (this.filtersApplied.types.length > 0) {
          typesResult = this.filteredShows.filter((show) =>
            this.filtersApplied.types.includes(show.type)
          );
          if (typesResult.length > 0) {
            this.filteredShows = [...typesResult];
          } else {
            this.filteredShows = [];
          }
        }
      } else {
        if (this.filtersApplied.types.length > 0) {
          typesResult = this.shows.filter((show) =>
            this.filtersApplied.types.includes(show.type)
          );
          if (typesResult.length > 0) {
            this.filteredShows = [...typesResult];
          } else {
            this.filteredShows = [];
          }
        }
      }

      //Runtime
      // var runtimeResult = [];
      // if (this.filteredShows.length > 0) {
      //   if(this.filtersApplied.runtime > 0){
      //     runtimeResult = this.filteredShows.filter((show) => this.filtersApplied.runtime >= show.runtime);
      //   }
      //   if (runtimeResult.length > 0) {
      //       this.filteredShows = [...runtimeResult];
      //     } else {
      //       this.filteredShows = [];
      //     }
      // }
      // else{
      //   if(this.filtersApplied.runtime > 0){
      //     runtimeResult = this.shows.filter((show) => this.filtersApplied.runtime >= show.runtime);
      //   }
      //   if (runtimeResult.length > 0) {
      //       this.filteredShows = [...runtimeResult];
      //     } else {
      //       this.filteredShows = [];
      //     }
      // }

      console.log("Length: " + this.filteredShows.length)
      //TODO: rating, premier (yearly, monthly).
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
    setSelectedTypes: function(data) {
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
    },
    setSelectedRuntime: function(data) {
      if(data > 0){
        this.filtersApplied.runtime = data;
      }
      this.mergeData();
    }  
  },
  watch: {
    id: function(newValue) {
      this.searchShows(newValue);
      this.searchPeople(newValue);
    },
  }
};
</script>

<style scoped>
.title-header {
  padding: 0.75rem 1.25rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid transparent;
}
.title-header h3 {
  font-size: 0.8rem;
  margin: 0;
}
.imgDimensions {
  /* width: 200px; */
  height: 300px;
}
</style>