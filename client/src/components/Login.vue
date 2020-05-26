<template>
  <v-container>
    <v-card class="px-4 pt-4">
      <v-form>
        <h2 class="px-2 pt-1">Login</h2>

        <v-text-field class="px-2 pt-1" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field
          class="px-2 pt-1"
          v-model="password"
          :counter="30"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <div class="px-2 pb-5">
          <v-btn @click="login">Login</v-btn>
          <router-link class="mx-3" style="text-decoration: none;" to="/register">Create new account</router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 40) || "Password must be less than 40 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    async login() {
      var user = {
        email: this.email,
        password: this.password
      };
      await this.$store.dispatch("login", user);
      this.$router.push("/account");
    }
  }
};
</script>