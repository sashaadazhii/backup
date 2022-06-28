import axios from 'axios'

export default {
  namespaced: true,

  state: {
    settings: {
      id: 1,
      slug: 'test-and-repairs',
      isActive: true,
      businessName: 'Test & Repairs Inc.',
      mainAddress: '1234 Test Ave, Ottawa',
      businessPhoneNumber: 2222222222,
      ownerName: 'Nikola Tesla',
      ownerEmail: 'nikola_tesla@test.com',
      ownerPhone: 2222222222,
      mainContactName: 'Thomas Edison',
      mainContactEmail: 'thomas_edison@test.com',
      mainContactPhone: 2222222222,
      loanVehicles: true,
      rideToWork: true,
      hasShifts: true,
      hasGlobalWarranty: true,
      warrantyTime: 18,
      warrantyRange: 30000,
      usersQuota: 5,
      usersCount: 2
    }
  },
  mutations: {
    set(state, settings) {
      state.settings = settings
    }
  },
  actions: {
    async fetch({commit}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const settings = await axios.get(url + `company/settings/`)
        commit('set', settings.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, settings) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.put(url + `company/settings/`, settings)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
