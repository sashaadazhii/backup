import { createStore } from 'vuex'
import inspection from './inspection/inspection'
import modules from './modules/modules'
import login from './login/login'
import workOrder from './workOrder/workOrder'
import info from './info'
import company from './company'
import reports from './reports/reports'
import vendors from './vendors/vendors'
import requests from './workOrder/requests'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    inspection,
    modules,
    login,
    workOrder,
    info,
    company,
    reports,
    vendors,
    requests
  }
})
