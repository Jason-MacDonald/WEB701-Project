<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <div v-for="(member, index) in this.$store.state.members" :key="index">
        <v-card class>
          <h2 class="px-2 pt-1">{{member.name}}</h2>
          <p class="px-2 pb-1">{{member.description}}</p>
          <router-link style="text-decoration: none; color: inherit;" to="/member">
            <p @click="setSelectedMemberIndex(index)" class="px-2 py-1">See More</p>
          </router-link>
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
  },
  methods: {
    setSelectedMemberIndex(index) {
      this.$store.dispatch("selectMember", index);
    }
  }
};
</script>
