<script setup lang="ts">
defineProps<{
  name: string;
}>();

const emit = defineEmits([ 'removerUsuario'])

function buttonClick() {
  emit('removerUsuario')
}
</script>

<template>
  <v-container>
    <v-row class="rounded-lg elevation-2 p-3 m-1">
      <v-col cols="6">
        <div>
          <h5 class="title-secondary">{{ name }}</h5>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="text-right">
          <v-icon class="mr-2 title-secondary">mdi-crown</v-icon>
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-btn
          class="rounded-lg elevation-2 btn"
          block
          nuxt
          to="/"
        >
          <v-icon class="mr-2">mdi-crown</v-icon>
          Permitir
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-btn
          class="rounded-lg elevation-2 btn-danger"
          block
          nuxt
          @click="buttonClick()"
        >
          <v-icon class="mr-2">mdi-close</v-icon>
          Retirar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
