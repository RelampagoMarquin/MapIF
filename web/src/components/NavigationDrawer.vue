<script setup lang="ts">
import type { Drawer } from "../utils/types";

const listNavigationDrawer: Drawer[] = [
  {
    icon: "mdi-map-outline",
    title: "Home",
    value: "Home",
    router: "/",
  },
  {
    icon: "mdi-map-marker",
    title: "Events",
    value: "wallets",
    router: "/create-event",
  },
  {
    icon: "mdi-calendar",
    title: "Atividades",
    value: "wallets",
    router: "/schedule-activity",
  },
];
</script>

<template>
  <v-navigation-drawer bottom>
    <v-list density="compact" nav class="height-100 pl-4">
      <v-list-item
        class="mb-4 mt-4 text-center title-primary"
        title="MAPIF"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="item in listNavigationDrawer"
        :key="item.title"
        class="mb-3"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        nuxt
        :to="item.router"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-item
        prepend-icon="mdi-exit-to-app"
        title="Logout"
        value="exit"
        nuxt
        to="/"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
.height-100 {
  height: 100%;
}
</style>
