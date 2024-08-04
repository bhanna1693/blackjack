<script setup lang="ts">
import type { Card } from '@/models/Card'
import type { CardBackChoice } from '@/models/card.model'
import { computed } from 'vue'

const props = defineProps<{ card: Card; isFaceDown?: boolean; imgChoice?: CardBackChoice }>()
const imgSrc = computed(() =>
  props.isFaceDown ? props.card.getBackOfCardImgSrc(props.imgChoice) : props.card.getFrontImgSrc()
)
</script>

<template>
  <div class="shadow-xl overflow-auto">
    <figure class="my-0">
      <img :src="imgSrc" :alt="card.fullName" />
    </figure>
  </div>
</template>
