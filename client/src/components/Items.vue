<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <div v-for="(item, index) in this.$store.state.items" :key="index">
        <v-card class>
          <h2 class="px-2 pt-1">{{item.name}}</h2>
          <p class="px-2 pb-1">{{item.description}}</p>
          <router-link style="text-decoration: none; color: inherit;" to="/item">
            <p @click="setSelectedItemIndex(index)" class="px-2 py-1">See More</p>
          </router-link>
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
  },
  methods: {
    setSelectedItemIndex(index) {
      this.$store.dispatch("selectItem", index);
    }
  }
};
</script>
