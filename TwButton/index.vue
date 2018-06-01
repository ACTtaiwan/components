<template>
  <Button
    v-if="type === 'icon'"
    :icon="icon"
    class="iconButton"
    shape="circle"
    @click="press"/>
  <Button
    v-else
    :icon="icon"
    :loading="loading"
    class="button"
    shape="circle"
    @click="press">
    {{ label }}
  </Button>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => ''
    },
    label: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: () => ''
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {}
  },
  computed: {
    buttonClass () {
      let classes = []
      if (this.type) {
        classes.push(`${this.type}-type`)
      }
      console.log(this.label)
      return classes
    }
  },
  methods: {
    press () {
      this.$emit('press')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/colors';
@import 'assets/css/typography';

.button {
  font-size: 0.9em;
  background: $twIndigo;
  color: $twWhite;
  padding: 6px 12px;
  border: none;
  font-weight: $twSemiBold;
}

.iconButton {
  border: none;
  color: $twGrayLight;
  background: $twGrayLighter;
  font-size: 1em;
  width: 30px;
  height: 30px;

  &:hover {
    color: $twGray;
    background: $twGrayLighter;
  }
}
</style>
