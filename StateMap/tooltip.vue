<template>
  <div class="tooltip-card">
    <p class="title">HAHAHAHAH</p>
  </div>
</template>
<script>
export default {
  props: {
    state: {
      type: Object,
      required: false,
      default: () => ({})
    },
    member: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  methods: {
    getPartyStyleObject (color) {
      return {
        color,
        'margin-right': '10px'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tooltip-card {
  position: absolute;
  height: 100px;
  width: 200px;
  left: 100px;
  top: 200px;
  z-index: 10;
  visibility: hidden;
  text-align: left;
  padding: 15px;
  line-height: 12px;
  background: #ffffff;
  border: 2.5px solid #000000;
  pointer-events: none;

  .title {
    color: red;
    font-size: 16px;
    margin-bottom: 15px;
  }
}
</style>
