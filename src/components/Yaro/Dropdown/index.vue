<template>
  <div ref="container" :class="containerClass" @click="onClick($event)">
    <div class="y-hidden-accessible">
      <input
        ref="focusInput"
        type="text"
        :id="inputId"
        readonly
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeyDown"
        :tabindex="tabindex"
        aria-haspopup="true"
        :aria-expanded="overlayVisible"
        :aria-labelledby="ariaLabelledBy"
      />
    </div>
    <div v-if="title" class="y-dropdown-title">{{ title }}</div>
    <div class="y-dropdown-inner" :class="{'y-dropdown-inner--medium': size === 'medium'}">
      <div v-if="search" class="y-dropdown-search-container">
        <i class="y-dropdown-search-icon i-search1" />
        <input
          type="text"
          ref="searchInput"
          :value="searchValue"
          @vnode-updated="onFilterUpdated"
          autoComplete="off"
          class="y-dropdown-search"
          :placeholder="searchPlaceholder"
          @blur="onBlurInput"
          @keydown="onFilterKeyDown"
          @input="onSearchChange"
        />
      </div>
      <span v-if="!search" :class="labelClass">
        <slot name="value" :value="modelValue" :placeholder="placeholder">
          <span>{{ label || 'empty' }}</span>
        </slot>
      </span>
      <span v-if="(modelValue && searchValue) || loading" class="y-dropdown-clear">
        <i v-if="loading" :class="loadingIcon" />
        <i v-else class="i-close y-dropdown-clear-icon" @click.stop="onClearClick($event)" />
        <span class="y-dropdown-clear-line" />
      </span>
      <div class="y-dropdown-trigger" role="button" aria-haspopup="listbox" :aria-expanded="overlayVisible">
        <slot name="indicator"><i :class="dropdownIconClass" /></slot>
      </div>
    </div>
    <div v-if="error && errorMessage" class="y-dropdown-error-message">{{ errorMessage }}</div>
    <Teleport :to="appendTarget" :disabled="appendDisabled">
      <transition @enter="onOverlayEnter" @after-enter="onOverlayAfterEnter" @leave="onOverlayLeave" @after-leave="onOverlayAfterLeave">
        <div :ref="overlayRef" :class="panelStyleClass" v-if="overlayVisible" @click="onOverlayClick">
          <slot name="header" :value="modelValue" :options="visibleOptions"></slot>
          <div class="y-dropdown-header" v-if="filter">
            <div class="y-dropdown-filter-label" :class="{'y-dropdown-filter--active': filterActive, 'y-dropdown-filter--clear': filterValue}">
              <i class="i-search1 y-dropdown-filter-search" />
              <input
                type="text"
                ref="filterInput"
                :value="filterValue"
                @vnode-updated="onFilterUpdated"
                autoComplete="off"
                class="y-dropdown-filter-input"
                :placeholder="filterPlaceholder"
                @keydown="onFilterKeyDown"
                @input="onFilterChange"
                @focus="filterActive = true"
                @blur="filterActive = false"
              />
              <i class="i-close y-dropdown-filter-clear" v-if="filterValue" @click="onFilterReset" />
            </div>
          </div>
          <div :ref="itemsWrapperRef" class="y-dropdown-items-wrapper" :style="{'max-height': virtualScrollerDisabled ? scrollHeight : ''}">
            <VirtualScroller
              :ref="virtualScrollerRef"
              v-bind="virtualScrollerOptions"
              :items="visibleOptions"
              :style="{height: scrollHeight}"
              :disabled="virtualScrollerDisabled"
            >
              <template v-slot:content="{styleClass, contentRef, items, getItemOptions, contentStyle}">
                <ul :ref="contentRef" :class="['y-dropdown-items', styleClass]" :style="contentStyle" role="listbox">
                  <template v-if="!optionGroupLabel">
                    <li
                      v-for="(option, i) of items"
                      :class="['y-dropdown-item', {'y-dropdown-item--highlight': isSelected(option), 'y-dropdown-item--disabled': isOptionDisabled(option)}]"
                      :key="getOptionRenderKey(option)"
                      @click="onOptionSelect($event, option)"
                      role="option"
                      :aria-label="getOptionLabel(option)"
                      :aria-selected="isSelected(option)"
                    >
                      <slot name="option" :option="option" :index="getOptionIndex(i, getItemOptions)">
                        <span>{{ getOptionLabel(option) }}</span>
                      </slot>
                    </li>
                  </template>
                  <template v-else>
                    <template v-for="(optionGroup, i) of items" :key="getOptionGroupRenderKey(optionGroup)">
                      <li class="y-dropdown-item-group">
                        <slot name="optiongroup" :option="optionGroup" :index="getOptionIndex(i, getItemOptions)">
                          <span>{{ getOptionGroupLabel(optionGroup) }}</span>
                        </slot>
                      </li>
                      <li
                        v-for="(option, i) of getOptionGroupChildren(optionGroup)"
                        :class="['y-dropdown-item', {'y-dropdown-item--highlight': isSelected(option), 'y-dropdown-item--disabled': isOptionDisabled(option)}]"
                        :key="getOptionRenderKey(option)"
                        @click="onOptionSelect($event, option)"
                        role="option"
                        :aria-label="getOptionLabel(option)"
                        :aria-selected="isSelected(option)"
                      >
                        <slot name="option" :option="option" :index="getOptionIndex(i, getItemOptions)">{{ getOptionLabel(option) }}</slot>
                      </li>
                    </template>
                  </template>
                  <li v-if="searchValue && (!items || (items && items.length === 0))" class="y-dropdown-empty-message">
                    <slot name="emptysearch">{{ emptySearchMessageText }}</slot>
                  </li>
                  <li v-else-if="filterValue && (!items || (items && items.length === 0))" class="y-dropdown-empty-message">
                    <slot name="emptyfilter">{{ emptyFilterMessageText }}</slot>
                  </li>
                  <li v-else-if="!localOptions || (localOptions && localOptions.length === 0)" class="y-dropdown-empty-message">
                    <slot name="empty">{{ emptyMessageText }}</slot>
                  </li>
                </ul>
              </template>
            </VirtualScroller>
          </div>
          <div class="y-dropdown-footer" @click="hide">
            <slot name="footer" :value="modelValue" :options="visibleOptions"> </slot>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script>
