<script setup lang="ts">
import type { Card } from '@/models/Card'

defineProps<{ card: Card }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center shadow-xl w-36 overflow-auto">
    <figure class="tooltip" :data-tip="card.fullName">
      <img :src="card.frontSvgPath" :alt="card.frontSvgPath" />
    </figure>
  </div>
</template>
