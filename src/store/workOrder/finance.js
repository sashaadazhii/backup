export default {
  namespaced: true,
  state: {
    /* eslint-disable vue/max-len */
    cards: [
      {
        id: 1,
        status: 'Recommended',
        approvalStatus: 'Approved For Next Visit',
        title: 'Cooling System Service',
        price: 320,
        description:
          'Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine performance',
        isDone: false,
        permanentDenialMessage: '',
        temporalDenialMessage: ''
      },
      {
        id: 2,
        status: 'Recommended',
        approvalStatus: 'Approved By SA',
        title: 'Air filter change',
        price: 380,
        description:
          'Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine performance',
        isDone: false,
        permanentDenialMessage: '',
        temporalDenialMessage: ''
      },
      {
        id: 4,
        status: 'Component Unsafe',
        approvalStatus: 'Permanently Declined',
        title: 'Engine Belt',
        price: 200,
        description:
          'Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine performance',
        isDone: false,
        permanentDenialMessage: '',
        temporalDenialMessage: ''
      }
    ],
    card: {},
    stateNotes: [
      {
        id: 1,
        note: 'In case you decline this card your car is just not going to be able to ride.'
      },
      {
        id: 2,
        note: 'This is just a very bad idea to decline this card. Very bad.'
      },
      {
        id: 3,
        note: 'Component is so unsafe that coudn’t be unsafer.'
      }
    ],
    parts: [
      {
        id: 1,
        cardID: 1,
        name: 'Part #2323-342-234',
        markup: '',
        quantity: 12,
        cost: 12,
        price: 12
      },
      {
        id: 2,
        cardID: 1,
        name: 'Part #2323-342-232',
        markup: '',
        quantity: 12,
        cost: 12,
        price: 12
      },
      {
        id: 3,
        cardID: 1,
        name: 'Part #2323-342-231',
        markup: '',
        quantity: 12,
        cost: 12,
        price: 12
      }
    ],
    filterParams: null
  },
  mutations: {
    //was card
    set(state, card) {
      state.card = card
    },
    setPMessage(state, message) {
      state.card.permanentDenialMessage = message
      const card = state.cards.find(c => c.id === state.card.id)
      card.permanentDenialMessage = message
    },
    setTMessage(state, message) {
      state.card.temporalDenialMessage = message
      const card = state.cards.find(c => c.id === state.card.id)
      card.temporalDenialMessage = message
    },
    addStateNote(state, note) {
      state.stateNotes.push(note)
    },
    setFilter(state, params) {
      state.filterParams = params
    }

    // add(state, questions) {
    //   state.questions.push(questions)
    // },
    // remove(state, id) {
    //   const idx = state.questions.findIndex(q => q.id === id)
    //   state.questions.splice(idx, 1)
    // },
    // update(state, group) {
    //   const idx = state.questions.findIndex(q => q.id === group.id)
    //   state.questions.splice(idx, 1, group)
    // },
    // show(state, status) {
    //   state.show = status
    // }
  },
  actions: {
    async fetch({commit, state}) {
      let cards = state.cards
      // ============ Filter ============
      const filterParams = state.filterParams || []
      const filter = {
        statusList: [],
        approvalStatusList: []
      }
      filterParams.forEach(f => {
        if (f.type === 'Card Status') filter.statusList.push(f.name)
        if (f.type === 'Approval Status') filter.approvalStatusList.push(f.name)
      })
      const {statusList, approvalStatusList} = filter

      cards = cards.filter(card => {
        if (statusList.length && approvalStatusList.length)
          return statusList.some(status => status === card.status) && approvalStatusList.some(status => status === card.approvalStatus)
        if (statusList.length) return statusList.some(status => status === card.status)
        if (approvalStatusList.length) return approvalStatusList.some(status => status === card.approvalStatus)
        return true
      })

      try {
        commit('set', cards)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
