<template>
  <div id="app" class="mx-auto">
    <div id="nav" class="animated fadeInDown">
      <Navbar></Navbar>
    </div>
    
    <router-view
      class="container-fluid"
      style="padding-top: 80px;"
    ></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  data: function(){
    return {
    };
  },
  methods: {  
  },
  mounted: function(){
  
  }
}
</script>

