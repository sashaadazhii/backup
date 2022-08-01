import {requests} from '../data/workOrders'

export default {
  namespaced: true,
  state: {
    requests: [],
    request: {}
  },
  mutations: {
    set(state, requests) {
      state.requests = requests
    },
    setRequest(state, request) {
      state.request = request
    },
    changeRequest(state, param) {
      const id = state.request.id
      const reqIdx = state.requests.findIndex(r => r.id === id)
      if (param === 'inc' && reqIdx + 1 < state.requests.length) state.request = state.requests[reqIdx + 1]
      if (param === 'dec' && reqIdx + 1 > 1) state.request = state.requests[reqIdx - 1]
    },
    changeStatus(state, {status, id}) {
      const req = state.requests.find(r => r.id === id)
      req.status = status
    },
    changeCards(state, card) {
      const cards = state.request.cards
      if (cards.some(c => c.id === card.id)) state.request.cards = cards.filter(c => c.id !== card.id)
      else cards.unshift(card)
    }
  },
  actions: {
    async fetch({commit}) {
      try {
        commit('set', requests)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
