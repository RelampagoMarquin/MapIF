<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";

import * as L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

const mapElement = ref(null);
var map = ref(null);
const osmAttrib = "";
const osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const osm = ref(L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }));
var drawnItems = ref(null);

onMounted(() => {
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

  map.value.pm.addControls({
    position: "topleft",
    drawMarker: false,
    drawText: false,
    cutPolygon: false,
  });

  map.value.on("pm:create", function (e) {
    var type = e.layerType,
      layer = e.layer;

    drawnItems.addLayer(layer);
    console.log(typeof layer)
    console.log(layer);
  });
});

function getLocation() {
  const e = map.value.locate({ setView: true, maxZoom: 17 });
}

function saveLocal() {
  
}
</script>

<template>
  <div class="main">
    <div id="map" ref="mapElement">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="getLocation()"
              :elevation="20"
              icon="mdi-target-account"
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
      <v-btn value="recent" @click="saveLocal()">
        <v-icon>mdi-content-save</v-icon>
        Salvar
      </v-btn>

     
    </v-bottom-navigation>
  </div>
</template>

<style scoped>
#map {
  height: 92vh;
  width: 100vw;
  position: relative;
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
  color: white  !important;
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
