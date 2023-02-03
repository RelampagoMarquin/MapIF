<script setup>
import { ref, computed } from "vue";
import { onMounted } from "@vue/runtime-core";
import * as L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useRouter } from "vue-router";
import { usePolygonStore } from "../stores/polygonStore";
import { storeToRefs } from "pinia";
import { useActivityStore } from "../stores/atividadeStore";
import Activity from "../components/Activity.vue";

/* Current router */
const router = useRouter();
const eventId = parseInt(router.currentRoute.value.params.idevent);

/* polygon store */
const polygonStore = usePolygonStore();

/* getActivitys */
const activityStore = useActivityStore();
async function getActivitys(idPoligono) {
  await activityStore.getActivitys(idPoligono);
}
const { activitys, loading } = storeToRefs(activityStore);

/* map config */
const mapElement = ref(null);
var map = ref(null);
const osmAttrib = "";
const osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const osm = ref(L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }));
var drawnItems = ref(null);
let appbar = ref(false);

const handleCreate = (e) => {
  var layer = e.layer;
  drawnItems.addLayer(layer);
  console.log(layer);
};

/* dialog */
let dialog = ref(false);
function toggleDialog() {
  dialog.value = true;
}
let currentPolygonId = ref(null);

onMounted(async () => {
  map.value = L.map(mapElement.value).setView([-6.25309, -36.53401], 19);
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    maxZoom: 23,
    maxNativeZoom: 19,
  }).addTo(map.value);

  drawnItems = new L.FeatureGroup();

  map.value.addLayer(drawnItems);

  L.control
    .layers(
      {
        osm: osm.value.addTo(map.value),
        google: L.tileLayer(
          "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
          {
            attribution: "google",
          }
        ),
      },
      { drawlayer: drawnItems },
      { position: "topleft", collapsed: false }
    )
    .addTo(map.value);

  map.value.on("pm:create", (e) => {
    var layer = e.layer;
    drawnItems.addLayer(layer);

    appbar.value = true;

    //adicionar evento quando o poligono for clicado
    layer.on("click", function (e) {
      if (layer.options.id) {
        getActivitys(layer.options.id);
      } else {
        console.log("não tem id");
        return;
      }
    });
  });

  /* adiciona no mapa os polígonos já cadastrados */
  await polygonStore.getPolygons(eventId);

  const { polygons } = storeToRefs(polygonStore);

  polygons.value.forEach((polygon) => {
    let polygonCoords = polygon.locais;
    var polygonLayer = L.polygon(polygonCoords, {
      id: `${polygon.id}`,
    }).addTo(map.value);

    polygonLayer.on("click", function (e) {
      const id = parseInt(polygonLayer.options.id);
      dialog.value = true;
      getActivitys(id);
      currentPolygonId.value = id;
    });
    drawnItems.addLayer(polygonLayer);
  });
});

function addTools() {
  map.value.pm.addControls({
    position: "topleft",
    drawMarker: false,
    drawPolyline: false,
    drawText: false,
    cutPolygon: false,
  });
}

/* save local */
function saveLocal() {
  let layers = Object.values(drawnItems._layers);
  let newPolygonsOnMap = layers.filter((layer) => !layer.options.id);
  let saveCoords = newPolygonsOnMap.map((layer) => {
    return layer._latlngs[0] || layer._latlng;
  });

  saveCoords.forEach((polygon) => {
    const data = {
      eventoId: eventId,
      locais: JSON.stringify(polygon),
    };

    polygonStore.createPolygon(data);
  });
}
</script>

<template>
  <div class="main">
    <div id="map" ref="mapElement">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="addTools()"
              :elevation="20"
              icon="mdi-plus"
              color="primary"
              class="elevated btn btn-location"
            ></v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark class="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Atividades</v-toolbar-title>
                <v-spacer></v-spacer>
               
              </v-toolbar>
              <v-list lines="two" subheader>
                <v-col
                  cols="12"
                  md="6"
                  lg="10"
                  class="mb-5 text-right"
                  align-self="end"
                >
                  <v-btn
                    class="rounded-lg elevation-2 btn"
                    nuxt
                    :to="`/create-activity/${currentPolygonId}`"
                  >
                    <v-icon class="mr-2">mdi-calendar-plus</v-icon>
                    Nova Atividade
                  </v-btn>
                </v-col>
                <v-list-subheader>Atividades Registradas</v-list-subheader>

                <v-col
                  cols="12"
                  class="text-center mt-5 mb-5"
                  v-if="loading > 0"
                >
                  <v-progress-circular
                    model-value="20"
                    :size="70"
                    :width="5"
                    color="green"
                    indeterminate
                  ></v-progress-circular>
                </v-col>
                <div v-else>
                  <div v-if="activitys.length === 0" class="p-4 text-center">
                  <v-row>
                    <p>Não há atividades cadastradas</p>
                  </v-row>
                </div>
                <div v-else class="rounded-lg elevation-2 p-4">
                  <v-row>
                    <v-col
                      v-for="item in activitys"
                      :key="item.nome"
                      class="mb-3"
                      cols="12"
                      md="12"
                      lg="6"
                    >
                      <Activity
                        :title="item.nome"
                        :id="item.id"
                        :description="item.descricao"
                        :dateInicio="item.horarioInicial"
                        :dateFim="item.horarioFinal"
                        :verAtividades="false"
                        :editar="false"
                      ></Activity>
                    </v-col>
                  </v-row>
                </div>
                </div>
                
              </v-list>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </div>
    <v-bottom-navigation
      grow
      absolute
      bg-color="#389c37"
      color="#000000"
      class="bottom-navigation"
    >
      <v-btn v-if="appbar" value="recent" @click="saveLocal()">
        <v-icon>mdi-content-save</v-icon>
        Salvar
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

#map {
  height: 92vh;
  width: 100vw;
}

.elevated {
  position: absolute;
  z-index: 1000;
}

.btn-location {
  top: 86%;
  left: 70%;
  background-color: #389c37 !important;
  color: #fff !important;
}

.leaflet-popup-content > * {
  display: block !important;
}

.v-icon {
  color: white !important;
}

.v-btn {
  color: white !important;
}
.text-white {
  color: white !important;
}

.v-bottom-navigation {
  position: absolute;
}

@media screen and (max-width: 600px) {
  .btn-location {
    top: 86%;
    left: 80%;
  }
}
</style>
