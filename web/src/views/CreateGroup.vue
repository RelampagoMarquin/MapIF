<script>
  
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
          <form action="#" method="post" class="text-start">
            <label for="nome" class="text-label">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              v-model="nome"
              class="form-control input-camp rounded-pill elevation-4"
            />
          </form>
        </div>
        <div>
              <v-btn class="btn mt-8 p-4" x-large block rounded="lg">
                <span class="mr-4">Criar grupo</span>
              </v-btn>
            </div>
      </v-col>
    </v-row>
  </v-container>
</template>
