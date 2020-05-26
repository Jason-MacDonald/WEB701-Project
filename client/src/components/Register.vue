<template>
  <v-container>
    <v-card class="px-4 py-4">
      <v-form>
        <h2 class="px-2 pt-1">Register</h2>

        <v-text-field class="px-2 pt-1" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field
          class="px-2 pt-1"
          v-model="password"
          :counter="40"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <div class="px-2 pb-2">
          <v-btn @click="register">Create Account</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data: () => ({
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 40) || "Name must be less than 40 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    register() {
      var user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("register", user);
    }
  }
};
</script>