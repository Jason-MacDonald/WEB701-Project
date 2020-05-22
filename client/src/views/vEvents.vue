<template>
  <div>
    <v-btn to="/new-event">Add Event</v-btn>
    <Events />
  </div>
</template>

<script>
import Events from "@/components/Events.vue";

export default {
  name: "vEvents",
  components: {
    Events
  }
};
</script>