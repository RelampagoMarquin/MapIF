<script setup>
import Map from "../components/Map.vue";
import AppBar from "../components/AppBar.vue";
</script>

<template>
  <div class="main">
    <Map :getLocation="true"></Map>
    <AppBar></AppBar>
  </div>
</template>


