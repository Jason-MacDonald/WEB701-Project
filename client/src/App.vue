<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/">
        <h2>NGC Nelson Galleries Collective</h2>
      </router-link>

      <v-spacer></v-spacer>

      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/events">
        <h3>Events</h3>
      </router-link>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/members">
        <h3>Members</h3>
      </router-link>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/items">
        <h3>Items</h3>
      </router-link>

      <div class="mx-3" v-if="this.$store.state.token == null">
        <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/login">
          <h3>Login</h3>
        </router-link>
      </div>
      <div class="mx-3" v-if="this.$store.state.token != null">
        <router-link style="text-decoration: none; color: inherit;" to="/account">
          <h3>Account</h3>
        </router-link>
      </div>
      <div class="mx-3" v-if="this.$store.state.token != null">
        <v-btn style="text-decoration: none; color: inherit;" @click="logout()">
          <h3>Logout</h3>
        </v-btn>
      </div>
    </v-app-bar>
    <br />
    <br />
    <br />

    <router-view />end
  </v-app>
</template>

<script>
export default {
  name: "App",
  loggedIn: false,
  created() {
    if (localStorage.getItem("jwt") != "null") {
      this.loggedIn = true;
      console.log(localStorage.getItem("jwt"));
    } else {
      this.loggedIn = false;
      console.log(localStorage.getItem("jwt"));
    }
  },
  methods: {
    logout() {
      this.$store.commit("setToken", null);
      this.$store.commit("clearAccount", null);
      this.$router.push("/login");
      var storage = window.localStorage;
      storage.clear();
    }
  },
  mounted() {
    // Clears storage when browser is closed.
    // window.onbeforeunload = function() {
    //   var storage = window.localStorage;
    //   storage.clear();
    //};
  }
};
</script>

<style scoped>
li a {
  text-decoration: none;
  color: black;
}
</style>
