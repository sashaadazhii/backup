<template>
  <div class="sidebar__wrapper" :class="{open}">
    <div class="toggle" @click="toggle"><i class="i-menu" /></div>
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
            <div class="sidebar__link-icon"><i class="i-notification_bell" /></div>
            <div class="sidebar__link-text">Updates</div>
            <div class="sidebar__link-num">2</div>
          </div>
          <router-link v-if="user.role === 'admin'" class="sidebar__link" to="/settings">
            <div class="sidebar__link-icon"><i class="i-settings_menu" /></div>
            <div class="sidebar__link-text">Company Settings</div>
          </router-link>
        </div>
        <div class="sidebar__block">
          <router-link class="sidebar__link" to="/inspection-builder">
            <div class="sidebar__link-icon"><i class="i-article" /></div>
            <div class="sidebar__link-text">Inspection Builder</div>
          </router-link>
          <router-link class="sidebar__link" to="/customers">
            <div class="sidebar__link-icon"><i class="i-user" /></div>
            <div class="sidebar__link-text">Customers</div>
          </router-link>
          <router-link class="sidebar__link" to="/work-orders/board">
            <div class="sidebar__link-icon"><i class="i-dashboard" /></div>
            <div class="sidebar__link-text">Work Board</div>
          </router-link>
        </div>
        <div class="sidebar__block">
          <router-link v-if="user.role === 'admin'" class="sidebar__link" to="/reports">
            <div class="sidebar__link-icon"><i class="i-report" /></div>
            <div class="sidebar__link-text">Reports</div>
          </router-link>
          <router-link v-if="user.role === 'admin'" class="sidebar__link" to="/vendors">
            <div class="sidebar__link-icon"><i class="i-article" /></div>
            <div class="sidebar__link-text">Vendors</div>
          </router-link>
          <router-link class="sidebar__link" to="/flows">
            <div class="sidebar__link-icon"><i class="i-open_with" /></div>
            <div class="sidebar__link-text">Flows</div>
          </router-link>
          <router-link class="sidebar__link" to="/">
            <div class="sidebar__link-icon"><i class="i-monetization_on" /></div>
            <div class="sidebar__link-text">Payroll Overview</div>
          </router-link>
          <router-link class="sidebar__link" to="/staff-calendar">
            <div class="sidebar__link-icon"><i class="i-perm_contact_calendar" /></div>
            <div class="sidebar__link-text">Staff Calendar</div>
          </router-link>
          <router-link class="sidebar__link" to="/capacity-calendar">
            <div class="sidebar__link-icon"><i class="i-calendar" /></div>
            <div class="sidebar__link-text">Capacity Calendar</div>
          </router-link>
          <router-link class="sidebar__link" to="/">
            <div class="sidebar__link-icon"><i class="i-time" /></div>
            <div class="sidebar__link-text">Time Logs</div>
          </router-link>
          <router-link class="sidebar__link" to="/">
            <div class="sidebar__link-icon"><i class="i-build_circle" /></div>
            <div class="sidebar__link-text">Parts Ordering</div>
          </router-link>
          <router-link class="sidebar__link" to="/">
            <div class="sidebar__link-icon"><i class="i-calendar" /></div>
            <div class="sidebar__link-text">Scheduling</div>
          </router-link>
        </div>

        <router-link v-if="isDev" class="sidebar__link" to="/test">
          <div class="sidebar__link-icon"><i class="i-build_circle1" /></div>
          <div class="sidebar__link-text">Test</div>
        </router-link>
        <router-link v-if="isDev" class="sidebar__link" to="/documentation">
          <div class="sidebar__link-icon"><i class="i-sticky_note" /></div>
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
import {mapState} from 'vuex'
import Popup from './Popup'

export default {
  name: 'Sidebar',
  components: {Popup},
  data() {
    return {
      open: false,
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
      user: s => s.login.user
    })
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
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
