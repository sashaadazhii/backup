<template>
  <Teleport :to="appendTarget" :disabled="appendDisabled">
    <div :ref="maskRef" :class="maskClass" v-if="containerVisible" @click="onMaskClick">
      <transition
        name="y-dialog"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @after-leave="onAfterLeave"
        appear
      >
        <div :ref="containerRef" :class="containerClass" v-if="visible" v-bind="$attrs" role="dialog">
          <div class="y-dialog__header" v-if="showHeader">
            <slot name="header">
              <span class="y-dialog__header-title" v-if="header">{{ header }}</span>
            </slot>
            <Button v-if="closable" icon="i-circle_close" circle border @click="close" />
          </div>
          <div :class="contentStyleClass">
            <slot :initDrag="initDrag"></slot>
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
  emits: ['update:visible', 'show', 'hide', 'dragend'],
  props: {
    header: null, // Title content of the dialog.
    visible: Boolean, // Specifies the visibility of the dialog.
    contentClass: String, // Style class of the content section.
    modal: {
      type: Boolean,
      default: true
    }, // Defines if background should be blocked when dialog is displayed.
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
    draggable: {
      type: Boolean,
      default: false
    }, // Enables dragging to change the position using header.
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
  dragging: null,
  documentDragListener: null,
  documentDragEndListener: null,
  lastPageX: null,
  lastPageY: null,
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
    onBeforeLeave() {
      if (this.modal) DomHandler.addClass(this.mask, 'y-component-overlay-leave')
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
    initDrag(event) {
      if (this.draggable) {
        this.dragging = true
        this.lastPageX = event.pageX
        this.lastPageY = event.pageY

        this.container.style.margin = '0'
        if (this.position === 'bottom') this.container.style.marginBottom = '30px'
        DomHandler.addClass(document.body, 'y-unselectable-text')
      }
    },
    bindGlobalListeners() {
      if (this.draggable) {
        this.bindDocumentDragListener()
        this.bindDocumentDragEndListener()
      }
      if (this.closeOnEsc && this.closable) this.bindDocumentKeyDownListener()
    },
    unbindGlobalListeners() {
      this.unbindDocumentDragListener()
      this.unbindDocumentDragEndListener()
      this.unbindDocumentKeyDownListener()
    },
    bindDocumentDragListener() {
      this.documentDragListener = event => {
        if (this.dragging) {
          let width = DomHandler.getOuterWidth(this.container)
          let height = DomHandler.getOuterHeight(this.container)
          let deltaX = event.pageX - this.lastPageX
          let deltaY = event.pageY - this.lastPageY
          let offset = this.container.getBoundingClientRect()
          let leftPos = offset.left + deltaX
          let topPos = offset.top + deltaY
          let viewport = DomHandler.getViewport()

          this.container.style.position = 'fixed'

          if (this.keepInViewport) {
            if (leftPos >= this.minX && leftPos + width < viewport.width) {
              this.lastPageX = event.pageX
              this.container.style.left = leftPos + 'px'
            }

            if (topPos >= this.minY && topPos + height < viewport.height) {
              this.lastPageY = event.pageY
              this.container.style.top = topPos + 'px'
            }
          } else {
            this.lastPageX = event.pageX
            this.container.style.left = leftPos + 'px'
            this.lastPageY = event.pageY
            this.container.style.top = topPos + 'px'
          }
        }
      }
      window.document.addEventListener('mousemove', this.documentDragListener)
    },
    unbindDocumentDragListener() {
      if (this.documentDragListener) {
        window.document.removeEventListener('mousemove', this.documentDragListener)
        this.documentDragListener = null
      }
    },
    bindDocumentDragEndListener() {
      this.documentDragEndListener = event => {
        if (this.dragging) {
          this.dragging = false
          DomHandler.removeClass(document.body, 'y-unselectable-text')

          this.$emit('dragend', event)
        }
      }
      window.document.addEventListener('mouseup', this.documentDragEndListener)
    },
    unbindDocumentDragEndListener() {
      if (this.documentDragEndListener) {
        window.document.removeEventListener('mouseup', this.documentDragEndListener)
        this.documentDragEndListener = null
      }
    }
  },
  computed: {
    maskClass() {
      return ['y-dialog__mask', {'y-dialog__mask--overlay y-component-overlay-enter': this.modal}, this.getPositionClass()]
    },
    containerClass() {
      return ['y-dialog', {'y-dialog--draggable': this.draggable}]
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
