<template>
  <div>
    <h2>Events:</h2>
    <Events />
  </div>
</template>

<script>
import Events from "@/components/Events.vue";

export default {
  name: "Home",
  components: {
    Events
  }
};
</script>