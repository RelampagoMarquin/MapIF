<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEventStore } from "../stores/eventStore";
import { useGroupStore } from "../stores/groupStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import moment from "moment";

const router = useRouter();
const eventId = parseInt(router.currentRoute.value.params.idevento);

/*event store*/
const eventStore = useEventStore();

const nome = ref("");
const dataInicio = ref("");
const dataFim = ref("");
const descricao = ref("");
const isPublic = ref(true);
let snackbarSucess = ref(false);
let snackbarFailed = ref(false);

onMounted(async () => {
  const currentEvent = await eventStore.getOneEvent(eventId);

  nome.value = currentEvent.nome;
  dataInicio.value = moment(currentEvent.comeca).format("YYYY-MM-DD");
  dataFim.value = moment(currentEvent.fim).format("YYYY-MM-DD");
  descricao.value = currentEvent.descricao;
  isPublic.value = currentEvent.isPublic;
});

function dateValidation(dateInicio: Date, dateFim: Date) {
  return dateInicio > dateFim;
}

async function updateEvent() {
  if (dateValidation(new Date(dataInicio.value), new Date(dataFim.value))) {
    snackbarFailed.value = true;
    return;
  }

  const data = {
    id: eventId,
    nome: nome.value,
    comeca: new Date(dataInicio.value),
    fim: new Date(dataFim.value),
    descricao: descricao.value,
    isPublic: isPublic.value,
  };

  console.log(data);

  const createEvent = await eventStore.updateEvent(data);
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
        <div class="mb-5">
          <h1 class="mb-5 mt-5 text-center title-primary">Editar Evento</h1>
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

            <!-- isPublic -->

            <label for="isPublic" class="text-label mt-4"
              >O Evento será público?</label
            >
            <v-switch color="success" inset v-model="isPublic"> </v-switch>
          </form>
        </div>
        <div>
          <v-btn
            class="btn mt-3 p-4"
            x-large
            block
            rounded="lg"
            @click="updateEvent()"
          >
            <span class="mr-4">Editar Evento</span>
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
        Evento atualizado com sucesso!
      </v-snackbar>
      <v-snackbar
        :timeout="2000"
        color="red"
        elevation="24"
        v-model="snackbarFailed"
      >
        Erro ao editar evento!
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
