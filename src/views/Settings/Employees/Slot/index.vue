<template>
  <div class="user__wrapper">
    <Label size="small" circle :alias="abr" class="user__label dark" />
    <div class="user__name">
      <span>{{ user.firstName }} {{ user.lastName }}</span>
    </div>
    <Label :label="`${user.role}`" :icon="roleIcon" :class="labelClass" />
    <a class="user__mail" :href="`mailto:${user.email}`">
      <i class="i-email" /><span>{{ user.email }}</span>
    </a>
    <Menu :list="actionsList" />
  </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Label from '@/components/Yaro/Label'
import Menu from '@/components/Yaro/Menu'

export default {
  name: 'CompanySettingsEmployeesSlot',
  components: {Label, Menu},
  props: {
    user: {
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
            this.set(this.user)
            this.$router.push(`/settings/employees/${this.user.id}`)
          }
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => this.openModal()
        }
      ]
    }
  },

  computed: {
    ...mapState({
      company: s => s.company.settings.settings
    }),
    roleIcon() {
      const role = this.user.role
      switch (role) {
        case 'admin':
          return 'i-admin_panel_settings'
        case 'service-advisor':
          return 'i-headset_mic'
        case 'technician':
          return 'i-build'
        default:
          return ''
      }
    },
    labelClass() {
      return {
        user__label: true,
        red: this.user.role === 'admin',
        grey: this.user.role === 'technician',
        orange: this.user.role === 'service-advisor'
      }
    },
    abr() {
      let name
      if (this.user.firstName && this.user.lastName) {
        name = this.user.firstName[0] + this.user.lastName[0]
      } else {
        return this.user.firstName[0] || this.user.lastName[0]
      }
      return name
    }
  },
  methods: {
    ...mapActions({
      delete: 'company/users/delete'
    }),
    ...mapMutations({
      set: 'company/users/setUser',
      updateCompany: 'company/settings/update'
    }),
    openModal() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to delete ${this.user.firstName} ${this.user.lastName}?`,
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up red',
        accept: async () => {
          await this.delete(this.user.id)
          this.updateCompany({...this.company, usersCount: this.company.usersCount - 1})
          this.set({})
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
