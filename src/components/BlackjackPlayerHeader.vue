<script setup lang="ts">
import type { Blackjack } from '@/models/BlackjackGame'
import type { Player } from '@/models/Player'

defineProps<{ player: Player; blackjack: Blackjack }>()
</script>
<template>
  <div v-if="player.cards.length">
    <h3>{{ player.name }} -</h3>
    <p>
      Total:
      <span
        :class="{
          'text-red-500': blackjack.isPlayerBusted(player)
        }"
        >{{ blackjack.getPlayerScore(player) }}</span
      >
    </p>
  </div>
</template>
