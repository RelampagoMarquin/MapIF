<script setup lang="ts">
import { useGroupStore } from "../stores/groupStore";
import { useUsuarioGroupStore } from "../stores/usuarioGruposStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const groupStore = useGroupStore();
const usuarioGroupStore = useUsuarioGroupStore();
const user = JSON.parse(localStorage.getItem("user"));

const nome = ref("");
let snackbarSucess = ref(false);
let snackbarFailed = ref(false);

async function create() {
  if (nome.value) {
    const groupData = {
      nome: nome.value,
    };
    const lastItem = await groupStore.createGroup(groupData);
    const usuarioGroupData = {
      usuarioId: user.id,
      grupoId: lastItem.id,
      isAdmin: true,
    };
    const createGroup = await usuarioGroupStore.createUsuarioGroup(
      usuarioGroupData
    );

    if (createGroup) {
      snackbarSucess.value = true;
      setTimeout(() => {
      router.push("/group-list")
    }, 4000);
    } else {
      snackbarFailed.value = true;
    }
  } else {
    return alert("Preencha o campo");
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <div class="mb-5">
          <h1 class="mb-8 mt-5 text-center title-primary">Criar Grupo</h1>
        </div>
        <!-- FORM -->
        <div class="rounded-lg elevation-2 p-4">
          <v-form class="text-start">
            <label for="nome" class="text-label">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              v-model="nome"
              class="form-control input-camp rounded-pill elevation-4"
            />
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
            <span class="mr-4">Criar grupo</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-sheet class="d-flex flex-column">
      <v-snackbar
        :timeout="2000"
        color="green"
        elevation="24"
        v-model="snackbarSucess"
      >
        Grupo adicionado com sucesso!
      </v-snackbar>
      <v-snackbar
        :timeout="2000"
        color="red"
        elevation="24"
        v-model="snackbarFailed"
      >
        Erro ao criar grupo!
      </v-snackbar>
    </v-sheet>
  </v-container>
</template>
