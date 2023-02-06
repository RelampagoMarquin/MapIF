<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  id: {
    type: string;
    required: false;
  };
  name: string;
  verGrupos: boolean
}>();

</script>

<template>
  <div class="rounded-lg elevation-2 p-3">
    <h5 class="title-secondary">{{ name }}</h5>

    <v-row class="mt-4" v-if="verGrupos">
      <v-col cols="12">
        <v-btn
          class="rounded-lg elevation-2 btn"
          block
          nuxt
          :to="`/group/${props.id}`"
        >
          <v-icon class="mr-2">mdi-eye</v-icon>
          Ver Grupo
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>
