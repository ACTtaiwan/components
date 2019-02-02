<template>
  <footer>
    <!-- Background Images -->
    <img :src="waves" class="bg-img-l">
    <img :src="waves" class="bg-img-r">
    <!-- Header -->
    <section class="footer-header">
      <div class="footer-header-wrapper">
        <div class="logo">
          <img :src="logoWhite" :alt="powerByImgAlt">
        </div>
        <div
          class="fb-like"
          data-href="https://www.facebook.com/ustaiwanwatch"
          data-layout="button_count"
          data-action="like"
          data-size="small"
          data-show-faces="true"
          data-share="false"
        />
        <a class="add-line-friend" href="https://line.me/R/ti/p/%40pfw3848l">
          <img height="22" border="0" alt="加入好友" src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png">
        </a>
      </div>
    </section>
    <!-- Body -->
    <section class="footer-body">
      <div class="footer-body-wrapper">
        <div class="column">
          <div class="column-title">美國國會</div>
          <router-link :to="`/bills`" class="column-item">法案</router-link>
          <router-link :to="`/members`" class="column-item">議員</router-link>
          <router-link :to="`/articles`" class="column-item">觀測文章</router-link>
          <router-link :to="`/insights`" class="column-item">洞察資料</router-link>
        </div>
        <div class="column">
          <div class="column-title">觀測站</div>
          <router-link :to="`/about`" class="column-item">關於我們</router-link>
          <a class="column-item" href="mailto:feedback@acttaiwan.org">聯絡我們</a>
          <div class="column-item" @click="showSubscription = true">訂閱最新消息</div>
          <div class="column-item" @click="showDonorbox = true">抖內✨</div>
        </div>
        <div class="column">
          <div class="column-title">成為粉絲</div>
          <a class="column-item" target="_blank" href="http://www.facebook.com/AmericanCitizensforTaiwan">Facebook</a>
          <a class="column-item" target="_blank" href="http://twitter.com/actTaiwan">Twitter</a>
          <a class="column-item" target="_blank" href="https://medium.com/american-citizens-for-taiwan">Medium</a>
        </div>
      </div>
    </section>
    <!-- Copyright -->
    <section class="footer-copyright">
      <p>{{ copyright }}</p>
      <a v-if="showPoweredby" :href="powerByTarget" :alt="powerByTargetAlt" class="powerBy" target="_blank">
        <img :src="powerByImgSrc" :alt="powerByImgAlt">
      </a>
    </section>
  </footer>
</template>

<script>
// images
import waves from '~/assets/img/wave-white.svg'
import logoWhite from '~/assets/img/logo-white.png'

export default {
  props: {
    copyright: {
      type: String,
      default: 'Copyright © U.S. Taiwan Watch 2019'
    },
    showPoweredby: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      waves,
      logoWhite,
      powerByTarget: 'https://grants.g0v.tw/power/',
      powerByTargetAlt: 'power by g0v',
      powerByImgAlt: 'g0v',
      powerByImgSrc: 'https://s3.amazonaws.com/taiwanwatch-static/assets/poweredby-g0v-long.png',
      showSubscription: false,
      showDonorbox: false
    }
  },
  computed: {},
  mounted () {
    if (!this.FB) {
      this.$initFbSdk()
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
  @extend .displayFont;
  font-size: 14px;
  background-color: $twGray;
  position: relative;
  overflow: hidden;

  // background images
  .bg-img-l,
  .bg-img-r {
    pointer-events: none;
    height: 100%;
    position: absolute;
  }

  .bg-img-l {
    left: -1200px;
  }

  .bg-img-r {
    padding-left: 65%;
  }

  // header
  .footer-header {
    padding-top: 30px;

    .footer-header-wrapper {
      @extend .pageWrapper-large;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .logo {
    margin-right: 20px;
    img {
      width: 300px;
    }
  }

  .fb-like {
    margin-top: 10px;
    margin-right: 10px;
  }

  .add-line-friend {
    margin-top: 10px;
  }

  // body
  .footer-body {
    margin: 30px 0;

    .footer-body-wrapper {
      @extend .pageWrapper-large;

      flex-wrap: wrap;
      display: flex;
      flex: 1 1 auto;

      .column {
        flex-basis: 160px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .column-title {
          font-weight: $twBold;
          color: $twGrayLight;
          margin-bottom: 10px;
          font-size: 1.3em;
        }

        .column-item {
          color: $twWhite;
          cursor: pointer;
          font-size: 1.1em;
          @extend .textFont;

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

  // copyright
  .footer-copyright {
    padding: 10px 0;
    background: darken($twGray, 5%);
    color: $twWhite;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9em;
  }

  .powerBy {
    display: flex;
    align-items: center;
    margin-left: 14px;

    img {
      width: 160px;
    }
  }

  // 1500 and below
  @media screen and (max-width: 1500px) {
    .bg-img-l {
      display: none;
    }
  }

  // desktop
  @media screen and (min-width: $mediumDeviceWidth) {
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

  // phone
  @media screen and (max-width: $smallDeviceWidth - 1) {
    .footer-header {
      .logo {
        margin-right: 20px;
        img {
          width: 260px;
        }
      }
    }

    .footer-body {
      margin: 30px 0 0 0;

      .column {
        flex-basis: 50%;
        padding-bottom: 30px;
      }
    }

    .footer-copyright {
      flex-direction: column;
    }
  }
}
</style>
