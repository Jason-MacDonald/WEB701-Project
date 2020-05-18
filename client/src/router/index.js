import Vue from "vue";
import VueRouter from "vue-router";
import vHome from "../views/vHome.vue";
import vEvents from "../views/vEvents.vue";
import vEvent from "../views/vEvent.vue";
import vMembers from "../views/vMembers.vue";
import vItems from "../views/vItems.vue";
import vNewEvent from "../views/vNewEvent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: vHome,
  },
  {
    path: "/events",
    name: "Events",
    component: vEvents,
  },
  {
    path: "/event",
    name: "Event",
    component: vEvent,
  },
  {
    path: "/members",
    name: "Members",
    component: vMembers,
  },
  {
    path: "/items",
    name: "Items",
    component: vItems,
  },
  {
    path: "/new-event",
    name: "NewEvent",
    component: vNewEvent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
