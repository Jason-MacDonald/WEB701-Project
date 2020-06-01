<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-5">
      <!-- ##### ITEM INFORMATION ##### -->
      <v-card class="px-4 mb-4 py-1">

        <!-- ##### ITEM TITLE ##### -->
        <h2 class="px-2 pt-1">
          {{ item.name }}
        </h2>

        <!-- ##### ITEM DESCRIPTION ##### -->
        <p class="px-2 mt-3"> 
          {{ item.description }}
        </p>

        <!-- ##### ITEM EMAIL DISPLAY ##### -->
        <p class="px-2 pb-1 mt-n3"> 
          {{ item.email }}
        </p>

        <!-- ##### DELETE ITEM BUTTON ##### -->
        <!-- 
          Only displayed if the current account email is the same as the item creators email.
         -->
        <div class="px-2 pb-4">
          <div v-if="this.$store.state.account != null">
            <div v-if="this.$store.state.account.email == this.$store.state.items[this.$store.state.selectedItemIndex].email">
              <v-btn @click="deactivateItem()">Delete Item</v-btn>
            </div>
          </div>
        </div>

      </v-card>

      <!-- ##### BIDDING FORM ##### -->
      <v-card class="px-4 mb-4 py-1">
        <v-form>

          <!-- ##### BIDDING FORM TITLE ##### -->
          <h2>Place Bid:</h2>
          
          <!-- ##### BID INFORMATION ##### -->
          <p>
            <!-- ##### ESTIMATED BID ##### -->
            <b>Estimated Value:</b> $5000 <br />
            
            <!-- ##### LEADING BID ##### -->
            <b>Leading Bid:</b>

              <!-- IF THERE ARE BIDS: -->
              <span v-if="this.$store.state.itemBids.length > 0">
                {{this.$store.state.itemBids[0].bid}}
              </span>

              <!-- IF THERE ARE NO BIDS: -->
              <span v-else>
                {{" No current bids."}}
              </span>
          </p>

          <!-- ##### BID INPUT ##### -->
          <v-text-field :rules="bidRules" prefix="$" v-model="bid" single-line type="number" />
          
          <!-- ##### SUBMIT BID BUTTON ##### -->
          <div class="px-2 pb-4">
            <v-btn>Submit Bid</v-btn>
          </div>

        </v-form>
      </v-card>

      <!-- ##### BID LIST ##### -->
      <div v-if="this.$store.state.itemBids.length > 0">
       <v-card class="px-4 pt-3 pb-2 py-1">

          <!-- ##### BID LIST TITLE ##### -->
          <h2>Bids:</h2>

          <!-- ##### BID INFORMATION ##### -->
          <div v-for="(bid, index) in this.$store.state.itemBids" :key="index">
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
    item: {},
    bids: [],
    bid: null,
    bidRules: [
      bid => !!bid || "required",
      bid => bid > 0 || "positive values only"
    ]
  }),
    created() {
    // Get the selected item 
    try{
      this.item = this.$store.state.items[this.$store.state.selectedItemIndex];
    }
    catch(ex) {
      console.log("Error ITE001: " + ex.message);
      alert("Error ITE001: The system was unable to get item information.");
    }

    // Update the stores itemBids
    try {
      this.$store.dispatch("getBids", this.item.id);
    }
    catch(ex) {
      console.log("Error ITE002: " + ex.message);
      alert("Error ITE002: The system was unable to bidding information.");
    }
  },
  methods: {
    deactivateItem() { 
      try{
        this.$store.dispatch("putItem", this.item);
        this.$router.push("/items");
        alert("The Item has been successfully deleted."); //Deactivated
      }
      catch(ex) {
        console.log("Error ITE003: " + ex.message);
        alert("Error ITE003: The system was unable to delete the item.");
      }
    }
  }
};
</script>