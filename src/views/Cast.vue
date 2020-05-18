<template>
  <div>
    <h1>Cast</h1>
    <ul class="list-unstyled">
      <li class="media my-3" v-for="(item, index) in cast" :key="item.id" :data-index="index">
        <router-link :to="{ name: 'Person', params: { id: item.person.id }}">
            <img v-if="item.person.image.medium" :src="item.person.image.medium" class="mr-3 img-fluid rounded" :alt="item.name">
        </router-link>
        <div class="media-body">
          <router-link :to="{ name: 'Person', params: { id: item.person.id } }">
            <h5 class="mt-0 mb-1">{{ item.person.name }} as {{ item.character.name }}</h5>
          </router-link>
          <p>Birthday: {{ item.person.birthday }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Cast",
  data() {
      return {
          cast: null
      }
  },
  props: [
    "showID"
  ],
  created() {
      this.searchCast();
  },
  methods: {
    searchCast: function() {
      if(this.showID && String(this.showID).trim().length > 0) {
        fetch("http://api.tvmaze.com/shows/" + this.showID + "/cast")
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
                this.cast = data;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //console.log("Please enter data");
      }
    },
  },
};
</script>
