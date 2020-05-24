<template>
  <v-container>
    <v-card class="px-4 py-4">
      <v-card class>
        <h2
          class="px-2 pt-1"
        >{{ this.$store.state.events[this.$store.state.selectedEventIndex].name }}</h2>
        <p
          class="px-2 pb-1"
        >{{ this.$store.state.events[this.$store.state.selectedEventIndex].description }}</p>
        <p
          class="px-2 pb-1"
        >{{ this.$store.state.events[this.$store.state.selectedEventIndex].startDate | formatDate }}</p>
        <p class="px-2 pb-1">
          {{ this.$store.state.events[this.$store.state.selectedEventIndex].startDate | formatTime }} -
          {{ this.$store.state.events[this.$store.state.selectedEventIndex].endDate | formatTime }}
        </p>
        <div class="px-2 pb-4">
          <v-btn @click="deleteEvent()">Delete Event</v-btn>
        </div>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Event",
  methods: {
    deleteEvent() {
      var id = this.$store.state.events[this.$store.state.selectedEventIndex]
        .id;
      this.$store.dispatch("deleteEvent", id);
      this.$router.push("/events");
    }
  }
};
</script>
