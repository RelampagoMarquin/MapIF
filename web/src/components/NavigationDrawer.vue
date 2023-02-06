<script setup lang="ts">
import { useAuthStore } from "../stores/authStore";
import type { Drawer } from "../utils/types";

const authStore = useAuthStore();

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
    value: "events",
    router: "/event-list",
  },
  {
    icon: "mdi-account",
    title: "Perfil",
    value: "profile",
    router: "/userprofile",
  },
  {
    icon: "mdi-account-group",
    title: "Grupos",
    value: "groups",
    router: "/group-list",
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
      <v-list-item v-if="authStore.isLogged()"
        prepend-icon="mdi-exit-to-app"
        title="Logout"
        value="exit"
        nuxt
        to="login"
        @click="authStore.signOut"
      ></v-list-item>
      <v-list-item v-else
        prepend-icon="mdi-exit-to-app"
        title="login"
        value="login"
        nuxt
        to="/login"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
.height-100 {
  height: 100%;
}
</style>
