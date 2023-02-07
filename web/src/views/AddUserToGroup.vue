<script setup lang="ts">
import { useUsuarioGroupStore } from "../stores/usuarioGruposStore";
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import {useRouter} from "vue-router";

const usuarioGroupStore = useUsuarioGroupStore();
const router = useRouter();
console.log(router)

const userStore = useUserStore();
userStore.getUsers();
const { users } = storeToRefs(userStore);
const userId = ref("");


function create() {
  const data = {
    usuarioId: userId,
    grupoId: parseInt(router.currentRoute.value.params.grupoid),
    isAdmin: true
  };

  usuarioGroupStore.createUsuarioGroup(data);
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <div class="mb-5">
          <h1 class="mb-8 mt-5 text-center title-primary">Adicionar Usuário</h1>
        </div>
        <!-- FORM -->
        <div class="rounded-lg elevation-2 p-4">
          <v-form class="text-start">
            <label for="data-fim" class="mt-3 text-label">Usuário</label>
            <select
              name="grupo"
              id="grupo"
              v-model="userId"
              class="form-control input-camp rounded-pill elevation-4"
            >
              <option
                class="select-option input-camp rounded-pill elevation-4 p-4"
                v-for="user in users"
                :value="user.id"
              >
                {{ user.email }}
              </option>
            </select>
          </v-form>
        </div>
        <div>
          <v-btn
            class="btn mt-8 p-4"
            x-large
            block
            rounded="lg"
            @click="create()"
          >
            <span class="mr-4">Adicionar Usuário</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
