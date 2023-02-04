<script setup lang="ts">

</script>
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="10">
        <div class="mb-5">
          <h2 class="mb-8 mt-5 text-center title-primary">Grupos</h2>
        </div>

        <v-col cols="12" md="6" lg="10" class="mb-5" align-self="end">
          <v-btn class="rounded-lg elevation-2 btn" nuxt to="/create-group">
            <v-icon class="mr-2">mdi-account-group</v-icon>
            Novo Grupo
          </v-btn>
        </v-col>

        <div class="rounded-lg elevation-2 p-4">
          <v-row>
            <v-col
              v-for="item in groups"
              :key="item.id"
              cols="12"
              md="12"
              lg="6"
            >
              <Group
                :name="item.nome"
                :verGrupos="true"
              ></Group>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>