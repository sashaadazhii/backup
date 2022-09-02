<template>
  <div class="section__wrapper">
    <div class="section__body">
      <div class="section__label">
        <input :value="service.warranty.time" v-maska="'####'" type="text" class="section__input" placeholder="Enter warranty time" :disabled="!editTime" />
        <Button v-if="editTime" label="Save" class="section__btn" size="mini" @click="saveTime" />
        <Button v-else label="Edit" class="section__btn -grey" size="mini" @click="editTime = true" />
      </div>
      <div class="section__label">
        <input :value="service.warranty.range" v-maska="'####'" type="text" class="section__input" placeholder="Enter warranty time" :disabled="!editRange" />
        <Button v-if="editRange" label="Save" class="section__btn" size="mini" @click="saveRange" />
        <Button v-else label="Edit" class="section__btn -grey" size="mini" @click="editRange = true" />
      </div>
      <Textarea placeholder="Notes" height="120" />
    </div>
    <div class="section__footer">
      <Button label="Cancel" border />
      <Button label="Save" />
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'
import Textarea from '@/components/Yaro/Textarea'

export default {
  name: 'CannedServiceWarranty',
  components: {Button, Textarea},
  data() {
    return {
      editTime: false,
      editRange: false
    }
  },
  created() {
    console.log(this.service)
  },
  computed: {
    ...mapState({
      service: s => s.company.cannedServices.activeService
    })
  },

  methods: {
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    saveTime() {
      this.editTime = false
    },
    saveRange() {
      this.editRange = false
    },

    save() {
      this.change(this.type)
      this.close()
      this.type = 'Warranty Claim'
    },
    close() {
      this.display = false
      this.select()
      this.type = 'Warranty Claim'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
