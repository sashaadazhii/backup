<template>
  <div class="shift__wrapper" :class="{inActive: shift.deactivated}">
    <div class="shift__header">
      <div class="shift__header-icon" :style="{backgroundColor: shift.color}"></div>
      <div class="shift__header-title">
        <div>{{ shift.name }}</div>
        <div v-if="shift.shortName">({{ shift.shortName }})</div>
        <div v-if="shift.deactivated" class="shift__label">
          Deactivated
          <!-- TODO: replace whith Label -->
        </div>
      </div>
      <Menu :list="actionsList" />
    </div>
    <div class="shift__main">
      <div class="shift__main-time">
        <i class="i-timer shift__main-time-icon green" />
        <div class="shift__main-time-name">Start Time:</div>
        <div class="shift__main-time-params">{{ shift.startTime }}</div>
      </div>
      <div class="shift__main-time">
        <i class="i-timer shift__main-time-icon red" />
        <div class="shift__main-time-name">End Time:</div>
        <div class="shift__main-time-params">{{ shift.endTime }}</div>
      </div>
    </div>
    <div v-if="shift.description" class="shift__footer">
      <span>{{ shift.description }}</span>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Menu from '@/components/Yaro/Menu'

export default {
  name: 'CompanySettingsShiftSlot',
  props: {
    shift: {
      type: Object,
      required: true
    }
  },
  components: {Menu},
  data() {
    return {
      isLoading: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.setShift(this.shift)
            this.$router.push(`/settings/shifts/${this.shift.id}`)
          }
        },
        {
          label: this.shift.deactivated ? 'Activate' : 'Deactivate',
          icon: this.shift.deactivated ? 'i-check_circle green' : 'i-remove_circle red',
          command: () => this.openModal()
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      deactivate: 'company/shifts/deactivate',
      activate: 'company/shifts/activate'
    }),
    ...mapMutations({
      setShift: 'company/shifts/setShift'
    }),
    openModal() {
      const deactivated = this.shift.deactivated
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to ${deactivated ? 'activate' : 'deactivate'}  ${this.shift.name} shift ?`,
        acceptLabel: deactivated ? 'Activate' : 'Deactivate',
        acceptAttrs: deactivated ? {size: 'large'} : null,
        rejectLabel: 'Cancel',
        icon: `i-volume_up ${deactivated ? 'green' : 'red'}`,
        accept: async () => {
          if (!this.shift.deactivated) await this.deactivate(this.shift.id)
          else {
            await this.activate(this.shift.id)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
