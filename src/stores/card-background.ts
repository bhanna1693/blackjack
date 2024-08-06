import { Card } from '@/models/Card'
import type { CardBackChoice } from '@/models/card.model'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSelectedCardImageStore = defineStore('CardBackground', () => {
  const selectedCardImage = ref<CardBackChoice>('astronaut')
  const cardImageChoices = ref<CardBackChoice[]>([
    'abstract',
    'astronaut',
    'abstract_clouds',
    'abstract_scene',
    'abstract',
    'blue',
    'blue2',
    'cars',
    'castle',
    'fish',
    'frog',
    'red',
    'red2'
  ])
  const demoSelectedCard = computed(() => {
    return new Card({
      rank: 'A',
      suit: 'Spades',
      backImgChoice: selectedCardImage.value,
      isFaceDown: true
    })
  })

  function setSelectedCardImage(choice: CardBackChoice) {
    selectedCardImage.value = choice
  }

  return { cardImageChoices, selectedCardImage, demoSelectedCard, setSelectedCardImage }
})
