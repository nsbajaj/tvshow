<template>
  <div class="home row mx-2">
    <div class="col-2">
      <ShowsFilter @statusFilter="checkboxFilter"></ShowsFilter>
    </div>
    <div class="col-10">
      <h1>Search results:</h1>
      <!-- Shows -->
      <ul class="list-unstyled">
        <li
          class="media my-4"
          v-for="(item, index) in searchResult.shows.data"
          :key="item.id"
          :data-index="index"
        >
          <router-link :to="{ name: 'Show', params: { id: item.show.id } }">
            <img
              v-if="item.show.image"
              :src="item.show.image.medium"
              class="mr-3 img-fluid rounded"
              :alt="item.show.name"
            />
            <img
              v-else
              src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
              class="mr-3"
              :alt="item.show.name"
            />
          </router-link>
          <div class="media-body">
            <router-link :to="{ name: 'Show', params: { id: item.show.id } }">
              <!-- <h5 class="mt-0 mb-1">{{ item.show.status }}</h5> -->
              <h5 class="mt-0 mb-1">{{ item.show.name }}</h5>
            </router-link>
            Description: {{ item.show.summary | stripHTML }}
          </div>
        </li>
      </ul>

      <!-- People -->
      <!-- Shows -->
      <ul class="list-unstyled">
        <li
          class="media my-4"
          v-for="(item, index) in searchResult.people.data"
          :key="item.person.id"
          :data-index="index"
        >
          <router-link :to="{ name: 'Person', params: { id: item.person.id } }">
            <img
              v-if="item.person.image"
              :src="item.person.image.medium"
              class="mr-3 img-fluid rounded"
              :alt="item.person.name"
            />
            <img
              v-else
              src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
              class="mr-3"
              :alt="item.person.name"
            />
          </router-link>
          <div class="media-body">
            <router-link
              :to="{ name: 'Person', params: { id: item.person.id } }"
            >
              <h5 class="mt-0 mb-1">{{ item.person.name }}</h5>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ShowsFilter from "./ShowsFilter.vue";

export default {
  name: "Home",
  data() {
    return {
      showsOriginal: null,
      filterShows: [],
      // searchResult: {
      //   shows: {
      //     data: null,
      //     type: "show"
      //   },
      //   people: {
      //     data: null,
      //     type: "people"
      //   }
      // }
    };
  },
  components: {
    ShowsFilter,
  },
  props: [
    "searchResult"
  ],
  created() {
    //this.getAllShows();
  },
  methods: {
    // getAllShows: function() {
    //   fetch("http://api.tvmaze.com/shows")
    //     .then(function(response) {
    //       if (!response.ok) {
    //         throw Error(response.statusText);
    //       }
    //       return response;
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       this.searchResult.shows.data = data;
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    //https://codepen.io/brokunMusheen/pen/KzbayG
    checkboxFilter: function(status) {
      console.log(status);

      if (status.length > 0) {
        for (let i = 0; i < status.length; i++) {
          for (let j = this.shows.length - 1; j >= 0; j--) {
            if (this.shows[j].show.status != status[i]) {
              this.filterShows.push(this.shows[j]);
              this.shows.splice(j, 1);
            }
          }
        }
      } else {
        for (let j = this.filterShows.length - 1; j >= 0; j--) {
          if (this.filterShows[j].show.name != status) {
            this.shows.push(this.filterShows[j]);
            this.filterShows.splice(j, 1);
          }
        }
      }
      //Works but needs to be put in a different function which tracks unchecking of that specific checkbox
      // for(let j = 0; j < this.filterShows.length; j++){
      //   if(this.filterShows[j].show.name != status){
      //     this.shows.push(this.filterShows[j]);
      //   }
      // }
    },
  },
};
</script>
