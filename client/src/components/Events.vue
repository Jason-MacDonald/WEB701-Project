<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">

      <!-- ##### GALLERY OF EVENTS ##### -->    
      <div v-for="(event, index) in this.$store.state.events" :key="index">
        <v-card class="px-4 mb-4 py-1">

          <!-- ##### EVENT TITLE ##### -->
          <h2 class="px-2 pt-1">
            {{ event.name }}
          </h2>

          <!-- ##### EVENT DESCRIPTION ##### -->
          <p class="px-2 pb-1">
            {{ event.description }}
          </p>

          <!-- formatDate and formatTime located in main.js -->
          <!-- ##### EVENT START DATE DISPLAY ##### -->         
          <p class="px-2 pb-1">
            {{ event.startDate | formatDate }}
          </p>

          <!-- ##### STARTDATE AND ENDDATE DISPLAY ##### -->
          <p class="px-2 pb-1">
            {{ event.startDate | formatTime }} - {{ event.endDate | formatTime }}
          </p>

          <!-- ##### SEE MORE BUTTON ##### -->
          <div class="px-2 pb-4">
            <v-btn @click="setSelectedEventIndex(index)">
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
  name: "Events",

  created() {
    try{
      this.$store.dispatch("getEvents");    
    }
    catch(ex) {
      console.log("Error EVS001: " + ex.message);
      alert("Error EVS001: The system was unable to get event information.")
    }
    
  },
  methods: {
    setSelectedEventIndex(index) {
      try{
        this.$store.dispatch("selectEvent", index);    
        this.$router.push("/event"); 
      }
      catch(ex) {
        console.log("Error EVS002: " + ex.message);
        alert("Error EVS002: The system was unable to update your account.");
      }
    }
  }
};
</script>
