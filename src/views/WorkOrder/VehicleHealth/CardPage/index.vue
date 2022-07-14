<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-title">Card 2/24</div>
        <div class="modal__header-nav">
          <Button icon="i-keyboard_arrow_down" class="-grey" border iconSize="20px" />
          <Button icon="i-keyboard_arrow_up" class="-grey" border iconSize="20px" />
        </div>
        <div class="modal__header-cus">
          <Label alias="MB" border circle size="small" class="-dark" />
          <Button icon="i-add" border circle size="mini" />
        </div>
        <Label icon="i-time blue" iconSize="22px" label="00:20:04" border circle size="large" class="-shadow" />
        <Button icon="i-circle_close" border circle iconSize="20px" size="small" @click="close" />
      </div>
      <div class="modal__main">
        <div class="modal__main-blocks blocks">
          <div class="blocks__title">Cabin Filter</div>
          <div class="blocks__subtitle">
            The cabin air filter in a vehicle helps remove harmful pollutants, including pollen and dust, from the air you breathe within the car.
          </div>
          <div class="blocks__nav">
            <button class="blocks__btn" :class="{'-green': block === 'General'}" @click="block = 'General'">General</button>
            <button class="blocks__btn" :class="{'-green': block === 'Notes'}" @click="block = 'Notes'">Notes</button>
            <button class="blocks__btn" :class="{'-green': block === 'Service'}" @click="block = 'Service'">Service Tracking</button>
            <button class="blocks__btn" :class="{'-green': block === 'Warranty'}" @click="block = 'Warranty'">Warranty</button>
          </div>
          <div class="blocks__inner">
            <component :is="block" />
          </div>
        </div>
        <div class="modal__main-requests">
          <div class="requests__row">
            <div class="requests__row-title">Card Status:</div>
            <Label label="Recommended" class="-orange" />
          </div>
          <div class="requests__row">
            <div class="requests__row-title">Customer Status:</div>
            <Label label="No status" icon="i-rp_done" iconSize="8px" circle class="-shadow -none" />
          </div>
          <div class="requests__list">
            <div class="requests__list-title">Assigned Requests:</div>
            <div class="request__wrapper">
              <div class="request__header">
                <i class="i-device_hub" />
                <span>Noise</span>
              </div>
              <div class="request__row">
                <div class="request__row-title">Speed:</div>
                <div class="request__row-text">75 km/h</div>
              </div>
              <div class="request__row">
                <div class="request__row-title">While braking:</div>
                <div class="request__row-text -green">Yes</div>
              </div>
              <div class="request__row">
                <div class="request__row-title">Constant:</div>
                <div class="request__row-text -red">No</div>
              </div>
              <div class="request__tracker tracker">
                <div class="tracker__header">
                  <div class="tracker__header-cell">
                    <i class="i-time" />
                    <span>Est:</span>
                    <span>2h</span>
                  </div>
                  <div class="tracker__header-cell">
                    <span>Tracked:</span>
                    <span>1h 20min</span>
                  </div>
                </div>
                <div class="tracker__progress"><span class="-green" /><span class="-green" /><span class="-green" /><span /><span /></div>
              </div>
            </div>
            <div class="request__wrapper">
              <div class="request__header">
                <i class="i-device_hub" />
                <span>Vibrations</span>
              </div>
              <div class="request__row">
                <div class="request__row-title">Speed:</div>
                <div class="request__row-text">75 km/h</div>
              </div>
              <div class="request__row">
                <div class="request__row-title">While braking:</div>
                <div class="request__row-text -green">Yes</div>
              </div>
              <div class="request__row">
                <div class="request__row-title">Constant:</div>
                <div class="request__row-text -red">No</div>
              </div>
              <div class="request__tracker tracker">
                <div class="tracker__header">
                  <div class="tracker__header-cell">
                    <i class="i-time" />
                    <span>Est:</span>
                    <span>2h</span>
                  </div>
                  <div class="tracker__header-cell">
                    <span>Tracked:</span>
                    <span>1h 20min</span>
                  </div>
                </div>
                <div class="tracker__progress"><span class="-green" /><span class="-green" /><span class="-green" /><span /><span /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'
import General from './General'
import Notes from './Notes'
import Service from './Service'
import Warranty from './Warranty'

import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'CardPage',
  components: {Button, Label, General, Notes, Service, Warranty},
  data() {
    return {
      block: 'General'
    }
  },
  async created() {
    // console.log(this.$vfm.modals)
    // await this.fetchCards()
  },
  computed: {
    ...mapState({
      // cards: s => s.company.cards.cards
      // order: s => s.workOrder.workOrder,
      // cards: s => s.company.cardTemplates.templates
    })
  },
  methods: {
    ...mapActions({
      // fetchCards: 'company/cardTemplates/fetch'
    }),
    ...mapMutations({
      // selectAll: 'company/cards/selectAll',
    }),
    beforeOpen(e) {
      // this.card = e.ref.params._rawValue
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
