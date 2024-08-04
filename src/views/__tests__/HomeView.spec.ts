import CardList from '@/components/CardList.vue'
import PlayingCard from '@/components/PlayingCard.vue'
import { Deck } from '@/models/Deck'
import { mount, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import HomeView from '../HomeView.vue'

describe('DeckOfCards.vue', () => {
  let wrapper: VueWrapper
  let deckInstance: Deck

  beforeEach(() => {
    deckInstance = new Deck()
    wrapper = mount(HomeView, {
      global: {
        mocks: {
          $deck: deckInstance
        }
      }
    })
  })

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should display action buttons', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3) // Two action buttons and one deal button
  })

  it('should deal a card when "Deal Card" button is clicked', async () => {
    const dealButton = wrapper.find('button.btn-accent')

    // Check initial state
    const initialRemainingCards = wrapper.findComponent(CardList).props('cards').length
    expect(initialRemainingCards).toBe(52)

    await dealButton.trigger('click')

    // Check if dealt card is now the last card in the dealt cards list
    const lastDealtCard = wrapper.findComponent(PlayingCard).props('card')
    expect(lastDealtCard).toBeDefined()
    expect(wrapper.findComponent(CardList).props('cards').length).toBe(51)
  })

  it('should display the last dealt card', async () => {
    await wrapper.find('button.btn-accent').trigger('click')

    const lastCardText = wrapper.find('h3').text()
    expect(lastCardText).toBe('Last Card Dealt')
  })

  it('should show remaining cards after dealing', async () => {
    const initialRemainingCards = wrapper.findComponent(CardList).props('cards').length
    await wrapper.find('button.btn-accent').trigger('click')
    const updatedRemainingCards = wrapper.findComponent(CardList).props('cards').length
    expect(updatedRemainingCards).toBe(initialRemainingCards - 1)
  })

  it('should display previous dealt cards', async () => {
    await wrapper.find('button.btn-accent').trigger('click')
    await wrapper.find('button.btn-accent').trigger('click')

    // await tick
    await wrapper.vm.$nextTick()
    const previousCardsList = wrapper.findComponent(CardList)
    const previousCards = previousCardsList.props('cards')
    expect(previousCards.length).toBe(2) // Since we dealt two cards
  })

  //   it('should handle shuffle and reset buttons', async () => {
  //     const shuffleButton = wrapper.findAll('button').filter((btn) => btn.text() === 'Shuffle').element
  //     const resetButton = wrapper.find('button').filter((btn) => btn.text() === 'Reset').element

  //     await shuffleButton.click()
  //     // Add assertions to check if the deck is shuffled

  //     await resetButton.click()
  //     // Add assertions to check if the deck is reset
  //   })
})
