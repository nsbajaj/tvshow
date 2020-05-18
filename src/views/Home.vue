<template>
  <div class="home row mx-2">
    <div class="col-2" style="background-color:red;">
      <ShowsFilter @statusFilter="checkboxFilter"></ShowsFilter>
    </div>
    <div class="col-10" style="background-color:yellow;">
      <h1>Shows: </h1>
      <ul class="list-unstyled" v-for="(item, index) in shows" :key="item.id" :data-index="index">
        <li class="media">
          <router-link :to="{ name: 'Show', params: { id: item.show.id } }">
            <img v-if="item.show.image" :src="item.show.image.medium" class="mr-3 img-fluid rounded" :alt="item.show.name">
            <img v-else src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png" class="mr-3" :alt="item.show.name">
          </router-link>
          <div class="media-body">
            <router-link :to="{ name: 'Show', params: { id: item.show.id } }">
              <h5 class="mt-0 mb-1">{{ item.show.status }}</h5>
              <h5 class="mt-0 mb-1">{{ item.show.name }}</h5>
            </router-link>
            Description: {{ item.show.summary | stripHTML }}
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
      filterShows: []
    }
  },
  components: {
    ShowsFilter
  },
  props: [
    'shows'
  ],
  created() {
    //console.log(this.shows);
  },
  methods: {
    checkboxFilter: function(status){
      console.log(status);
      this.showsOriginal = this.shows;
      
      for(let i = 0; i < status.length; i++){
        for(let j = this.shows.length-1; j >= 0; j--) {
          if(this.shows[j].show.status == status[i]){
            this.shows.splice(j, 1);
          }
        }
      }
    }
  }
};
</script>
