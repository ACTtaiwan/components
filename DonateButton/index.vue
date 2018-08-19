<template>
  <a :href="DonorboxHelper.donateUrl" class="custom-dbox-popup">
    <Button
      :style="{ 'font-size': fontSize }"
      icon="md-heart"
      class="button"
      shape="circle">
      {{ $t('DonateButton.buttonTitle') }}
    </Button>
  </a>
</template>

<script>
import { DonorboxHelper } from '@/plugins/utils'

export default {
  props: {
    fontSize: {
      type: String,
      default: '.9em'
    }
  },
  data () {
    return {
      label: 'Donate',
      DonorboxHelper
    }
  },
  mounted () {
    if (!window.DonorBox) {
      window.DonorBox = { widgetLinkClassName: 'custom-dbox-popup' }
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://donorbox.org/install-popup-button.js'
      script.defer = true
      window.document.head.appendChild(script)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.button {
  @include button-color($twIndigo, $twWhite);
  padding: 6px 12px;
  border: none;
  font-weight: $twSemiBold;
  width: 100%;
  height: 100%;
}
</style>
