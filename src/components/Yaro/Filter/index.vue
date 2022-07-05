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
    <div class="y-filter-button" :class="{medium: size === 'medium'}">
      <i class="i-filter_list" />
      <span class="y-filter-button-text">Filter</span>
      <span v-if="modelValue && modelValue.length" class="y-filter-button-indicator">{{ modelValue.length }}</span>
    </div>
    <Teleport :to="appendTarget" :disabled="appendDisabled">
      <transition @enter="onOverlayEnter" @after-enter="onOverlayAfterEnter" @leave="onOverlayLeave" @after-leave="onOverlayAfterLeave">
        <div :ref="overlayRef" :class="panelStyleClass" v-if="overlayVisible" @click="onOverlayClick">
          <slot name="header" :value="modelValue" :options="visibleOptions"></slot>
          <div v-if="activeOption.mods && activeOption.mods.some(m => m === 'filter')" class="y-filter-header">
            <label class="y-filter-sort-label" :class="{'y-filter-sort--active': filterActive}">
              <i class="i-search1 y-filter-sort-search" />
              <input
                type="text"
                ref="filterInput"
                :value="filterValue"
                @vnode-updated="onFilterUpdated"
                autoComplete="off"
                class="y-filter-sort-input"
                :placeholder="filterPlaceholder || activeOption.filterPlaceholder"
                @keydown="onFilterKeyDown"
                @input="onFilterChange"
                @focus="filterActive = true"
                @blur="filterActive = false"
              />
              <i class="i-close y-filter-sort-close" v-if="filterValue" @click="onFilterReset" />
            </label>
          </div>
          <div :ref="itemsWrapperRef" class="y-filter-items-wrapper" :style="{'max-height': virtualScrollerDisabled ? scrollHeight : ''}">
            <VirtualScroller
              :ref="virtualScrollerRef"
              v-bind="virtualScrollerOptions"
              :items="visibleOptions"
              :style="{height: scrollHeight}"
              :disabled="virtualScrollerDisabled"
            >
              <template v-slot:content="{styleClass, contentRef, items, getItemOptions, contentStyle}">
                <ul :ref="contentRef" :class="['y-filter-items', styleClass]" :style="contentStyle" role="listbox">
                  <template v-if="!listSelected">
                    <li
                      v-for="(option, i) of items"
                      :class="[
                        'y-filter-item',
                        {
                          'y-filter-item--highlight': isSelected(option),
                          'y-filter-item--disabled': isOptionDisabled(option)
                        }
                      ]"
                      role="option"
                      :aria-selected="isSelected(option)"
                      :key="getOptionRenderKey(option)"
                      @click="onOptionListSelect($event, option)"
                      @keydown="onOptionKeyDown($event, option)"
                      :tabindex="tabindex || '0'"
                      :aria-label="getOptionLabel(option)"
                    >
                      <slot name="optionlist" :option="option" :index="getOptionIndex(i, getItemOptions)">
                        <span>{{ getOptionLabel(option) }}</span>
                      </slot>
                    </li>
                  </template>
                  <template v-else-if="!optionGroupLabel">
                    <li
                      v-for="(option, i) of items"
                      :class="[
                        'y-filter-item',
                        {
                          'y-filter-item--highlight': isSelected(option),
                          'y-filter-item--disabled': isOptionDisabled(option)
                        }
                      ]"
                      role="option"
                      :aria-selected="isSelected(option)"
                      :key="getOptionRenderKey(option)"
                      @click="onOptionSelect($event, option)"
                      @keydown="onOptionKeyDown($event, option)"
                      :tabindex="tabindex || '0'"
                      :aria-label="getOptionLabel(option)"
                    >
                      <div v-if="activeOption.mods && activeOption.mods.some(m => m === 'multiple')" class="y-filter-checkbox">
                        <i v-if="isSelected(option)" class="i-check_box" />
                        <i v-else class="i-check_box_outline_blank" />
                      </div>
                      <slot name="option" :option="option" :index="getOptionIndex(i, getItemOptions)">
                        <span>{{ getOptionLabel(option) }}</span>
                      </slot>
                    </li>
                  </template>
                  <template v-else>
                    <template v-for="(optionGroup, i) of items" :key="getOptionGroupRenderKey(optionGroup)">
                      <li class="y-filter-item-group">
                        <slot name="optiongroup" :option="optionGroup" :index="getOptionIndex(i, getItemOptions)">
                          {{ getOptionGroupLabel(optionGroup) }}
                        </slot>
                      </li>
                      <li
                        v-for="(option, i) of getOptionGroupChildren(optionGroup)"
                        :class="[
                          'y-filter-item',
                          {
                            'y-filter-item--highlight': isSelected(option),
                            'y-filter-item--disabled': isOptionDisabled(option)
                          }
                        ]"
                        role="option"
                        :aria-selected="isSelected(option)"
                        :key="getOptionRenderKey(option)"
                        @click="onOptionSelect($event, option)"
                        @keydown="onOptionKeyDown($event, option)"
                        :tabindex="tabindex || '0'"
                        :aria-label="getOptionLabel(option)"
                      >
                        <div v-if="activeOption.mods && activeOption.mods.some(m => m === 'multiple')" class="y-filter-checkbox">
                          <i v-if="isSelected(option)" class="i-check_box" />
                          <i v-else class="i-check_box_outline_blank" />
                        </div>
                        <slot name="option" :option="option" :index="getOptionIndex(i, getItemOptions)">
                          <span>{{ getOptionLabel(option) }}</span>
                        </slot>
                      </li>
                    </template>
                  </template>

                  <li v-if="filterValue && (!items || (items && items.length === 0))" class="y-filter-empty-message">
                    <slot name="emptyfilter">{{ emptyFilterMessageText }}</slot>
                  </li>
                  <li v-else-if="!options || (options && options.length === 0)" class="y-filter-empty-message">
                    <slot name="empty">{{ emptyMessageText }}</slot>
                  </li>
                </ul>
              </template>
              <template v-slot:loader="{options}" v-if="$slots.loader">
                <slot name="loader" :options="options"></slot>
              </template>
            </VirtualScroller>
          </div>
          <slot name="footer" :value="modelValue" :options="visibleOptions"></slot>
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
  name: 'Filter',
  emits: ['update:modelValue', 'before-show', 'before-hide', 'show', 'hide', 'change', 'filter', 'search', 'focus', 'blur'],
  props: {
    modelValue: null,
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
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
    showClear: Boolean,
    inputId: String,
    tabindex: String,
    ariaLabelledBy: null,
    size: String,
    appendTo: {
      type: String,
      default: 'body'
    },
    emptyFilterMessage: {
      type: String,
      default: null
    },
    emptyMessage: {
      type: String,
      default: null
    },
    panelClass: null,
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: 'pi pi-spinner pi-spin'
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    openPosition: {
      type: String,
      default: 'right'
    },
    optionListLabel: null,
    optionListChildren: null
  },
  data() {
    return {
      focused: false,
      filterValue: null,
      overlayVisible: false,
      searchValue: null,
      localValue: null,
      listSelected: false,
      localOptions: [],
      activeOption: {},
      optionGroupLabel: null,
      optionGroupChildren: null,
      filterActive: false
    }
  },
  created() {
    this.localOptions = this.options
  },
  watch: {
    localValue() {
      this.isModelValueChanged = true
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  searchTimeout: null,
  currentSearchChar: null,
  previousSearchChar: null,
  searchItemValue: null,
  overlay: null,
  itemsWrapper: null,
  virtualScroller: null,
  isModelValueChanged: false,
  updated() {
    if (this.overlayVisible && this.isModelValueChanged) {
      this.scrollValueInView()
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
      if (this.modelValue) {
        let optionValue = this.getOptionValue(option)
        let key = this.equalityKey
        return this.modelValue.some(val => {
          return ObjectUtils.equals(val, optionValue, key)
        })
      }

      return false
    },
    show() {
      this.$emit('before-show')
      this.overlayVisible = true
    },
    hide() {
      this.reset()
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
      this.updateModel(event, null)
    },
    onClick(event) {
      if (this.disabled || this.loading) {
        return
      }
      if (!this.overlay || !this.overlay.contains(event.target)) {
        if (this.overlayVisible) this.hide()
        else this.show()
        this.$refs.focusInput.focus()
      }
    },
    onOptionSelect(event, option) {
      if (this.disabled || this.isOptionDisabled(option)) {
        return
      }
      const selected = this.isSelected(option)
      let value = null
      if (this.activeOption.mods && this.activeOption.mods.some(m => m === 'multiple')) {
        if (selected) value = this.modelValue.filter(val => !ObjectUtils.equals(val, this.getOptionValue(option), this.equalityKey))
        else value = [{...this.getOptionValue(option), type: this.activeOption[this.optionListLabel]}, ...(this.modelValue || [])]
        setTimeout(() => {
          this.updateModel(event, value)
        }, 0)
      } else {
        if (selected) {
          value = this.modelValue.filter(val => !ObjectUtils.equals(val, this.getOptionValue(option), this.equalityKey))
        } else {
          if (this.modelValue) {
            value = [
              {...this.getOptionValue(option), type: this.activeOption[this.optionListLabel]},
              ...this.modelValue.filter(val => val.type !== this.activeOption[this.optionListLabel])
            ]
          } else {
            value = [{...this.getOptionValue(option), type: this.activeOption[this.optionListLabel]}, ...(this.modelValue || [])]
          }
        }
        this.updateModel(event, value)
        this.$refs.focusInput.focus()
        this.hide()
      }
    },
    onOptionListSelect(event, option) {
      if (this.disabled || this.isOptionDisabled(option)) {
        return
      }
      setTimeout(() => {
        this.localOptions = option[this.optionListChildren]
        this.listSelected = true
        this.activeOption = option
        this.optionGroupLabel = this.activeOption.optionGroupLabel
        this.optionGroupChildren = this.activeOption.optionGroupChildren
      }, 0)
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
      if (event.target.value) this.filterValue = event.target.value
      else this.filterValue = ''
      this.$emit('filter', {originalEvent: event, value: event.target.value ? event.target.value : ''})
    },
    onFilterReset(event) {
      setTimeout(() => {
        this.filterValue = null
        this.$emit('filter', {originalEvent: event, value: null})
      }, 0)
    },
    onSearchChange(event) {
      this.searchValue = event.target.value
      this.$emit('search', {originalEvent: event, value: event.target.value})
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
        let selectedItem = DomHandler.findSingle(this.overlay, 'li.p-highlight')
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
    reset() {
      this.localOptions = this.options
      this.listSelected = false
      this.activeOption = {}
      this.filterValue = null
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
              filteredGroups.push({...optgroup, ...{items: filteredSubOptions}})
            }
          }
          return filteredGroups
        } else {
          return FilterService.filter(this.localOptions, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale)
        }
      } else {
        return this.localOptions
      }
    },
    containerClass() {
      return [
        'y-filter',
        {
          'y-filter--disabled': this.disabled,
          'y-filter--focus': this.focused || this.overlayVisible,
          'y-filter--filled': this.modelValue && this.modelValue.length
        }
      ]
    },
    panelStyleClass() {
      return ['y-filter-panel', this.panelClass]
    },
    label() {
      return false
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
      return ['p-dropdown-trigger-icon', this.loading ? this.loadingIcon : 'pi pi-chevron-down']
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
