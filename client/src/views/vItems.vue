<template>
  <div>
    <v-btn to="/new-item">Add Item</v-btn>
    <Items />
  </div>
</template>

<script>
import Items from "@/components/Items.vue";

export default {
  name: "vItems",
  components: {
    Items
  }
};
</script>