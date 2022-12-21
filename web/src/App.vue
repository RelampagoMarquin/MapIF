<script setup lang="ts">
import Main from "./layout/Main.vue";
</script>

<template>
  <Main>
    <div><router-view /></div>
  </Main>
</template>

<style>
.text-primary-custom {
  color: #389c37 !important;
}

.text-secondary-custom {
  color: #888888 !important;
}

.primary {
  background-color: #389c37 !important;
  color: #fff !important;
}

@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  font-family: "Quicksand", sans-serif;
  font-weight: 700 !important;
}

.title-primary {
  color: #389c37 !important;
  font-weight: 700 !important;
}

.title-secondary {
  color: #389c37 !important;
  font-weight: 650 !important;
}

.bold {
  font-weight: 700 !important;
  color: #888888 !important;
}

.input-camp {
  background-color: #dddddd !important;
  color: #888888 !important;
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

.active {
  background-color: #389c37 !important;
  color: #fff !important;
}
</style>
