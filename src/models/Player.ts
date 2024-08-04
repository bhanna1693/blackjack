import type { Card } from './Card'

export class Player {
  playerType: 'player' | 'dealer' = 'player'
  name: string = ''
  cards: Card[] = []
  id: string = ''
  get isDealer() {
    return this.playerType === 'dealer'
  }

  constructor(props: { name: string; playerType: 'player' | 'dealer'; cards: Card[] }) {
    this.name = props.name
    this.id = props.name
    this.playerType = props.playerType
    this.cards = props.cards
  }
}
