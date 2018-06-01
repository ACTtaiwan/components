<template>
  <Button
    :class="{ enabled: selected }"
    :icon="icon"
    class="tab-button"
    type="ghost"
    shape="circle"
    @click="select">
    {{ label }}
  </Button>
</template>
<script>
export default {
  props: {
    selected: {
      type: Boolean,
      required: true,
      default: () => false
    },
    icon: {
      type: String,
      required: false,
      default: () => ''
    },
    label: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  data () {
    return {}
  },

  methods: {
    select () {
      this.$emit('select')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/colors';
@import 'assets/css/typography';

.tab-button {
  font-size: 0.9em;
  background: white;
  color: $twGrayLight;
  padding: 6px 12px;
  border: none;
  font-weight: $twSemiBold;

  &:hover {
    color: $twIndigo;
  }
}

.enabled {
  color: $twIndigo;
}
</style>
