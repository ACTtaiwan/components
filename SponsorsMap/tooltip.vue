<template>
  <div id="tooltip">
    <p
      slot="title"
      class="title">
      {{ title }}
    </p>
    <p
      v-for="sponsor in sponsors"
      :key="sponsor.id"
      class="sponsor">
      <Icon
        :style="getPartyStyleObject(sponsor.color)"
        type="ios-circle-filled"/>
      <span class="name">{{ sponsor.name }}</span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: () => ({})
    },
    sponsors: {
      type: Array,
      required: false,
      default: () => []
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
#tooltip {
  position: absolute;
  z-index: 10;
  visibility: hidden;
  text-align: left;
  padding: 15px;
  line-height: 12px;
  background: rgba(0, 0, 0, 0.8);
  border: 0px;
  border-radius: 3px;
  pointer-events: none;
}

.title {
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
}

.sponsor {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0px;
  }

  .name {
    color: white;
    font-size: 14px;
  }
}
</style>
