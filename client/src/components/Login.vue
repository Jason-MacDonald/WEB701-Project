<template>
  <v-container>
    <v-card class="px-4 pt-4">
      <v-form>
        <h2 class="px-2 pt-1">Login</h2>

        <v-text-field
          class="px-2 pt-1"
          v-model="name"
          :counter="30"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field class="px-2 pt-1" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <div class="px-2 pb-5">
          <v-btn>Login</v-btn>
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
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>