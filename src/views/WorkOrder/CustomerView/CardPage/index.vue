<template>
  <div class="checkout-wrapper">
    <div class="checkout">
      <div class="inspection__wrapper inspection">
        <div class="inspection__header">
          <div @click="$router.back()" class="inspection__link">
            <i class="i-keyboard_arrow_left" />
          </div>
        </div>
        <div v-if="assets.length" class="slider__wrapper slider">
          <div class="slider__view">
            <div v-if="showControls && selectedMedia.type === 'video'" class="slider__controls">
              <span @click="play"></span>
            </div>
            <video
              v-if="selectedMedia.type === 'video'"
              ref="video"
              poster="@/assets/images/img5.png"
              :src="require(`@/assets/video/${selectedMedia.src}`)"
              @click="stop"
            />
            <img v-if="selectedMedia.type === 'image'" :src="require(`@/assets/images/${selectedMedia.src}`)" alt="chosen image" />
            <div class="slider__title">{{ selectedMedia.title }}</div>
          </div>
          <div class="slider__list">
            <div v-for="asset in assets" :key="asset.id" class="slider__thumb" :class="{'-active': show(asset.id)}">
              <video
                v-if="asset.type === 'video'"
                :src="require(`@/assets/video/${asset.src}`)"
                poster="@/assets/images/img5.png"
                @click="selectMedia(asset)"
              />
              <img v-if="asset.type === 'image'" :src="require(`@/assets/images/${asset.src}`)" :alt="asset.type" @click="selectMedia(asset)" />
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <Label :label="card.status" size="small" :color="labelColor(card.status)" />
          </div>
          <div class="card__main"></div>
          <div class="card__title">{{ card.name }}</div>
          <div class="card__widgets">
            <div class="card__widget">
              <div class="card__widget-top">
                <div class="card__widget-icon"></div>
                <div class="card__widget-title">Concern (Customer Request):</div>
              </div>
              <div class="card__widget-bottom">
                <div class="card__widget-text">Customer can hear noise while breaking.</div>
              </div>
            </div>
            <div class="card__widget">
              <div class="card__widget-top">
                <div class="card__widget-icon orange"></div>
                <div class="card__widget-title">Cause:</div>
              </div>
              <div class="card__widget-bottom">
                <div class="card__widget-text">{{ card.cause }}</div>
              </div>
            </div>
            <div class="card__widget">
              <div class="card__widget-top">
                <div class="card__widget-icon green"></div>
                <div class="card__widget-title">Solution:</div>
              </div>
              <div class="card__widget-bottom">
                <div class="card__widget-text">{{ card.description }}</div>
              </div>
            </div>
          </div>
          <div class="list__wrap">
            <div class="card__list list">
              <!-- parts -->
              <div v-for="part in showedParts" :key="part.id" class="list__item" :class="{hide: card.partsForCustomer === 'Display Total Price Only'}">
                <div v-if="card.partsForCustomer === 'Display Total Price & Parts'" class="list__inner wide">
                  <div class="list__icon">
                    <i v-if="part.isService || part.isLabour" class="i-monetization_on" :style="[part.isService ? 'color: #BA8AE7' : 'color: #2C9AFF']" />
                    <i v-else class="i-build" />
                  </div>
                  <div class="list__info">
                    <div class="list__desc">{{ part.description }}</div>
                  </div>
                </div>

                <div v-else-if="card.partsForCustomer === 'Display Total Price Only'" class="list__inner"></div>

                <div v-else-if="card.partsForCustomer === 'Display Parts & Pricing'" class="list__inner">
                  <div class="list__icon">
                    <i v-if="part.isService || part.isLabour" class="i-monetization_on" :style="[part.isService ? 'color: #BA8AE7' : 'color: #2C9AFF']" />
                    <i v-else class="i-build" />
                  </div>
                  <div class="list__info">
                    <div class="list__desc">{{ part.description }}</div>
                  </div>
                  <div class="list__text amount">{{ formatter(part.price) }}</div>
                </div>
              </div>
            </div>
            <div class="card__accent">
              <div class="card__accent-left"><i class="i-shield" /></div>
              <div class="card__accent-right">
                <div class="card__accent-subtitle">Warranty</div>
                <div class="card__accent-title">{{ warranty?.time || 0 }} months/{{ warranty?.range || 0 }} KM</div>
              </div>
            </div>
            <div class="list__footer">
              <div class="list__text">Total Price</div>

              <div v-if="card.partsForCustomer === 'Display Total Price Only'" class="list__text 1">
                {{ formatter(card.customPrice) }}
              </div>

              <div v-else class="list__text 2">{{ formatter(parts.reduce((sum, current) => sum + current.price * current.quantity, 0)) }}</div>
            </div>
          </div>
          <!-- end parts -->
        </div>
        <div class="card__footer">
          <div class="card__footer-buttons">
            <Button icon="i-circle_close" border grey @click="openDeclineModal" />
            <Button label="Approve" @click="approve" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import AskingDeclineModal from '../AskingDeclineModal'
import _ from 'lodash'

export default {
  name: 'CustomerCardPage',
  components: {Label, Button},
  data() {
    return {
      selectedMedia: {},
      showControls: true,
      parts: [],
      readyParts: [],
      card: {},
      uid: null
    }
  },
  async created() {
    this.uid = this.$route.params.uid
    await this.findOrder(this.uid)
    const cardID = this.$route.params.cardID
    this.card = this.order.cannedServices.find(c => c.id.toString() === cardID)

    await this.fetchAssets()
    const [firstMedia] = this.assets
    this.selectMedia(firstMedia)

    this.parts = this.card.chosenService.parts
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder,
      assets: s => s.company.cards.assets
    }),
    partsWithoutLabour() {
      return this.parts.filter(p => !p.isLabour)
    },
    partsWithoutFee() {
      return this.parts.filter(p => !p.isService)
    },
    partsWithoutFeeLabour() {
      return this.parts.filter(p => {
        return !p.isService && !p.isLabour
      })
    },
    showedParts() {
      if (!this.card.displayLabour && !this.card.displayFees) return this.partsWithoutFeeLabour
      else if (!this.card.displayLabour) return this.partsWithoutLabour
      else if (!this.card.displayFees) return this.partsWithoutFee
      else return this.parts
    },
    warranty() {
      return _.cloneDeep(this.card.chosenService?.warranty)
    }
  },

  methods: {
    ...mapActions({
      fetchAssets: 'company/cards/fetchAssets',
      findOrder: 'workOrder/find'
    }),
    ...mapMutations({
      updateCard: 'company/cards/updateCard'
    }),
    labelColor() {
      const status = this.card.status
      switch (status) {
        case 'Component Unsafe':
          return '#F37878'
        case 'Recommended':
          return ' #FFA14E'
        case 'Good':
          return '#10B981'
        default:
          return '#6b7280'
      }
    },
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    },
    selectMedia(media) {
      if (media.id === this.selectedMedia.id) return
      this.selectedMedia = media
      this.showControls = true
    },
    play() {
      this.$refs.video.play()
      this.showControls = false
    },
    stop() {
      this.showControls = true
      this.$refs.video.pause()
    },
    show(id) {
      if (this.selectedMedia.id === id) return true
    },
    approve() {
      this.card.approvalStatus = 'Approved by Customer'
      this.updateCard(this.card)
      this.$router.push(`/customer-view/${this.uid}`)
    },

    openDeclineModal() {
      this.$vfm.show({
        component: AskingDeclineModal,
        bind: {
          name: 'AskingDeclineModal'
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import 'style';
</style>
