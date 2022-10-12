<template>
  <div class="sidebar__wrapper" :class="{open: sidebarOpen}">
    <div class="toggle" @click="openSidebar"><i class="i-menu_open" /></div>
    <div class="toggle -right" @click="openSidebar"><i class="i-menu_open" /></div>
    <div class="sidebar__inner">
      <div class="sidebar__header">
        <router-link to="/">
          <div class="sidebar__header-logo">
            <img src="@/assets/icons/logo.svg" />
          </div>
        </router-link>
      </div>
      <div class="sidebar__main">
        <div class="sidebar__block">
          <div class="sidebar__link" :class="{'router-link-active': display}" ref="btn" @click="openNotification">
            <i class="sidebar__link-icon i-notification_bell" />
            <div class="sidebar__link-text">Updates</div>
            <div class="sidebar__link-num">2</div>
          </div>
          <router-link v-if="user.role === 'admin'" class="sidebar__link" to="/settings">
            <i class="i-settings_menu" />
            <div class="sidebar__link-text">Company Settings</div>
          </router-link>
        </div>
        <div class="sidebar__block">
          <router-link class="sidebar__link" to="/inspection-builder">
            <i class="i-article" />
            <div class="sidebar__link-text">Inspection Builder</div>
          </router-link>
          <router-link class="sidebar__link" to="/customers">
            <i class="i-user" />
            <div class="sidebar__link-text">Customers</div>
          </router-link>
          <router-link class="sidebar__link" to="/work-orders/board">
            <i class="i-dashboard" />
            <div class="sidebar__link-text">Work Board</div>
          </router-link>
        </div>

        <router-link v-if="isDev" class="sidebar__link" to="/test">
          <i class="i-build_circle1" />
          <div class="sidebar__link-text">Test</div>
        </router-link>
        <router-link v-if="isDev" class="sidebar__link" to="/documentation">
          <i class="i-sticky_note" />
          <div class="sidebar__link-text">Documentation</div>
        </router-link>
      </div>
      <div class="sidebar__footer">
        <div class="customer__wrapper">
          <div class="customer__label">MM</div>
          <div class="customer__title">
            <div class="customer__role">SERVICE ADVISOR</div>
            <div class="customer__name">Maynard Bauman</div>
          </div>
        </div>
      </div>
    </div>
    <Popup v-model:visible="display" :targetElement="target" />
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Popup from './Popup'

export default {
  name: 'Sidebar',
  components: {Popup},
  data() {
    return {
      isDev: false, // TODO: only for development / remove later,
      display: false,
      target: null
    }
  },
  created() {
    const hostName = window.location.hostname
    if (process.env.NODE_ENV === 'development' && hostName === 'localhost') this.isDev = true
  },
  computed: {
    ...mapState({
      user: s => s.login.user,
      sidebarOpen: s => s.modules.sidebarOpen
    })
  },
  methods: {
    ...mapMutations({
      openSidebar: 'modules/openSidebar'
    }),
    openNotification(e) {
      if (this.display) {
        this.display = false
        this.target = null
        return
      }
      this.target = this.$refs.btn
      this.display = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
