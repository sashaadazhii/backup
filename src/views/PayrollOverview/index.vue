<template>
  <div class="payroll__wrapper">
    <div class="payroll__inner">
      <div class="payroll__header">
        <Dropdown v-model="filter" :options="filters" size="medium" @change="setFilter">
          <template #value="{value}">
            <div class="y-dropdown-label-custom">
              <span class="-title">Employee:</span>
              <span v-if="value">{{ value.firstName }} {{ value.lastName }} </span>
              <span v-else>All</span>
            </div>
          </template>
          <template #option="{option}">
            <div class="y-dropdown-item-custom">
              <span>{{ option.firstName }} {{ option.lastName }}</span>
            </div>
          </template>
        </Dropdown>
        <Dropdown v-model="period" :options="periods" size="medium">
          <template #value="{value}">
            <div class="y-dropdown-label-custom">
              <span class="-title">Time Period:</span>
              <span v-if="value">{{ value }} </span>
              <span v-else>All</span>
            </div>
          </template>
          <template #option="{option}">
            <div class="y-dropdown-item-custom">
              <span>{{ option }}</span>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="payroll__body">
        <div v-for="employee of employees" :key="employee.id" class="employee__wrapper">
          <Label :alias="`${employee.firstName[0]}${employee.lastName[0]}`" circle size="mini" class="-grey" />
          <div class="employee__name">{{ employee.firstName }} {{ employee.lastName }}</div>
          <div class="employee__time" :class="{'-empty': employee.hours === 0}">
            <i class="i-time" />
            <span>{{ employee.hours }} hr</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import Label from '@/components/Yaro/Label'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'WorkOrderCalendar',
  components: {Dropdown, Label},
  data() {
    return {
      filter: {firstName: 'All'},
      period: 'This month',
      periods: ['3 days', 'Week', 'This month', '3 months', '6 months', 'Year', 'Custom'],
      employees: []
    }
  },
  async created() {
    if (!this.users.length) await this.fetchUsers()
    this.employees = this.users
  },
  computed: {
    ...mapState({
      company: s => s.company.settings.settings,
      users: s => s.company.users.users.filter(u => u.role === 'technician').map(u => ({...u, hours: Math.floor(Math.random() * 11)})),
      filters: s => {
        const users = [...s.company.users.users.filter(u => u.role === 'technician')]
        users.unshift({firstName: 'All'})
        return users
      }
    })
  },
  methods: {
    ...mapActions({
      fetchUsers: 'company/users/fetch'
    }),
    setFilter({value}) {
      if (value.firstName === 'All') {
        this.employees = this.users
        return
      }
      this.employees = this.users.filter(u => u.firstName === value.firstName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
