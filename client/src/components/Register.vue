<template>
  <v-container>
    <v-card class="px-4 py-4">
      <v-form>
        <h2 class="px-2 pt-1">Register</h2>

        <v-text-field
          class="px-2 pt-1"
          v-model="name"
          :counter="30"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field class="px-2 pt-1" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <div class="px-2 pb-2">
          <v-btn>Create Account</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Account",
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