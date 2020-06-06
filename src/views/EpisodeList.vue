<template>
  <div>
    <h1 v-if="episodes.length>0">Episodes ({{ episodes.length }})</h1>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Airdate</th>
          <th scope="col">Runtime (Minutes)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in episodes"
          :key="item.id"
          :data-index="index"
        >
          <th scope="row">{{ item.number }}</th>
          <router-link :to="{ name: 'Episode', params: { id: item.id } }">
            <td>{{ item.name }}</td>
          </router-link>
          <td>{{ item.airdate }}</td>
          <td>{{ item.runtime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "EpisodeList",
  data() {
    return {
      
    };
  },
  props: ["showID", "episodes"],
  created() {
  
  },
  methods: {
    //searchEpisodesByShow: gets all the episodes for the SeasonID.
    // searchEpisodesBySeason: function() {
    //   if (this.seasonID && String(this.seasonID).trim().length > 0) {
    //     fetch("http://api.tvmaze.com/seasons/" + this.seasonID + "/episodes")
    //       .then(function(response) {
    //         if (!response.ok) {
    //           throw Error(response.statusText);
    //         }
    //         return response;
    //       })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         this.episodes = data;
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   } else {
    //     //console.log("Please enter data");
    //   }
    // },
    /*
    Improvement for future: Don't fetch all the data, fetch little by little.
    */
    //searchEpisodes: gets all the episodes for the showID.
    // searchEpisodesByShow: function() {
    //   if (this.showID && String(this.showID).trim().length > 0) {
    //     fetch("http://api.tvmaze.com/shows/" + this.showID + "/episodes")
    //       .then(function(response) {
    //         if (!response.ok) {
    //           throw Error(response.statusText);
    //         }
    //         return response;
    //       })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         this.episodes = data;
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   } else {
    //     //console.log("Please enter data");
    //   }
    // },
  },
  // watch: {
  //   seasonID: function(newValue) {
  //     this.searchEpisodesBySeason(newValue);
  //   },
  // },
};
</script>

<style scoped>
tbody {
  min-height: 10px;
  overflow-y: scroll;
}
table {
  display: block;
  height: 300px;
  overflow-y: scroll;
}
</style>
