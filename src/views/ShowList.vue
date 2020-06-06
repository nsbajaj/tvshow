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
    <!-- Layout credit: https://bootsnipp.com/snippets/vr6qd -->
    <div class="col-10" v-if="showComponent">
      <!-- Shows -->
      <section
        class="movies"
        id="movies"
        v-if="
          filtersApplied.status.length == 0 &&
            filtersApplied.genres.length == 0 &&
            filtersApplied.languages.length == 0 &&
            filtersApplied.types.length == 0
        "
      >
        <h1>Shows ({{ shows.length }}):</h1>
        <div class="row">
          <div
            class="col-lg-3 col-md-4 col-sm-6 my-2"
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
              <div class="card-block">
                <div class="img-card">
                  <router-link :to="{ name: 'Show', params: { id: item.id } }">
                    <img
                      v-if="item.image"
                      :src="item.image.original"
                      class="w-100 mr-3 img-fluid rounded"
                      :alt="item.name"
                    />
                    <img
                      v-else
                      src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
                      class="w-100 mr-3 img-fluid rounded"
                      :alt="item.name"
                    />
                  </router-link>
                </div>
                <p class="tagline card-text text-xs-center mx-2">
                  Count: {{ item.summary.length }}
                  <!-- Description: {{ item.summary.substring(0, 100) | stripHTML }} -->
                  Description: {{ item.summary | stripHTML }}
                </p>

                Status:
                <p>{{ item.status }}</p>

                Genres:
                <p v-for="(genre, index) in item.genres" :key="index">
                  {{ genre }}
                </p>

                Language:
                <p>{{ item.language }}</p>

                Type:
                <p>{{ item.type }}</p>

                <router-link
                  :to="{ name: 'Show', params: { id: item.id } }"
                  class="btn btn-primary btn-block"
                >
                  <i class="fa fa-eye"></i> View Details
                </router-link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Filtered Shows -->
      <section class="movies" id="movies" v-else-if="filteredShows.length > 0">
        <h1>Shows ({{ filteredShows.length }}):</h1>
        <div class="row">
          <div
            class="col-lg-3 col-md-4 col-sm-6"
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
              <div class="card-block">
                <div class="img-card">
                  <router-link :to="{ name: 'Show', params: { id: item.id } }">
                    <img
                      v-if="item.image"
                      :src="item.image.original"
                      class="w-100 mr-3 img-fluid rounded"
                      :alt="item.name"
                    />
                    <img
                      v-else
                      src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
                      class="w-100 mr-3 img-fluid rounded"
                      :alt="item.name"
                    />
                  </router-link>
                </div>
                <p class="tagline card-text text-xs-center">
                  Description: {{ item.summary | stripHTML }}
                </p>

                Status:
                <p>{{ item.status }}</p>

                Genres:
                <p v-for="(genre, index) in item.genres" :key="index">
                  {{ genre }}
                </p>

                Language:
                <p>{{ item.language }}</p>

                Type:
                <p>{{ item.type }}</p>

                <router-link
                  :to="{ name: 'Show', params: { id: item.id } }"
                  class="btn btn-primary btn-block"
                >
                  <i class="fa fa-eye"></i> View Details
                </router-link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- No shows found -->
      <section v-else class="movies" id="movies">
        <h1>No shows found matching your criteria.</h1>
      </section>
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
        types: [],
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

      //TODO: rating, runtime, premier (yearly, monthly).
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
  },
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
/* .movies {
  margin-top: 2rem;
} */
.img-card {
  width: 100%;
  margin-bottom: 0.4rem;
}
.movies {
  margin-bottom: 0.6rem;
}
.series {
  margin-bottom: 0.6rem;
}
.footer {
  padding: 1rem 0;
  margin-top: 2rem;
  font-size: 80%;
  text-align: left;
}
.footer p {
  margin: 0;
}
.footer-links {
  padding-left: 0;
  margin-bottom: 1rem;
}
.footer-links li {
  display: inline-block;
}
.footer a {
  font-weight: 500;
  color: inherit;
}
.footer-links li + li {
  margin-left: 1rem;
}
/* Bug Bootstrap V4.0.6 - Mobile - SCSS _navbar*/
.navbar {
  display: block;
}
</style>
