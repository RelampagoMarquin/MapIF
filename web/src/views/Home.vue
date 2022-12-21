<script setup lang="ts"></script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="6">
        <div class="mb-5">
          <h1 class="mb-8 mt-5 text-center title-primary">Criar Evento</h1>
        </div>
      </v-col>
    </v-row>
    <v-bottom-navigation grow absolute bg-color="#389c37" color="#000000">
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
  </v-container>
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
</style>
