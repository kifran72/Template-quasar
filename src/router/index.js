import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test2",
    name: "Test2",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/test2.vue"),
  },
  {
    path: "/salles",
    name: "Salles",

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/salles.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
