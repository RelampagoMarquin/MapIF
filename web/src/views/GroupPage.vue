<script setup lang="ts">
import { ref } from "vue";
import GroupUser from  "../components/GroupUser.vue";

const users = ref([
  {
    name: "Andre"
  },
  {
    name: "Natália"
  },
  {
    name: "Marcos"
  },
  {
    name: "Valmir"
  },
]);
</script>

<template>
  <div>
    <div class="fundo d-flex flex-column justify-center align-center">
      <v-icon color="#ffffff" size="72px">mdi-account-group</v-icon>
      <span class="h2 primary font-weight-bold">NOME</span>
    </div>
    <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="10" class="mb-5" align-self="end">
        <v-btn class="rounded-lg elevation-2 btn" nuxt to="/create-group">
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          Adicionar membro
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="10">
        <div class="rounded-lg elevation-2 p-4">
          <v-row>
            <v-col
              v-for="item in users"
              :key="item.name"
              cols="12"
              md="12"
              lg="6"
            >
              <GroupUser
                :name="item.name"
              ></GroupUser>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="10" class="mb-5" align-self="end">
        <v-btn class="rounded-lg elevation-2 btn-danger" nuxt to="/create-group">
          <v-icon class="mr-2">mdi-delete</v-icon>
          Excluir Grupo
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="10" class="mb-5" align-self="end">
        <v-btn class="rounded-lg elevation-2 btn-danger" nuxt to="/create-group">
          <v-icon class="mr-2">mdi-delete</v-icon>
          Sair do Grupo
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<style scoped>
  .fundo {
  width: 100%;
  height: 20vh;
  background-color: #389c37;
}
</style>