<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  date: string;
  location: string;
}>();
</script>

<template>
  <div class="rounded-lg elevation-2 p-3">
    <h5 class="title-secondary">{{ title }}</h5>
    <v-divider class="mb-4"></v-divider>
    <p class="text-secondary-custom">{{ description }}</p>
    <p class="text-secondary-custom">{{ date }}</p>
    <a href="" class="text-primary-custom">{{ location }}</a>
  </div>
</template>
