<template>
  <div class="block__wrapper">
    <div class="warranty__wrapper">
      <div class="warranty__header">Lights</div>
      <div class="warranty__body">
        Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes and extend your brake warranty to 3
        years/60000km)
      </div>
      <div class="warranty__progress red"><span style="width: 90%" /></div>
      <div class="warranty__time">
        <Label icon="i-shutter_speed" iconColor="#3EB3BB" :label="`24 Months`" border class="-shadow" />
        <Label icon="i-timer" iconColor="#3EB3BB" :label="`40 000 KM`" border class="-shadow" />
      </div>
    </div>
    <div class="warranty__wrapper">
      <div class="warranty__header">Front Brake Service</div>
      <div class="warranty__body">
        Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes and extend your brake warranty to 3
        years/60000km)
      </div>
      <div class="warranty__progress green"><span style="width: 40%" /></div>
      <div class="warranty__time">
        <Label icon="i-shutter_speed" iconColor="#3EB3BB" :label="`24 Months`" border class="-shadow" />
        <Label icon="i-timer" iconColor="#3EB3BB" :label="`40 000 KM`" border class="-shadow" />
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'

export default {
  name: 'CardPageService',
  components: {Label},

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
