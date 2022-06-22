import {createStore} from 'vuex'
import inspection from './inspection/inspection'
import modules from './modules/modules'
import login from './login/login'
import workOrder from './workOrder/workOrder'
import info from './info'
import company from './company'

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
    company
  }
})
