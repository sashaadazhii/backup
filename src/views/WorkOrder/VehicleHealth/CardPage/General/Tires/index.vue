<template>
  <div class="block__wrapper">
    <div class="block__title">Tires</div>
    <div class="block__grid"><Tire v-for="tire in tires" :key="tire.id" :tire="tire" /></div>
  </div>
</template>

<script>
import Tire from './Tire'

export default {
  name: 'TiresComponent',
  components: {Tire},
  data() {
    return {
      tires: [
        {id: 't001', name: 'tire 1', brand: null, size: null, condition: null},
        {id: 't002', name: 'tire 2', brand: null, size: null, condition: null},
        {id: 't003', name: 'tire 3', brand: null, size: null, condition: null},
        {id: 't004', name: 'tire 4', brand: null, size: null, condition: null}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
