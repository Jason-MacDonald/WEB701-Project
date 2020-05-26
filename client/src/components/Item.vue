<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-4">
      <v-card class="mb-4">
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

      <v-card class="px-4 pt-3 pb-2">
        <h2>Bids:</h2>
        <div v-for="(bid, index) in bids" :key="index">
          <v-card class="my-2">
            {{bid.userEmail}} -
            ${{bid.bid}}
          </v-card>
        </div>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Item",
  data: () => ({
    bids: []
  }),
  methods: {
    deleteEvent() {
      var id = this.$store.state.items[this.$store.state.selectedItemIndex].id;
      this.$store.dispatch("deleteItem", id);
      this.$router.push("/items");
    }
  },
  async created() {
    var id = this.$store.state.items[this.$store.state.selectedItemIndex].id;
    this.bids = await this.$store.dispatch("getBids", id);
  }
};
</script>