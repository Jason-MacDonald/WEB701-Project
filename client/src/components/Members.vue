<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">

      <!-- ##### GALLERY OF MEMBERS ##### -->
      <div v-for="(member, index) in this.$store.state.members" :key="index">
        <v-card class="px-4 mb-4 py-1">

          <!-- ##### MEMBER TITLE ##### -->
          <h2 class="px-2 pt-1">
            {{member.name}}
          </h2>

          <!-- ##### MEMBER DESCRIPTION ##### -->
          <p class="px-2 pb-1">
            {{member.description}}
          </p>


          <div class="px-2 pb-4">
            <v-btn @click="setSelectedMemberIndex(index)">
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
  name: "Members",
  created() {
    try{
      this.$store.dispatch("getMembers");
    }
    catch(ex){
      console.log("Error MES001: " + ex.message);
      alert("Error MES001: The system was unable to get member information.")
    }
  },
  methods: {
    setSelectedMemberIndex(index) {
      try{
        this.$store.dispatch("selectMember", index);
        this.$router.push("/member"); 
      }
      catch(ex) {
        console.log("Error MES002: " + ex.message);
        alert("Error MES002: The system was unable to get member information.");
      }
    }
  }
};
</script>
