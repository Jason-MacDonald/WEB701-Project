import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("jwt"),
    account: null,
    selectedEventIndex: 0,
    selectedItemIndex: 0,
    selectedMemberIndex: 0,
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
    // ##### UPDATE INDEX #####
    updateSelectedEventIndex(state, index) {
      state.selectedEventIndex = index;
    },
    updateSelectedItemIndex(state, index) {
      state.selectedItemIndex = index;
    },
    updateSelectedMemberIndex(state, index) {
      state.selectedMemberIndex = index;
    },
    setAccountDetails(state, account) {
      state.account = account;
    },
    // ##### TOKEN #####
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("jwt", token);
    },
    clearAccount(state) {
      state.account = null;
    },
  },
  actions: {
    // ##### API CALLS #####
    // ### ACCOUNT ###
    async register(unused, user) {
      await axios.post("http://localhost:3000/api/users/register", user);
    },
    async login({ commit }, user) {
      let jwt = await (
        await axios.post("http://localhost:3000/api/users/login", user)
      ).data;
      commit("setToken", jwt);
    },
    async getAccount({ commit }) {
      const endpoint = await axios.get(
        "http://localhost:3000/api/users/account",
        {
          headers: { authorization: localStorage.getItem("jwt") },
        }
      );
      commit("setAccountDetails", endpoint.data);
    },
    async putUser(unsued, user) {
      axios.put("http://localhost:3000/api/users/account/update", user);
    },

    // ### GET ALL ###
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
    async getBids(unused, id) {
      const endpoint = await axios.get("http://localhost:3000/api/bids/" + id);
      return endpoint.data;
    },
    // ### POST ###
    async postNewEvent(unused, data) {
      await axios.post("http://localhost:3000/api/event", data);
      this.dispatch("getEvents");
    },
    async postNewItem(unused, data) {
      console.log(localStorage.getItem("jwt"));
      await axios.post("http://localhost:3000/api/item", data, {
        headers: { authorization: localStorage.getItem("jwt") },
      });
      this.dispatch("getItem");
    },
    // ### PUT ###
    async putItem(unsued, item) {
      axios.put("http://localhost:3000/api/item", item);
      this.dispatch("getItems");
    },
    // ### DELETE ###
    async deleteEvent(unused, id) {
      await axios.delete("http://localhost:3000/api/event/" + id);
    },
    async deleteItem(unused, id) {
      console.log(id);
      await axios.delete("http://localhost:3000/api/item/" + id);
    },
    // ##### STORE MANIPULATIN #####
    // ### SET INDEX ###
    async selectEvent({ commit }, index) {
      commit("updateSelectedEventIndex", index);
    },
    async selectItem({ commit }, index) {
      commit("updateSelectedItemIndex", index);
    },
    async selectMember({ commit }, index) {
      commit("updateSelectedMemberIndex", index);
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null;
    },
  },
  modules: {},
});
