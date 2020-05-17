<template>
  <div class="home" style="padding-top: 80px;">
    <ul v-for="(item, index) in shows" :key="item.id" :data-index="index">
      <li>
        <label>ID: {{ item.show.id }}</label>
        <br>
        <router-link :to="{ name: 'Show', params: { id: item.show.id } }">
          <label>Name: {{ item.show.name }}</label>
        </router-link>
        <br>
        <label>Rating: {{ item.show.rating.average }}</label>
        <br>
        <label>Summary: {{ item.show.summary | stripHTML }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  props: [
    'shows'
  ],
  created() {
    //console.log(this.shows);
  },
  filters: {
    stripHTML: function(string) {
      return string.replace(/<\/?[^>]+>/ig, " "); 
    }
  }
};
</script>
