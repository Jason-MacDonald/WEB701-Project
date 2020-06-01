<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">

      <!-- ##### GALLERY OF ITEMS ##### -->
      <div v-for="(item, index) in this.$store.state.items" :key="index">
        <v-card class="px-4 mb-4 py-1">

          <!-- ##### ITEM TITLE ##### -->
          <h2 class="px-2 pt-1">
            {{item.name}}
          </h2>

          <!-- ##### ITEM DESCRIPTION ##### -->
          <p class="px-2 pb-1">
            {{item.description}}
          </p>

          <!-- ##### SEE MORE BUTTON ##### -->
          <div class="px-2 pb-4">
            <v-btn @click="setSelectedItemIndex(index)">
                See More
            </v-btn>
          </div>

        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Items",
  created() {
    try{
      this.$store.dispatch("getItems");
    }
    catch(ex) {
      console.log("Error ITS001: " + ex.message);
      alert("Error ITS001: The system was unable to get item information.")
    }
    
  },
  methods: {
    setSelectedItemIndex(index) {
      try{
        this.$store.dispatch("selectItem", index);
        this.$router.push("/item"); 
      }
      catch(ex) {
        console.log("Error EVS002: " + ex.message);
        alert("Error EVS002: The system was unable to get item information.");
      }
    }
  }
};
</script>
