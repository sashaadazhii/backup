<template>
  <div class="wrap">
    <Popup v-model:visible="display" :targetElement="$refs.btn"  />
    <button @click="open" ref="btn">Open</button>
  </div>
</template>

<script>
import Popup from '@/views/WorkOrders/Calendar/Popup'
export default {
  name: 'test',
  components: {Popup},
  data() {
    return {
      display: false,
      visible: false
    }
  },
  methods: {
    open() {
      this.display = !this.display
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 300px;
}

// @import '~primevue/resources/themes/lara-light-indigo/theme.css';
// @import '~primevue/resources/primevue.min.css';
// @import '~primeicons/primeicons.css';
</style>
