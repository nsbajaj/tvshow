<template>
  <div class="container marketing">
    <!-- Three columns of text below the carousel -->
    <h1 class="text-center">Cast</h1>
    <div class="row">
      <div
        class="col-lg-4 my-2"
        v-for="(item, index) in cast"
        :key="item.id"
        :data-index="index"
      >
        <router-link :to="{ name: 'Person', params: { id: item.person.id } }">
          <img
            v-if="item.person.image.medium"
            :src="item.person.image.medium"
            class="rounded mx-auto d-block rounded-circle"
            alt="Generic placeholder image"
            width="200"
            height="200"
          />
          <img
            v-else
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            class="rounded-circle"
            alt="Generic placeholder image"
            width="200"
            height="200"
          />
        </router-link>
        <h4 class="text-center my-1">{{ item.person.name }}</h4>
        <p class="text-center">as</p>
        <h4 class="text-center">{{ item.character.name }}</h4>
      </div>
    </div>
    <!-- /.row -->
  </div>
</template>

<script>
export default {
  name: "Cast",
  data() {
    return {};
  },
  props: ["cast"],
  created() {},
  methods: {
    // searchCast: function() {
    //   if(this.showID && String(this.showID).trim().length > 0) {
    //     fetch("http://api.tvmaze.com/shows/" + this.showID + "/cast")
    //       .then(function(response) {
    //         if (!response.ok) {
    //           throw Error(response.statusText);
    //         }
    //         return response;
    //       })
    //       .then((response) => response.json())
    //       .then((data) => {
    //             this.cast = data;
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   } else {
    //     //console.log("Please enter data");
    //   }
    // },
  },
};
</script>
