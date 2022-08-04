<template>
  <div class="user__wrapper">
    <div class="user__header">
      <div class="user__header-title">
        <Label :icon="labelIcon()" circle size="large" :color="labelColor()" class="user__header-label" />

        <span v-if="user.id">Update {{ user.firstName }} {{ user.lastName }}</span>
        <span v-else>Create Employee</span>
      </div>
      <div class="user__header-buttons">
        <Button label="Cancel" border @click="$router.back()" />
        <Button label="Save" @click="save" :loading="isLoading" />
      </div>
    </div>
    <div class="user__inner">
      <Dropdown v-model="role" :options="roles" title="Role">
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <i :class="iconClass(option.slug)" />
            <span>{{ option.title }}</span>
          </div>
        </template>
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <i :class="iconClass(value.slug)" />
            <span>{{ value.title }}</span>
          </div>
        </template>
      </Dropdown>
      <div class="user__inner-line" />
      <Input v-model="firstName" title="First Name" placeholder="First Name" :error="v$.firstName.$error" :errorMessage="errorMessage('firstName')" />
      <Input v-model="lastName" title="Last Name" placeholder="Last Name" :error="v$.lastName.$error" :errorMessage="errorMessage('lastName')" />
      <Input v-model="email" title="E-mail" placeholder="E-mail" :error="v$.email.$error" :errorMessage="errorMessage('email')" />
      <Input v-model="password" title="Password" placeholder="Password" :error="v$.password.$error" :errorMessage="errorMessage('password')" />
    </div>
  </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import Dropdown from '@/components/Yaro/Dropdown'
import Input from '@/components/Yaro/Input'
import useVuelidate from '@vuelidate/core'
import {required, minLength, email, helpers, requiredIf} from '@vuelidate/validators'

export default {
  name: 'CompanySettingsEmployee',
  components: {Label, Button, Dropdown, Input},
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      roles: [
        {title: 'Technician', slug: 'technician'},
        {title: 'Admin', slug: 'admin'},
        {title: 'Service Advisor', slug: 'service-advisor'}
      ],
      role: {title: 'Technician', slug: 'technician'},
      firstName: null,
      lastName: null,
      password: null,
      email: null
    }
  },
  async created() {
    const userID = this.$route.params.id
    if (this.user.id && this.user.id === +userID) {
      const {role, firstName, lastName, email} = this.user
      this.role = this.roles.find(r => r.slug === role)
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      return
    }
    if (userID === 'new') return
    try {
      this.isLoading = true
      await this.fetch(userID)
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapState({
      user: s => s.company.users.user,
      company: s => s.company.settings.settings
    })
  },
  methods: {
    ...mapActions({
      fetch: 'company/users/find',
      create: 'company/users/create',
      update: 'company/users/update'
    }),
    ...mapMutations({
      setUser: 'superAdmin/users/setUser',
      updateCompany: 'company/settings/update'
    }),

    errorMessage(name) {
      const error = this.v$.$errors.find(err => err.$property === name)
      if (error) return error.$message
    },
    iconClass(role) {
      return {
        'i-build': role === 'technician',
        'i-admin_panel_settings red': role === 'admin',
        'i-headset_mic orange': role === 'service-advisor'
      }
    },
    labelIcon() {
      const role = this.role.slug
      switch (role) {
        case 'technician':
          return 'i-build grey'
        case 'admin':
          return 'i-admin_panel_settings red'
        case 'service-advisor':
          return 'i-headset_mic orange'
        default:
          return 'i-person'
      }
    },
    labelColor() {
      const role = this.role.slug
      switch (role) {
        case 'technician':
          return '#e5e7eb'
        case 'admin':
          return '#FEF2F2'
        case 'service-advisor':
          return 'rgba(255, 155, 112, 0.1)'
        default:
          return '#10B981'
      }
    },
    async save() {
      const result = await this.v$.$validate()
      if (!result) return
      const {role, firstName, lastName, email, password} = this
      const user = {
        id: this.user.id,
        role: role.slug,
        firstName,
        lastName,
        email
      }
      if (password) user.password = password
      const userID = this.user.id
      try {
        this.isLoading = true
        if (userID) {
          await this.update(user)
        } else {
          await this.create(user)
          this.updateCompany({...this.company, usersCount: this.company.usersCount + 1})
        }
        this.$router.back()
      } finally {
        this.isLoading = false
      }
    }
  },

  validations() {
    return {
      firstName: {
        required: helpers.withMessage('First name is required.', required),
        minLength: helpers.withMessage('First name must have at least 3 letters.', minLength(3))
      },
      lastName: {
        required: helpers.withMessage('Last name is required.', required),
        minLength: helpers.withMessage('Last name must have at least 3 letters.', minLength(3))
      },
      password: {
        minLength: helpers.withMessage('Password must have at least 8 symbols.', minLength(8)),
        requiredIf: helpers.withMessage('Password is required.', requiredIf(!this.user.id))
      },
      email: {
        required: helpers.withMessage('Email is required.', required),
        email: helpers.withMessage('Enter correct email.', email)
      },
      role: {
        required: helpers.withMessage('Role is required.', required)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
