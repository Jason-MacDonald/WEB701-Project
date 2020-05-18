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
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/login">
        <h3>Login</h3>
      </router-link>
    </v-app-bar>
    <br />
    <br />
    <br />

    <router-view />end
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
li a {
  text-decoration: none;
  color: black;
}
</style>
