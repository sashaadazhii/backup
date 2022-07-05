import {cardsList} from '../data/cards'

export default {
  namespaced: true,

  state: {
    cards: cardsList
  },
  mutations: {
    select(state, uid) {
      const card = state.cards.find(c => c.uid === uid)
      card.select = !card.select
    },
    selectAll(state) {
      if (state.cards.every(c => c.select)) state.cards.forEach(c => (c.select = false))
      else state.cards.forEach(c => (c.select = true))
    },
    deselectAll(state) {
      state.cards.forEach(c => (c.select = false))
    },
    changeStatus(state, status) {
      state.cards.forEach(c => {
        if (c.select) {
          c.select = false
          c.status = status
        }
      })
    }
  }
}
