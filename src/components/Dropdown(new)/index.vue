<template>
  <div class="dropdown__wrapper" :class="{disabled: isDisabled}" ref="selectWrapper">
    <div
      class="dropdown__tag"
      :class="{active: isOpen, 'dropdown__tag--red': error, context: actionMenu}"
      ref="dropdownTag"
      @click="openClose"
    >
      <slot v-if="actionMenu" name="menu">
        <div class="dropdown__menu">
          <i class="i-more_horiz" />
        </div>
      </slot>
      <div v-if="modelValue && !actionMenu" class="dropdown__tag-name">
        <slot name="label" :label="modelValue">
          <span>{{ modelValue[label] ? modelValue[label] : modelValue }}</span>
        </slot>
      </div>

      <div v-else-if="!modelValue && !actionMenu" class="dropdown__tag-placeholder">{{ placeholder }}</div>
      <div v-if="!actionMenu" class="dropdown__tag-select" :class="{rotate: isOpen}">
        <i class="i-keyboard_arrow_down" />
      </div>
    </div>
    <div
      v-show="isOpen"
      class="dropdown__inner"
      :class="{left: position === 'left', top: openDirection === 'top', show}"
      ref="dropdownBody"
      @keydown.down.prevent="pointerForward"
      @keydown.up.prevent="pointerBackward"
      @keypress.enter.prevent="addPointerElement"
    >
      <div class="dropdown__list-wrapper" :style="{'max-height': maxHeight + 'px', 'min-width': minWidth + 'px'}">
        <div v-if="search" class="dropdown__search-wrapper">
          <label class="dropdown__search-label" ref="dropdownSearch">
            <i class="i-search1" />
            <input v-model="searchValue" type="text" class="dropdown__search-input" placeholder="Search" />
          </label>
        </div>
        <!--tabindex="-1"  -->
        <div class="dropdown__list-inner" ref="dropdownList">
          <div
            ref="dropdownListInner"
            tabindex="-1"
            v-for="(item, idx) of formattedList"
            :key="trackBy ? item[trackBy] : idx"
            class="dropdown__item"
            :class="optionHighlight(idx)"
            @click="changeItem({item, idx})"
            @mouseenter.self="pointerSet(idx)"
          >
            <slot name="option" :label="item">
              {{ item[label] ? item[label] : item }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    modelValue: {
      // TODO: DEL Boolean
      type: [String, Object, Boolean],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    trackBy: {
      type: String,
      default: null
    },
    valueWithTrackBy: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Select item'
    },
    list: {
      type: Array,
      required: true
    },
    icon: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'right'
    },
    extraClass: {
      type: String
    },
    maxHeight: {
      type: Number,
      default: 160
    },
    minWidth: {
      type: Number,
      default: 120
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    actionMenu: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': null
  },
  data() {
    return {
      isOpen: false,
      openDirection: 'bottom',
      posBottom: 0,
      posLeft: 0,
      show: false,
      searchValue: '',
      pointer: 0,
      optionHeight: 34 // heigh item this.$refs.item[id],
    }
  },
  computed: {
    pointerPosition() {
      return this.pointer * this.optionHeight
    },
    visibleElements() {
      const searchHeight = this.search ? 39 : 0
      return Math.floor((this.maxHeight - searchHeight) / this.optionHeight)
    },
    formattedList() {
      if (this.search) {
        return this.list.filter(item => item.toLowerCase().includes(this.searchValue.toLowerCase()))
      } else {
        return this.list
      }
    }
  },
  watch: {
    formattedList() {
      this.pointer = 0
    }
  },
  methods: {
    activeItem(idx, item) {
      return {
        active: item === this.modelValue
      }
    },
    openClose() {
      const selectWrapper = this.$refs.selectWrapper
      const selectParent = selectWrapper.offsetParent
      const selectParentHeight = selectParent.clientHeight
      const selectList = this.$refs.dropdownBody

      if (this.search) {
        setTimeout(() => {
          this.$refs.dropdownSearch.focus()
        }, 0)
      } else {
        setTimeout(() => {
          if (this.$refs.dropdownListInner) this.$refs.dropdownListInner[0].focus()
        }, 0)
      }

      setTimeout(() => {
        const selectListHeight = this.maxHeight < selectList.clientHeight ? this.maxHeight : selectList.clientHeight
        if (selectParentHeight - (selectWrapper.offsetTop + selectWrapper.offsetHeight) > selectListHeight + 10) {
          this.openDirection = 'down'
        } else {
          this.openDirection = 'top'
        }
      }, 0)

      const closeListerner = e => {
        if (this.catchOutsideClick(e, selectWrapper)) {
          window.removeEventListener('click', closeListerner)
          this.isOpen = false
          this.show = false
        }
      }
      window.addEventListener('click', closeListerner)
      this.isOpen = !this.isOpen
      setTimeout(() => {
        this.show = !this.show
      }, 0)
    },
    catchOutsideClick(event, selectWrapper) {
      return !selectWrapper.contains(event.target)
    },
    changeItem({item, idx}) {
      this.$emit('update:modelValue', item)
      this.pointer = idx
      this.isOpen = false
      this.show = false
    },
    //================================================================
    pointerSet(idx) {
      this.pointer = idx
    },
    optionHighlight(index) {
      return {
        active: index === this.pointer
      }
    },
    addPointerElement() {
      if (this.formattedList.length) {
        this.changeItem({item: this.formattedList[this.pointer], idx: this.pointer})
        // this.select(this.vehicles[this.pointer])
      }
      // this.pointerReset()
    },
    //=== POINTER ====================================================

    pointerForward() {
      if (this.pointer < this.formattedList.length - 1) {
        this.pointer++
        if (
          this.$refs.dropdownList.scrollTop <=
          this.pointerPosition - (this.visibleElements - 1) * this.optionHeight
        ) {
          this.$refs.dropdownList.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight
        }
      }
    },
    pointerBackward() {
      if (this.pointer > 0) {
        this.pointer--
        if (this.$refs.dropdownList.scrollTop >= this.pointerPosition) {
          this.$refs.dropdownList.scrollTop = this.pointerPosition
        }
      }
    },
    pointerReset() {
      //   this.pointer = 0
      //   if (this.$refs.list) {
      //     this.$refs.list.scrollTop = 0
      //   }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
