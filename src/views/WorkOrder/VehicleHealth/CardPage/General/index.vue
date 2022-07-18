<template>
  <div class="block__wrapper">
    <Parts v-if="activeService.id" />
    <template v-else>
      <div class="block__header">
        <div class="block__title">Canned Services</div>
        <button class="block__btn"><i class="i-add_circle" /><span>Create New Canned Service</span></button>
      </div>
      <div class="block__body">
        <div class="block__services">
          <div class="service__wrapper" @click.self="select">
            <div class="y-radio" />
            <span>Replace left</span>
            <Label label="3" border circle class="-grey -counter" />
            <Label label="1.4hr" icon="i-time" iconColor="#3EB3BB" iconSize="18px" border size="large" class="-grey" />
            <Label label="1.4hr" icon="i-time orange" iconSize="18px" border size="large" class="-grey" />
            <Label label="Used: 12 times" border size="large" class="-grey -counter" />
            <Label label="24 months /  3000 km" icon="i-shield green" iconSize="18px" border size="large" class="-grey" />
            <Menu>
              <template #menu>
                <Button icon="i-more_horiz" border size="small" />
              </template>
            </Menu>
          </div>
          <div class="service__wrapper" @click.self="select">
            <div class="y-radio" />
            <span>Replace left</span>
            <Label label="3" border circle class="-grey -counter" />
            <Label label="1.4hr" icon="i-time" iconColor="#3EB3BB" iconSize="18px" border size="large" class="-grey" />
            <Label label="1.4hr" icon="i-time orange" iconSize="18px" border size="large" class="-grey" />
            <Label label="Used: 12 times" border size="large" class="-grey -counter" />
            <Label label="24 months /  3000 km" icon="i-shield green" iconSize="18px" border size="large" class="-grey" />
            <Menu>
              <template #menu>
                <Button icon="i-more_horiz" border size="small" />
              </template>
            </Menu>
          </div>
          <div class="service__wrapper" @click.self="select">
            <div class="y-radio" />
            <span>Replace left</span>
            <Label label="3" border circle class="-grey -counter" />
            <Label label="1.4hr" icon="i-time" iconColor="#3EB3BB" iconSize="18px" border size="large" class="-grey" />
            <Label label="1.4hr" icon="i-time orange" iconSize="18px" border size="large" class="-grey" />
            <Label label="Used: 12 times" border size="large" class="-grey -counter" />
            <Label label="24 months /  3000 km" icon="i-shield green" iconSize="18px" border size="large" class="-grey" />
            <Menu>
              <template #menu>
                <Button icon="i-more_horiz" border size="small" />
              </template>
            </Menu>
          </div>
        </div>
        <div class="block__history history">
          <div class="history__title">Service History</div>
          <div class="history__block">
            <div class="history__header">
              <Label label="21 Dec 2021" class="-light" />
              <span>Front Brake Service</span>
              <Label label="Warranty Service" size="small" />
            </div>
            <div class="history__body">
              Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes and extend your brake warranty to 3
              years/60000km)
            </div>
          </div>
          <div class="history__block">
            <div class="history__header">
              <Label label="21 Dec 2021" class="-light" />
              <span>Front Brake Service</span>
              <Label label="Warranty Service" size="small" />
            </div>
            <div class="history__body">
              Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes and extend your brake warranty to 3
              years/60000km)
            </div>
          </div>
          <div class="history__block">
            <div class="history__header">
              <Label label="21 Dec 2021" class="-light" />
              <span>Front Brake Service</span>
              <Label label="Warranty Service" size="small" />
            </div>
            <div class="history__body">
              Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes and extend your brake warranty to 3
              years/60000km)
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'
import Menu from '@/components/Yaro/Menu'
import Parts from './Parts'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'CardPageGeneral',
  components: {Button, Label, Menu, Parts},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      activeService: s => s.company.cannedServices.activeService
    })
  },
  methods: {
    ...mapMutations({
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    select() {
      this.setActiveService({id: 1})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
