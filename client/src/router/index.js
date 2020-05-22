import Vue from "vue";
import VueRouter from "vue-router";
// ##### HOME #####
import vHome from "../views/vHome.vue";
// ##### EVENTS #####
import vEvents from "../views/vEvents.vue";
import vEvent from "../views/vEvent.vue";
import vNewEvent from "../views/vNewEvent.vue";
// ##### MEMBERS #####
import vMembers from "../views/vMembers.vue";
import vMember from "../views/vMember.vue";
// ##### ITEMS ######
import vItems from "../views/vItems.vue";
import vItem from "../views/vItem.vue";
import vNewItem from "../views/vNewItem.vue";

Vue.use(VueRouter);

const routes = [
  // ##### HOME ######
  {
    path: "/",
    name: "Home",
    component: vHome,
  },
  // ##### EVENTS #####
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
    path: "/new-event",
    name: "NewEvent",
    component: vNewEvent,
  },
  // ##### MEMBERS #####
  {
    path: "/members",
    name: "Members",
    component: vMembers,
  },
  {
    path: "/member",
    name: "Member",
    component: vMember,
  },
  // ##### ITEMS #####
  {
    path: "/items",
    name: "Items",
    component: vItems,
  },
  {
    path: "/item",
    name: "Item",
    component: vItem,
  },
  {
    path: "/new-item",
    name: "NewItem",
    component: vNewItem,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
