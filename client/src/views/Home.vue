<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Events msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Events from "@/components/Events.vue";

export default {
  name: "Home",
  components: {
    Events
  }
};
</script>
