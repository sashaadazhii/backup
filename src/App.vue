<template>
  <component :is="layout">
    <router-view />
  </component>
  <modals-container />
  <ConfirmModal />
</template>

<script>
import LoginLayout from '@/layouts/loginLayout'
import mainLayout from '@/layouts/mainLayout'
import adminLayout from '@/layouts/adminLayout' // TODO: Rename layout
import {ModalsContainer} from 'vue-final-modal'
import {mapMutations, mapState} from 'vuex'
import ConfirmModal from '@/components/Yaro/Dialog/Confirm'

// import axios from 'axios'

export default {
  components: {
    mainLayout,
    adminLayout,
    LoginLayout,
    ModalsContainer,
    ConfirmModal
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    },
    ...mapState({
      // user: s => s.login.user
    })
  },
  created() {
    // const appHeight = () => {
    //   const doc = document.documentElement
    //   doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    // }
    // window.addEventListener('resize', appHeight)
    // appHeight()
    // this.decryptToken()

    // ====================
    // Function that checks all requests
    // ====================
    // axios.interceptors.response.use(undefined, err => {
    //   return new Promise(() => {
    //     if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
    //       const role = this.user?.role
    //       // this.logout()
    //       if (role === 'service-advisor') this.$router.push('/signin/user')
    //       if (role === 'admin') this.$router.push('/signin/user')
    //       if (role === 'technician') this.$router.push('/signin/user')
    //     }

    //     throw err
    //   })
    // })
    // ====================
  },
  methods: {
    ...mapMutations({
      // decryptToken: 'login/decryptToken',
      // logout: 'login/logout'
    })
  }
}
</script>

<style lang="scss">
@import './assets/styles/style.scss';
</style>
