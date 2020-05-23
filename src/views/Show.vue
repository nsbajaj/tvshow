<template>
  <div class="container">
    <div class="row">
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

        <!-- Rating -->
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

        <Cast :showID="show.id"></Cast>
        
        <hr />

        <div class="row">
          <div class="col-4">
            <Season :showID="show.id" @seasonID="setSeasonID"></Season>
          </div>
          <div class="col-8">
            <EpisodeList v-if="seasonID>0" :seasonID="seasonID"></EpisodeList>
          </div>
        </div>
        <hr />
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
      seasonID: 0
    };
  },
  props: [
    "id"
  ],
  methods: {
    setSeasonID: function(data){
      if(data > 0){
        this.seasonID = data;
      }
    },
    searchShow: function(data) {
      if (data && String(data).trim().length > 0) {
        fetch("http://api.tvmaze.com/shows/" + data)
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
            this.show = data;
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
    //console.log("Shows component");
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
