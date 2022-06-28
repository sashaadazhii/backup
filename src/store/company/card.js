import {customers as customersList} from '../data/customers'

const getDefaultCard = () => {
  return {
    name: null,
    description: null,
    descriptionForCustomer: null,
    cardRelationType: 'all',
    cardType: 'inspection',
    relations: [
      {
        make: null,
        model: null,
        yearFrom: null,
        yearTo: null
      }
    ],
    customer: null,
    vehicle: null,
    vehicleUID: null,
    odometerTrack: null,
    timeTrackLength: null,
    timeTrackType: 'months'
  }
}

export default {
  namespaced: true,

  state: {
    card: getDefaultCard(),
    customers: [],
    vehicles: [],
    errors: {}
  },
  mutations: {
    setName(state, name) {
      state.card.name = name
    },
    setDesc(state, desc) {
      state.card.description = desc
    },
    setCusDesc(state, desc) {
      state.card.descriptionForCustomer = desc
    },
    setCardType(state, type) {
      state.card.cardType = type
    },
    setCardRelationType(state, type) {
      state.card.cardRelationType = type
    },
    addRelation(state) {
      const vehicle = {
        make: null,
        model: null,
        yearFrom: null,
        yearTo: null
      }
      if (!state.card.relations) state.card.relations = []
      state.card.relations.push(vehicle)
    },
    removeRelation(state, idx) {
      state.card.relations.splice(idx, 1)
    },
    setRelationMake(state, {idx, make}) {
      state.card.relations[idx].make = make
    },
    setRelationModel(state, {idx, model}) {
      state.card.relations[idx].model = model
    },
    setRelationYearFrom(state, {idx, year}) {
      state.card.relations[idx].yearFrom = year
    },
    setRelationYearTo(state, {idx, year}) {
      state.card.relations[idx].yearTo = year
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    reset(state) {
      Object.assign(state.card, getDefaultCard())
    },
    //========== CUSTOMERRS ==========//
    setCustomers(state, customers) {
      state.customers = customers
    },
    setCustomer(state, customer) {
      state.card.customer = customer
    },
    setVehicle(state, vehicle) {
      state.card.vehicle = vehicle
      state.card.vehicleUID = vehicle?.uid
    },
    //========== Service Tracking ==========//
    setOdometerTrack(state, odometer) {
      state.card.odometerTrack = odometer
    },
    setTimeTrackLength(state, timeTrack) {
      state.card.timeTrackLength = timeTrack
    },
    seTtimeTrackType(state, type) {
      state.card.timeTrackType = type
    }
  },
  actions: {
    async fetchCustomers({commit}, search) {
      try {
        const searchValue = search?.toLocaleLowerCase() || ''
        const filteredCustomer = customersList.data.filter(cus => {
          const isFirstName = cus.firstName.toLocaleLowerCase().includes(searchValue)
          const isLastName = cus.lastName.toLocaleLowerCase().includes(searchValue)
          return isFirstName || isLastName
        })
        commit('setCustomers', filteredCustomer)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  },
  getters: {
    relations: s => s.card.relations
  }
}
