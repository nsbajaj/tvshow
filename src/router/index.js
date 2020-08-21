import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import ShowList from "../views/ShowList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: ShowList
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/shows",
    name: "Shows",
    props: true,
    component: () =>
      import(/* webpackChunkName: "shows" */ "../views/ShowList.vue")
  },
  {
    path: "/show/:id",
    name: "Show",
    props: true,
    component: () =>
      import(/* webpackChunkName: "show" */ "../views/Show.vue")
  },
  {
    path: "/person/:id",
    name: "Person",
    props: true,
    component: () =>
      import(/* webpackChunkName: "person" */ "../views/Person.vue")
  },
  {
    path: "/episode/:id",
    name: "Episode",
    props: true,
    component: () =>
      import(/* webpackChunkName: "episode" */ "../views/Episode.vue")
  },
  {
    path: "/search/:id",
    name: "Search",
    props: true,
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/SearchResult.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
