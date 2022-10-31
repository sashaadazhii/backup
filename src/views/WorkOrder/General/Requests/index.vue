<template>
  <div class="block__wrapper">
    <div class="block__title">Customer requests</div>
    <div class="block__row">
      <div class="block__row-inner">
        <div class="block__cell">Customer requests</div>
        <Switch :modelValue="request" @click="changeRequest" />
        <Dialog v-model:visible="display" :dismissableMask="false">
          <div class="dialog__inner">
            <div class="dialog__header">
              <div class="dialog__title">Add Customer Request</div>
              <button class="dialog__close" @click="close"><i class="i-circle_close" /></button>
            </div>
            <div class="dialog__main">
              <div class="request__list">
                <div v-for="(req, idx) of localRequests" :key="idx" class="request__item">
                  <div class="request__header" :class="{'request__header--close': localRequests.length > 1}">
                    <div class="request__header-title">Request {{ idx + 1 }}</div>
                    <div class="request__header-line" />
                    <button v-if="localRequests.length > 1" class="request__header-close" @click="remove(idx)"><i class="i-remove_circle_outline" /></button>
                  </div>
                  <textarea v-model="req.notes" class="dialog__textarea" placeholder="Start typing your note here..." />
                  <!-- TODO: Field Number Component -->
                  <div class="y-number__wrapper">
                    <div class="y-number__title">Time Allotted for Inspection</div>
                    <div class="y-number__inner">
                      <i class="i-remove y-number__dec" :class="{'-disabled': !req.time}" @click="dec(idx)" />
                      <span class="y-number__text">{{ req.time }} h</span>
                      <i class="i-add y-number__inc" @click="inc(idx)" />
                    </div>
                  </div>
                  <!-- TODO: Field Number Component -->
                </div>
              </div>
              <button class="request__btn" @click="add">
                <i class="i-add_circle" />
                <span>Add one more request</span>
              </button>
            </div>
            <div class="dialog__btns">
              <Button class="dialog__btn" label="Cancel" border @click="close" />
              <Button class="dialog__btn" label="Save" @click="save" />
            </div>
          </div>
        </Dialog>
      </div>
      <div v-if="request" class="section">
        <div class="section__desc">{{ requests[0].notes }}</div>
        <div class="section__row">
          <div class="section__title"><i class="i-time" /> <span>Estimate</span></div>
          <div class="section__text">{{ requests[0].time }} h</div>
        </div>

        <button v-ripple class="section__btn" @click="open">
          <i class="i-edit" />
          <span>Edit Info</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Switch from '@/components/Yaro/Switch'
import Dialog from '@/components/Yaro/Dialog'
import Button from '@/components/Yaro/Button'
import {mapState, mapMutations} from 'vuex'

import Ripple from '@/components/Yaro/ripple'

export default {
  name: 'WorkOrderGeneralRequests',
  components: {Switch, Dialog, Button},

  data() {
    return {
      request: false,
      display: false,
      //========= BLOCK: Customers Requests =========
      localRequests: [
        {
          notes: '',
          time: 0
        }
      ],
      requests: []
      //===========================================
    }
  },
  created() {},
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder,
    })
  },
  methods: {
      ...mapMutations({
          change: 'workOrder/change',
      }),
    changeRequest() {
      if (this.request) this.request = false
      else this.open()
    },
    open() {
      this.display = true
    },
    close() {
      this.display = false
      this.localRequests = [
        {
          notes: '',
          time: 0
        }
      ]
    },
    save() {
      this.display = false
      this.requests = this.localRequests
      this.request = true
      this.change({customRequests: this.requests})
    },
    // TODO: Field Number Component
    dec(idx) {
      if (!this.localRequests[idx].time) return
      this.localRequests[idx].time -= 0.5
    },
    inc(idx) {
      this.localRequests[idx].time += 0.5
    },
    // TODO: Field Number Component
    add() {
      const req = {notes: '', time: 0}
      this.localRequests.push(req)
    },
    remove(idx) {
      this.localRequests.splice(idx, 1)
    }
  },
  directives: {
    ripple: Ripple
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
