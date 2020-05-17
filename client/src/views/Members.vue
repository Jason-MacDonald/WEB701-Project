<template>
  <div>
    <h2>Members:</h2>
    <Members />
  </div>
</template>

<script>
import Members from "@/components/Members.vue";

export default {
  name: "Home",
  components: {
    Members
  }
};
</script>