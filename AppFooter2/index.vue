<template>
  <footer :class="{ phone: isPhone}">
    <div class="content">
      <img :src="waves" class="bg-img-l"></img>
      <img :src="waves" class="bg-img-r"></img>
      <div class="content-wrapper">
        <div class="column">
          <div class="column-title">Congressional</div>
          <router-link :to="`/bills`" class="column-item">Bills</router-link>
          <router-link :to="`/members`" class="column-item">Members</router-link>
          <router-link :to="`/insights`" class="column-item">Insights</router-link>
        </div>
        <div class="column">
          <div class="column-title">Contact</div>
          <router-link :to="`/about`" class="column-item">About us</router-link>
          <div class="column-item">Subscribe</div>
          <router-link :to="`/articles`" class="column-item">Articles</router-link>
          <a :href="DonorboxHelper.donateUrl" class="column-item custom-dbox-popup">Donate</a>
        </div>
        <div class="column">
          <div class="column-title">Social</div>
          <a class="column-item" target="_blank" href="http://www.facebook.com/AmericanCitizensforTaiwan">Facebook</a>
          <a class="column-item" target="_blank" href="http://twitter.com/actTaiwan">Twitter</a>
          <a class="column-item" target="_blank" href="https://medium.com/american-citizens-for-taiwan">Medium</a>
          <a class="column-item" href="mailto:feedback@acttaiwan.org">Email</a>
        </div>
      </div>
    </div>  

    <span class="copyright">{{ copyright }}</span>
    <a
      class="powerBy"
      target="_blank"
      href="https://grants.g0v.tw/power/"
      alt="power by g0v"
      data-reactid="76">
      <img
        v-if="showPoweredby"
        src="https://s3.amazonaws.com/taiwanwatch-static/assets/poweredby-g0v-long.png"
        alt="g0v"
        data-reactid="77">
    </a>
  </footer>
</template>

<script>
import { DonorboxHelper } from '@/plugins/utils'
import waves from '~/assets/img/wave-white.svg'

export default {
  props: {
    copyright: {
      type: String,
      default: 'Copyright © TaiwanWatch.org 2018'
    },
    showPoweredby: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      waves,
      DonorboxHelper
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
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
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

footer {
  .copyright {
    margin-bottom: 3px;

    height: $appFooterHeight;
    color: $twWhite;
    background: $twGray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    // border-top: 1px solid $twGrayLight;
  }

  .powerBy {
    display: flex;
    align-items: center;
    margin-left: 14px;

    img {
      width: 160px;
    }
  }

  &.phone {
    height: $appFooterHeightPhone;
    flex-direction: column;

    .powerBy {
      margin-left: 0px;
    }
  }

  .content {
    background-color: $twGray;
    font-size: 1.1em;
    position: relative;
    overflow: hidden;

    .bg-img-l,
    .bg-img-r {
      pointer-events: none;
      position: absolute;
    }

    .bg-img-l {
      left: -1000px;
    }

    .bg-img-r {
      padding-left: 55%;
    }

    .content-wrapper {
      @extend .pageWrapper-large;
      background-size: cover;
      text-align: center;
      height: 100%;
      padding: 46px 64px;
      display: flex;

      .column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        & + .column {
          margin-left: 40px;
        }

        .column-title {
          font-weight: $twBold;
          color: $twGrayLight;
          margin-bottom: 10px;
        }

        .column-item {
          color: $twWhite;

          &:hover {
            color: $twBlueLighter;
          }

          & + .column-item {
            margin-top: 5px;
          }
        }
      }
    }    
  }
}

@media screen and (max-width: 1500px) {
  .bg-img-l {
    display: none;
  }
}

// tablet
@media screen and (max-width: $mediumDeviceWidth - 1) {
  .bg-img-r {
    display: none;
  }

  .content-wrapper {
    justify-content: space-around;
  }
}

</style>
