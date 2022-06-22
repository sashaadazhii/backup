import axios from 'axios'

export default {
  namespaced: true,

  state: {
    status: {},
    statuses: [],
    logicalStatuses: [
      {
        name: 'Not Scheduled',
        icon: 'i-rp_not_scheduled',
        status: '',
        description: 'No date chosen, Work Order just saved in the system',
        substatuses: [],
        isNew: false
      },
      {
        name: 'Not Started',
        icon: 'i-rp_not_started',
        status: 'not-started',
        description: 'Date chosen but technician cannot yet start working on Work Order.',
        substatuses: [],
        isNew: true
      },
      {name: 'To Do', icon: 'i-rp_to_do', status: 'to-do', description: 'Approved for Technician to work on Work Order', substatuses: [], isNew: false},
      {
        name: 'In Progress',
        icon: 'i-rp_in_progress',
        status: 'in-progress',
        description: 'Approved for Technician to work on Work Order',
        substatuses: [],
        isNew: true
      },
      {name: 'Done', icon: 'i-rp_done', status: 'done', description: 'Work Order is finished but not closed yet.', substatuses: [], isNew: true}
    ]
  },
  mutations: {
    set(state, statuses) {
      state.statuses = statuses
    },
    setStatus(state, status) {
      state.status = status
    },
    add(state, status) {
      state.statuses.push(status)
    },
    update(state, status) {
      const statIdx = state.statuses.findIndex(stat => stat.uid === status.uid)
      state.statuses.splice(statIdx, 1, status)
    }
  },
  actions: {
    async fetch({commit}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const statuses = await axios.get(`${url}company/work-order/statuses/`)
        commit('set', statuses.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const status = await axios.get(`${url}company/work-order/statuses/${uid}`)
        commit('setStatus', status.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, status) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/work-order/statuses/`, status)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {status, uid}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const req = await axios.put(`${url}company/work-order/statuses/${uid}`, status)
        commit('update', req.data)
        return req.data
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.delete(`${url}work-order/statuses/${uid}`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
