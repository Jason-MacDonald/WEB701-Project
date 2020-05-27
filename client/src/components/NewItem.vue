<template>
  <v-container>
    <v-card class="pa-4">
      <v-form>
        <v-text-field label="Item Title" v-model="name" />
        <v-textarea label="Item Description" v-model="description" />
        <v-btn @click="submitNewEvent">Submit Item</v-btn>
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
    submitNewEvent() {
      let item = {
        name: this.name,
        description: this.description,
        active: true
      };
      this.$store.dispatch("postNewItem", item);
      this.name = "";
      this.description = "";
    }
  }
};
</script>