<script setup lang="ts">
import { useUserStore } from "../stores/userStore";
import { ref } from "vue";
const userStore = useUserStore();

const nome = ref("");
const senha = ref("");
const confirmarSenha = ref("");
const email = ref("");

function signup() {
  const data = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  };
  if (senha.value !== confirmarSenha.value)
    return alert("As senhas não conferem");
  else {
    userStore.createUser(data);
  }
}
</script>

<template>
  <v-container class="align-center">
    <v-row class="justify-center">
      <v-col cols="10" md="4">
        <div>
          <h1 class="mb-5 mt-5 text-center">LOGO AQUI</h1>
        </div>
        <h2 class="text-primary-custom mb-5 text-center">Cadastre-se</h2>
        <v-form>
          <label for="email" class="text-label">Nome</label>
          <v-text-field
            v-model="nome"
            placeholder="Ex: John Doe"
            density="compact"
            variant="outlined"
            class="mb-2 rounded"
          ></v-text-field>
          <label for="email" class="text-label">Email</label>
          <v-text-field
            v-model="email"
            placeholder="johndoe@gmail.com"
            density="compact"
            variant="outlined"
            class="mb-2 rounded"
          ></v-text-field>
          <label for="senha" class="text-label">Senha</label>
          <v-text-field
            v-model="senha"
            placeholder="********"
            type="password"
            density="compact"
            variant="outlined"
            class="mb-2 v-text-field"
          ></v-text-field>
          <label for="senha" class="text-label">Confirmar Senha</label>
          <v-text-field
            v-model="confirmarSenha"
            placeholder="********"
            type="password"
            density="compact"
            variant="outlined"
            class="mb-2 v-text-field"
          ></v-text-field>
          <v-btn class="primary" block outlined rounded="lg" @click="signup()"
            >Cadastrar-se</v-btn
          >
        </v-form>
        <p class="text-center mt-4">
          Já possui um cadastro?
          <router-link to="/" class="text-primary-custom"
            >Fazer Login</router-link
          >
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-primary-custom {
  text-decoration: none;
  font-weight: 600;
  color: #389c37 !important;
}

.rounded {
  border-radius: 10px !important;
}

.primary {
  background-color: #389c37 !important;
  color: #fff !important;
}

.v-text-field--outlined >>> fieldset {
  border-color: rgba(192, 0, 250, 0.986);
}
.v-text-field {
  border-radius: 10px !important;
}
</style>
