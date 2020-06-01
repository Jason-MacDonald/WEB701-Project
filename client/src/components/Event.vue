<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <v-card class="px-4 mb-4 py-1">
        
        <!-- ##### EVENT TITLE ##### -->
        <h2 class="px-2 pt-1">
          {{ event.name }}
        </h2>
        
        <!-- ##### EVENT DESCRIPTION ##### -->
        <p class="px-2 pb-1">
          {{ event.description }}
        </p>
        
        <!-- ##### EVENT DATE ##### -->
        <p class="px-2 pb-1">
          {{ event.startDate | formatDate }}
        </p>
        
        <!-- ##### EVENT START AND END TIME ##### -->
        <p class="px-2 pb-1">
          {{ event.startDate | formatTime }} -
          {{ event.endDate | formatTime }}
        </p>

        <!-- ##### EVENT CREATOR EMAIL DISPLAY ##### -->
        <p class="px-2 pb-1 mt-n3"> 
          {{event.email}}
        </p>

        <!-- ##### DELETE EVENT BUTTON ##### -->
        <!-- 
          Only displayed if the current account email is the same as the event creators email.
         -->
        <div class="px-2 pb-4">
          <div v-if="this.$store.state.account != null">
            <div v-if="this.$store.state.account.email == this.$store.state.events[this.$store.state.selectedItemIndex].email">
              <v-btn @click="deleteEvent()">
                Delete Event
                </v-btn>
            </div>
          </div>
        </div>
        
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Event",
    data: () => ({
    event: {},
  }),
  created() {
    try{
      this.event = this.$store.state.events[this.$store.state.selectedItemIndex];
    }
    catch(ex){
      console.log("Error EVE001: " + ex.message);
      alert("Error EVE001: The system was unable to get event information.");
    }
  },
  methods: {
    deleteEvent() {
      try{
        this.$store.dispatch("deleteEvent", this.event.id);
        this.$router.push("/events");
        alert("The Event has been successfully deleted.");
      }
      catch(ex) {       
        console.log("Error EVE002: " + ex.message);
        alert("Error EVE002: The system was unable to delete the event.");
      }
    },
  }
};
</script>
