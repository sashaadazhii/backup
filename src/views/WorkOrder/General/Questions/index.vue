<template>
  <div class="block__wrapper">
    <div class="block__title">Questions</div>
    <div class="block__row">
      <div class="block__row-inner">
        <div class="block__cell">5 questions</div>
        <Switch v-model="question" />
      </div>
      <div v-if="question" class="section">
        <div class="section__inner">
          <div class="section__row">
            <div class="section__title">Vibrations</div>
            <div class="section__text -icon"><i class="i-time" /> 1hr</div>
          </div>
          <div class="section__row">
            <div class="section__title">Speed:</div>
            <div class="section__text">50km/h</div>
          </div>
          <div class="section__row">
            <div class="section__title">Breaking:</div>
            <div class="section__text -red">Yes</div>
          </div>
          <div class="section__row">
            <div class="section__title">Constant:</div>
            <div class="section__text">No</div>
          </div>
        </div>
        <button v-ripple class="section__btn">
          <i class="i-edit" />
          <span>Edit Info</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Switch from '@/components/Yaro/Switch'
import Ripple from '@/components/Yaro/ripple'

export default {
  name: 'WorkOrderGeneralQuestions',
  components: {Switch},
  data() {
    return {
      question: false
    }
  },
  directives: {
    ripple: Ripple
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
