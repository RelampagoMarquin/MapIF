<script setup lang="ts">
import { useUserStore } from "../stores/userStore";
import { ref } from "vue";
const userStore = useUserStore();

const senha = ref("");
const email = ref("");

function login() {
  const data = {
    senha: senha.value,
    email: email.value,
  };
  userStore.login(data);
}
</script>

<template>
  <v-container class="align-center">
    <v-row class="justify-center">
      <v-col cols="10" md="4">
        <div>
          <h1 class="mb-5 mt-5 text-center">LOGO AQUI</h1>
        </div>
        <h2 class="text-primary-custom mb-5 text-center">Login</h2>
        <v-form>
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
          <v-btn class="primary" block outlined rounded="lg" @click="login()"
            >Entrar</v-btn
          >
        </v-form>
        <p class="text-center mt-4">
          Não possui um cadastro?
          <router-link to="/signup" class="text-primary-custom"
            >Crie uma nova conta</router-link
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
