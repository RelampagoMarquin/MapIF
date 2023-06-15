<script setup lang="ts">
import { ref } from "vue";
import { useEventStore } from "../stores/eventStore";
import { useGroupStore } from "../stores/groupStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import GoBack from "../components/GoBackButton.vue"

const router = useRouter();
const eventStore = useEventStore();
const nome = ref("");
const dataInicio = ref("");
const dataFim = ref("");
const descricao = ref("");
const grupoId = ref("");
let snackbarSucess = ref(false);
let snackbarFailed = ref(false);

/*group store*/
const groupStore = useGroupStore();
groupStore.getGroups();
const { groups } = storeToRefs(groupStore);

function dateValidation(dateInicio: Date, dateFim: Date) {
  return dateInicio > dateFim;
}

async function createEvent() {
  if (dateValidation(new Date(dataInicio.value), new Date(dataFim.value))) {
    snackbarFailed.value = true;
    return;
  }

  const data = {
    nome: nome.value,
    comeca: new Date(dataInicio.value),
    fim: new Date(dataFim.value),
    descricao: descricao.value,
    grupoId: grupoId.value, //quando resolver o bagulho dos grupos, add aqui
    isPublic: true,
  };

  const createEvent = await eventStore.createEvent(data);
  if (createEvent) {
    snackbarSucess.value = true;
    setTimeout(() => {
      router.push("/event-list");
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
        <div class="mb-5 position-relative">
          <h1 class="mb-8 mt-5 text-center title-primary">Criar Evento</h1>
          <GoBack/>
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
            <label for="data-fim" class="mt-3 text-label">Grupo</label>
            <select
              name="grupo"
              id="grupo"
              v-model="grupoId"
              class="form-control input-camp rounded-pill elevation-4"
            >
              <option
                class="select-option input-camp rounded-pill elevation-4 p-4"
                v-for="grupo in groups"
                :value="grupo.id"
              >
                {{ grupo.nome }}
              </option>
            </select>
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
          </form>
        </div>
        <div>
          <v-btn
            class="btn mt-8 p-4"
            x-large
            block
            rounded="lg"
            @click="createEvent()"
          >
            <span class="mr-4">Cadastrar Evento</span>
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
        Evento cadastrado com sucesso!
      </v-snackbar>
      <v-snackbar
        :timeout="2000"
        color="red"
        elevation="24"
        v-model="snackbarFailed"
      >
        Erro ao cadastrar evento!
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

.select-option {
  size: 10px;
}
</style>
