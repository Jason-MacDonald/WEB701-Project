<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <div v-for="(event, index) in this.$store.state.events" :key="index">
        <v-card class>
          <h2 class="px-2 pt-1">{{ event.name }}</h2>
          <p class="px-2 pb-1">{{ event.description }}</p>
          <p class="px-2 pb-1">{{ event.startDate | formatDate }}</p>
          <p class="px-2 pb-1">
            {{ event.startDate | formatTime }} -
            {{ event.endDate | formatTime }}
          </p>
          <router-link style="text-decoration: none; color: inherit;" to="/event">
            <p class="px-2 py-1">See More</p>
          </router-link>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Events",

  created() {
    this.$store.dispatch("getEvents");
  }
};
</script>
