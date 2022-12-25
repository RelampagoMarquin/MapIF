<script setup>
import Map from "../components/Map.vue";
</script>

<template>
  <div class="main">
    <Map></Map>

    <v-bottom-navigation
      grow
      absolute
      bg-color="#389c37"
      color="#000000"
      class="bottom-navigation"
    >
      <v-btn value="recent">
        <v-icon>mdi-calendar-plus</v-icon>

        Recent
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-cellphone-marker</v-icon>

        Favorites
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon>

        Nearby
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker-path</v-icon>

        Nearby
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<style scoped>
.v-icon {
  color: white;
}

.v-btn {
  color: white;
}
.text-white {
  color: white;
}

.v-bottom-navigation {
  position: absolute;
}
</style>
