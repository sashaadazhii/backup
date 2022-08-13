import {requests} from '../data/workOrders'

export default {
  namespaced: true,
  state: {
    questions: [
      {
        title: 'When you feel these vibrations:',
        time: 0,
        blocks: [
          {
            type: 'input',
            title: 'At what approximate speed you’re usually going?',
            placeholder: 'Enter Speed',
            value: null
          },
          {
            type: 'select',
            title: 'Do you feel it while you’re braking?',
            list: ['Yes', 'No'],
            value: null
          },
          {
            type: 'select',
            title: 'Is this vibration constant?',
            list: ['Yes', 'No'],
            value: null
          }
        ]
      },
      {
        title: 'When you hear these sounds:',
        time: 0,
        blocks: [
          {
            type: 'input',
            title: 'Where do you generally hear them from?',
            placeholder: 'Choose Side',
            value: null
          }
        ]
      },
      {
        title: 'When do you generally hear the noise when you’re driving?',
        time: 0,
        blocks: [
          {
            type: 'dropdown',
            title: 'Choose option or a few options:',
            placeholder: 'Chose option',
            value: null,
            list: ['off road', 'highway', 'when turning']
          }
        ]
      }
    ]
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
