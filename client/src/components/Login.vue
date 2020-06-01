<template>
  <v-container>
    <v-card class="px-4 pt-4">
      <!-- ##### LOGIN FORM ##### -->
      <v-form>

        <!-- ##### LOGIN TITLE ###### -->
        <h2 class="px-2 pt-1">
          Login
        </h2>

        <!-- ##### EMAIL INPUT ##### -->
        <v-text-field class="px-2 pt-1" v-model="email" :rules="emailRules" label="E-mail" required/>

        <!-- ##### PASSWORD INPUT ##### -->
        <v-text-field
          class="px-2 pt-1"
          v-model="password"
          :counter="30"
          :rules="passwordRules"
          label="Password"
          required
        />

        <div class="px-2 pb-5">
          <!-- ##### LOGIN BUTTON ##### -->
          <v-btn @click="login">
            Login
          </v-btn>

          <!-- ##### LINK TO REGISTER ##### -->
          <router-link class="mx-3" style="text-decoration: none;" to="/register">
            Create new account
          </router-link>

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
      password => !!password || "Password is required",
      password => (password && password.length <= 40) || "Password must be less than 40 characters"
    ],
    email: "",
    emailRules: [
      email => !!email || "E-mail is required",
      email => /.+@.+\..+/.test(email) || "E-mail must be valid"
    ]
  }),
  methods: {
    async login() {
      var user = {
        email: this.email,
        password: this.password
      };

      try{
        await this.$store.dispatch("login", user);
        this.$router.push("/account");
      }
      catch(ex) {
        console.log("Error LOG002: " + ex.message);
        alert("Error LOG002: The system was unable to log you in.");
      } 
    }
  }
};
</script>