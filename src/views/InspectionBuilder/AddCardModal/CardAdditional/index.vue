<template>
  <div class="main__wrapper">
    <ServiceTracker />
    <Options />
  </div>
</template>

<script>
import ServiceTracker from './ServiceTracker'
import Options from './Options'

export default {
  name: 'CardAdditional',
  components: {ServiceTracker, Options}
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
