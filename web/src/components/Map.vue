<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core"

function localizacao(posicao) {
  var lat = posicao.coords.latitude;
  var lon = posicao.coords.longitude;

  // marcador da localização atual
  var marker2 = L.marker([lat, lon])
    .addTo(map.value)
    .bindPopup("aqui está você!!!");
}

const mapElement = ref(null);
const map = ref(null);

onMounted(() => {
  map.value = L.map(mapElement.value).setView([-6.25309, -36.53401], 19);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 23,
    maxNativeZoom: 19, // caso não tenha o zoom, ele pega o atual e amplia,
  }).addTo(map.value);

  //fazer uma marcação e adicona um texto
  L.marker([-6.25309, -36.53401])
    .addTo(map.value)
    .bindPopup("Aqui é bom pra namorar.<br> Traga seu amor.")
    .openPopup();

  //aqui a sua localização e achada e enviada para o método localizacao
  navigator.geolocation.getCurrentPosition(localizacao);

  //criar um polygono
  var polygon = L.polygon([
    [-6.253142585162962, -36.53404412963343],
    [-6.2531609012307, -36.53403152257928],
    [-6.253168131256544, -36.53404364474693],
    [-6.253151743196412, -36.53405406981031],
    [-6.253145236172287, -36.534043402303155],
    [-6.2531442721691235, -36.534041220313384],
  ])
    .addTo(map.value)
    .bindPopup("I am a polygon.");
});

function getLocation() {
  const e = map.value.locate({ setView: true, maxZoom: 17 });
}

</script>

<template>
  <div id="map" ref="mapElement">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn 
           
            @click="getLocation()"
            :elevation="20"
            icon="mdi-target-account"
            color="primary"
            class="elevated btn"
          ></v-btn>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
#map {
  height: 92vh;
  width: 100vw;
}
/* 
.elevated {
  position: absolute;
  z-index: 1000;
} */

.v-btn {
  top: 86%;
  left: 70%;
  background-color: #389c37 !important;
  color: #fff !important;
}

@media screen and (max-width: 600px) {
  .v-btn {
    top: 86%;
    left: 80%;
  }
}
</style>
