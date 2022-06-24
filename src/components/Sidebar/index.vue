<template>
  <div class="sidebar__wrapper" :class="{open}">
    <div class="toggle" @click="toggle"><i class="i-menu" /></div>
    <div class="sidebar__filling">
      <div class="sidebar__inner">
        <div class="sidebar__header">
          <router-link to="/">
            <div class="sidebar__header-logo">
              <img src="@/assets/icons/logo.svg" />
            </div>
          </router-link>
          <div class="sidebar__header-title show">Client Connect</div>
        </div>
        <div class="sidebar__main">
          <div class="sidebar__block">
            <router-link class="sidebar__link" to="/inspection-builder">
              <div class="sidebar__link-icon"><i class="i-article" /></div>
              <div class="sidebar__link-text show">Inspection Builder</div>
              <div class="sidebar__link-num"></div>
            </router-link>
            <router-link class="sidebar__link" to="/customers">
              <div class="sidebar__link-icon"><i class="i-user" /></div>
              <div class="sidebar__link-text show">Customers</div>
              <div class="sidebar__link-num"></div>
            </router-link>
            <router-link v-if="user.role === 'admin'" class="sidebar__link" to="/settings">
              <div class="sidebar__link-icon"><i class="i-settings_menu" /></div>
              <div class="sidebar__link-text show">Company Settings</div>
              <div class="sidebar__link-num"></div>
            </router-link>
            <router-link v-if="user.role === 'admin'" class="sidebar__link" to="/reports">
              <div class="sidebar__link-icon"><i class="i-report" /></div>
              <div class="sidebar__link-text show">Reports</div>
              <div class="sidebar__link-num"></div>
            </router-link>
            <router-link v-if="isDev" class="sidebar__link" to="/work-orders/board">
              <div class="sidebar__link-icon"><i class="i-dashboard" /></div>
              <div class="sidebar__link-text show">Work Board</div>
              <div class="sidebar__link-num"></div>
            </router-link>
            <router-link v-if="isDev" class="sidebar__link" to="/work-order">
              <div class="sidebar__link-icon"><i class="i-directions_car" /></div>
              <div class="sidebar__link-text show">Work Order</div>
              <div class="sidebar__link-num"></div>
            </router-link>
            <router-link v-if="isDev" class="sidebar__link" to="/test">
              <div class="sidebar__link-icon"><i class="i-build_circle1" /></div>
              <div class="sidebar__link-text show">Test</div>
              <div class="sidebar__link-num"></div>
            </router-link>
            <router-link v-if="isDev" class="sidebar__link" to="/documentation">
              <div class="sidebar__link-icon"><i class="i-sticky_note" /></div>
              <div class="sidebar__link-text show">Documentation</div>
              <div class="sidebar__link-num"></div>
            </router-link>
          </div>
        </div>
        <div class="sidebar__footer">
          <div v-if="user.firstName" class="customer__wrapper">
            <div class="customer__icon">{{ user.firstName[0] }}{{ user.lastName[0] }}</div>
            <div class="customer__title show">
              <div class="customer__name">{{ user.firstName }} {{ user.lastName }}</div>
              <div class="customer__position">{{ user.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Sidebar',
  data() {
    return {
      open: false,
      isDev: false // TODO: only for development / remove later
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
