<script setup lang="ts">
import { ref } from "vue";
import Activity from "../components/Activity.vue";

const activitys = ref([
  {
    title: "Semadec",
    description: "Jogos Internos do Campus",
    date: "13:00 10/10/2021",
  },
  {
    title: "Expotec",
    description: "Exposição de Tecnologias e Ciências",
    date: "13:00 10/10/2021"
  },
  {
    title: "Semana da Abelha",
    description: "Semana da Abelha",
    date: "12:00 10/10/2021",
  },
]);
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="10">
        <div class="mb-5">
          <h2 class="mb-8 mt-5 text-center title-primary">Lista de Eventos</h2>
        </div>

        <v-col cols="12" md="6" lg="10" class="mb-5" align-self="end">
          <v-btn class="rounded-lg elevation-2 btn" nuxt to="/create-event">
            <v-icon class="mr-2">mdi-calendar-plus</v-icon>
            Novo Evento
          </v-btn>
        </v-col>

        <div class="rounded-lg elevation-2 p-4">
          <v-row>
            <v-col
              v-for="item in activitys"
              :key="item.title"
              class="mb-3"
              cols="12"
              md="12"
              lg="6"
            >
              <Activity
                :title="item.title"
                :description="item.description"
                :date="item.date"
                :verAtividades="true"
                :editar="true"
              ></Activity>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
