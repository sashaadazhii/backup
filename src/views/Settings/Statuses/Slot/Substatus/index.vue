<template>
  <div class="substatus__wrapper">
    <div class="substatus__left">
      <div class="substatus__title-top">
        <div class="substatus__icon" :style="{backgroundColor: status.color}" />
        <div class="substatus__title">{{ status.name }}</div>
      </div>

      <div v-if="status.description" class="substatus__description">{{ status.description }}</div>
    </div>
    <div class="substatus__right"><Menu :list="actionsList" /></div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import Menu from '@/components/Yaro/Menu'

export default {
  name: 'CompanySettingsSubstatus',
  components: {Menu},
  props: {
    status: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.set(this.status)
            this.$router.push(`/settings/statuses/${this.status.uid}`)
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      set: 'workOrder/status/setStatus'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
