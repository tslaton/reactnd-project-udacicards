import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function deleteAllDecks() {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}))
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => data ? JSON.parse(data) : {})
}

export function createDeck(deck) {
  return getDecks()
    .then(decks => {
      const newDecks = { ...decks, [deck.id]: deck }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
      return deck
    })
}

export function getDeck(id) {
  return getDecks()
    .then(decks => decks[id])
}

export function createCard(deckID, card) {
  return getDecks()
    .then(decks => {
      const deck = decks[deckID]
      const cards = deck.cards || []
      const newDecks = { ...decks, [deckID]: { ...deck, cards: [...cards, card] } }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
      return card
    })
}