<template>
  <div class="card">
    <div class="card__title">{{ tire.name }}</div>
    <div class="card__row">
      <Dropdown v-model="brand" :options="tiresBrands" placeholder="Brand" />
      <Dropdown v-model="size" :options="tiresSizes" placeholder="Size" />
    </div>
    <div class="card__row card__row--full">
      <Dropdown v-model="condition" :options="tiresContidions" placeholder="Thread depth" />
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
export default {
  name: 'TireComponent',
  components: {Dropdown},

  props: {
    tire: {
      type: Object
    }
  },
  data() {
    return {
      brand: null,
      size: null,
      condition: null,
      tiresBrands: [
        'Michelin',
        'Bridgestone',
        'Continental',
        'Goodyear',
        'Sumitomo',
        'Hankook',
        'Pirelli',
        'Yokohama',
        'ZC Rubber',
        'Maxxis',
        'Toyo',
        'Linglong',
        'Apollo',
        'Sailun',
        'MRF',
        'Kumho',
        'Nokian',
        'Nexen',
        'Double Coin',
        'JK',
        'Triangle',
        'CEAT',
        'Kenda',
        'Trelleborg',
        'Guizhou Tyre',
        'Prinx Chengshan',
        'Aeolus',
        'Giti',
        'Cooper',
        'Titan'
      ],
      tiresSizes: [8, 10, 12, 13, 14, 15, 17, 18, 19, 20, 22, 23, 24, 26, 28],
      tiresContidions: ['10/32', '9/32', '8/32', '7/32', '6/32', '5/32', '4/32', '3/32', '2/32', '1/32']
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
