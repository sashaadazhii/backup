<template>
  <div class="status__wrapper">
    <div class="status__header">
      <i class="status__header-icon" :class="{[status.icon]: status.icon}" />
      <div class="status__header-title">
        <span>{{ status.name }}</span>
        <span>{{ status.description }}</span>
      </div>
      <router-link :to="`/settings/statuses/new?status=${status.status}`">
        <Button v-if="status.isNew" label="Add Substatus" icon="i-add_circle" circle size="small" />
      </router-link>
    </div>
    <div class="status__main">
      <Substatus v-for="(status, idx) of status.substatuses" :key="status.name + idx" :status="status" />
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Button from '@/components/Yaro/Button'
import Substatus from './Substatus'

export default {
  name: 'CompanySettingsStatusSlot',
  components: {Button, Substatus},
  props: {
    status: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  async created() {
    try {
      this.isLoading = true
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapState({})
  },
  methods: {
    ...mapActions({})
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
