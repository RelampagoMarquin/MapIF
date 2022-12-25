<script setup lang="ts"></script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="6">
        <div class="mb-5">
          <h1 class="mb-8 mt-5 text-center title-primary">Criar Evento</h1>
        </div>
        <!-- FORM -->
        <div class="rounded-lg elevation-2 p-4">
          <form action="#" method="post" class="text-start">
            <label for="nome" class="text-label">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              v-model="nome"
              class="form-control input-camp rounded-pill elevation-4"
            />
            <label for="data-inicio" class="mt-3 text-label"
              >Data do início da Exibição</label
            >
            <input
              type="date"
              name="data-inicio"
              id="data-inicio"
              v-model="dataInicio"
              class="form-control input-camp rounded-pill elevation-4"
            />
            <label for="data-fim" class="mt-3 text-label"
              >Data do fim da Exibição</label
            >
            <input
              type="date"
              name="data-fim"
              id="data-fim"
              v-model="dataFim"
              class="form-control input-camp rounded-pill elevation-4"
            />
            <div>
              <v-btn class="btn mt-8 p-4" x-large block rounded="lg">
                  <span class="mr-4">Cadastrar Local</span>
                  <v-icon x-large color="white">
                    mdi-plus-circle
                  </v-icon>
              </v-btn>
            </div>
            <div>
              <v-btn class="btn mt-8 p-4 disabled" disabled x-large block rounded="lg">
                <span class="mr-4">Cadastrar atividade</span>
                <v-icon x-large color="white"> mdi-plus-circle </v-icon>
              </v-btn>
            </div>
          </form>
        </div>
        <div>
              <v-btn class="btn mt-8 p-4" x-large block rounded="lg">
                <span class="mr-4">Cadastrar Evento</span>
              </v-btn>
            </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  font-family: "Quicksand", sans-serif;
}

.title-primary {
  color: #389c37 !important;
  font-weight: 700 !important;
}

.btn {
  background-color: #389c37 !important;
  color: #fff !important;
  font-weight: 700 !important;
  text-transform: capitalize;
}

.disabled {
  background-color: #888888 !important;
}
</style>
