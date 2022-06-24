import axios from 'axios'
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
      state.customers.unshift({...customer, isUpdated: true})
    },
    update(state, customer) {
      if (state.customer.uid) state.customer = customer
      if (!state.customers.length) return
      const cusIdx = state.customers.findIndex(cus => cus.uid === customer.uid)
      const newCustomer = {...customer, vehicles: state.customers[cusIdx].vehicles}
      if (customer.isUpdated) delete newCustomer.isUpdated
      else newCustomer.isUpdated = true
      state.customers.splice(cusIdx, 1, newCustomer)
    },
    removeVehicle(state, {uid, vehicleUID}) {
      if (!state.customers.length) return
      const customer = state.customers.find(cus => cus.uid === uid)
      customer.vehicles = customer.vehicles.filter(vehicle => vehicle.uid !== vehicleUID)
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
    }
  },
  actions: {
    async fetch({commit, state}) {
      const search = state.searchParams
      try {
        const customers = customersList
        commit('pagination', customers.pagination)
        commit('set', customers.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async search({commit}, search) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.get(`${url}company/customers/`, {params: search})
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const customers = await axios.get(`${url}company/customers/${uid}/`)
        commit('setCustomer', customers.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, user) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/customers/`, user)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {user, id}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.put(`${url}company/customers/${id}/`, user)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.delete(`${url}company/customers/${id}/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
