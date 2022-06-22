<template>
  <div class="accordion__wrapper">
    <div class="accordion__header" :class="{disabled: !task.jobs.length}" @click="toggle">
      <i class="ri-arrow-down-s-line"></i>
      <div class="accordion__status" :style="{'border-color': task.color}">
        <div class="accordion__status-top"></div>
        <div class="accordion__status-bottom" :style="{'background-color': task.color}"></div>
      </div>
      <div class="accordion__header-title">{{ task.title }}</div>
      <div class="accordion__header-number" :style="{'background-color': task.color}">
        {{ task.jobs.length }}
      </div>
    </div>
    <div v-if="show" class="accordion__body">
      <div v-for="job of task.jobs" :key="job.id" class="accordion__body-item">
        <div class="accordion__body-title">{{ job.title }}</div>
        <div class="accordion__body-text">{{ job.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionCalendar',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggle() {
      if (this.task.jobs.length) this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
