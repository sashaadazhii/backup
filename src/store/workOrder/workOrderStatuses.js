import axios from 'axios'

export default {
  namespaced: true,

  state: {
    status: {},
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
    ],
    statuses: [
      {
        uid: '4e2d3f2d8220',
        name: 'Processing Vehicle',
        logicalStatus: 'in-progress',
        description: "We start it automatically when Technician presses 'Start Work Order' button or 'Start Work Order' button",
        color: '#FFA14E'
      },
      {
        uid: '4e2d3f2d8221',
        name: 'Waiting For Service Advisor',
        logicalStatus: 'in-progress',
        description: 'SA would receive a notification about that',
        color: '#FF9B70'
      },
      {
        uid: '4e2d3f2d8222',
        name: 'Waiting For Customer',
        logicalStatus: 'in-progress',
        description: 'When SA sends quote for a customer, this status is automatically applied to a particular WO',
        color: '#E8F4FF'
      },
      {
        uid: '4e2d3f2d8223',
        name: 'Customer Response',
        logicalStatus: 'in-progress',
        description: 'When customer approved/declined work',
        color: '#2C9AFF'
      },
      {
        uid: '4e2d3f2d8224',
        name: 'Waiting For Parts',
        logicalStatus: 'in-progress',
        description: '',
        color: '#BA8AE7'
      },
      {
        uid: '4e2d3f2d8225',
        name: 'Waiting For Technician',
        logicalStatus: 'in-progress',
        description: '',
        color: '#3EB3BB'
      },
      {
        uid: '4e2d3f2d8226',
        name: 'Not Started',
        logicalStatus: 'not-started',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        color: '#6B7280'
      },
      {
        uid: '4e2d3f2d8227',
        name: 'Not Invoiced',
        logicalStatus: 'done',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        color: '#10B981'
      }
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
    async create({commit, state}, status) {
      try {
        state.status = status
        commit('add', status)
        return status
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit, state}, status) {
      try {
        state.status = status
        commit('update', status)
        return status
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
