<template>
  <div class="doc__api">
    <div class="doc__row">
      <div class="link">
        <code class="code">
          <div class="code__import">
            <span class="code__purple">import</span> <span class="code__blue">{{ name }}</span> {{ `from @/components/Yaro/${name}` }}
          </div>
        </code>
        <button class="link__icon" @click="copy(`import ${name} from '@/components/Yaro/${name}'`)"><i class="i-content_copy"></i></button>
      </div>

      <div class="doc__buttons">
        <div class="doc__text" :class="{active: showProps}" @click="toggleProps">Props {...}</div>
        <div v-if="api.apiEmits.length" class="doc__text" :class="{active: showEmits}" @click="toggleEmits">$Emits</div>
      </div>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="showProps" class="doc__info">
        <div class="doc__table">
          <div class="doc__table-header">
            <div class="doc__table-row">
              <div class="doc__table-col">Name</div>
              <div class="doc__table-col">Type</div>
              <div class="doc__table-col">Default</div>
            </div>
          </div>
          <div class="doc__table-body">
            <div v-for="a in api.apiProps" :key="a.name" class="doc__table-row">
              <div class="doc__table-col">{{ a.name }}</div>
              <div class="doc__table-col">{{ a.type }}</div>
              <div class="doc__table-col">{{ a.default }}</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade" mode="out-in">
      <div v-if="showEmits" class="doc__info">
        <code class="doc__code doc__code--orange">{{ api.apiEmits }}</code>
      </div>
    </Transition>
  </div>
</template>
<script>
export default {
  name: 'APIComponent',
  props: {
    api: {type: Object},
    name: {type: String}
  },
  data() {
    return {
      showEmits: false,
      showProps: false
    }
  },
  methods: {
    toggleEmits() {
      if (this.showProps) this.showProps = !this.showProps
      this.showEmits = !this.showEmits
    },
    toggleProps() {
      if (this.showEmits) this.showEmits = !this.showEmits
      this.showProps = !this.showProps
    },
    async copy(text) {
      // API async
      await navigator.clipboard.writeText(text)
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
