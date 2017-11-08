import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
} from '../actions/types'

export default function decks(state={}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return action.decks
    case ADD_DECK:
      let deck = action.deck
      return { ...state, [deck.id]: deck }
    case ADD_CARD:
      const deckID = action.deckID
      deck = state[deckID]
      const cards = deck.cards || []
      const card = action.card
      return { ...state, [deckID]: { ...deck, cards: [...cards, card] } }
    default:
      return state
  }
}