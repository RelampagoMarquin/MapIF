<script setup lang="ts">

</script>

<template>
  <v-rol class="justify-center">
    <div class="fundo d-flex flex-column justify-center align-center">
      <div class="primary rounded-pill text-center">
        <h1 class="font-weight-bold text-h4">Bem vindo ao</h1>
        <img class="mb-5 mt-5 text-center" width="300" src="/logo-alternative.png" alt="Lodo do MapIF">
      </div>
    </div>
    <v-container class="align-center">
      <v-row class="justify-center mt-16">
        <v-col cols="10">
          <router-link to="/" class="link-default">
            <v-btn class="btn secondary elevation-0 p-4 d-flex" block rounded="lg">
              <div class="btn-title">COMEÇAR</div>
              <div>
                <v-icon x-large color="#389c37"> mdi-chevron-right </v-icon>
              </div>
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-rol>
</template>

<style scoped>

.fundo {
  width: 100%;
  height: 55vh;
  background-color: #389c37;
  border-radius: 0px 0px 150px 150px;
}

.link-default {
  text-decoration: none;
}

.btn {
  border: 1px solid #389c37;
}

.btn-title {
  font-weight: 700;
  letter-spacing: 0.5px;
}
</style>