<template>
  <Teleport to="body">
    <transition name="y-popup" @enter="onEnter" @leave="onLeave" @after-leave="onAfterLeave">
      <div class="y-popup" v-if="visible" :ref="containerRef" v-bind="$attrs">
        <div class="y-popup__inner">
          <div v-for="(notice, idx) of notification" :key="idx" class="y-popup__notice notice">
            <div class="notice__header">
              <Label :label="notice.status" size="small" :class="{'-orange': notice.status === 'Waiting for SA', '-blue': notice.status === 'WO Complete'}" />
              <div class="notice__title">{{ notice.title }}</div>
            </div>
            <div class="notice__main">{{ notice.time }}</div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import {ConnectedOverlayScrollHandler, DomHandler, ZIndexUtils} from '@/components/Yaro/utils'
import Label from '@/components/Yaro/Label'

export default {
  name: 'Popup',
  inheritAttrs: false,
  emits: ['update:visible', 'changeDay'],
  components: {Label},
  props: {
    visible: Boolean,
    targetElement: {
      type: Object,
      requiered: true
    }
  },
  data() {
    return {
      notification: [
        {
          status: 'Waiting for SA',
          title: 'Maynard Bauman changed status on Work Order #4',
          time: '24 minutes ago'
        },
        {
          status: 'Waiting for SA',
          title: 'Maynard Bauman changed status on Work Order #4',
          time: '36 minutes ago'
        },
        {
          status: 'WO Complete',
          title: 'Maynard Bauman changed status on Work Order #4',
          time: '46 minutes ago'
        },
        {
          status: 'Waiting for Customer',
          title: 'Maynard Bauman changed status on Work Order #4',
          time: 'Jun 23, 2022 at 9:18 AM'
        },
        {
          status: 'Waiting for SA',
          title: 'Maynard Bauman changed status on Work Order #4',
          time: '24 minutes ago'
        },
        {
          status: 'Waiting for SA',
          title: 'Maynard Bauman changed status on Work Order #4',
          time: '36 minutes ago'
        },
        {
          status: 'WO Complete',
          title: 'Maynard Bauman changed status on Work Order #4',
          time: '46 minutes ago'
        },
        {
          status: 'Waiting for Customer',
          title: 'Maynard Bauman changed status on Work Order #4',
          time: 'Jun 23, 2022 at 9:18 AM'
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
