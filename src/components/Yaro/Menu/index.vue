<template>
  <div ref="btn" class="y-menu__btn" :style="[styleBtn]" @click="toggle">
    <slot name="menu"><i class="i-more_horiz y-menu__btn-icon" /></slot>
  </div>
  <Teleport :to="appendTarget">
    <transition name="y-connected-overlay" @enter="onEnter" @leave="onLeave" @after-leave="onAfterLeave">
      <div :ref="containerRef" class="y-menu y-menu--overlay" v-if="overlayVisible" v-bind="$attrs" @click="onOverlayClick">
        <ul class="y-menu__list" role="menu">
          <template v-for="(item, i) of list" :key="item.label + i">
            <template v-if="item.items">
              <li class="y-menu__item-header" v-if="item.items">
                <slot name="itemHeader" :item="item">{{ item.label }}</slot>
              </li>
              <li v-for="(child, j) of item.items" :key="child.label + i + j" :class="itemClass(child)" @click="itemClick(child)">
                <slot name="item" :item="child">
                  <i :class="['y-menu__item--icon', child.icon]" />
                  <span class="y-menu__item--text">{{ child.label }}</span>
                </slot>
              </li>
            </template>
            <li v-else :class="itemClass(item)" @click="itemClick(item)">
              <slot name="item" :item="item">
                <i :class="['y-menu__item--icon', item.icon]" />
                <span class="y-menu__item--text">{{ item.label }}</span>
              </slot>
            </li>
          </template>
        </ul>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import {ConnectedOverlayScrollHandler, DomHandler, ZIndexUtils} from '../utils'
import OverlayEventBus from '../overlayeventbus'

export default {
  name: 'Menu',
  emits: ['show', 'hide'],
  inheritAttrs: false,
  props: {
    appendTarget: {
      type: String,
      default: 'body'
    },
    list: {
      type: Array,
      default: null
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    exact: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'right'
    },
    styleBtn: String
  },
  data() {
    return {
      overlayVisible: false
    }
  },
  target: null,
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  container: null,
  beforeUnmount() {
    this.unbindResizeListener()
    this.unbindOutsideClickListener()

    if (this.scrollHandler) {
      this.scrollHandler.destroy()
      this.scrollHandler = null
    }
    this.target = null
    if (this.container) ZIndexUtils.clear(this.container)
    this.container = null
  },
  methods: {
    itemClick(item) {
      if (item.disabled) return
      if (item.command) item.command()
      this.hide()
    },
    toggle(event) {
      if (this.overlayVisible) this.hide()
      else this.show(event)
    },
    show(event) {
      this.overlayVisible = true
      this.target = event.currentTarget
    },
    hide() {
      this.overlayVisible = false
      this.target = null
    },
    onEnter(el) {
      this.alignOverlay()
      this.bindOutsideClickListener()
      this.bindResizeListener()
      this.bindScrollListener()
      ZIndexUtils.set('menu', el, this.baseZIndex + this.$yaro.config.zIndex.menu)
      this.$emit('show')
    },
    onLeave() {
      this.unbindOutsideClickListener()
      this.unbindResizeListener()
      this.unbindScrollListener()
      this.$emit('hide')
    },
    onAfterLeave(el) {
      ZIndexUtils.clear(el)
    },
    alignOverlay() {
      DomHandler.absolutePosition(this.container, this.target, this.position)
      this.container.style.minWidth = DomHandler.getOuterWidth(this.target) + 'px'
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = event => {
          if (this.overlayVisible && this.container && !this.container.contains(event.target) && !this.isTargetClicked(event)) {
            this.hide()
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
          if (this.overlayVisible) {
            this.hide()
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
          if (this.overlayVisible) {
            this.hide()
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
    },
    onOverlayClick(event) {
      OverlayEventBus.emit('overlay-click', {
        originalEvent: event,
        target: this.target
      })
    },
    itemClass(item) {
      return [
        'y-menu__item',
        {
          'y-menu__item--disabled': item.disabled
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
