<template>
  <div class="guide__wrapper">
    <div class="guide__header">
      <i class="i-arrow_circle_left" @click="$emit('changeSection', 'Guides')" />
      <div class="guide__title" @click="$emit('changeSection', 'Guides')">Back to all</div>
    </div>
    <div class="guide__inner">
      <!-- :modules="modules"  -->
      <QuillEditor v-model:content="content" :options="options" :contentType="'html'" />
    </div>
    <div class="guide__footer">
      <Button label="Save" @click="save" />
      <Button label="Cancel" border @click="cancel" />
    </div>
  </div>
</template>

<script>
import {QuillEditor} from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import {mapState, mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'

export default {
  name: 'CardPageGeneralNewGuide',
  components: {Button, QuillEditor},
  emits: ['changeSection'],
  props: {},
  data() {
    return {
      content: '',
      options: {
        placeholder: 'Enter service guide title',
        modules: {
          toolbar: [{size: ['small', false, 'large', 'huge']}, 'bold', 'italic', 'underline', {list: 'bullet'}, 'link', 'image']
        }
      },
      modules: {
        name: 'blotFormatter',
        module: BlotFormatter,
        options: {
          /* options */
        }
      }
    }
  },
  created() {
    if (this.guide) {
      this.content = this.guide.text
    }
  },
  computed: {
    ...mapState({
      guide: s => s.company.guides.guide
    })
  },
  methods: {
    ...mapMutations({
      set: 'company/guides/setGuide',
      update: 'company/guides/update'
    }),
    save() {
      const guide = {...this.guide}
      guide.text = this.content
      this.update(guide)
      this.set({})
      this.$emit('changeSection', 'Guides')
    },
    cancel() {
      this.set({})
      this.$emit('changeSection', 'Guides')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
