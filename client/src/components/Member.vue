<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <v-card class>
        <h2
          class="px-2 pt-1"
        >{{ this.$store.state.members[this.$store.state.selectedMemberIndex].name }}</h2>
        <p
          class="px-2 pb-1"
        >{{ this.$store.state.members[this.$store.state.selectedMemberIndex].description }}</p>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Member"
};
</script>