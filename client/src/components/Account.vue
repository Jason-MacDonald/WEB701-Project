<template>
  <v-container>
    <v-card class="px-4 py-4">
      <v-card class="px-4 pt-4 pb-1">
        <h2 class="px-2 pt-1">Account - {{user.name}}</h2>
        <div>
          <v-text-field class="px-2 pt-1" label="Username" v-model="user.name" />
          <v-btn @click="updateUserName">Update Username</v-btn>
        </div>
        <v-text-field class="px-2 pt-1" disabled v-model="this.user.email" />
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data: () => ({
    user: {}
  }),
  async created() {
    await this.$store.dispatch("getAccount");
    this.user = this.$store.state.account;
  },
  methods: {
    updateUserName() {
      let user = {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email
      };
      this.$store.dispatch("putUser", user);
    }
  }
};
</script>