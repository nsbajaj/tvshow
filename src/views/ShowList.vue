<template>
  <div class="home row mx-2">
    <div class="col-2">
      <!-- <ShowsFilter @statusFilter="checkboxFilter"></ShowsFilter> -->
    </div>
    <div class="col-10">
      <h1>Shows:</h1>
      <!-- Shows -->
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
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "ShowList",
  data() {
    return {
      shows: null
    };
  },
  components: {
    
  },
  props: [
    
  ],
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
        })
        .catch(function(error) {
          console.log(error);
        });
    }   
  }
};
</script>
