<template>
  <div class="users__wrapper">
    <div class="users__container">
      <div class="users__overflow">
        <div class="users__header">
          <div class="users__header-title">
            <span>Employees</span>
            <Label :label="`${users.length}/${company.usersQuota || 0}`" circle border color="transparent" class="users__label" />
          </div>
          <router-link :to="users.length >= company.usersQuota ? '' : '/settings/employees/new'">
            <Button
              label="Add New"
              icon="i-add_circle"
              circle
              size="small"
              :disabled="users.length >= company.usersQuota"
              :class="{disabled: users.length >= company.usersQuota}"
            />
          </router-link>
        </div>
        <div v-if="users.length" class="users__inner">
          <User v-for="user of users" :key="user.id" :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import User from './Slot'
export default {
  name: 'CompanySettingsEmployees',
  components: {Label, User, Button},
  async created() {
    if (!this.users.length) await this.fetchUsers()
  },
  computed: {
    ...mapState({
      company: s => s.company.settings.settings,
      users: s => s.company.users.users
    })
  },
  methods: {
    ...mapActions({
      fetchUsers: 'company/users/fetch'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
