<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__title">Add New Vendor</div>
        <button class="modal__close" @click="close"><i class="i-circle_close" /></button>
      </div>
      <div class="modal__main">
        <Input
          v-model.trim="businessName"
          title="Business Name"
          placeholder="Enter Business Name"
          :error="v$.businessName.$error"
          :errorMessage="errorMessage('businessName')"
        />

        <Input
          v-model.trim="mainContactPerson"
          title="Main Contact Person"
          placeholder="Enter Main Contact Person"
          :error="v$.mainContactPerson.$error"
          :errorMessage="errorMessage('mainContactPerson')"
        />
        <Input
          v-model="phone"
          title="Phone"
          placeholder="Enter Phone"
          :error="v$.phone.$error"
          v-maska="'(###) ### ####'"
          :errorMessage="errorMessage('phone')"
        />
        <Input v-model.trim="address" title="Address" placeholder="Enter address" :error="v$.address.$error" :errorMessage="errorMessage('address')" />
      </div>
      <div class="modal__footer">
        <Button label="Cancel" border @click="close" />
        <Button label="Save" :isLoading="isLoading" @click="createVendor" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import useVuelidate from '@vuelidate/core'
import {required, minLength, maxLength, helpers} from '@vuelidate/validators'

export default {
  name: 'NewVendorModal',
  components: {Button, Input},
  data() {
    return {
      v$: useVuelidate(),
      businessName: null,
      mainContactPerson: null,
      phone: null,
      address: null
    }
  },
  methods: {
    ...mapMutations({
      create: 'vendors/create'
    }),

    async createVendor() {
      const result = await this.v$.$validate()
      if (!result) return

      const {businessName, mainContactPerson, phone, address} = this
      const formattedPhone = phone
        .split('')
        .map(c => {
          if (typeof +c === 'number' && !isNaN(c) && c !== ' ') return c
        })
        .join('')
      const vendor = {businessName, mainContactPerson, address, phone: formattedPhone}
      this.create(vendor)
      this.$vfm.hide('NewVendorModal')
    },
    errorMessage(name) {
      const error = this.v$.$errors.find(err => err.$property === name)
      if (error) return error.$message
    }
  },
  validations() {
    return {
      businessName: {
        required: helpers.withMessage('Business Name is required.', required),
        minLength: helpers.withMessage('Business Name must contain 3 digits.', minLength(3))
      },
      mainContactPerson: {
        required: helpers.withMessage('Name is required.', required),
        minLength: helpers.withMessage('Name must contain 3 digits.', minLength(3))
      },
      phone: {
        required: helpers.withMessage('Phone number is required.', required),
        minLength: helpers.withMessage('Phone number must contain 10 digits.', minLength(14)),
        maxLength: helpers.withMessage('Phone number must contain 10 digits.', maxLength(14))
      },
      address: {
        required: helpers.withMessage('Address is required.', required),
        minLength: helpers.withMessage('Address must contain 3 digits.', minLength(3))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
