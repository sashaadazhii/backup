<template>
  <Teleport to="body">
    <transition name="y-popup" @enter="onEnter" @leave="onLeave" @after-leave="onAfterLeave">
      <div class="y-popup" v-if="visible" :ref="containerRef" v-bind="$attrs">
        <div class="y-popup__header header">
          <div class="header__title">New Activity</div>
          <div class="header__btns">
            <Button label="Cancel" border @click="close" />
            <Button label="Save" @click="save" />
          </div>
        </div>
        <div class="y-popup__body body">
          <div class="body__block">
            <Dropdown v-model="activity" :options="activities" title="Activity" placeholder="Select Activity" @change="selectActivity">
              <template #value="{value}">
                <div class="y-dropdown-label-custom">
                  <i class="i-mark" :style="{color: value?.color}" />
                  <span>{{ value?.name }}</span>
                </div>
              </template>
              <template #option="{option}">
                <div class="y-dropdown-item-custom">
                  <i class="i-mark" :style="{color: option?.color}" />
                  <span>{{ option.name }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="body__block">
            <!-- <DatePicker :modelValue="order.timeComing" mode="dateTime"
            :minute-increment="5" locale="en-Ca" @update:modelValue="change({timeComing: $event})"> -->
            <!-- <DatePicker v-model="date" locale="en-Ca">
              <template v-slot="{inputValue, inputEvents}">
                <Input :modelValue="`${inputValue}`" v-on="inputEvents" required placeholder="Choose date" />
              </template>
            </DatePicker> -->
            <Input :model-value="dayjs(day.date).format('DD MMMM YYYY')" placeholder="Time" disabled />

            <Input placeholder="Time" v-model="time" v-maska="'#'" :disabled="activity.name === 'Vacation'" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import {ConnectedOverlayScrollHandler, DomHandler, ZIndexUtils} from '@/components/Yaro/utils'
import {DatePicker} from 'v-calendar'
import Button from '@/components/Yaro/Button'
import Dropdown from '@/components/Yaro/Dropdown'
import Input from '@/components/Yaro/Input'
import dayjs from 'dayjs'

export default {
  name: 'Popup',
  inheritAttrs: false,
  emits: ['update:visible', 'changeDay'],
  props: {
    visible: Boolean,
    targetElement: {
      type: Object,
      requiered: true
    },
    day: {
      type: Object,
      requiered: true
    }
  },
  components: {Button, Dropdown, Input},
  data() {
    return {
      dayjs,
      date: null,
      time: null,
      activity: {
        name: 'Working day',
        title: '',
        color: '#5C9B9C'
      },
      activities: [
        {
          name: 'Working day',
          title: '',
          color: '#5C9B9C'
        },
        {
          name: 'Vacation',
          title: '',
          color: '#FDDCBC'
        }
      ]
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  container: null,
  updated() {
    this.target = this.targetElement
  },
  beforeUnmount() {
    this.unbindOutsideClickListener()
    if (this.scrollHandler) {
      this.scrollHandler.destroy()
      this.scrollHandler = null
    }
    this.unbindResizeListener()

    if (this.container) {
      ZIndexUtils.clear(this.container)
      this.container = null
    }

    this.target = null
  },
  methods: {
    selectActivity() {},
    save() {
      const day = {...this.day}
      if (this.activity.name === 'Working day') {
        day.work = true
        day.hours = this.time
      }
      if (this.activity.name === 'Vacation') {
        day.vacation = true
      }
      this.$emit('changeDay', day)
      this.close()
    },
    close() {
      this.$emit('update:visible', false)
      this.date = null
      this.time = null
      this.activity = {
        name: 'Working day',
        title: '',
        color: '#5C9B9C'
      }
    },
    onEnter(el) {
      this.bindOutsideClickListener()
      this.bindScrollListener()
      this.bindResizeListener()
      ZIndexUtils.set('overlay', el, this.$yaro.config.zIndex.overlay)
    },
    onLeave() {
      this.unbindOutsideClickListener()
      this.unbindScrollListener()
      this.unbindResizeListener()
    },
    onAfterLeave(el) {
      ZIndexUtils.clear(el)
    },
    alignOverlay() {
      DomHandler.absolutePositionTop(this.container, this.target)

      const containerOffset = DomHandler.getOffset(this.container)
      const targetOffset = DomHandler.getOffset(this.target)
      if (containerOffset.top < targetOffset.top) {
        DomHandler.addClass(this.container, 'p-confirm-popup-flipped')
      }
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = event => {
          if (this.visible && this.container && !this.container.contains(event.target) && !this.isTargetClicked(event)) {
            // this.close()
          } else {
            this.alignOverlay()
          }
        }
        document.addEventListener('click', this.outsideClickListener)
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener)
        this.outsideClickListener = null
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
          if (this.visible) {
            this.close()
          }
        })
      }

      this.scrollHandler.bindScrollListener()
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener()
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.visible && !DomHandler.isTouchDevice()) {
            this.close()
          }
        }
        window.addEventListener('resize', this.resizeListener)
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener)
        this.resizeListener = null
      }
    },
    isTargetClicked(event) {
      return this.target && (this.target === event.target || this.target.contains(event.target))
    },
    containerRef(el) {
      this.container = el
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
