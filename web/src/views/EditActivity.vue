<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useActivityStore } from "../stores/atividadeStore";
import { useRouter } from "vue-router";
import moment from "moment";

/* Current router */
const router = useRouter();
const idatividade = parseInt(router.currentRoute.value.params.idatividade);

const activityStore = useActivityStore();

const nome = ref("");
const dataInicio = ref("");
const dataFim = ref("");
const descricao = ref("");
const isPublic = ref(true);
let snackbarSucess = ref(false);
let snackbarFailed = ref(false);

onMounted(async () => {
  const currentActivity = await activityStore.getOneActivity(idatividade);

  nome.value = currentActivity.nome;
  dataInicio.value = moment(currentActivity.horarioInicial).format(
    "YYYY-MM-DDTHH:mm"
  );
  dataFim.value = moment(currentActivity.horarioFinal).format(
    "YYYY-MM-DDTHH:mm"
  );
  descricao.value = currentActivity.descricao;
  isPublic.value = currentActivity.isPublic;
});

function clearForm() {
  nome.value = "";
  dataInicio.value = "";
  dataFim.value = "";
  descricao.value = "";
}

function dateValidation(dateInicio: Date, dateFim: Date) {
  return dateInicio > dateFim;
}

async function updateActivity() {
  if (dateValidation(new Date(dataInicio.value), new Date(dataFim.value))) {
    snackbarFailed.value = true;
    return;
  }
  const data = {
    id: idatividade,
    nome: nome.value,
    horarioInicial: new Date(dataInicio.value),
    horarioFinal: new Date(dataFim.value),
    descricao: descricao.value,
    isPublic: isPublic.value,
  };

  const createActivity = await activityStore.updateActivity(data);
  if (createActivity) {
    snackbarSucess.value = true;
    setTimeout(() => {
      clearForm();
      router.back();
    }, 4000);
  } else {
    snackbarFailed.value = true;
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="8">
        <div class="mb-5">
          <h1 class="mb-8 mt-5 text-center title-primary">Editar Atividade</h1>
        </div>
        <!-- FORM -->
        <div class="rounded-lg elevation-2 p-4">
          <form action="#" method="post" class="text-start">
            <label for="nome" class="text-label">Nome</label>
            <input
              type="text"
              name="nome"
              maxlength="45"
              id="nome"
              v-model="nome"
              class="form-control input-camp rounded-pill elevation-4"
            />
            <label for="data-inicio" class="mt-3 text-label"
              >Data do início da Atividade</label
            >
            <input
              type="datetime-local"
              name="data-inicio"
              id="data-inicio"
              v-model="dataInicio"
              class="form-control input-camp rounded-pill elevation-4"
            />
            <label for="data-fim" class="mt-3 text-label"
              >Data do fim da Atividade</label
            >
            <input
              type="datetime-local"
              name="data-fim"
              id="data-fim"
              v-model="dataFim"
              class="form-control input-camp rounded-pill elevation-4"
            />
            <label for="descricao" class="mt-3 text-label">Descrição</label>
            <textarea
              name="descricao"
              maxlength="100"
              id=""
              cols="30"
              rows="4"
              class="form-control input-camp rounded-border elevation-4"
              v-model="descricao"
            ></textarea>

            <label for="isPublic" class="text-label mt-4"
              >A atividade será pública?</label
            >
            <v-switch color="success" inset v-model="isPublic"> </v-switch>
          </form>
        </div>
        <div>
          <v-btn
            class="btn mt-8 p-4"
            x-large
            block
            rounded="lg"
            @click="updateActivity()"
          >
            <span class="mr-4">Editar atividade</span>
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
        Atividade atualizada com sucesso!
      </v-snackbar>
      <v-snackbar
        :timeout="2000"
        color="red"
        elevation="24"
        v-model="snackbarFailed"
      >
        Erro ao atualizar atividade!
      </v-snackbar>
    </v-sheet>
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

.rounded-border {
  border-radius: 15px;
  resize: none;
}

.block {
  display: block;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23888888' d='M7 10L12 15L17 10H7Z' /%3E%3C/svg%3E")
    96% / 15% no-repeat;
}
</style>
