<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <div v-for="(event, index) in this.$store.state.events" :key="index">
        <v-card class>
          <p class="px-2 pt-1">{{event.name}}</p>
          <p class="px-2 pb-1">{{event.description}}</p>
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
