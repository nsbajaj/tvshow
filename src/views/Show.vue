<template>
  <div class="container">
    <div class="row animated fadeInUp" v-if="showComponent">
      <!-- Post Content Column -->
      <div class="col-lg-12" v-if="show">
        <!-- Title -->
        <h1 class="mt-4">{{ show.name }}</h1>

        <!-- Author -->
        <p class="lead" v-if="show.network">
          by
          {{ show.network.name }}
        </p>

        <hr />

        <!-- Premiered -->
        <!-- <p>Premiered on {{ show.premiered }}</p> -->
        <p v-if="show.rating">Rating: {{ show.rating.average }}</p>

        <hr />

        <!-- Preview Image -->
        <img
          class="img-fluid rounded"
          v-if="show.image"
          :src="show.image.medium"
          :alt="show.name"
        />
        <img
          v-else
          class="mr-3 img-fluid rounded"
          src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
          :alt="show.name"
        />
        <hr />

        <!-- Post Content -->
        
        <p class="lead">
          {{ show.summary | stripHTML }}
        </p>

        <hr />

        <Cast :cast="show._embedded.cast"></Cast>
        
        <hr />

        <div class="row">
          <div class="col-4">
            <!-- <Season :showID="show.id" @seasonID="setSeasonID"></Season> -->
            <Season :seasons="show._embedded.seasons" @seasonID="setSeasonID"></Season>
          </div>
          <div class="col-8">
            <EpisodeList v-if="episodes.length>0" :episodes="episodes"></EpisodeList>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div v-else class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import Cast from "./Cast.vue";
import EpisodeList from "./EpisodeList.vue";
import Season from "./Season.vue";

export default {
  name: "show",
  data() {
    return {
      show: null,
      seasonID: 0,
      episodes: [],
      showComponent: false, //Used to display component once data has been fetched.
    };
  },
  props: [
    "id"
  ],
  methods: {
    setSeasonID: function(data){
      if(data > 0){
        this.episodes = this.show._embedded.episodes.filter(episode => episode.season == data);
      }
    },
    searchShow: function(data) {
      if (data && String(data).trim().length > 0) {
        fetch("http://api.tvmaze.com/shows/" + data + "?embed[]=seasons&embed[]=episodes&embed[]=cast")
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
            this.show = data;
            if(this.show){
              this.showComponent = true;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //console.log("Please enter data");
      }
    },
  },
  created() {
    //console.log(this.$route.query);
    this.searchShow(this.id);
  },
  components: {
    Cast,
    EpisodeList,
    Season
  }
};
</script>
