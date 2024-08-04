<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { routes } from './router/routes'
const _routes = ref(routes)
</script>

<template>
  <header>
    <nav class="flex bg-primary">
      <RouterLink
        v-for="r of _routes"
        :key="r.name"
        :to="r.path"
        :class="'btn btn-primary rounded-none'"
        >{{ r.name }}</RouterLink
      >
    </nav>
  </header>

  <main class="prose container mx-auto px-4 mt-4">
    <RouterView />
  </main>
</template>
