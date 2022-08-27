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
        <Dropdown v-model="period" :options="periods" size="medium" @change="setPeriod">
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
        <Employee v-for="employee of employees" :key="employee.id" :employee="employee" />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import Employee from './Employee'
import dayjs from 'dayjs'

import {mapState, mapActions} from 'vuex'

export default {
  name: 'WorkOrderCalendar',
  components: {Dropdown, Employee},
  data() {
    return {
      filter: {firstName: 'All'},
      period: 'Year',
      periods: ['3 days', 'Week', 'This month', '3 months', '6 months', 'Year'],
      employees: []
    }
  },
  async created() {
    if (!this.users.length) await this.fetchUsers()
    this.employees = this.users.map(u => ({...u, days: this.createDays()}))
  },
  computed: {
    ...mapState({
      company: s => s.company.settings.settings,
      users: s =>
        s.company.users.users
          .filter(u => u.role === 'technician')
          .map(u => ({
            ...u
            // hours: Math.floor(Math.random() * 11),
            // days: this.createDays()
          })),
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
    },
    createDays() {
      const days = []
      if (this.period === '3 days') {
        for (let i = 0; i < 3; i++) {
          const day = {
            hours: Math.floor(Math.random() * 11) + 1,
            date: dayjs().add(i, 'day').format('DD MMM YYYY')
          }
          days.push(day)
        }
      } else if (this.period === 'Week') {
        for (let i = 0; i < 7; i++) {
          const day = {
            hours: Math.floor(Math.random() * 11) + 1,
            date: dayjs().startOf('w').add(i, 'day').format('DD MMM YYYY')
          }
          days.push(day)
        }
      } else if (this.period === 'This month') {
        for (let i = 0; i < dayjs().daysInMonth(); i++) {
          const day = {
            hours: Math.floor(Math.random() * 11) + 1,
            date: dayjs().startOf('M').add(i, 'day').format('DD MMM YYYY')
          }
          days.push(day)
        }
      } else if (this.period === '3 months') {
        for (let i = 0; i < 3; i++) {
          const day = {
            hours: Math.floor(Math.random() * 101) + 1,
            date: dayjs().add(i, 'M').format('MMM YYYY')
          }
          days.push(day)
        }
      } else if (this.period === '6 months') {
        for (let i = 0; i < 6; i++) {
          const day = {
            hours: Math.floor(Math.random() * 101) + 1,
            date: dayjs().add(i, 'M').format('MMM YYYY')
          }
          days.push(day)
        }
      } else if (this.period === 'Year') {
        for (let i = 0; i < 12; i++) {
          const day = {
            hours: Math.floor(Math.random() * 101) + 1,
            date: dayjs().startOf('y').add(i, 'M').format('MMM YYYY')
          }
          days.push(day)
        }
      }
      return days
    },
    setPeriod() {
      this.employees = this.users.map(u => ({...u, days: this.createDays()}))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
