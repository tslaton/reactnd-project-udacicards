import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
} from './actions'

export default function decks(state={}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return action.decks
    case ADD_DECK:
      const deck = action.deck
      return { ...state, [deck.id]: deck }
    default:
      return state
  }
}