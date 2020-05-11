<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <div v-for="(item, index) in this.$store.state.items" :key="index">
        <v-card class>
          <p class="px-2 pt-1">{{item.name}}</p>
          <p class="px-2 pb-1">{{item.description}}</p>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Items",

  created() {
    this.$store.dispatch("getItems");
  }
};
</script>
