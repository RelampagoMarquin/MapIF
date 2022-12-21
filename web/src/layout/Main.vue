<script setup lang="ts">
import NavigationDrawer from "../components/NavigationDrawer.vue";
</script>

<template>
  <v-app>
    <v-layout>
      <NavigationDrawer />
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
