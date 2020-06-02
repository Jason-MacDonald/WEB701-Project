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
       
        <div class="px-2 pb-4">
          <!-- ##### ESTIMATED VALUE ##### -->
          <b>Estimated Value:</b> <span class="ml-2">{{"$" + item.estimatedValue}}</span> <br />
          <!-- ##### ESTIMATED FREIGHT ##### -->
          <b>Estimated Freight: </b> <span class="ml-2">{{"$" + estimatedFreightCost}}</span> 
          
        </div>
        <v-radio-group class="mt-n4" v-model="radio" row @change="calculateFreightCost">   
                  
            <v-radio class="ml-1" label="South Island" value="south" />
            <v-radio label="North Island" value="north" />
            <v-radio label="International" value="international" />
          </v-radio-group>

        

        <!-- ##### DIMENSIONS AND FREIGHT INFORMATION ##### -->
        <!-- Width: {{item.width}} <br/>
        Height: {{item.height}}<br/>
        Length: {{item.length}}<br/>
        Weight: {{item.weight}}<br/>
        Fragility: {{item.fragility}}<br/>
        Zone: {{item.zone}}<br/>
        freightCost: {{item.freightCost}}<br/> -->
      </v-card>

      <!-- ##### BIDDING FORM ##### -->
      <!-- If account is logged in. -->
      <v-card class="px-4 mb-4 py-1">
        <div v-if="this.$store.state.account != null">
          <v-form>

            <!-- ##### BIDDING FORM TITLE ##### -->
            <h2 class="px-2 mt-3">Place Bid:</h2>
            
            <!-- ##### BID INFORMATION ##### -->
            <p class="px-2 mt-3">            
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
            <v-text-field class="px-2 mt-3" :rules="bidRules" prefix="$" v-model="bid" single-line type="number" />
            
            <!-- ##### SUBMIT BID BUTTON ##### -->
            <div class="px-2 pb-4">
              <v-btn @click="submitBid">Submit Bid</v-btn>
            </div>

          </v-form>
        </div>

        <!-- If no account logged in. -->
        <div class="px-2 my-3">
          <b>You must be logged in to place a bid on this item.</b>
        </div>

      </v-card>

      <!-- ##### BID LIST ##### -->
      <div v-if="this.$store.state.itemBids.length > 0">
       <v-card class="px-4 pt-3 pb-3 py-1">

          <!-- ##### BID LIST TITLE ##### -->
          <h2>Bids:</h2>

          <!-- ##### BID INFORMATION ##### -->
          <div v-for="(bid, index) in this.$store.state.itemBids" :key="index">
            <!-- Pagination calculation -->
            <div v-if="index < page * perPage && index >= page * perPage - perPage">
              <v-card class="my-2">
                {{bid.userEmail}} -
                ${{bid.bid}}
              </v-card>
            </div>
          </div> 

          <!-- ##### PAGINATION #####  -->
          <div class="text-center mt-3">
            <v-pagination v-model="page" total-visible="10" :length="Math.ceil(this.$store.state.itemBids.length / perPage)" />
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
    estimatedFreightCost: 0,
    radio: "south",
    bid: "",
    bids: [],
    bidRules: [
      bid => !!bid || "required",
      bid => bid > 0 || "positive values only"
    ],
      page: 1,
      perPage: 10
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
  mounted(){
    this.calculateFreightCost();
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
    },
    async submitBid(){
      try{
        let bid = {
          itemID: this.item.id,
          bid: this.bid
        }
        await this.$store.dispatch("postBid", bid);
        alert("Bid has been successfully placed.");
        await this.$store.dispatch("getBids", this.item.id);       
      }
      catch(ex) {
        console.log("Error ITE004: " + ex.message);
        alert("Error ITE004: The system was unable to place a bid on this item.");
      }
    },
    calculateFreightCost() {
      const item = this.item;
      let estimatedFreightCost = 0;

      // Oversize freight.
      if(item.height > 1500 || item.width > 1500 || item.length > 1500){
        estimatedFreightCost += 20;
      }
      
      // Weight cost.
      if (item.weight < 5) estimatedFreightCost += 5;
      else if (item.weight < 10) estimatedFreightCost += 10;
      else if (item.weight < 15) estimatedFreightCost += 15;
      else if (item.weight < 20) estimatedFreightCost += 20;
      else if (item.weight < 25) estimatedFreightCost += 25;
      else estimatedFreightCost += 150;

      // Fragility cost.
      if (item.fragility == 1) estimatedFreightCost += 0;
      else if (item.fragility == 2) estimatedFreightCost += 10;
      else if (item.fragility == 3) estimatedFreightCost += 50;
      else if (item.fragility == 4) estimatedFreightCost += 100;
      else if (item.fragility == 5) estimatedFreightCost += 500;
      else estimatedFreightCost +=  0;

      //Additional cost.
      estimatedFreightCost += parseFloat(item.freightCost);

      // Zone cost.
      if (this.radio == "south") {estimatedFreightCost += 0;}
      else if (this.radio == "north") estimatedFreightCost += 10;
      else if (this.radio == "international") estimatedFreightCost = " NA: Please contact us directly for shipping options.";
      this.estimatedFreightCost = estimatedFreightCost;
    }
  }
};
</script>