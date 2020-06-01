<template>
  <v-container>
    <v-card class="pa-4">
      <v-form>
        <v-text-field label="Item Title" v-model="name" />
        <v-textarea label="Item Description" v-model="description" />
        <v-btn @click="submitNewItem">Submit Item</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "NewItem",
  data: () => ({
    name: "",
    description: ""
  }),
  methods: {
    submitNewItem() {
      let item = {
        name: this.name,
        description: this.description,
        active: true,
        email: null
      };
      this.$store.dispatch("postNewItem", item);
      this.$store.dispatch("getItems");
      this.$router.push("/items");
      this.name = "";
      this.description = "";
    }
  }
};
</script>