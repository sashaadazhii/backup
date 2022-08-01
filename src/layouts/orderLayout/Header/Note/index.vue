<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <i class="i-arrow_back" @click="back" />
        <span>Add Notes to Initial Walkaround</span>
        <Button icon="i-circle_close" border grey circle iconSize="20px" size="small" @click="close" />
      </div>
      <div class="modal__body">
        <div class="modal__btn" :class="{'-orange': color === 'orange', '-red': color === 'red'}" @click="changeColor"><i class="i-sticky_note" /></div>
        <textarea v-model="note" class="modal__text" placeholder="Start typing your note here..." />
      </div>
      <div class="modal__btns">
        <Button label="Save" size="large" @click="save" />
        <Button label="Cancel" border size="large" @click="back" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Button from '@/components/Yaro/Button'
import Initial from '../Initial'

export default {
  name: 'Mileage',
  components: {Button},
  data() {
    return {
      note: null,
      color: 'grey'
    }
  },
  beforeUnmount() {
    // this.reset()
  },
  computed: {
    ...mapState({
      notes: s => s.workOrder.notes
    })
  },
  methods: {
    ...mapMutations({
      changeNotes: 'workOrder/changeNotes'
    }),
    changeColor() {
      if (this.color === 'grey') {
        this.color = 'orange'
        return
      }
      if (this.color === 'orange') {
        this.color = 'red'
        return
      }
      if (this.color === 'red') {
        this.color = 'grey'
        return
      }
    },
    back() {
      this.$vfm.hide('Note')
      this.$vfm.show({
        component: Initial,
        bind: {
          name: 'Initial'
        }
      })
    },
    save() {
      const {note: text, color} = this
      this.changeNotes({note: {text, color, id: this.$getID()}})
      this.back()
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
