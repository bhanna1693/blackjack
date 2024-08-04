<script setup lang="ts">
import { Card } from '@/models/Card'

defineProps<{ cards: Card[]; title: string }>()
</script>
<template>
  <div>
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="card of cards" :key="card.id">
        {{ card.fullName }}
      </li>
    </ul>
  </div>
</template>
