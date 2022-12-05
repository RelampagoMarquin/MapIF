<script setup lang="ts">
import { useUserStore } from '../stores/userStore';
import { ref } from 'vue';
const userStore = useUserStore();

const nome = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const email = ref('')

function signup() {
  const data = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  }
  if(senha.value !== confirmarSenha.value) return alert('As senhas não conferem')
  else {userStore.createUser(data);}
  
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
        <h2 class="text-center text-primary mb-5">Cadastre-se</h2>
        <form action="#" method="post" class="px-5">
          <label for="nome" class="text-secondary mb-1">Nome Completo</label>
          <input type="text" name="nome" id="nome" v-model="nome" class="form-control rounded-5 mb-2">
          <label for="email" class="text-secondary mb-1">Email</label>
          <input type="email" name="email" id="email" v-model="email" class="form-control rounded-5 mb-2">
          <label for="senha" class="text-secondary mb-1">Senha</label>
          <input type="password" name="senha" id="senha" v-model="senha" class="form-control rounded-5 mb-2">
          <label for="senha-check" class="text-secondary mb-1">Confirmar Senha</label>
          <input type="password" name="senha" id="senha-check" v-model="confirmarSenha" class="form-control rounded-5 mb-2">
          <div class="d-grid gap-2 mt-4">
            <button type="button" class="btn primary" @click.prevent="signup()">Cadastrar-se</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>