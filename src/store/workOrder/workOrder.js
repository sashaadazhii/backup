import axios from 'axios'
import status from './workOrderStatuses'
import {workOrders as localOrders} from '../data/workOrders'
import {workOrder as localOrder} from '../data/workOrder'

export default {
  namespaced: true,
  state: {
    workOrders: {},
    workOrder: localOrder,
    localOrders: localOrders
  },
  mutations: {
    set(state, workOrders) {
      state.workOrders = workOrders
    },
    creaete(state, {vehicle, customer}) {
      const {uid, firstName, lastName, cellPhones} = customer
      const {uid: vehicleUID, make, model, year, currentOdometer} = vehicle
      const order = {
        // =============== Info =============
        customer: {uid, firstName, lastName, cellPhones},
        vehicle: {vehicleUID, make, model, year, currentOdometer},
        // =============== Settings =============
        vehicleInShop: false,
        talkSA: false,
        partsOrdered: false,
        timeComing: null,
        timePromised: null,
        technician: null,
        serviceAdvisor: null,
        // =============== Notes =============
        notes: null,
        // =============== Scheduling =============
        scheduling: null,
        // =============== Options =============
        needRide: null,
        courtesyVehicle: null,
        // =============== Questions =============
        // =============== Requests =============
        customRequests: null,
      }
      state.workOrder = order
    },
    // =================================
    change(state, param) {
      state.workOrder = {...state.workOrder, ...param}
    },
    changeScheduling(state, param) {
      state.workOrder.scheduling = {...state.workOrder.scheduling, ...param}
    },
    changeNeedRide(state, param) {
      param ? (state.workOrder.needRide = {...state.workOrder.needRide, ...param}) : (state.workOrder.needRide = null)
    },
    changeCourtesyVehicle(state, param) {
      param ? (state.workOrder.courtesyVehicle = {...state.workOrder.courtesyVehicle, ...param}) : (state.workOrder.courtesyVehicle = null)
    },
    // =================================
    setOrder(state, order) {
      state.workOrder = order
    },
    add(state, order) {
      if (state.workOrders.unscheduled) state.workOrders.unscheduled.unshift(order)
    },
    reset(state) {
      state.workOrders = []
      state.page = 1
    },
    addNotes(state, note) {
      state.workOrder.notes ||= []
      state.workOrder.notes.unshift(note)
    }
  },
  actions: {
    async create({commit}, order) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.post(`${url}work-orders/`, order)
        const newOrder = req.data
        commit('add', newOrder)
        return newOrder
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchBoard({commit}, params) {
      try {
        commit('set', localOrders)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const order = await axios.get(`${url}work-orders/${uid}/`)
        commit('setOrder', order.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async updateStatus({commit}, {uid, params}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.put(`${url}work-orders/${uid}/status`, params)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async scheduleOrder({commit}, {uid, params}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.put(`${url}work-orders/${uid}/schedule`, params)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  },
  modules: {status}
}
