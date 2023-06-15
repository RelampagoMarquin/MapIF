<script setup>
import { ref, computed } from "vue";
import { onMounted } from "@vue/runtime-core";
import * as L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useRouter } from "vue-router";
import { usePolygonStore } from "../stores/polygonStore";
import { storeToRefs } from "pinia";
import GoBack from "../components/GoBackButton.vue";

/* Current router */
const router = useRouter();
const poligonoId = parseInt(router.currentRoute.value.params.poligonoid);

/* polygon store */
const polygonStore = usePolygonStore();

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
  map.value = L.map(mapElement.value).setView([-6.264359, -36.516165], 19);
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    maxZoom: 23,
    maxNativeZoom: 19,
  }).addTo(map.value);

  drawnItems = new L.FeatureGroup();

  map.value.addLayer(drawnItems);

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
  const poligono = await polygonStore.getOnePolygon(poligonoId);
  let polygonCoords = poligono.locais;
  var polygonLayer = L.polygon(polygonCoords, {
    id: `${poligono.id}`,
  }).addTo(map.value);
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
</script>

<template>
  <GoBack class="margin"/>
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
      </v-container>
    </div>
    <v-bottom-navigation
      grow
      absolute
      bg-color="#389c37"
      color="#000000"
      class="bottom-navigation"
    >
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
