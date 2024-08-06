<script setup lang="ts">
import type { Card } from '@/models/Card'

defineProps<{ card: Card }>()
</script>

<template>
  <div class="overflow-auto">
    <figure class="my-0">
      <img :src="card.imgSrc" :alt="card.fullName" />
    </figure>
  </div>
</template>
