import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Events from "../views/Events.vue";
import Members from "../views/Members.vue";
import Items from "../views/Items.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/events",
    name: "Events",
    component: Events,
  },
  {
    path: "/members",
    name: "Members",
    component: Members,
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
