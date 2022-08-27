import {cardsList} from '../data/cards'

export default {
  namespaced: true,

  state: {
    cards: [],
    card: {},
    searchValue: null,
    filterParams: null,
    sortType: 'Sort A-Z'
  },
  mutations: {
    set(state, cards) {
      state.cards = cards
    },
    setSort(state, params) {
      state.sortType = params
    },
    setSearch(state, params) {
      state.searchValue = params
    },
    setFilter(state, params) {
      state.filterParams = params
    },
    setCard(state, card) {
      state.card = card
    },
    changeCard(state, param) {
      const id = state.card.id
      const cardIdx = state.cards.findIndex(c => c.id === id)
      if (param === 'inc' && cardIdx + 1 < state.cards.length) state.card = state.cards[cardIdx + 1]
      if (param === 'dec' && cardIdx + 1 > 1) state.card = state.cards[cardIdx - 1]
    },
    select(state, id) {
      const card = state.cards.find(c => c.id === id)
      card.select = !card.select
    },
    selectAll(state) {
      if (state.cards.every(c => c.select)) state.cards.forEach(c => (c.select = false))
      else state.cards.forEach(c => (c.select = true))
    },
    deselectAll(state) {
      state.cards.forEach(c => (c.select = false))
    },
    changeStatus(state, {status, id}) {
      const card = state.cards.find(c => c.id === id)
      card.status = status
    },
    changeApprovalStatus(state, {approvalStatus, id}) {
      const card = state.cards.find(c => c.id === id)
      card.approvalStatus = approvalStatus
    },
    changeAllStatus(state, status) {
      state.cards.forEach(c => {
        if (c.select) {
          c.select = false
          c.status = status
        }
      })
    },
    find(state, value) {
      state.searchValue = value
      state.cards = cardsList.filter(card => card.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    },
    filter(state, filters) {
      const {status: statusList, approvalStatus: approvalStatusList} = filters
      if (!statusList.length && !approvalStatusList.length) state.filterParams = null
      else state.filterParams = filters
      state.cards = cardsList.filter(card => {
        if (statusList.length && approvalStatusList.length)
          return statusList.some(status => status === card.status) && approvalStatusList.some(status => status === card.approvalStatus)
        if (statusList.length) return statusList.some(status => status === card.status)
        if (approvalStatusList.length) return approvalStatusList.some(status => status === card.approvalStatus)
        return true
      })
    },
    remove(state, id) {
      state.cards = state.cards.filter(c => c.id !== id)
    }
  },
  actions: {
    async fetch({commit, state}) {
      let cards = cardsList
      // ============ Search ============
      const search = state.searchValue || ''
      cards = cardsList.filter(card => card.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
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

      // ============ Sort ============
      if (state.sortType === 'Sort A-Z') cards.sort((a, b) => a.name.localeCompare(b.name))
      if (state.sortType === 'Sort Z-A') cards.sort((a, b) => b.name.localeCompare(a.name))

      try {
        commit('set', cards)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
