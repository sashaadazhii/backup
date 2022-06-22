<template>
  <div class="general__wrapper"></div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'CompanySettingsGeneral',
  data() {
    return {
      isLoading: false
    }
  },
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
      info: s => s.company.settings.settings
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
