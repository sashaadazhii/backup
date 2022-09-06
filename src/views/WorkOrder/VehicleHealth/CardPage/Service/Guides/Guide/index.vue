<template>
  <div class="guide__wrapper" @click="open">
    <i class="i-build guide__icon" />
    <div class="guide__body">
      <div class="guide__name">How to fix it in 3 mins or less.</div>
      <div class="guide__desc">by Maynard Bauman (Expert Senior Tech) at 22 Sep 2019s</div>
    </div>
    <Label label="Tips & Tricks" class="-grey" size="small" />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import {mapMutations} from 'vuex'

export default {
  name: 'CardPageGeneralGuide',
  components: {Label},
  emits: ['openGuide'],

  props: {
    guide: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      set: 'company/guides/setGuide'
    }),
    open() {
      this.set(this.guide)
      this.$emit('openGuide')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
