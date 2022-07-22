<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <span>Update Mileage</span>
        <Button icon="i-circle_close" border grey circle iconSize="20px" size="small" @click="close" />
      </div>
      <Input v-model="mileage" iconLeft="i-shutter_speed bluegreen" placeholder="Enter mileage" />
      <div class="modal__btns">
        <Button label="Proceed to Work Order" size="large" @click="next" />
        <Button label="Skip & Proceed" border size="large" @click="open" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import useVuelidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import Initial from '../Initial'

export default {
  name: 'Mileage',
  components: {Button, Input},
  data() {
    return {
      v$: useVuelidate(),
      mileage: null
    }
  },
  beforeUnmount() {
    // this.reset()
  },
  computed: {
    ...mapState({
      // card: s => s.company.card.card
    })
  },
  methods: {
    ...mapMutations({
      // setErrors: 'company/card/setErrors',
    }),
    open() {
      this.$vfm.hide('Mileage')
      this.$vfm.show({
        component: Initial,
        bind: {
          name: 'Initial',
          'esc-to-close': true
        }
      })
    },
    next() {
      this.open()
    }
  },
  validations() {
    return {
      mileage: {required}
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
