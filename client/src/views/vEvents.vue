<template>
  <div>
    <div class="mx-3" v-if="this.$store.state.account != null">
      <div class="mx-3" v-if="this.$store.state.account.type == 'Member'">
        <v-btn to="/new-event">Add Event</v-btn>
      </div>
    </div>
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