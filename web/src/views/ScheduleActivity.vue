<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Activity from "../components/Activity.vue";
import { useActivityStore } from "../stores/atividadeStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ActivityType } from "../utils/types";

/* Current router */
const router = useRouter();
const idEvento = router.currentRoute.value.params.idevento;

/* getActivitys */
const activityStore = useActivityStore();
activityStore.getActivitysByEvent(idEvento);
const { loading } = storeToRefs(activityStore);
const activitys = computed((): ActivityType[] => activityStore.activitys);

/* Search */

const search = ref("");

/* Filter */

const filteredActivitys = computed(() => {
  if (search.value === "") {
    return activitys.value;
  } else {
    return activitys.value.filter((item) => {
      return item.nome.toLowerCase().includes(search.value.toLowerCase());
    });
  }
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="8" md="10" lg="10">
        <div class="mb-5">
          <h2 class="mb-8 mt-5 text-center title-primary">
            Calendário de Atividades
          </h2>
        </div>

        <v-row justify="center" class="mb-1">
          <v-col
            cols="12"
            md="8"
            lg="8"
            class="mb-3 text-right"
            align-self="end"
          >
            <!-- implement a search bar -->
            <v-text-field
              label="Pesquisar"
              v-model="search"
              variant="solo"
              compact
              append-inner-icon="mdi-magnify"
            ></v-text-field>
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
          <div v-if="activitys.length === 0" class="p-4 text-center">
            <v-row>
              <p>Não há atividades cadastradas</p>
            </v-row>
          </div>
          <v-row v-else>
            <v-col
              v-for="item in filteredActivitys"
              :key="item.nome"
              class="mb-3"
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <Activity
                :id="item.id"
                :title="item.nome"
                :description="item.descricao"
                :dateInicio="item.horarioInicial"
                :dateFim="item.horarioFinal"
                :poligonoId="item.poligonoId"
              ></Activity>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
