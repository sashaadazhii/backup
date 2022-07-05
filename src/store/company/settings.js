import axios from 'axios'

export default {
  namespaced: true,

  state: {
    settings: {
      id: 'dafc1ed1-9860-44b0-9f5e-ffeeb15572af',
      slug: 'auto-car-service',
      isActive: true,
      businessName: 'Auto Car Service',
      mainAddress: '103 Queen St, Armstrong, ON P0T 1A0, Canada',
      businessPhoneNumber: 1234567890,
      ownerName: 'Michel Smith',
      ownerEmail: 'michel@auto-s.com',
      ownerPhone: 2345678760,
      mainContactName: 'Alex Thomson',
      mainContactEmail: 'alex_t@auto-s.com',
      mainContactPhone: 34567876547,
      loanVehicles: true,
      rideToWork: true,
      hasShifts: true,
      hasGlobalWarranty: true,
      warrantyTime: 18,
      warrantyRange: 30000,
      usersQuota: 5,
      usersCount: 3,
      initialWalkThrough: false
    }
  },
  mutations: {
    set(state, settings) {
      state.settings = settings
    },
    update(state, settings) {
      if (settings) state.settings = settings
    }
  },
  actions: {
    // async update({commit}, settings) {
    //   const url = process.env.VUE_APP_BACKEND
    //   try {
    //     return await axios.put(url + `company/settings/`, settings)
    //   } catch (err) {
    //     commit('setError', err, {root: true})
    //     throw err
    //   }
    // }
  }
}
