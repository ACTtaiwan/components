<template>
  <nuxt-link
    :to="`/`"
    class="logo">
    <img
      :src="logo"
      class="logo-img"
      alt="logo" >
    <span class="logo-text">{{ this.$t('site.logoTitle') }}</span>
  </nuxt-link>
</template>

<script>
import logo from '~/assets/img/tw-logo-color.png'

export default {
  data () {
    return {
      logo
    }
  },
  methods: {}
}
</script>>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.logo {
  width: 300px;
  height: 40px;
  position: relative;
  top: 10px;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 36px;
  display: block;
}

.logo-text {
  color: $twBlack;
  margin-left: 10px;
  font-weight: $twSemiBold;
  letter-spacing: 1px;
  max-height: 40px;
  line-height: 1em;
}

@media screen and (max-width: #{$largeDeviceWidth}) {
  .logo {
    margin-right: auto;
  }
}
</style>
