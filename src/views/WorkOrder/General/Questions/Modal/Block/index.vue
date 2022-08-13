<template>
  <div class="block__wrapper">
    <div class="block__header">
      <div class="block__num">{{ idx + 1 }}</div>
      <div class="block__title">{{ group.title }}</div>
    </div>
    <div class="block__body">
      <div v-for="(block, idx) of group.blocks" :key="idx" class="block__elem" :class="{'-first': idx === 0, '-half': idx % 2}">
        <Input v-if="block.type === 'input'" :title="block.title" :placeholder="block.placeholder" />
        <div v-if="block.type === 'select'" class="block__select select">
          <div class="select__title">{{ block.title }}</div>
          <div class="select__btns">
            <Button v-for="(btn, idx) of block.list" :key="idx" :label="btn" class="select__btn" border />
          </div>
        </div>
        <!-- <Dropdown :modelValue="chosen" :options="roles" placeholder="Roles" optionLabel="title" @change="select" /> -->
        <Dropdown v-if="block.type === 'dropdown'" v-model="block.value" :options="block.list" :title="block.title" :placeholder="block.placeholder" />
      </div>
      <div class="block__elem -time">
        <!-- TODO: Field Number Component -->
        <div class="y-number__wrapper">
          <div class="y-number__title">Estimated Time</div>
          <div class="y-number__inner">
            <i class="i-remove y-number__dec" :class="{'-disabled': !time}" @click="dec()" />
            <span class="y-number__text">{{ time }} h</span>
            <i class="i-add y-number__inc" @click="inc()" />
          </div>
        </div>
        <!-- TODO: Field Number Component -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import Dropdown from '@/components/Yaro/Dropdown'

export default {
  name: 'QuestionsModalBlock',
  components: {Input, Button, Dropdown},
  props: {
    group: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      time: 0
    }
  },

  computed: {
    ...mapState({
      // card: s => s.company.card.card
    })
  },
  methods: {
    ...mapMutations({
      // setErrors: 'company/card/setErrors',
    }),
    // TODO: Field Number Component
    dec() {
      if (!this.time) return
      this.time -= 0.5
    },
    inc() {
      this.time += 0.5
    }
    // TODO: Field Number Component
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
