<template>
  <Modal :width="760" v-model="showModal" :footerHide="true" :fullscreen="isPhone ? true : false">
    <div v-if="show" >
      <DonorboxContent />
    </div>
  </Modal>
</template>

<script>
// components
import DonorboxContent from '~/components/DonorboxContent'

export default {
  components: {
    DonorboxContent
  },
  props: {
    show: {
      type: Boolean,
      default: false
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