import _ from 'lodash'
import {customers as customersList} from '../data/customers'
export default {
  namespaced: true,

  state: {
    customers: [],
    customer: {},
    searchParams: null,
    pagination: {},
    page: 1
  },
  mutations: {
    set(state, customers) {
      state.customers = _.unionBy(state.customers, customers, 'uid')
    },
    setCustomer(state, customer) {
      state.customer = customer
    },
    setSearch(state, params) {
      state.searchParams = params
    },
    pagination(state, pagination) {
      state.pagination = pagination
    },
    changePage(state, page) {
      if (page) state.page = page
      else state.page++
    },
    reset(state) {
      state.customers = []
      state.page = 1
    },
    remove(state, uid) {
      state.customers = state.customers.filter(user => user.uid !== uid)
    },
    add(state, customer) {
      const newCustomer = _.clone(customer)
      newCustomer.isUpdated = true
      state.customers.unshift(newCustomer)
    },
    update(state, customer) {
      if (state.customer.uid) state.customer = customer
      if (!state.customers.length) return
      const cusIdx = state.customers.findIndex(cus => cus.uid === customer.uid)
      const newCustomer = {..._.cloneDeep(customer), vehicles: state.customers[cusIdx].vehicles}
      if (customer.isUpdated) newCustomer.isUpdated = false
      else newCustomer.isUpdated = true
      state.customers.splice(cusIdx, 1, newCustomer)
    },

    addVehicle(state, vehicle) {
      if (!state.customers.length) return
      const customer = state.customers.find(cus => cus.uid === vehicle.customerUID)
      customer.vehicles.unshift(vehicle)
    },
    updateVehicle(state, vehicle) {
      if (!state.customers.length) return
      const customer = state.customers.find(cus => cus.uid === vehicle.customerUID)
      let vehicleIndex = customer.vehicles.indexOf(vehicle => vehicle.uid === vehicle.uid)
      customer.vehicles.splice(vehicleIndex, 1, vehicle)
    },
    removeVehicle(state, {customerUID, vehicleUID}) {
      if (!state.customers.length) return
      const customer = state.customers.find(cus => cus.uid === customerUID)
      customer.vehicles = customer.vehicles.filter(vehicle => vehicle.uid !== vehicleUID)
    }
  },
  actions: {
    async fetch({commit, state}) {
      const search = state.searchParams?.toLocaleLowerCase() || ''
      const filteredCustomer = customersList.data.filter(cus => {
        const isFirstName = cus.firstName.toLocaleLowerCase().includes(search)
        const isLastName = cus.lastName.toLocaleLowerCase().includes(search)
        return isFirstName || isLastName
      })

      try {
        commit('pagination', customersList.pagination)
        commit('set', filteredCustomer)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async search({commit}, search) {
      try {
        const searchValue = search?.toLocaleLowerCase() || ''
        const filteredCustomer = customersList.data.filter(cus => {
          const isFirstName = cus.firstName.toLocaleLowerCase().includes(searchValue)
          const isLastName = cus.lastName.toLocaleLowerCase().includes(searchValue)
          return isFirstName || isLastName
        })
        return filteredCustomer
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, uid) {
      try {
        const customer = customersList.data.find(c => c.uid === uid)
        commit('setCustomer', customer)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, cus) {
      try {
        cus.uid = Date.now()
        commit('add', cus)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {cus, uid}) {
      try {
        cus.uid = uid
        commit('update', cus)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, uid) {
      try {
        commit('remove', uid)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
