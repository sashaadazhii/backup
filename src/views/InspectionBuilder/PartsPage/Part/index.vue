<template>
  <div class="card__wrapper" :class="{edit: isEdit}">
    <div class="card__icon"><i class="i-build" /></div>
    <div class="card__text name">{{ part.name }}</div>
    <div class="card__field">
      <y-input
        v-model="name"
        placeholder="Name"
        :error="v$.name.$error || errorName"
        errorMessage="This part is already exist"
        @input="errorName = false"
      />
    </div>
    <div class="card__text"></div>
    <div class="card__text price">${{ part.price }}</div>
    <div class="card__field">
      <y-input
        v-maska="{mask: 'HHHHH', tokens: {H: {pattern: /[0-9.]/}}}"
        v-model="price"
        placeholder="Price"
        :error="v$.price.$error"
      />
    </div>
    <div class="card__text"></div>
    <div class="card__text"></div>
    <div class="card__dropdown">
      <Dropdown :modelValue="action" :list="actionsList" @update:modelValue="selectAction" actionMenu>
        <template #option="{label: label}">
          <div class="card__dropdown-option">
            <i v-if="label === 'Edit'" class="i-edit" />
            <i v-if="label === 'Delete'" class="i-remove_circle red" />
            <span>{{ label }}</span>
          </div>
        </template>
        <template #menu>
          <div class="card__dropdown-menu">
            <i class="i-more_horiz" />
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="card__buttons">
      <button class="card__btn green" @click="save">
        <Loader :show="isLoading" />
        <span>Save</span>
      </button>
      <button class="card__btn" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import Dropdown from '@/components/Dropdown(new)'
import DeleteModal from './DeleteModal'
import Loader from '@/components/loader'

import useVuelidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'

export default {
  name: 'CannedServicePart',
  props: {
    part: {
      type: Object,
      required: true
    }
  },
  components: {Dropdown, Loader},
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      action: null,
      actionsList: ['Edit', 'Delete'],
      isEdit: false,
      price: null,
      name: null,
      isCreate: false,
      errorName: false,
      errorNameMessage: null
    }
  },
  created() {
    const {price, name} = this.part
    this.price = price
    this.name = name
    if (this.part.isCreate) this.isCreate = this.isEdit = true
  },

  computed: {
    ...mapState({
      service: s => s.company.cannedServices.activeService
    })
  },
  methods: {
    async selectAction(action) {
      if (this.isLoading) return
      if (action === 'Delete') {
        this.openModal()
      } else if (action === 'Edit') {
        this.isEdit = true
      }
    },
    openModal() {
      this.$vfm.show(
        {
          component: DeleteModal,
          bind: {
            name: 'DeleteModal'
          }
        },
        this.part
      )
    },
    ...mapActions({
      update: 'company/parts/update',
      delete: 'company/parts/delete',
      fetch: 'company/parts/fetch',
      create: 'company/parts/create'
    }),
    ...mapMutations({
      remove: 'company/parts/removeLocalPart',
      updatePart: 'company/parts/update'
    }),
    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return

      const {name, price} = this
      const id = this.part.id
      const serviceID = this.service.id
      const part = {name, price}
      try {
        this.isLoading = true
        if (this.isCreate) {
          await this.create({id: this.service.id, part})
        } else {
          await this.update({id, serviceID, part})
        }
        await this.fetch(serviceID)

        this.isEdit = false
      } catch (err) {
        // TODO: Create human error
        this.errorName = true
        // console.log(err.response.data)
        // switch (err.response.data.message) {
        //   case 'Your phone is already taken':
        //     this.errorPhone = true
        //     break
        //   case 'Your email is already taken':
        //     this.errorEmail = true
        //     break
        // }
      } finally {
        this.isLoading = false
      }
    },
    cancel() {
      if (this.isCreate) this.remove()
      const {price, name} = this.part
      this.price = price
      this.name = name
      this.isEdit = false
    }
  },
  validations() {
    return {
      name: {required},
      price: {required}
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
