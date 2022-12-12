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
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <div>
          <h1 class="mb-5 mt-5 text-center">LOGO AQUI</h1>
        </div>
        <!-- FORM -->
        <div>
          <h2 class="text-primary mb-5 text-center">Login</h2>
          <form action="#" method="post" class="text-start">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              class="form-control"
            />
            <label for="senha" class="mt-3">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              v-model="senha"
              class="form-control rounded-5"
            />
            <div class="d-grid gap-2 mt-4">
              <v-btn class="primary" rounded="lg" @click.prevent="login()">
                Login
              </v-btn>
            </div>
          </form>
          <p class="text-center mt-4">
            Não possui um cadastro?
            <router-link to="/signup" class="text-primary"
              >Crie uma nova conta</router-link
            >
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.text-primary {
  color: #389c37 !important;
}

.primary {
  background-color: #389c37 !important;
  color: #fff !important;
}
</style>
