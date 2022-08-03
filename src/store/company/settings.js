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
      timeZoneName: 'America/Toronto',
      loanVehicles: true,
      rideToWork: true,
      hasShifts: true,
      hasGlobalWarranty: true,
      warrantyTime: 18,
      warrantyRange: 30000,
      usersQuota: 5,
      usersCount: 3,
      initialWalkThrough: false,
      initialWalkThrough: false,
      winterTires: false,
      tiresStorage: false,
      hourlyRate: 160
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
  actions: {}
}
