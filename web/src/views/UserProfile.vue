<script setup lang="ts">
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { ref } from "vue";
const authStore = useAuthStore();
const userStore = useUserStore();
const user = JSON.parse(localStorage.getItem("user")!);

const nome = ref(user.nome);
const email = ref(user.email);
const senha = ref("");

function update() {
  const data = {
    id: user.id,
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  };
  return userStore.updateUser(data);
}
</script>

<template>
  <div>
    <div class="fundo d-flex flex-column justify-center align-center">
      <v-icon color="#ffffff" size="72px">mdi-account</v-icon>
      <span class="h2 primary font-weight-bold text-capitalize">{{
        user.nome
      }}</span>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="12" lg="6">
          <div class="rounded-lg elevation-2 p-4 my-4">
            <form action="#" method="post" class="text-start">
              <label for="nome" class="text-label">Nome</label>
              <input
                type="text"
                name="nome"
                id="nome"
                v-model="nome"
                class="form-control input-camp rounded-pill elevation-4"
              />
              <label for="email" class="text-label mt-3">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                class="form-control input-camp rounded-pill elevation-4"
              />
              <label for="senha" class="text-label mt-3">Nova Senha</label>
              <input
                type="password"
                name="senha"
                id="senha"
                v-model="senha"
                class="form-control input-camp rounded-pill elevation-4"
              />
            </form>
          </div>
          <div>
            <v-btn
              class="btn mt-8 p-4 primary"
              x-large
              block
              rounded="lg"
              @click="update()"
            >
              <span class="mr-4">Salvar</span>
            </v-btn>
          </div>
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
