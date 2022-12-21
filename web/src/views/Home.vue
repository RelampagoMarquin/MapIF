<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapElement = ref(null);

onMounted(() => {
  var map = L.map(mapElement.value).setView([-6.25309, -36.53401], 19);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 21, //fica bugado com mais que 19
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //fazer uma marcação e adicona um texto
  L.marker([-6.25309, -36.53401])
    .addTo(map)
    .bindPopup("Aqui é bom pra namorar.<br> Traga seu amor.")
    .openPopup();

  //criar um polygono
  var polygon = L.polygon([
    [-6.253142585162962, -36.53404412963343],
    [-6.2531609012307, -36.53403152257928],
    [-6.253168131256544, -36.53404364474693],
    [-6.253151743196412, -36.53405406981031],
    [-6.253145236172287, -36.534043402303155],
    [-6.2531442721691235, -36.534041220313384],
  ])
    .addTo(map)
    .bindPopup("I am a polygon.");
});
</script>

<template>
  <div class="main">
    <div id="map" ref="mapElement"></div>

    <v-bottom-navigation grow absolute bg-color="#389c37" color="#000000">
      <v-btn value="recent">
        <v-icon>mdi-calendar-plus</v-icon>

        Recent
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-cellphone-marker</v-icon>

        Favorites
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon>

        Nearby
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker-path</v-icon>

        Nearby
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<style scoped>
.main {
  position: relative;
  padding: 0;
  margin: 0;
}
.v-icon {
  color: white;
}

.v-btn {
  color: white;
}
.text-white {
  color: white;
}
#map {
  height: 100vh;
  width: 100vw;
}
</style>