import {ConnectedOverlayScrollHandler, ObjectUtils, DomHandler, ZIndexUtils} from '../utils'
import OverlayEventBus from '../overlayeventbus'
import {FilterService} from '../api'
import VirtualScroller from '../virtualscroller'

export default {
  name: 'Dropdown',
  emits: ['update:modelValue', 'before-show', 'before-hide', 'show', 'hide', 'change', 'filter', 'search', 'focus', 'blur', 'asyncSearch'],
  props: {
    modelValue: null,
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      default: '200px'
    },
    filter: Boolean,
    search: Boolean,
    filterPlaceholder: String,
    searchPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      default: 'contains'
    },
    filterFields: {
      type: Array,
      default: null
    },
    editable: Boolean,
    placeholder: String,
    disabled: Boolean,
    dataKey: null,
    inputId: String,
    tabindex: String,
    ariaLabelledBy: null,
    appendTo: {
      type: String,
      default: 'body'
    },
    emptyFilterMessage: {
      type: String,
      default: null
    },
    emptySearchMessage: {
      type: String,
      default: null
    },
    emptyMessage: {
      type: String,
      default: null
    },
    panelClass: null,
    loadingIcon: {
      type: String,
      default: 'y-dropdown-loading-icon i-loading y-spin'
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    openPosition: {
      type: String,
      default: 'left'
    },
    async: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    theme: String
  },
  data() {
    return {
      focused: false,
      filterValue: null,
      overlayVisible: false,
      searchValue: null,
      localValue: null,
      filterActive: false,
      loading: false,
      localOptions: []
    }
  },
  created() {
    this.localOptions = this.options
    this.localValue = this.modelValue
    if (this.search) {
      if (this.searchValue !== this.getOptionLabel(this.modelValue)) {
        this.searchValue = this.getOptionLabel(this.modelValue)
      }
    }
  },

  watch: {
    modelValue(e) {
      if (this.search) this.searchValue = this.getOptionLabel(e)
    },
    localValue() {
      this.isModelValueChanged = true
    },
    options() {
      this.localOptions = this.options
      if (this.loading) {
        if ((this.localOptions && this.localOptions.length) || this.searchValue) this.show()
        else this.hide()
        this.loading = false
      }
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  searchTimeout: null,
  timeout: null,
  currentSearchChar: null,
  previousSearchChar: null,
  searchItemValue: null,
  overlay: null,
  itemsWrapper: null,
  virtualScroller: null,
  isModelValueChanged: false,
  updated() {
    if (this.overlayVisible && this.isModelValueChanged) {
      setTimeout(() => {
        this.scrollValueInView()
      }, 0)
    }
    this.isModelValueChanged = false
  },
  beforeUnmount() {
    this.unbindOutsideClickListener()
    this.unbindResizeListener()

    if (this.scrollHandler) {
      this.scrollHandler.destroy()
      this.scrollHandler = null
    }

    this.itemsWrapper = null

    if (this.overlay) {
      ZIndexUtils.clear(this.overlay)
      this.overlay = null
    }
  },
  methods: {
    getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)['index']
    },
    getOptionLabel(option) {
      return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option
    },
    getOptionValue(option) {
      return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option
    },
    getOptionRenderKey(option) {
      return this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)
    },
    isOptionDisabled(option) {
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false
    },
    getOptionGroupRenderKey(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel)
    },
    getOptionGroupLabel(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel)
    },
    getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren)
    },
    getSelectedOption() {
      let index = this.getSelectedOptionIndex()
      return index !== -1
        ? this.optionGroupLabel
          ? this.getOptionGroupChildren(this.visibleOptions[index.group])[index.option]
          : this.visibleOptions[index]
        : null
    },
    getSelectedOptionIndex() {
      if (this.localValue != null && this.visibleOptions) {
        if (this.optionGroupLabel) {
          for (let i = 0; i < this.visibleOptions.length; i++) {
            let selectedOptionIndex = this.findOptionIndexInList(this.localValue, this.getOptionGroupChildren(this.visibleOptions[i]))
            if (selectedOptionIndex !== -1) {
              return {group: i, option: selectedOptionIndex}
            }
          }
        } else {
          return this.findOptionIndexInList(this.localValue, this.visibleOptions)
        }
      }

      return -1
    },
    findOptionIndexInList(value, list) {
      for (let i = 0; i < list.length; i++) {
        if (ObjectUtils.equals(value, this.getOptionValue(list[i]), this.equalityKey)) {
          return i
        }
      }

      return -1
    },
    isSelected(option) {
      return ObjectUtils.equals(this.localValue, this.getOptionValue(option), this.equalityKey)
    },
    show() {
      this.$emit('before-show')
      this.overlayVisible = true
    },
    hide() {
      if (this.async) this.clearOptions()
      if (this.search && !this.async) {
        if (this.searchValue !== this.localValue) {
          this.searchValue = this.getOptionLabel(this.localValue)
        }
      }
      this.$emit('before-hide')
      this.overlayVisible = false
    },
    onFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    onBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },
    onBlurInput(event) {
      setTimeout(() => {
        if (this.search && this.async) {
          if (this.searchValue !== this.localValue) {
            this.searchValue = this.getOptionLabel(this.localValue)
            this.hide()
          }
        }
      }, 200)
    },
    onKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          this.onDownKey(event)
          break

        //up
        case 38:
          this.onUpKey(event)
          break

        //space
        case 32:
          if (!this.overlayVisible) {
            this.show()
            event.preventDefault()
          }
          break

        //enter and escape
        case 13:
          this.onEnterKey(event)
          break
        case 27:
          if (this.overlayVisible) {
            this.hide()
            event.preventDefault()
          }
          break

        //tab
        case 9:
          this.hide()
          break

        default:
          this.searchItem(event)
          break
      }
    },
    onFilterKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          this.onDownKey(event)
          break

        //up
        case 38:
          this.onUpKey(event)
          break

        //enter and escape
        case 13:
          this.onEnterKey(event)
          break
        case 27:
          this.overlayVisible = false
          event.preventDefault()
          break

        default:
          break
      }
    },
    onDownKey(event) {
      if (this.visibleOptions) {
        if (!this.overlayVisible && event.altKey) {
          this.show()
        } else {
          let nextOption = this.visibleOptions && this.visibleOptions.length > 0 ? this.findNextOption(this.getSelectedOptionIndex()) : null
          if (nextOption) {
            this.localValue = this.getOptionValue(nextOption)
          }
        }
      }

      event.preventDefault()
    },
    onUpKey(event) {
      if (this.visibleOptions) {
        let prevOption = this.findPrevOption(this.getSelectedOptionIndex())
        if (prevOption) {
          this.localValue = this.getOptionValue(prevOption)
        }
      }

      event.preventDefault()
    },
    onEnterKey(event) {
      if (this.visibleOptions) {
        let option = this.findOption(this.getSelectedOptionIndex())
        if (option) {
          this.onOptionSelect(event, this.getOptionValue(option))
        }
      }

      event.preventDefault()
    },
    findOption(index) {
      if (this.optionGroupLabel) {
        let groupIndex = index === -1 ? 0 : index.group
        let optionIndex = index === -1 ? -1 : index.option
        let option = this.findOptionInList(this.getOptionGroupChildren(this.visibleOptions[groupIndex]), optionIndex)

        if (option) return option
        else if (groupIndex !== this.visibleOptions.length) return this.findOption({group: groupIndex, option: -1})
        else return null
      } else {
        return this.findOptionInList(this.visibleOptions, index)
      }
    },
    findOptionInList(list, index) {
      if (index === list.length) {
        return null
      }

      let option = list[index]
      if (this.isOptionDisabled(option)) return this.findOptionInList(index)
      else return option
    },
    findNextOption(index) {
      if (this.optionGroupLabel) {
        let groupIndex = index === -1 ? 0 : index.group
        let optionIndex = index === -1 ? -1 : index.option
        let option = this.findNextOptionInList(this.getOptionGroupChildren(this.visibleOptions[groupIndex]), optionIndex)

        if (option) return option
        else if (groupIndex + 1 !== this.visibleOptions.length) return this.findNextOption({group: groupIndex + 1, option: -1})
        else return null
      } else {
        return this.findNextOptionInList(this.visibleOptions, index)
      }
    },
    findNextOptionInList(list, index) {
      let i = index + 1
      if (i === list.length) {
        return null
      }

      let option = list[i]
      if (this.isOptionDisabled(option)) return this.findNextOptionInList(i)
      else return option
    },
    findPrevOption(index) {
      if (index === -1) {
        return null
      }

      if (this.optionGroupLabel) {
        let groupIndex = index.group
        let optionIndex = index.option
        let option = this.findPrevOptionInList(this.getOptionGroupChildren(this.visibleOptions[groupIndex]), optionIndex)

        if (option) return option
        else if (groupIndex > 0)
          return this.findPrevOption({
            group: groupIndex - 1,
            option: this.getOptionGroupChildren(this.visibleOptions[groupIndex - 1]).length
          })
        else return null
      } else {
        return this.findPrevOptionInList(this.visibleOptions, index)
      }
    },
    findPrevOptionInList(list, index) {
      let i = index - 1
      if (i < 0) {
        return null
      }

      let option = list[i]
      if (this.isOptionDisabled(option)) return this.findPrevOption(i)
      else return option
    },
    onClearClick(event) {
      this.filterValue = this.searchValue = this.localValue = null
      if (this.async) this.clearOptions()
      this.updateModel(event, null)
    },
    onClick(event) {
      if (this.disabled || this.loading) {
        return
      } else if (!this.overlay || !this.overlay.contains(event.target)) {
        if (this.async && !this.localOptions.length) return
        if (this.overlayVisible) this.hide()
        else this.show()

        this.$refs.focusInput.focus()
      }
    },
    onOptionSelect(event, option) {
      let value = this.getOptionValue(option)
      if (this.filter) this.filterValue = this.getOptionLabel(option)
      if (this.search) this.searchValue = this.getOptionLabel(option)
      this.localValue = value
      this.updateModel(event, value)
      this.$refs.focusInput.focus()
      this.hide()
    },
    onEditableInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    onOverlayEnter(el) {
      ZIndexUtils.set('overlay', el, this.$yaro.config.zIndex.overlay)
      this.alignOverlay()
      this.scrollValueInView()

      if (!this.virtualScrollerDisabled) {
        const selectedIndex = this.getSelectedOptionIndex()
        if (selectedIndex !== -1) {
          setTimeout(() => {
            this.virtualScroller && this.virtualScroller.scrollToIndex(selectedIndex)
          }, 0)
        }
      }
    },
    onOverlayAfterEnter() {
      if (this.filter) {
        this.$refs.filterInput.focus()
      }
      if (this.search) {
        this.$refs.searchInput.focus()
      }

      this.bindOutsideClickListener()
      this.bindScrollListener()
      this.bindResizeListener()

      this.$emit('show')
    },
    onOverlayLeave() {
      this.unbindOutsideClickListener()
      this.unbindScrollListener()
      this.unbindResizeListener()
      this.$emit('hide')
      this.itemsWrapper = null
      this.overlay = null
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el)
    },
    alignOverlay() {
      if (this.appendDisabled) {
        DomHandler.relativePosition(this.overlay, this.$el)
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + 'px'
        DomHandler.absolutePosition(this.overlay, this.$el, this.openPosition)
      }
    },
    updateModel(event, value) {
      this.$emit('update:modelValue', value)
      this.$emit('change', {originalEvent: event, value: value})
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = event => {
          if (this.overlayVisible && this.overlay && !this.$el.contains(event.target) && !this.overlay.contains(event.target)) {
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
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
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
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
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
    searchItem(event) {
      if (!this.visibleOptions) {
        return
      }

      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      const char = event.key
      this.previousSearchChar = this.currentSearchChar
      this.currentSearchChar = char

      if (this.previousSearchChar === this.currentSearchChar) this.searchItemValue = this.currentSearchChar
      else this.searchItemValue = this.searchItemValue ? this.searchItemValue + char : char

      if (this.searchItemValue) {
        let searchIndex = this.getSelectedOptionIndex()
        let newOption = this.optionGroupLabel ? this.searchOptionInGroup(searchIndex) : this.searchOption(++searchIndex)
        if (newOption) {
          this.updateModel(event, this.getOptionValue(newOption))
        }
      }

      this.searchTimeout = setTimeout(() => {
        this.searchItemValue = null
      }, 250)
    },
    searchOption(index) {
      let option

      if (this.searchItemValue) {
        option = this.searchOptionInRange(index, this.visibleOptions.length)

        if (!option) {
          option = this.searchOptionInRange(0, index)
        }
      }

      return option
    },
    searchOptionInRange(start, end) {
      for (let i = start; i < end; i++) {
        let opt = this.visibleOptions[i]
        if (this.matchesSearchValue(opt)) {
          return opt
        }
      }

      return null
    },
    searchOptionInGroup(index) {
      let searchIndex = index === -1 ? {group: 0, option: -1} : index

      for (let i = searchIndex.group; i < this.visibleOptions.length; i++) {
        let groupOptions = this.getOptionGroupChildren(this.visibleOptions[i])
        for (let j = searchIndex.group === i ? searchIndex.option + 1 : 0; j < groupOptions.length; j++) {
          if (this.matchesSearchValue(groupOptions[j])) {
            return groupOptions[j]
          }
        }
      }

      for (let i = 0; i <= searchIndex.group; i++) {
        let groupOptions = this.getOptionGroupChildren(this.visibleOptions[i])
        for (let j = 0; j < (searchIndex.group === i ? searchIndex.option : groupOptions.length); j++) {
          if (this.matchesSearchValue(groupOptions[j])) {
            return groupOptions[j]
          }
        }
      }

      return null
    },
    matchesSearchValue(option) {
      let label = this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale)
      return label.startsWith(this.searchItemValue.toLocaleLowerCase(this.filterLocale))
    },
    onFilterChange(event) {
      this.filterValue = event.target.value
      this.$emit('filter', {originalEvent: event, value: event.target.value})
    },
    onFilterReset(event) {
      setTimeout(() => {
        this.filterValue = null
        this.$emit('filter', {originalEvent: event, value: null})
      }, 0)
    },
    onSearchChange(event) {
      if (this.async) {
        this.clearOptions()
        const query = event.target.value
        this.searchValue = query
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          this.loading = true
          this.$emit('asyncSearch', {
            originalEvent: event,
            query: query
          })
        }, 300)
      } else {
        this.searchValue = event.target.value
        this.$emit('search', {originalEvent: event, value: event.target.value})
      }
    },
    onFilterUpdated() {
      if (this.overlayVisible) {
        this.alignOverlay()
      }
    },
    overlayRef(el) {
      this.overlay = el
    },
    itemsWrapperRef(el) {
      this.itemsWrapper = el
    },
    virtualScrollerRef(el) {
      this.virtualScroller = el
    },
    scrollValueInView() {
      if (this.overlay) {
        let selectedItem = DomHandler.findSingle(this.overlay, 'li.y-dropdown-item--highlight')
        if (selectedItem) {
          selectedItem.scrollIntoView({block: 'nearest', inline: 'start'})
        }
      }
    },
    onOverlayClick(event) {
      OverlayEventBus.emit('overlay-click', {
        originalEvent: event,
        target: this.$el
      })
    },
    clearOptions() {
      this.overlayVisible = false
      this.localOptions = []
    }
  },
  computed: {
    visibleOptions() {
      if (this.filterValue) {
        if (this.optionGroupLabel) {
          let filteredGroups = []
          for (let optgroup of this.localOptions) {
            let filteredSubOptions = FilterService.filter(
              this.getOptionGroupChildren(optgroup),
              this.searchFields,
              this.filterValue,
              this.filterMatchMode,
              this.filterLocale
            )
            if (filteredSubOptions && filteredSubOptions.length) {
              let filteredGroup = {...optgroup}
              filteredGroup[this.optionGroupChildren] = filteredSubOptions
              filteredGroups.push(filteredGroup)
            }
          }
          return filteredGroups
        } else {
          return FilterService.filter(this.localOptions, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale)
        }
      } else if (this.searchValue && !this.async) {
        if (this.optionGroupLabel) {
          let filteredGroups = []
          for (let optgroup of this.localOptions) {
            let filteredSubOptions = FilterService.filter(
              this.getOptionGroupChildren(optgroup),
              this.searchFields,
              this.searchValue,
              this.filterMatchMode,
              this.filterLocale
            )
            if (filteredSubOptions && filteredSubOptions.length) {
              let filteredGroup = {...optgroup}
              filteredGroup[this.optionGroupChildren] = filteredSubOptions
              filteredGroups.push(filteredGroup)
            }
          }
          return filteredGroups
        } else {
          return FilterService.filter(this.localOptions, this.searchFields, this.searchValue, this.filterMatchMode, this.filterLocale)
        }
      } else {
        return this.localOptions
      }
    },
    containerClass() {
      return [
        'y-dropdown',
        {
          'y-dropdown--disabled': this.disabled,
          'y-dropdown--focus': this.focused || this.overlayVisible,
          'y-dropdown--clearable': (this.modelValue && this.searchValue) || this.loading,
          'y-dropdown--error': this.error,
          'y-dropdown--error-message': this.errorMessage,
          'y-dropdown--title': this.title,
          'y-dropdown--search': this.search,
          '--theme-grey': this.theme === 'grey',
          '--theme-white': this.theme === 'white',
          '--theme-green': this.theme === 'green',
          '--theme-orange': this.theme === 'orange',
          '--theme-red': this.theme === 'red'
        }
      ]
    },
    labelClass() {
      return [
        'y-dropdown-label',
        {
          'y-dropdown-placeholder': this.label === this.placeholder,
          'y-dropdown-label-empty': !this.$slots['value'] && (this.label === '' || this.label.length === 0)
        }
      ]
    },
    panelStyleClass() {
      return [
        'y-dropdown-panel',
        this.panelClass,
        {
          '--theme-grey': this.theme === 'grey',
          '--theme-white': this.theme === 'white',
          '--theme-green': this.theme === 'green',
          '--theme-orange': this.theme === 'orange',
          '--theme-red': this.theme === 'red',
        }
      ]
    },
    label() {
      if (this.modelValue) return this.getOptionLabel(this.modelValue)
      else return this.placeholder || ''
    },
    editableInputValue() {
      let selectedOption = this.getSelectedOption()
      if (selectedOption) return this.getOptionLabel(selectedOption)
      else return this.modelValue
    },
    equalityKey() {
      return this.optionValue ? null : this.dataKey
    },
    searchFields() {
      return this.filterFields || [this.optionLabel]
    },
    emptyFilterMessageText() {
      return this.emptyFilterMessage || this.$yaro.config.locale.emptyFilterMessage
    },
    emptySearchMessageText() {
      return this.emptySearchMessage || this.$yaro.config.locale.emptySearchMessage
    },
    emptyMessageText() {
      return this.emptyMessage || this.$yaro.config.locale.emptyMessage
    },
    appendDisabled() {
      return this.appendTo === 'self'
    },
    virtualScrollerDisabled() {
      return !this.virtualScrollerOptions
    },
    appendTarget() {
      return this.appendDisabled ? null : this.appendTo
    },
    dropdownIconClass() {
      return ['y-dropdown-trigger-icon', this.overlayVisible ? 'i-keyboard_arrow_up' : 'i-keyboard_arrow_down']
    }
  },
  components: {
    VirtualScroller: VirtualScroller
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
