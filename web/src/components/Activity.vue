<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const router = useRouter();
const props = defineProps<{
  title: string;
  description: string;
  dateInicio: string | Date;
  dateFim: string | Date;
  location: string;
  id: {
    type: string;
    required: false;
  };
  verAtividades: {
    type: boolean;
    default: false;
  };
  poligonoId: {
    type: number;
    required: false;
  };
  editar: {
    type: boolean;
    default: false;
  };
}>();

function redirectToLocal() {
  const id = props.id;
  router.push({ name: "create-local", params: { idevent: id } });
}
</script>

<template>
  <div class="rounded-lg elevation-2 p-3">
    <h5 class="title-secondary">{{ title }}</h5>
    <v-divider class="mb-4"></v-divider>
    <p class="text-secondary-custom">{{ description }}</p>
    <p class="text-secondary-custom">
      {{ useDateFormat(dateInicio, "DD-MM-YYYY").value }} até
      {{ useDateFormat(dateFim, "DD-MM-YYYY").value }}
    </p>

    <v-btn
      v-if="poligonoId"
      :to="`/map-activity/${poligonoId}`"
      class="text-primary-custom text-end"
      variant="text"
      >Ver no mapa</v-btn
    >

    <v-row class="mt-4" v-if="verAtividades && editar">
      <v-col cols="12" md="6" lg="6">
        <v-btn class="rounded-lg elevation-2 btn" block @click="redirectToLocal()">
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
  </div>
</template>

<style scoped>
.btn {
  background-color: #389c37 !important;
  color: #fff !important;
  font-weight: 700 !important;
  text-transform: capitalize;
}
</style>
