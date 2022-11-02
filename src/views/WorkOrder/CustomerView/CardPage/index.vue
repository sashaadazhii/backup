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
                <div class="card__widget-text">Customer can hear noise while breaking.</div>
              </div>
            </div>
            <div class="card__widget">
              <div class="card__widget-top">
                <div class="card__widget-icon green"></div>
                <div class="card__widget-title">Solution:</div>
              </div>
              <div class="card__widget-bottom">
                <div class="card__widget-text">Service descirption</div>
              </div>
            </div>
          </div>
          <div class="list__wrap">
            <div class="card__list list">
              <!-- parts -->
              <li v-for="part in parts" :key="part.id" class="list__item" :class="{hide: card.partsForCustomer === 'Display Total Price Only'}">
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
              </li>
            </div>
            <div class="card__accent">
              <div class="card__accent-left"><i class="i-shield" /></div>
              <div class="card__accent-right">
                <div class="card__accent-subtitle">Warranty</div>
                <div class="card__accent-title">24 months/30 000 KM</div>
              </div>
            </div>
            <div class="list__footer">
              <div class="list__text">Total Price</div>
              <div v-if="card.partsForCustomer === 'Display Total Price Only'" class="list__text 1">{{ formatter(card.customPrice) }}</div>

              <div v-else class="list__text 2">{{ formatter(parts.reduce((sum, current) => sum + current.price, 0)) }}</div>
            </div>
          </div>
        </div>
        <div class="card__footer">
          <div class="card__footer-buttons">
            <Button icon="i-circle_close" border grey @click="openDeclineModal" />
            <Button label="Approve" @click="openApproveModal" />
          </div>
          <!-- <div >
        <Label
          :label="card.approvalStatus"
          :icon="card.status === 'Done' ? 'i-check_circle' : 'i-circle_close'"
          :color="card.status === 'Done' ? '#E7F8F2' : '#FEF2F2'"
          :style="card.status === 'Done' ? 'border-color : #9FE3CD' : 'border-color: #FAC9C9'"
          size="large"
          class="label--inspection"
        />
      </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import AskingDeclineModal from '../AskingDeclineModal'
import AskingApproveModal from '../AskingApproveModal'

export default {
  name: 'CustomerCardPage',
  components: {Label, Button},
  data() {
    return {
      selectedMedia: {},
      showControls: true,
      parts: [],
      readyParts: []
    }
  },
  async created() {
    const [firstMedia] = this.assets
    this.selectMedia(firstMedia)

    let cardServices = this.card.services
    if (cardServices.length) {
      cardServices.forEach(c => {
        let part = c.parts
        part.forEach(p => this.parts.push(p))
      })
    }

    await this.fetchAssets()
    // this.order.cannedServices.forEach(c => {
    //   let part = c.parts
    //   part.forEach(p => this.parts.push(p))
    // })
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder,
      card: s => s.company.cards.card,
      assets: s => s.company.cards.assets
    })
  },

  methods: {
    ...mapActions({
      fetchAssets: 'company/cards/fetchAssets'
    }),
    labelColor() {
      const status = this.card.status
      switch (status) {
        case 'Component Unsafe':
          return '#F37878'
        case 'Recommended':
          return ' #FFA14E'
        case 'Done':
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
    openApproveModal() {
      this.$vfm.show(
        {
          component: AskingApproveModal,
          bind: {
            name: 'AskingApproveModal'
          }
        },
        this.card.id
      )
    },
    openDeclineModal() {
      this.$vfm.show(
        {
          component: AskingDeclineModal,
          bind: {
            name: 'AskingDeclineModal'
          }
        },
        this.card.id
      )
    }
  }
}
</script>
<style scoped lang="scss">
@import 'style';
</style>
