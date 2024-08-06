<script setup lang="ts">
import { useSelectedCardImageStore } from '@/stores/card-background'
import { storeToRefs } from 'pinia'

const cardBackgroundStore = useSelectedCardImageStore()
const { selectedCardImage, cardImageChoices } = storeToRefs(cardBackgroundStore)
</script>

<template>
  <label class="form-control max-w-[14rem] mt-4">
    <select
      class="select select-primary"
      name="backImgChoice"
      id="backImgChocie"
      :value="selectedCardImage"
      @change="cardBackgroundStore.setSelectedCardImage(($event.target as any).value)"
    >
      <option v-for="choice of cardImageChoices" :key="choice">
        {{ choice }}
      </option>
    </select>
    <div class="label">
      <span class="label-text-alt">Choose your card background</span>
    </div>
  </label>
</template>
