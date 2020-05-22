<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <v-card class>
        <h2
          class="px-2 pt-1"
        >{{ this.$store.state.events[this.$store.state.selectedEventIndex].name }}</h2>
        <p class="px-2 pb-1">{{ this.$store.state.events[1].description }}</p>
        <p class="px-2 pb-1">{{ this.$store.state.events[1].startDate | formatDate }}</p>
        <p class="px-2 pb-1">
          {{ this.$store.state.events[1].startDate | formatTime }} -
          {{ this.$store.state.events[1].endDate | formatTime }}
        </p>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Event"
};
</script>
