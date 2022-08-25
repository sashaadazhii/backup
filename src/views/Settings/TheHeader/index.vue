<template>
  <div class="header__wrapper">
    <div class="header__inner" :class="{'-open': sidebarOpen}">
      <div class="header__icon"><i class="i-settings_menu" /></div>
      <div class="header__title">Company Settings</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'CompanySettingsHeader',
  async created() {
    if (this.info.id) return
    try {
      this.isLoading = true
      await this.fetch()
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapState({
      info: s => s.company.settings.settings,
      sidebarOpen: s => s.modules.sidebarOpen
    })
  },
  methods: {
    ...mapActions({
      fetch: 'company/settings/fetch'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
