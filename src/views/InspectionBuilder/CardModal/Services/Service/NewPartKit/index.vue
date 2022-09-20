<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen" @before-close="$emit('hide')">
    <div class="npart__wrapper">
      <div class="npart__header">
        <div class="npart__title">Add Parts Kit to {{ service.name }}</div>
        <Button icon="i-circle_close" border circle @click="close" size="small" />
      </div>
      <Part
        v-for="(part, idx) in parts"
        :key="part.id"
        v-model:name="part.name"
        v-model:quantity="part.quantity"
        v-model:price="part.price"
        v-model:link="part.link"
        :counter="idx + 1"
        :part="part"
        @onRemove="remove(part.id)"
      />
      <Button label="Add part" grey position="center" icon="i-add_circle" size="large" @click="add" />
      <div class="npart__bottom">
        <Button label="Save" @click="save" />
        <Button label="Cancel" border @click="close" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
/* eslint-disable */
import Button from '@/components/Yaro/Button'
import Part from './Part'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'CardModalServicePartKitNew',
  components: {Button, Part},
  data() {
    return {
      service: {},
      parts: [{id: this.$getID(), name: null, quantity: null, price: null, link: null}]
    }
  },
  computed: {
    ...mapState({})
  },

  methods: {
    beforeOpen(e) {
      this.service = e.ref.params.value
    },
    ...mapMutations({
      addPartsKit: 'company/cannedServices/addPartsKit'
    }),
    add() {
      const part = {id: this.$getID(), name: null, quantity: null, price: null, link: null}
      this.parts.push(part)
    },
    remove(id) {
      const partIdx = this.parts.findIndex(p => p.id === id)
      if (this.parts.length === 1) this.$vfm.hide('NewPartKit')
      this.parts.splice(partIdx, 1)
    },

    save() {
      const partsKit = {
        id: this.$getID(),
        serviceID: this.service.id,
        partsList: this.parts
      }
      this.addPartsKit(partsKit)
      this.$vfm.hide('NewPartKit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
