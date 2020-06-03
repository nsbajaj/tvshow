<template>
  <div class="home row mx-2">
    <div class="col-2">
      <!-- <ShowsFilter @statusFilter="checkboxFilter"></ShowsFilter> -->
    </div>
    <div class="col-10">
      <h1>Search results ({{ searchResult.shows.data.length+searchResult.people.data.length }}):</h1>
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
// import ShowsFilter from "./ShowsFilter.vue";

export default {
  name: "Home",
  data() {
    return {
      searchResult: {
        shows: {
          data: null,
          type: "show"
        },
        people: {
          data: null,
          type: "people"
        }
      }
    };
  },
  components: {
    // ShowsFilter,
  },
  props: [
    "id"
  ],
  created() {
      this.searchShows(this.id);
      this.searchPeople(this.id);
  },
  methods: {
    searchShows: function(data){
      if(data && data.trim().length > 0){
        fetch('http://api.tvmaze.com/search/shows?q=' + data)
        .then(function (response){
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            this.searchResult.shows.data = data;
        })
        .catch(function(error) {
            console.log(error);
        })
      }
      else{
        console.log("Please enter data");
      }
    },
    searchPeople: function(data){
      if(data && data.trim().length > 0){
        fetch('http://api.tvmaze.com/search/people?q=' + data)
        .then(function (response){
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            this.searchResult.people.data = data;
        })
        .catch(function(error) {
            console.log(error);
        })
      }
      else{
        console.log("Please enter data");
      }
    }      
  },
  watch: {
    id: function(newValue) {
      this.searchShows(newValue);
      this.searchPeople(newValue);
    },
  }
};
</script>
