<script setup lang="ts">
import { useUserStore } from '../stores/userStore';
import { ref } from 'vue';
const userStore = useUserStore();

const senha = ref('')
const email = ref('')

function login() {
  const data = {
    senha: senha.value,
    email: email.value
  }
  userStore.login(data);
}
</script>

<template>
  <div class="container vh-100">
    <div class="row">
      <!-- LOGO -->
      <div class="col-12 text-center">
        <h1 class="text-primary mb-5 mt-5">LOGO AQUI</h1>
      </div>
      <!-- FORM -->
      <div class="col-12 d-flex flex-column">
        <h2 class="text-center text-primary mb-5">Login</h2>
        <form action="#" method="post" class="px-5">
          <label for="email" class="text-secondary">Email</label>
          <input type="email" name="email" id="email" v-model="email" class="form-control rounded-5">
          <label for="senha" class="text-secondary">Senha</label>
          <input type="password" name="senha" id="senha" v-model="senha" class="form-control rounded-5">
          <div class="d-grid gap-2 mt-4">
            <button type="button" class="btn btn-primary" @click.prevent="login()">Login</button>
          </div>
        </form>
        <p class="text-secondary text-center mt-4">Não possui um cadastro? <a href="#" class="text-decoration-none text-primary">Crie uma nova conta</a></p>
      </div>
    </div>
  </div>
</template>