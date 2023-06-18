<script setup lang="ts">
import { set, useDateFormat } from "@vueuse/core";
import { useRouter } from "vue-router";
import { defineProps, ref } from "vue";
import { useActivityStore } from "../stores/atividadeStore";
import { useEventStore } from "../stores/eventStore";

const router = useRouter();

export interface Props {
  title: string;
  description: string;
  dateInicio: string | Date;
  dateFim: string | Date;
  location?: string;
  id?: string | number;
  verAtividades: boolean;
  poligonoId?: number;
  editar: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  verAtividades: false,
  editar: false,
});

function redirectToLocal() {
  const id = props.id;
  router.push({ name: "create-local", params: { idevent: id } });
}

/* delete  */

const dialogDelete = ref(false);

function confirmDelete() {
  dialogDelete.value = true;

  deleteFunction(props.id);
}

const activityStore = useActivityStore();
const eventStore = useEventStore();

function deleteFunction(id: any) {
  if (!props.poligonoId) {
    eventStore.deleteEvent(id);
    setTimeout(() => {
      router.go(0);
    }, 1000);
  } else {
    activityStore.deleteActivity(id);
    setTimeout(() => {
      router.go(0);
    }, 1000);
  }
}

/* edit */

function editItem() {
  const id = props.id?.toString() || 1;
  id.toString();
  console.log(typeof id);
  if (!props.poligonoId) {
    router.push("/edit-event/" + id);
  } else {
    router.push("/edit-activity/" + id);
  }
}
</script>

<template>
  <v-container class="rounded-lg elevation-2 p-3">
    <v-row class="pa-0">
      <v-col cols="10" xs="8" sm="10" md="10" lg="10" class="pb-0">
        <h5 class="title-secondary">{{ title }}</h5>
      </v-col>

      <v-col cols="2" xs="2" sm="2" md="2" lg="2" class="pa-0 mt-2">
        <v-icon color="green-darken-1" @click="editItem">mdi-pencil</v-icon>
        <v-icon color="red-darken-3" @click="dialogDelete = true"
          >mdi-delete</v-icon
        >
      </v-col>
    </v-row>

    <v-divider class="mb-4"></v-divider>
    <p class="text-secondary-custom">{{ description }}</p>
    <p class="text-secondary-custom">
      {{ useDateFormat(dateInicio, "DD-MM-YYYY").value }} até
      {{ useDateFormat(dateFim, "DD-MM-YYYY").value }}
    </p>

    <v-row class="mt-4" v-if="poligonoId" justify="end">
      <v-col cols="12" md="12" lg="12">
        <v-btn
          :to="`/map-activity/${poligonoId}`"
          class="rounded-lg elevation-2 btn"
          variant="text"
        >
          <v-icon class="mr-2">mdi-map</v-icon> Ver no Mapa</v-btn
        >
      </v-col>
    </v-row>

    <v-row class="mt-4" v-if="verAtividades && editar">
      <v-col cols="12" md="6" lg="6">
        <v-btn
          class="rounded-lg elevation-2 btn"
          block
          @click="redirectToLocal()"
        >
          <v-icon class="mr-2">mdi-pencil</v-icon>
          Add Atividade
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-btn
          class="rounded-lg elevation-2 btn"
          block
          nuxt
          :to="`/schedule-activity/${id}`"
        >
          <v-icon class="mr-2">mdi-calendar</v-icon>
          Ver Atividades
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmar exclusão</v-card-title>
        <v-card-text>
          Tem certeza de que deseja excluir permanentemente este item?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="dialogDelete = false"
            >Cancelar</v-btn
          >
          <v-btn color="red" text @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.btn {
  background-color: #389c37 !important;
  color: #fff !important;
  font-weight: 700 !important;
  text-transform: capitalize;
}
</style>
