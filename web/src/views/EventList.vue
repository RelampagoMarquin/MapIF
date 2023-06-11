<script setup lang="ts">
import { storeToRefs } from "pinia";
import Activity from "../components/Activity.vue";
import { useEventStore } from "../stores/eventStore";

const eventStore = useEventStore();
eventStore.getEvents();
const { events, loading } = storeToRefs(eventStore);
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="10">
        <div class="mb-5">
          <h2 class="mb-3 mt-5 text-center title-primary">Lista de Eventos</h2>
        </div>

        <v-row justify="end" class="mb-4">
          <v-col
            cols="12"
            md="6"
            lg="10"
            class="mb-3 text-right"
            align-self="end"
          >
            <v-btn class="rounded-lg elevation-2 btn" nuxt to="/create-event">
              <v-icon class="mr-2">mdi-calendar-plus</v-icon>
              Novo Evento
            </v-btn>
          </v-col>
        </v-row>

        <v-col cols="12" class="text-center mt-5 mb-5" v-if="loading > 0">
          <v-progress-circular
            model-value="20"
            :size="70"
            :width="5"
            color="green"
            indeterminate
          ></v-progress-circular>
        </v-col>

        <div class="rounded-lg elevation-2 p-4" v-else>
          <v-row>
            <v-col
              v-for="item in events"
              :key="item.nome"
              class="mb-3"
              cols="12"
              md="12"
              lg="6"
            >
              <Activity
                :title="item.nome"
                :id="item.id"
                :description="item.descricao"
                :dateInicio="item.comeca"
                :dateFim="item.fim"
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
