<template>
  <div>
    <h2>Items:</h2>
    <Items />
  </div>
</template>

<script>
import Items from "@/components/Items.vue";

export default {
  name: "Home",
  components: {
    Items
  }
};
</script>