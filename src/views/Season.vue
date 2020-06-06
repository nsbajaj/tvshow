<template>
  <div>
    <h1 v-if="seasons.length>0">Seasons ({{ seasons.length }})</h1>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Premiere Date</th>
          <th scope="col">End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in seasons"
          :key="item.id"
          :data-index="index"
          @click="$emit('seasonID', item.number)"
        >
          <th scope="row">{{ item.number }}</th>
          <td>{{ item.premiereDate }}</td>
          <td>{{ item.endDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Season",
  data() {
    return {
      
    };
  },
  props: [
    "seasons"
  ],
  created() {
      
  },
  methods: {
    // searchSeasons: function() {
    //   if(this.showID && String(this.showID).trim().length > 0) {
    //     fetch("http://api.tvmaze.com/shows/" + this.showID + "/seasons")
    //       .then(function(response) {
    //         if (!response.ok) {
    //           throw Error(response.statusText);
    //         }
    //         return response;
    //       })
    //       .then((response) => response.json())
    //       .then((data) => {
    //             this.seasons = data;
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   } else {
    //     //console.log("Please enter data");
    //   }
    // },
  }
};
</script>

<style scoped>
tbody{
    min-height:10px;
    overflow-y:scroll;
}
table {
  display: block;
  height: 300px;
  overflow-y: scroll;
}
</style>