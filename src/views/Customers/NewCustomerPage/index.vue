<template>
  <div class="page-inner">
    <TheHeader />
    <div class="customer__wrapper">
      <div class="customer__inner">
        <div class="customer__header">
          <div v-if="uid" class="customer__title">Edit Customer</div>
          <div v-else class="customer__title">Add New Customer</div>
        </div>
        <div class="customer__main">
          <y-input v-model.trim="firstName" placeholder="First Name" :error="v$.firstName.$error" />
          <y-input v-model="lastName" placeholder="Last Name" :error="v$.lastName.$error" />
          <y-input v-model="password" placeholder="Password" :error="v$.password.$error" />
          <y-input
            v-model="cellPhone"
            placeholder="Phone"
            :error="v$.cellPhone.$error || errorPhone"
            v-maska="'(###) ### ####'"
            errorMessage="Your phone is already taken"
            iconRight="i-phone"
            @input="errorPhone = false"
          />
          <y-input
            v-model="email"
            placeholder="Email"
            :error="v$.email.$error || errorEmail"
            errorMessage="Your email is already taken"
            iconRight="i-email"
            @input="errorEmail = false"
          />
        </div>
        <div class="customer__footer">
          <button class="customer__button" @click="save">
            <span>Save</span>
            <Loader :show="isLoading" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import Loader from '@/components/loader'
import {mapState, mapActions, mapMutations} from 'vuex'
import useVuelidate from '@vuelidate/core'
import {required, requiredIf, email, minLength} from '@vuelidate/validators'

export default {
  name: 'NewCustomerPage',
  components: {TheHeader, Loader},
  data() {
    return {
      v$: useVuelidate(),
      email: null,
      firstName: null,
      lastName: null,
      cellPhone: null,
      password: null,
      uid: this.$route.params.uid,
      errorPhone: false,
      errorEmail: false,
      isLoading: false
    }
  },
  async created() {
    if (this.customer.uid && this.uid) {
      const {email, firstName, lastName, cellPhones} = this.customer
      this.email = email
      this.firstName = firstName
      this.lastName = lastName
      this.cellPhone = cellPhones[0]
    }
  },
  computed: {
    ...mapState({
      customer: s => s.company.customers.customer
    })
  },
  watch: {
    customer(cus) {
      const {email, firstName, lastName, cellPhones} = cus
      this.email = email
      this.firstName = firstName
      this.lastName = lastName
      this.cellPhone = cellPhones[0]
    }
  },
  methods: {
    ...mapActions({
      create: 'company/customers/create',
      update: 'company/customers/update',
      fetch: 'company/customers/fetch'
    }),
    ...mapMutations({
      add: 'company/customers/add',
      updateCustomer: 'company/customers/update'
    }),
    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return
      const {email, firstName, lastName, cellPhone, password} = this
      const formattedCellPhone = cellPhone
        .split('')
        .map(c => {
          if (typeof +c === 'number' && !isNaN(c) && c !== ' ') return c
        })
        .join('')
      const customer = {email, firstName, lastName, cellPhones: [formattedCellPhone]}
      password ? (customer.password = password) : null
      try {
        this.isLoading = true
        if (this.uid) {
          // const req = await this.update({user: customer, id: this.uid})
          // this.updateCustomer(req.data)
          this.updateCustomer(customer)
        } else {
          const req = await this.create(customer)
          this.add(req.data)
        }
        // await this.fetch()
        // this.$router.push('/customers')
      } catch (err) {
        switch (err.response.data.message) {
          case 'Your phone is already taken':
            this.errorPhone = true
            break
          case 'Your email is already taken':
            this.errorEmail = true
            break
        }
      } finally {
        this.isLoading = false
      }
    }
  },
  validations() {
    return {
      email: {required, email},
      firstName: {required},
      lastName: {required},
      cellPhone: {required, minLength: minLength(14)},
      password: {requiredIf: requiredIf(() => !this.uid), minLength: minLength(8)}
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
