<template>
  <div>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import ShowsFilter from "./ShowsFilter.vue";

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
    // ShowsFilter,
  },
  props: [
    // "searchResult"
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
