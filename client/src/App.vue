<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link
        class="mx-3"
        style="text-decoration: none; color: inherit;"
        to="/"
      >NGC Nelson Galleries Collective</router-link>

      <v-spacer></v-spacer>

      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/events">Events</router-link>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/members">Members</router-link>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/items">Items</router-link>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/login">Login</router-link>
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
