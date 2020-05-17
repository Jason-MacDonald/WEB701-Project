<template>
  <v-container>
    <v-card class="pa-4">
      <v-form>
        <v-text-field label="Event Title" v-model="name" />
        <v-textarea label="Event Description" v-model="description" />
        <v-btn @click="submitNewEvent">Submit Event</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "NewEvent",
  data: () => ({
    name: "",
    description: ""
  }),
  methods: {
    submitNewEvent() {
      let event = {
        name: this.name,
        description: this.description
      };
      this.$store.dispatch("postNewEvent", event);
      this.name = "";
      this.description = "";
    }
  }
};
</script>