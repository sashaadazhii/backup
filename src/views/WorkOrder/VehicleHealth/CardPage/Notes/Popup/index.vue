<template>
  <Teleport to="body">
    <transition name="y-popup" @enter="onEnter" @leave="onLeave" @after-leave="onAfterLeave">
      <div class="y-popup" v-if="visible" :ref="containerRef" v-bind="$attrs" :style="{'max-width': `${width}px`, 'min-width': `${width}px`}">
        <div class="y-popup__list">
          <div v-for="note of notes" :key="note.id" class="note__wrapper">
            <span>{{ note.text }}</span>
            <Button icon="i-add_circle" size="small" @click.stop="addNote(note)" />
          </div>
          <div v-if="!notes.length" class="note__wrapper -empty">empty list</div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import {ConnectedOverlayScrollHandler, DomHandler, ZIndexUtils} from '@/components/Yaro/utils'
import Button from '@/components/Yaro/Button'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'Popup',
  inheritAttrs: false,
  emits: ['update:visible'],
  components: {Button},
  props: {
    visible: Boolean,
    targetElement: {
      type: Object,
      requiered: true
    },
    notes: {
      type: Array,
      requiered: true
    }
  },
  data() {
    return {
      width: 0
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  container: null,
  updated() {
    this.target = this.targetElement
    if (this.visible) {
      // this.alignOverlay()
      this.width = this.target.offsetWidth + 10
    }
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
  computed: {
    ...mapState({
      cardID: s => s.company.cards.card.templateID
    })
  },
  methods: {
    ...mapMutations({
      add: 'company/notes/add'
    }),
    addNote(note) {
      const newNote = {...note}
      newNote.templateID = this.cardID
      this.add(newNote)
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
      DomHandler.absolutePosition(this.container, this.target)
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
