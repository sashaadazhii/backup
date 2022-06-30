import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import axios from 'axios'

import {SetupCalendar} from 'v-calendar'

import Maska from 'maska'
import { vfmPlugin } from 'vue-final-modal'
import dayjs from 'dayjs'
import Yaro from '@/components/Yaro/config'
import ConfirmationDialog from '@/components/Yaro/Dialog/Confirm/service'
import InputComponent from '@/components/Input'
const app = createApp(App)

// app.config.globalProperties.$http = axios
// const token = localStorage.getItem('token') || sessionStorage.getItem('token')
// if (token) app.config.globalProperties.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
// const hostName = window.location.hostname
// if (process.env.NODE_ENV === 'development' && hostName === 'localhost') {
//   app.config.globalProperties.$http.defaults.headers.common['company'] = 'dev'
// } else {
//   const host = window.location.host
//   const company = host.slice(0, host.indexOf('.'))
//   app.config.globalProperties.$http.defaults.headers.common['company'] = company
// }

app.config.globalProperties.$getID = () => {
  return +Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    .toString()
    .substring(0, 6)
}

app.config.globalProperties.$dayjs = dayjs

app
  .use(store)
  .use(router)
  .use(vfmPlugin)
  .use(Maska)
  .use(Yaro, {ripple: true})
  .use(ConfirmationDialog)
  .use(SetupCalendar, {
    masks: {
      input: 'DD MMM YYYY',
      inputDateTime: 'DD MMM YYYY hh:mm a',
      inputTime: 'hh:mm a'
    },
    datePicker: {
      popover: {visibility: 'click', positionFixed: true}
    },
    locales: {
      'en-Ca': {
        firstDayOfWeek: 2
      }
    }
  })
  .component('y-input', InputComponent)
  .mount('#app')
