<template>
  <Button
    v-if="type === 'icon'"
    :class="buttonClass"
    :icon="icon"
    shape="circle"
    @click="press"/>
  <Button
    v-else
    :icon="icon"
    :loading="loading"
    :style="{
      'font-size': fontSize,
      'width': width,
      'height': height,
      'line-height': lineHeight,
    }"
    :class="buttonClass"
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
    color: {
      type: String,
      default: () => ''
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    fontSize: {
      type: String,
      default: '.9em'
    },
    lineHeight: {
      type: String,
      default: undefined
    },
    width: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {}
  },
  computed: {
    buttonClass () {
      let classes = []

      if (this.type === 'icon') {
        classes.push('iconButton')
      } else {
        classes.push('defualtButton')

        // btn color
        switch (this.color) {
          case 'gray-light':
            classes.push('gray-light')
            break

          case 'gray':
            classes.push('gray')
            break

          default:
            classes.push('indego')
            break
        }
      }

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
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.defualtButton {
  font-size: 0.9em;
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

.indego {
  @include button-color($twIndigo, $twWhite);
}

.gray-light {
  @include button-color($twGrayLightest, $twGray);
}

.gray {
  @include button-color($twGray, $twWhite);
}
</style>
