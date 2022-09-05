<template>
  <div class="section__wrapper">
    <div class="section__body">
      <Input title="Time" v-maska="'####'" v-model="time" placeholder="36 months" />
      <Input title="Range" v-maska="'####'" v-model="range" placeholder="60,000 KM" />
      <Textarea placeholder="Notes" height="120" />
    </div>
    <div class="section__footer">
      <Button label="Cancel" border @click="cancel" />
      <Button label="Save" @click="save" />
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'
import Textarea from '@/components/Yaro/Textarea'
import Input from '@/components/Yaro/Input'

export default {
  name: 'CannedServiceWarranty',
  components: {Button, Textarea, Input},
  data() {
    return {
      time: null,
      range: null,
      notes: null
    }
  },
  created() {
    const {time, range, notes} = this.warranty
    this.time = time
    this.range = range
    this.notes = notes
  },
  computed: {
    ...mapState({
      warranty: s => s.company.cannedServices.activeService.warranty
    })
  },

  methods: {
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),

    save() {
      const {time, range, notes} = this
      this.warranty.time = time
      this.warranty.range = range
      this.warranty.notes = notes || null
    },
    cancel() {
      const {time, range, notes} = this.warranty
      this.time = time
      this.range = range
      this.notes = notes || null
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
