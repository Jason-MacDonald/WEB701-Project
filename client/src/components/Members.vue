<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <div v-for="(member, index) in this.$store.state.members" :key="index">
        <v-card class>
          <p class="px-2 pt-1">{{member.name}}</p>
          <p class="px-2 pb-1">{{member.description}}</p>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Members",

  created() {
    this.$store.dispatch("getMembers");
  }
};
</script>
