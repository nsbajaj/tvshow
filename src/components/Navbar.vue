<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <router-link :to="{ path: '/shows' }" class="navbar-brand">tvshow</router-link> -->

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <!-- <li class="nav-item active">
            <router-link :to="{ path: '/' }" class="nav-link" href="#"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li> -->
          <li class="nav-item">
            <router-link :to="{ path: '/shows' }" class="nav-link" href="#"
              >Shows <span class="sr-only"></span
            ></router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/about' }" class="nav-link" href="#"
              >About <span class="sr-only"></span
            ></router-link>
          </li>
          <li class="nav-item">
            <!-- <i class="fas fa-dollar-sign"></i>
            <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
            <font-awesome-icon
              icon="shopping-cart"
              class="mx-2"
            ></font-awesome-icon> -->
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <!-- https://www.w3schools.com/howto/howto_css_animated_search.asp -->
          <input
            v-model="input"
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <router-link
            :to="{ name: 'Search', params: { id: input } }"
            v-if="input"
            class="animated fadeInRight"
          >
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
// import $ from 'jquery'
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "navbar",
  data() {
    return {
      input: null,
    };
  },
  components: {
    // FontAwesomeIcon,
  },
  computed: {
    
  },
  methods: {
    // expand: function() {
    //   $("input.expand").focus(function() {
    //     $(this).animate({ height: "4em" }, 500);
    //   });
    // },
  },
};
</script>

<style scoped>
/* input[type="text"] {
  width: 100px;
  padding: 12px 20px 12px 40px;
  -webkit-transition: width 0.5s ease-in;
  transition: width 0.5s ease-in;
}

input[type="text"]:focus {
  width: 100%;
} */
</style>
