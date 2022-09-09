<template>
  <Teleport to="body">
    <transition name="y-popup" @enter="onEnter" @leave="onLeave" @after-leave="onAfterLeave">
      <div class="y-popup" v-if="visible" :ref="containerRef" v-bind="$attrs">
        <div class="y-popup__header">
          <i class="i-request" />
          <div class="y-popup__title">{{ requests.length }} Requests</div>
        </div>
        <div class="y-popup__body">
          <div v-for="(req, idx) of requests" :key="idx" class="req__wrapper">
            <div class="req__header">Request</div>
            <div class="req__body">{{ req.notes }}</div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import {ConnectedOverlayScrollHandler, DomHandler, ZIndexUtils} from '@/components/Yaro/utils'
import dayjs from 'dayjs'

export default {
  name: 'Popup',
  inheritAttrs: false,
  emits: ['update:visible'],
  props: {
    visible: Boolean,
    targetElement: {
      type: Object,
      requiered: true
    },
    requests: {
      type: Object,
      requiered: true
    }
  },
  data() {
    return {
      dayjs
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
        if (!this.time) return
        day.work = true
        day.hours = this.time
      }
      if (this.activity.name === 'Vacation') {
        day.vacation = true
      }
      if (this.activity.name === 'Sick leave') {
        day.sick = true
      }
      this.$emit('changeDay', day)
      this.close()
    },
    close() {
      this.$emit('update:visible', false)
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
            this.close()
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
