<template>
  <Modal :width="760" v-model="showModal" :footerHide="true" :fullscreen="isPhone ? true : false">
    <div v-if="show">
      <Donation :config="config"/>
    </div>
  </Modal>
</template>

<script>
// components
import Donation from '~/components/Donation'

export default {
  components: {
    Donation
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    config: {
      type: String,
      required: false,
      default: 'act'
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    showModal: {
      get () {
        return this.show
      },
      set (val) {
        !val && this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>