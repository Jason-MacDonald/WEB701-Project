<template>
  <v-container>
    <v-card class="px-4 py-4">
      <v-card class="px-4 pt-4 pb-1">

        <!-- ##### MEMBER TITLE ##### -->
        <h2 class="px-2 pt-1">
          {{ this.$store.state.members[this.$store.state.selectedMemberIndex].name }}
        </h2>

        <!-- ##### MEMBER DESCRIPTION ##### -->
        <p class="px-2 pb-1">
          {{ this.$store.state.members[this.$store.state.selectedMemberIndex].description }}
        </p>
        
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Member",
  data: () => ({
    member: {},
  }),
  created() {
    try{
      this.member = this.$store.state.members[this.$store.state.selectedMemberIndex];
    }
    catch(ex){
      console.log("Error MEM001: " + ex.message);
      alert("Error MEM001: The system was unable to get member information.");
    }
  }
};
</script>