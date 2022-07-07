<template>
  <div class="block__wrapper">
    <div class="block__title">Notes</div>
    <button class="block__btn" @click="display = !display">
      <i class="i-add_circle" />
      <span>New Note</span>
    </button>
    <div v-if="order.notes" class="block__notes">
      <Note v-for="(note, idx) of order.notes" :key="idx" :note="note" />
    </div>
    <Dialog v-model:visible="display" :dismissableMask="false">
      <div class="dialog__inner">
        <div class="dialog__header">
          <div class="dialog__title">Add new note</div>
          <button class="dialog__close" @click="close"><i class="i-circle_close" /></button>
        </div>
        <textarea v-model="text" class="dialog__textarea" placeholder="Start typing your note here..." />
        <div class="dialog__btns">
          <Button class="dialog__btn" label="Cancel" border @click="close" />
          <Button class="dialog__btn" label="Save" @click="save" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Note from './Note'
import Dialog from '@/components/Yaro/Dialog'
import Button from '@/components/Yaro/Button'
import {mapState, mapMutations} from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'WorkOrderGeneralNotes',
  components: {Note, Dialog, Button},
  data() {
    return {
      display: false,
      text: ''
    }
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder
    })
  },
  methods: {
    ...mapMutations({
      addNotes: 'workOrder/addNotes'
    }),
    close() {
      this.display = false
      this.text = ''
    },
    save() {
      const note = {
        author: this.order.customer.name,
        alias: `${this.order.customer.firstName[0]}${this.order.customer.lastName[0]}`,
        date: dayjs().format('hh:mm a DD MMM YYYY'),
        pin: false,
        text: this.text,
        new: true
      }
      this.addNotes(note)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
