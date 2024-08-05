import type { Card } from './Card'

export class Player {
  playerType: 'player' | 'dealer' = 'player'
  name: string = ''
  cards: Card[] = []
  id: string = ''
  get isDealer() {
    return this.playerType === 'dealer'
  }

  constructor(props: { name: string; cards?: Card[]; playerType?: 'player' | 'dealer' }) {
    this.name = props.name
    this.id = props.name
    this.playerType = props.playerType ?? 'player'
    this.cards = props.cards ?? []
  }
}
