<script setup lang="ts">
import { ref, computed } from "vue";
import Activity from "../components/Activity.vue";
import {useActivityStore} from '../stores/atividadeStore'
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

/* Current router */
const router = useRouter();
const idEvento = parseInt(router.currentRoute.value.params.idevento);

/* getActivitys */
const activityStore = useActivityStore();
activityStore.getActivitysByEvent(idEvento);
const {loading} = storeToRefs(activityStore);
const activitys = computed(() => activityStore.activitys);
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="10">
        <div class="mb-5">
          <h2 class="mb-8 mt-5 text-center title-primary">
            Calendário de Atividades
          </h2>
        </div>
        
        <v-col cols="12" class="text-center mt-5 mb-5" v-if="loading > 0">
            <v-progress-circular model-value="20" :size="70" :width="5" color="green" indeterminate></v-progress-circular>
          </v-col>

        <div class="rounded-lg elevation-2 p-4" v-else>
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
                :title="item.nome"
                :description="item.descricao"
                :dateInicio="item.horarioInicial"
                :dateFim="item.horarioFinal"
                :location="item.location"
              ></Activity>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
