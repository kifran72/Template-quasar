import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/home.vue"),
  },
  {
    path: "/test2",
    name: "Test2",
    component: () => import("../components/test2.vue"),
  },
  {
    path: "/salles",
    name: "Salles",
    component: () => import("../components/salles.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
