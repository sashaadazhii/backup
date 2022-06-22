<template>
  <div class="doc">
    <div class="doc__subtitle">{{ subtitle }}</div>

    <div class="doc__view">
      <slot name="elements"> </slot>
    </div>
    <div class="doc__desc">
      <div class="doc__text" @click="isVisible = !isVisible">
        <span>View code</span><span class="code__arrow"> &lt;</span><span class="code__arrow"> /&gt;</span>
      </div>
      <Transition name="fade" mode="out-in">
        <slot v-if="isVisible" name="code"> </slot>
      </Transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Doc',
  components: {},
  props: {
    subtitle: {type: String, default: ''}
  },
  data() {
    return {
      isLoading: false,
      isVisible: false
    }
  },
  created() {
    this.isLoading = true
  },
  methods: {
    copy(text) {
      navigator.clipboard.writeText(text)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
@keyframes show {
  0% {
    opacity: 0;
    height: 0%;
    transform: translateY(-10px);
  }
  50% {
    opacity: 0.7;
    height: 75%;
    transform: translateY(-3px);
  }
  100% {
    opacity: 1;
    height: 100%;
    transform: translateY(0);
  }
}
@keyframes hide {
  0% {
    opacity: 1;
    height: 100%;
  }
  50% {
    opacity: 0.5;
    height: 50%;
  }
  100% {
    opacity: 0;
    height: 0%;
  }
}

.fade-enter-active {
  animation: show 0.2s;
  transform-origin: top;
}

.fade-leave-to {
  animation: hide 0.2s;
}
</style>
