<template>
  <v-container>
    <v-card class="pa-4">
      <v-form>
        <v-text-field label="Item Title" v-model="name" />
        <v-textarea label="Item Description" v-model="description" />
        <v-text-field label="Estimated Value" v-model="estimatedValue" type="number" />
        <v-text-field label="Width" v-model="width" type="number" />
        <v-text-field label="Height" v-model="height" type="number" />
        <v-text-field label="Length" v-model="length" type="number" />
        <v-text-field label="Weight" v-model="weight" type="number" />
        <v-text-field label="Fragility" v-model="fragility" type="number" />
        <v-text-field label="Additional Costs" v-model="freightCost" type="number" />


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
    description: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    fragility: "",
    freightCost: ""
  }),
  methods: {
    submitNewItem() {
      
      let item = {
        name: this.name,
        description: this.description,
        estimatedValue: this.estimatedValue,
        active: true,
        email: null,
        height: this.height,
        width: this.width,
        length: this.length,
        weight: this.weight,
        fragility: this.fragility,
        freightCost: this.freightCost
      };

      try{
        this.$store.dispatch("postNewItem", item);
        this.$store.dispatch("getItems");
        this.$router.push("/items");
      }
      catch(ex) {
        alert("failed");
      }
      
      this.name = "";
      this.description = "";
    }
  }
};
</script>