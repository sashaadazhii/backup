<template>
  <Teleport :to="appendTarget" :disabled="appendDisabled">
    <div :ref="maskRef" :class="maskClass" v-if="containerVisible" @click="onMaskClick">
      <transition name="y-dialog" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" @after-leave="onAfterLeave" appear>
        <div :ref="containerRef" class="y-dialog" v-if="visible" v-bind="$attrs" role="dialog">
          <div class="y-dialog__header" v-if="showHeader">
            <slot name="header">
              <span class="y-dialog__header-title" v-if="header">{{ header }}</span>
            </slot>
            <Button v-if="closable" icon="i-circle_close" circle border @click="close" />
          </div>
          <div :class="contentStyleClass">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script>
import {DomHandler, ZIndexUtils} from '../utils'
import Button from '../Button'

export default {
  name: 'Dialog',
  inheritAttrs: false,
  emits: ['update:visible', 'show', 'hide'],
  props: {
    header: null, // Title content of the dialog.
    visible: Boolean, // Specifies the visibility of the dialog.
    contentClass: String, // Style class of the content section.
    dismissableMask: {
      type: Boolean,
      default: true
    }, // Specifies if clicking the modal background should hide the dialog.
    closable: {
      type: Boolean,
      default: true
    }, // Adds a close icon to the header to hide the dialog.
    closeOnEsc: {
      type: Boolean,
      default: true
    }, // Specifies if pressing escape key should hide the dialog.
    showHeader: {
      type: Boolean,
      default: false
    }, // Whether to show the header or not.
    position: {
      type: String,
      default: 'center'
    }, // Position of the dialog, options are "center", "top", "bottom", "left", "right", "topleft", "topright", "bottomleft" or "bottomright".
    appendTo: {
      type: String,
      default: 'body'
    } // A valid query selector or an HTMLElement to specify where the dialog gets attached.
    // Special keywords are "body" for document body and "self" for the element itself.
  },
  components: {Button},
  data() {
    return {
      containerVisible: this.visible
    }
  },
  documentKeydownListener: null,
  container: null,
  mask: null,
  updated() {
    if (this.visible) this.containerVisible = this.visible
  },
  beforeUnmount() {
    this.unbindDocumentState()
    this.unbindGlobalListeners()
    this.mask = null
    if (this.container) ZIndexUtils.clear(this.container)
    this.container = null
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    onBeforeEnter(el) {
      ZIndexUtils.set('modal', el, this.$yaro.config.zIndex.modal)
    },
    onEnter() {
      this.mask.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1)
      this.$emit('show')
      this.focus()
      this.enableDocumentSettings()
      this.bindGlobalListeners()
    },
    onLeave() {
      this.$emit('hide')
    },
    onAfterLeave(el) {
      ZIndexUtils.clear(el)
      this.containerVisible = false
      this.unbindDocumentState()
      this.unbindGlobalListeners()
    },
    onMaskClick(event) {
      if (this.dismissableMask && this.closable && this.mask === event.target) this.close()
    },
    focus() {
      const focusTarget = this.container.querySelector('[autofocus]')
      if (focusTarget) focusTarget.focus()
    },
    enableDocumentSettings() {
      DomHandler.addClass(document.body, 'y-overflow-hidden')
    },
    unbindDocumentState() {
      DomHandler.removeClass(document.body, 'y-overflow-hidden')
    },
    onKeyDown(event) {
      if (event.which === 9) {
        event.preventDefault()
        let focusableElements = DomHandler.getFocusableElements(this.container)
        if (focusableElements && focusableElements.length > 0) {
          if (!document.activeElement) {
            focusableElements[0].focus()
          } else {
            let focusedIndex = focusableElements.indexOf(document.activeElement)
            if (event.shiftKey) {
              if (focusedIndex == -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus()
              else focusableElements[focusedIndex - 1].focus()
            } else {
              if (focusedIndex == -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus()
              else focusableElements[focusedIndex + 1].focus()
            }
          }
        }
      } else if (event.which === 27 && this.closeOnEsc) {
        this.close()
      }
    },
    bindDocumentKeyDownListener() {
      if (!this.documentKeydownListener) {
        this.documentKeydownListener = this.onKeyDown.bind(this)
        window.document.addEventListener('keydown', this.documentKeydownListener)
      }
    },
    unbindDocumentKeyDownListener() {
      if (this.documentKeydownListener) {
        window.document.removeEventListener('keydown', this.documentKeydownListener)
        this.documentKeydownListener = null
      }
    },
    getPositionClass() {
      const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright']
      const pos = positions.find(item => item === this.position)
      return pos ? `y-dialog--${pos}` : ''
    },
    containerRef(el) {
      this.container = el
    },
    maskRef(el) {
      this.mask = el
    },
    bindGlobalListeners() {
      if (this.closeOnEsc && this.closable) this.bindDocumentKeyDownListener()
    },
    unbindGlobalListeners() {
      this.unbindDocumentKeyDownListener()
    }
  },
  computed: {
    maskClass() {
      return ['y-dialog__mask', 'y-dialog__mask--overlay', this.getPositionClass()]
    },
    contentStyleClass() {
      return ['y-dialog__content', this.contentClass]
    },
    appendDisabled() {
      return this.appendTo === 'self'
    },
    appendTarget() {
      return this.appendDisabled ? null : this.appendTo
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
