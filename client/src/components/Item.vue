<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <v-card class>
        <h2
          class="px-2 pt-1"
        >{{ this.$store.state.items[this.$store.state.selectedItemIndex].name }}</h2>
        <p
          class="px-2 pb-1"
        >{{ this.$store.state.items[this.$store.state.selectedItemIndex].description }}</p>
        <div class="px-2 pb-4">
          <v-btn @click="deleteEvent()">Delete Item</v-btn>
        </div>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Item",
  methods: {
    deleteEvent() {
      var id = this.$store.state.items[this.$store.state.selectedItemIndex].id;
      this.$store.dispatch("deleteItem", id);
      this.$router.push("/items");
    }
  }
};
</script>