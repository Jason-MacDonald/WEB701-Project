<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-5">
      <v-card class="px-4 mb-4 py-1">
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

      <div v-if="this.bids.length > 0">
        <v-card class="px-4 mb-4 py-1">
          <v-form>
            <h2>Place Bid:</h2>
            <p>
              <b>Estimated Value:</b> $5000
              <br />
              <b>Leading Bid:</b>
              {{bids[0].bid}}
            </p>
            <v-text-field :rules="bidRules" prefix="$" v-model="bid" single-line type="number" />
            <div class="px-2 pb-4">
              <v-btn>Submit Bid</v-btn>
            </div>
          </v-form>
        </v-card>

        <v-card class="px-4 pt-3 pb-2 py-1">
          <h2>Bids:</h2>
          <div v-for="(bid, index) in bids" :key="index">
            <v-card class="my-2">
              {{bid.userEmail}} -
              ${{bid.bid}}
            </v-card>
          </div>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Item",
  data: () => ({
    bid: null,
    bidRules: [
      bid => !!bid || "required",
      bid => bid > 0 || "positive values only"
    ],
    bids: []
  }),
  methods: {
    async deleteEvent() {
      var item = this.$store.state.items[this.$store.state.selectedItemIndex];
      item.active = false;
      await this.$store.dispatch("putItem", item);
      this.$router.push("/items");
    }
  },
  async created() {
    var id = this.$store.state.items[this.$store.state.selectedItemIndex].id;
    this.bids = await this.$store.dispatch("getBids", id);
    if (this.bids.length > 0) {
      this.bid = this.bids[0].bid;
    }
  }
};
</script>