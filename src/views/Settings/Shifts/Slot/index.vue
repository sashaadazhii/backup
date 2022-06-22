<template>
  <div class="shift__wrapper">
    <div class="shift__header">
      <div class="shift__header-icon" :style="{backgroundColor: shift.color}"></div>
      <div class="shift__header-title">
        <span>{{ shift.name }}</span>
        <span v-if="shift.shortName"> ({{ shift.shortName }})</span>
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
          label: 'Deactivate',
          icon: 'i-remove_circle red',
          command: () => this.openModal()
        }
      ]
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
    ...mapActions({
      deactivate: 'company/shifts/deactivate'
    }),
    ...mapMutations({
      setShift: 'company/shifts/setShift'
    }),
    openModal() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to deactivate ${this.shift.name} shift ?`,
        acceptLabel: 'Deactivate',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up red',
        accept: async () => {
          await this.deactivate(this.shift.id)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
