<template>
  <div>
    <div class="mx-3" v-if="this.$store.state.account != null">
      <div class="mx-3" v-if="this.$store.state.account.type == 'Member'">
        <v-btn to="/new-item">Add Item</v-btn>
      </div>
    </div>

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