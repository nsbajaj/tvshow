<template>
  <div class="home row mx-2">
    <div class="col-2">
      <ShowsFilter
        v-if="shows"
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
      genres: [],
      filteredShows: []
      // query: [
      //   "Drama"
      // ]
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
          this.filterGenres();
        })
        .catch(function(error) {
          console.log(error);
        });
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
    setSelectedGenres: function(data) {
      this.filteredShows = [];
      if(data.length > 0){
       for(let i = 0; i < this.shows.length; i++){
          let show = this.shows[i];
          let result = show.genres.filter(genre => data.includes(genre));
          if(result.length > 0){
            this.filteredShows.push(show);
          }
       }
      }
    },
  },
};
</script>
