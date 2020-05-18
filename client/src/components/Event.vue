<template>
  <v-container>
    <v-card class="px-4 pt-4 pb-1">
      <v-card class>
        <h2 class="px-2 pt-1">{{ event.name }}</h2>
        <p class="px-2 pb-1">{{ event.description }}</p>
        <p class="px-2 pb-1">{{ event.startDate | formatDate }}</p>
        <p class="px-2 pb-1">
          {{ event.startDate | formatTime }} -
          {{ event.endDate | formatTime }}
        </p>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Event"
};
</script>
