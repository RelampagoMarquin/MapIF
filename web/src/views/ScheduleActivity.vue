<script setup lang="ts">
import { ref } from "vue";
import Activity from "../components/Activity.vue";

const activitys = ref([
  {
    title: "Oficina de Artesanato",
    description: "Oficina de Artesanato usando materiais recicláveis",
    date: "13:00 10/10/2021",
    location: "Auditório",
  },
  {
    title: "Oficina de Perfume",
    description: "Oficina de Perfume usando materiais recicláveis",
    date: "10/10/2021",
    location: "Salas 1",
  },
  {
    title: "Aula de Yoga",
    description: "Aula de Yoga para iniciantes",
    date: "12:00 10/10/2021",
    location: "Auditório",
  },
]);
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <div class="mb-5">
          <h2 class="mb-8 mt-5 text-center title-primary">
            Calendário de Atividades
          </h2>
        </div>
        <div class="rounded-lg elevation-2 p-4">
          <div v-for="item in activitys" :key="item.title" class="mb-3">
            <Activity
              :title="item.title"
              :description="item.description"
              :date="item.date"
              :location="item.location"
            ></Activity>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
