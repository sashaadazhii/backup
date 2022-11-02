<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-left">
          <div class="modal__header-title">Card Status:</div>
          <Menu :list="statusesChange" :disabled="!isStart">
            <template #menu>
              <Label :label="card.status" size="small" class="modal__label -hover" :class="labelClass(card.status)" />
            </template>
          </Menu>
          <div class="modal__header-title">Approval Status:</div>
          <Label
            :label="card.approvalStatus"
            size="small"
            icon="i-rp_done"
            circle
            class="modal__label -shadow"
            :class="labelClass(card.approvalStatus)"
            iconSize="8px"
          />
        </div>
        <div class="modal__header-right">
          <div class="tech__list">
            <div v-for="(tech, idx) of card.techs" :key="idx" class="tech__label">{{ tech.firstName[0] }}{{ tech.lastName[0] }}</div>
            <Multiselect v-model="card.techs" :options="techList" dataKey="id" :showCheckbox="false">
              <template #menu>
                <div class="tech__add"><i class="i-add" /></div>
              </template>
              <template #option="{option}">
                <div class="y-dropdown-item-custom">
                  <i v-if="card.techs.some(t => t.id === option.id)" class="i-check_circle1" />
                  <Label :alias="`${option.firstName[0]}${option.lastName[0]}`" circle size="mini" />
                  <span>{{ option.firstName }} {{ option.lastName }}</span>
                </div>
              </template>
            </Multiselect>
          </div>

          <div class="modal__header-nav">
            <Button icon="i-keyboard_arrow_down" class="-grey" border iconSize="20px" @click="changeCard('dec')" />
            <Button icon="i-keyboard_arrow_up" class="-grey" border iconSize="20px" @click="changeCard('inc')" />
          </div>
          <Button icon="i-circle_close" border circle iconSize="20px" size="small" @click="close" />
        </div>
      </div>
      <div class="modal__main">
        <div class="modal__body">
          <div class="modal__back" @click="close">
            <i class="i-arrow_back" />
            <div class="block__title">{{ card.name }}</div>
          </div>
          <div class="modal__body-top">
            <i class="i-time" />
            <div class="modal__body-info">
              <div class="modal__text">Time Required:</div>
              <div class="modal__label">{{ `${services[0].estimatedTime}hr` }}</div>
              <div class="modal__label light"><span>Time used: </span>{{ `${services[0].averageTime}` }}</div>
            </div>
          </div>
          <div v-if="assets.length" class="slider__wrapper slider">
            <div class="slider__view">
              <div v-if="showControls && selectedMedia.type === 'video'" class="slider__controls">
                <span @click="play"><i class="i-play" /></span>
              </div>
              <video
                v-if="selectedMedia.type === 'video'"
                ref="video"
                poster="@/assets/images/img5.png"
                :src="require(`@/assets/video/${selectedMedia.src}`)"
                @click="stop"
              />
              <img v-if="selectedMedia.type === 'image'" :src="require(`@/assets/images/${selectedMedia.src}`)" alt="chosen image" />
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

          <div class="block">
            <div class="block__header">
              <div class="block__header-left">
                <Label alias="1" size="large" color="#2C9AFF" class="-large-text" />
                <div class="block__title">Concern (Customer Request):</div>
              </div>
            </div>
            <div class="block__main">
              <!-- TODO: add customer request from order when  ready
               <textarea v-model="request" class="block__textarea blue"></textarea>
               -->
              <textarea v-model="request" class="block__textarea blue" disabled></textarea>
            </div>
          </div>
          <div class="block">
            <div class="block__header">
              <div class="block__header-left">
                <Label alias="2" size="large" color="#FF9B70" class="-large-text" />
                <div class="block__title">Cause:</div>
              </div>
            </div>
            <div class="block__main">
              <textarea v-model="cause" class="block__textarea orange"></textarea>
            </div>
          </div>
          <div class="block">
            <div class="block__header">
              <div class="block__header-left">
                <Label alias="3" size="large" color="#10B981" class="-large-text" />
                <div class="block__title">Solution:</div>
              </div>
              <div class="block__header-right">
                <div class="modal__label large">
                  <span>Diagnostic Time (optional): </span>
                  <div class="modal__label-right">
                    <input v-model="services[0].estimatedTime" v-maska="{mask: 'HHHHH', tokens: {H: {pattern: /[0-9.]/}}}" />
                    <span class="modal__label-accent">hours</span>
                  </div>
                </div>
                <div class="modal__label large">
                  <span>Time required:</span>
                  <div class="modal__label-right">
                    <input v-model="services[0].averageTime" v-maska="{mask: 'HHHHH', tokens: {H: {pattern: /[0-9.]/}}}" />
                    <span class="modal__label-accent">hours</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="block__main textarea">
              <div class="textarea__title">Service Description</div>
              <div class="block__textarea green">
                <div v-for="(item, idx) of solutionList" :key="idx" class="block__textarea-item">{{ item }}</div>
              </div>

              <div class="block__inner">
                <div class="block__inner-header" @click="showBlock = !showBlock">
                  <div class="block__inner-title">Customer display settings</div>
                  <div class="block__inner-icon" :style="[showBlock ? {transform: 'rotateX(180deg)'} : {transform: 'rotateX(0)'}]">
                    <i class="i-keyboard_arrow_down" />
                  </div>
                </div>
                <div v-if="showBlock" class="block__hidden">
                  <div
                    v-for="(option, idx) in customerOptions"
                    :key="option"
                    class="option"
                    :class="{active: idx === activeOptionIdx}"
                    @click.stop="select(idx)"
                  >
                    <div class="option__left">
                      <div class="y-radio" :class="{active: idx === activeOptionIdx}" />
                      <div class="option__title">{{ option }}</div>
                    </div>
                    <div v-if="option === 'Display Total Price Only'" class="option__right">
                      <div class="option__text">Enter Total:</div>
                      <input v-model="price" type="text" class="option__input" v-maska="{mask: 'HHHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}" />
                    </div>
                  </div>
                  <div class="block__halfs">
                    <div class="block__half">
                      <div class="block__half-title">Display Labour</div>
                      <Switch v-model="displayLabour" @click="displayLabour = !displayLabour" />
                    </div>
                    <div class="block__half">
                      <div class="block__half-title">Display Fees & Services</div>
                      <Switch v-model="displayFees" @click="displayFees = !displayFees" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="parts">
                <Part v-for="part in parts" :key="part.uid" :part="part" />
                <ServiceSlot v-for="service in servicesFee" :key="service.id" :service="service" />
                <LabourSlot v-for="labour in labours" :key="labour.id" :labour="labour" />
                <NewPart v-if="isNew" @close="isNew = false" />

                <div class="parts__buttons">
                  <div class="parts__btn" @click="isNew = true"><i class="i-add_circle" /><span>Add new part</span></div>
                  <div class="parts__btn"><i class="i-add_circle" /><span>Add parts kit</span></div>
                  <div class="parts__btn violet"><i class="i-add_circle" /><span>Add Services & Fees</span></div>
                  <div class="parts__btn blue"><i class="i-add_circle" /><span>Add Labour</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="block__header">
              <div class="block__header-left">
                <Label alias="4" size="large" color="#F37878" class="-large-text" />
                <div class="block__title">Denial messages:</div>
              </div>
            </div>
            <div class="block__main">
              <div class="block__dropdown">
                <Dropdown
                  v-model="denailMessage1"
                  :options="denialMessages1"
                  size="large"
                  title="Permanent Denial Message:"
                  placeholder="Choose message"
                  class="--theme-border-red"
                >
                </Dropdown>
              </div>
              <div class="block__dropdown">
                <Dropdown
                  v-model="denailMessage2"
                  :options="denialMessages2"
                  size="large"
                  title="Temporal Denial Message:"
                  placeholder="Choose message"
                  class="--theme-border-blue"
                >
                </Dropdown>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="block__header">
              <div class="block__header-left">
                <Label alias="5" size="large" color="#3EB3BB" class="-large-text" />
                <div class="block__title">Warranty:</div>
              </div>
            </div>
            <div class="block__main">
              <div class="block__labels">
                <div class="modal__label-wrap">
                  <div class="modal__label-title">Months:</div>
                  <!-- <div class="modal__label blue">24 months</div> -->
                  <input v-model="warrantyMonths" class="modal__label blue" />
                </div>
                <div class="modal__label-wrap">
                  <div class="modal__label-title">KMs:</div>
                  <!-- <div class="modal__label blue">20 000</div> -->
                  <input v-model="warrantyKm" v-maska="{mask: 'HHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}" class="modal__label blue" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal__sidebar sidebar">
          <div class="sidebar-wrap">
            <div class="sidebar__list">
              <div class="sidebar__list-item item">
                <div class="item__left">
                  <Label alias="1" size="large" color="#2C9AFF" class="-large-text" />
                  <div class="item__title">Concern (Customer Request)</div>
                </div>
                <div class="item__right" :class="{active: request}"><i class="i-check_circle" /></div>
              </div>
              <div class="sidebar__list-item item">
                <div class="item__left">
                  <Label alias="2" size="large" color="#FF9B70" class="-large-text" />
                  <div class="item__title">Cause</div>
                </div>
                <div class="item__right" :class="{active: cause.length > 10}"><i class="i-check_circle" /></div>
              </div>
              <div class="sidebar__list-item item">
                <div class="item__left">
                  <Label alias="3" size="large" color="#10B981" class="-large-text" />
                  <div class="item__title">Solution</div>
                </div>
                <div class="item__right" :class="{active: solutionList?.length}"><i class="i-check_circle" /></div>
              </div>
              <div class="sidebar__list-item item">
                <div class="item__left">
                  <Label alias="4" size="large" color="#F37878" class="-large-text" />
                  <div class="item__title">Denial messages</div>
                </div>
                <div class="item__right" :class="{active: denailMessage1 || denailMessage2}"><i class="i-check_circle" /></div>
              </div>
              <div class="sidebar__list-item item">
                <div class="item__left">
                  <Label alias="5" size="large" color="#3EB3BB" class="-large-text" />
                  <div class="item__title">Warranty</div>
                </div>
                <div class="item__right"><i class="i-check_circle" /></div>
              </div>
            </div>
            <Button label="Mark as Ready for Customer" size="large" @click="approve" :disabled="cause.length <= 10 || !solutionList.length" />
          </div>
          <div class="sidebar__bottom">
            <div class="sidebar__notes">
              <div class="sidebar__notes-header">
                <span>Tech's Notes</span>
              </div>
              <textarea v-model="card.techNotes" ref="textarea" placeholder="Start typing here..." class="sidebar__textarea" :disabled="!isStart"></textarea>
            </div>
            <div v-if="card.additional" class="sidebar__dropdowns">
              <Additional />
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
import Menu from '@/components/Yaro/Menu'
import Multiselect from '@/components/Yaro/Multiselect'
import Switch from '@/components/Yaro/Switch'
import Dropdown from '@/components/Yaro/Dropdown'
import Part from '../Part'
import ServiceSlot from '../ServiceSlot'
import LabourSlot from '../LabourSlot'
import Additional from './Additional'
import NewPart from '../NewPart'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'AdvisorCardPage',
  components: {Button, Label, Menu, Multiselect, Switch, Part, Dropdown, Additional, ServiceSlot, LabourSlot, NewPart},
  data() {
    return {
      block: 'General',
      techs: null,
      statusesChange: [
        {label: 'No Status', command: () => this.changeStatus({id: this.card.id, status: 'No Status'})},
        {label: 'Good', command: () => this.changeStatus({id: this.card.id, status: 'Good'})},
        {label: 'Recommended', command: () => this.changeStatus({id: this.card.id, status: 'Recommended'})},
        {label: 'Component Unsafe', command: () => this.changeStatus({id: this.card.id, status: 'Component Unsafe'})}
      ],
      approvalStatusChange: [
        {label: 'No Status', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'No Status'})},
        {label: 'Approved By Customer', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Approved By Customer'})},
        {label: 'Approved By SA', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Approved By SA'})},
        {label: 'Temporary Declined', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Temporary Declined'})},
        {label: 'Permanently Declined', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Permanently Declined'})},
        {label: 'Approved For Next Visit', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Approved For Next Visit'})}
      ],
      request: 'Customer request connected with card here',
      // request: null,
      // notes: 'The cabin air filter in a vehicle helps remove harmful pollutants, including pollen and dust, from the air you breathe within the car.',
      brakePads: ['5mm', '5.5mm', '6mm', '6.5mm', '7mm', '7.5mm'],
      brakePadLeft: '5mm',
      brakePadLRight: '5mm',
      uid: null,
      parts: [],
      selectedMedia: {},
      showControls: true,
      assets: [
        {
          id: '28904mnbr',
          type: 'image',
          src: 'img0.jpg'
        },
        {
          id: '289043r',
          type: 'image',
          src: 'img1.png'
        },
        {
          id: '12r43r2',
          type: 'video',
          src: `video1.mp4`
        },
        {
          id: '389srqq43r',
          type: 'image',
          src: 'img2.png'
        },

        {
          id: '389sr95q43r',
          type: 'image',
          src: 'img3.png'
        },
        {
          id: '389srvcqq43r',
          type: 'image',
          src: 'img4.jpeg'
        },
        {
          id: '38569srqq43r',
          type: 'image',
          src: 'img5.png'
        }
      ],
      customerOptions: ['Display Total Price Only', 'Display Total Price & Parts', 'Display Parts & Pricing'],
      activeOptionIdx: 0,
      actionsList: [],
      displayLabour: false,
      displayFees: false,
      denialMessages1: [
        'In case you decline this card your car is just not going to be able to ride.',
        'In case you decline this card your air filter will be broken.'
      ],
      denialMessages2: [
        'In case you decline this card your car is just not going to be able to ride .',
        'In case you decline this card your air filter will be broken.',
        'In case you decline this card your brakes will be too loud.'
      ],
      denailMessage1: '',
      denailMessage2: '',
      cause: '',
      servicesFee: [
        {id: '01', name: 'Service 1', description: 'Service 1 description', price: 52.2, quantity: 2},
        {id: '02', name: 'Service 2', description: 'Service 2 description', price: 20.5, quantity: 1}
      ],
      labours: [
        {id: '01', name: 'Diagnostic Rate', description: 'Labour 1 description', price: 120, quantity: 2},
        {id: '02', name: 'shop Rate', description: 'Labour 2 description', price: 70, quantity: 1}
      ],
      showBlock: true,
      isNew: false,
      warrantyMonths: '24 month',
      warrantyKm: 20000
    }
  },
  async created() {
    const cardID = this.card.id
    await this.fetchServices(cardID)

    this.services.forEach(c => {
      let part = c.parts
      part.forEach(p => this.parts.push(p))
    })
    const [firstMedia] = this.assets
    this.selectMedia(firstMedia)
  },
  computed: {
    ...mapState({
      techList: s => s.company.users.users.filter(u => u.role === 'technician'),
      card: s => s.company.cards.card,
      cards: s => s.company.cards.cards,
      isStart: s => s.workOrder.isStart,
      activeService: s => s.company.cannedServices.activeService,
      order: s => s.workOrder.workOrder,
      services: s => s.company.cannedServices.services
    }),
    quotes() {
      return this.order.quotes
    },
    solutionList() {
      return this.services.map(s => s.description)
    },
    notes() {
      return this.card.techNotes
    }
  },
  watch: {
    activeService(s) {
      if (s.id) this.block = 'Service'
      else this.block = 'General'
    },
    notes: function () {
      this.$refs.textarea.style.height = '80px'
      this.$nextTick(() => {
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
      })
    }
  },
  methods: {
    ...mapActions({
      findRequest: 'requests/find',
      findOrder: 'workOrder/find',
      fetchServices: 'company/cannedServices/fetch',
      fetch: 'company/parts/fetch'
    }),
    ...mapMutations({
      setCard: 'company/cards/changeCard',
      changeStatus: 'company/cards/changeStatus',
      changeApprovalStatus: 'company/cards/changeApprovalStatus',
      setActiveService: 'company/cannedServices/setActiveService',
      updateCard: 'company/cards/updateCard'
    }),
    async beforeOpen() {
      this.uid = this.$route.params.uid
      await this.findOrder(this.uid)
    },
    selectMedia(media) {
      if (media.id === this.selectedMedia.id) return
      this.selectedMedia = media
      this.showControls = true
    },
    approve() {
      this.card.advisorApprove = true
      this.updateCard(this.card)
      this.$vfm.hide('AdvisorCardPage')
      this.$router.push(`/customer-view/${this.uid}`)
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
    labelClass(status) {
      return {
        '-orange': status === 'Recommended',
        '-red': status === 'Component Unsafe' || status === 'Permanently Declined',
        '-bluegreen': status === 'Canned Service Completed' || status === 'Temporary Declined',
        '-none': status === 'No Status',
        '-green': status === 'Approved By SA',
        '-green -border': status === 'Approved By Customer',
        '-purple': status === 'Approved For Next Visit',
        '-disabled': !this.isStart
      }
    },
    changeCard(param) {
      this.setCard(param)
      this.setActiveService({})
      this.block = 'General'
    },
    back() {
      this.setActiveService({})
    },
    select(i) {
      this.activeOptionIdx = i
    },
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    }
  },
  beforeUnmount() {
    this.setActiveService({})
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
