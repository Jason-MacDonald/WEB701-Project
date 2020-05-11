import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    items: [],
    members: [],
  },
  mutations: {
    // ##### REFRESH #####
    refreshEvents(state, events) {
      state.events = events;
    },
    refreshItems(state, items) {
      state.items = items;
    },
    refreshMembers(state, members) {
      state.members = members;
    },
  },
  actions: {
    // ##### GET ALL #####
    async getEvents({ commit }) {
      const endpoint = await axios.get("http://localhost:3000/api/events");
      var events = endpoint.data;
      commit("refreshEvents", events);
    },
    async getItems({ commit }) {
      const endpoint = await axios.get("http://localhost:3000/api/items");
      var items = endpoint.data;
      commit("refreshItems", items);
    },
    async getMembers({ commit }) {
      const endpoint = await axios.get("http://localhost:3000/api/members");
      var members = endpoint.data;
      commit("refreshMembers", members);
    },
  },
  modules: {},
});
