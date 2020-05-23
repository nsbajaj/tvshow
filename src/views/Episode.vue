<template>
  <div class="container">
    <div class="row">
      <!-- Post Content Column -->
      <div class="col-lg-12" v-if="episode">
        <!-- Title -->
        <h1 class="mt-4">{{ episode.name }}</h1>

        <hr />

        <p v-if="episode.season">Season: {{ episode.season }}</p>
        <p v-if="episode.number">Episode #: {{ episode.number }}</p>

        <hr />

        <!-- Preview Image -->
        <img
          class="img-fluid rounded"
          v-if="episode.image"
          :src="episode.image.medium"
          :alt="episode.name"
        />
        <img
          v-else
          class="mr-3 img-fluid rounded"
          src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
          :alt="episode.name"
        />
        <hr />

        <!-- Post Content -->
        <h1>Summary</h1>
        <p class="lead">
          {{ episode.summary | stripHTML }}
        </p>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Episode",
  data() {
      return {
        episode: null
      };
  },
  props: ["id"],
  created() {
      if(this.id > 0){
          this.getEpisode(this.id);
      }
  },
  methods: {
    getEpisode: function(data) {
      if (data && String(data).trim().length > 0) {
        fetch("http://api.tvmaze.com/episodes/" + data)
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
            this.episode = data;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //console.log("Please enter data");
      }
    }
  }
};
</script>
