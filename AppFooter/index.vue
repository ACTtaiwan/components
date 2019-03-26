<template>
  <footer>
    <!-- Background Images -->
    <img :src="wavesImgUrl" class="bg-img-l">
    <img :src="wavesImgUrl" class="bg-img-r">
    <!-- Header -->
    <section class="footer-header">
      <div class="footer-header-wrapper">
        <div class="logo">
          <img :src="logoSrc[logo]" :alt="logoImgAlt">
        </div>
        <FbLikeBtnUSTW v-if="fbLikeBtn && fbLikeBtn === `ustw`"/>
        <LineAddBtnUSTW v-if="lineAddBtn && lineAddBtn === `ustw`"/>
      </div>
    </section>
    <!-- Body -->
    <section class="footer-body">
      <div class="footer-body-wrapper">
        <div v-for="(section, index) in sections" :key="index" class="column">
          <div class="column-title">{{ section.title }}</div>
          <template v-for="(item, index) in section.items">
            <!-- router link -->
            <router-link v-if="item.router" :key="index" :to="item.link" class="column-item">{{ item.text }}</router-link>
            <!-- action link -->
            <div v-else-if="item.action" :key="index" class="column-item" @click="item.action">{{ item.text }}</div>
            <!-- new window link -->
            <a v-else-if="item.target" :key="index" :href="item.link" target="_blank" class="column-item">{{ item.text }}</a>
            <!-- normal hyperlink -->
            <a v-else :key="index" :href="item.link" class="column-item">{{ item.text }}</a>
          </template>
        </div>
      </div>
    </section>
    <!-- Copyright -->
    <section class="footer-copyright">
      <p class="copyright">{{ copyright }}</p>
      <p class="powerBy">
        <a v-if="showPoweredby" :href="powerByTarget" :alt="powerByTargetAlt" target="_blank">
          <img :src="powerByActImgUrl" :alt="powerByImgActAlt">
        </a>
        <a v-if="showPoweredby" :href="powerByTarget" :alt="powerByTargetAlt" target="_blank">
          <img :src="powerByG0vImgUrl" :alt="powerByImgG0vAlt">
        </a>
      </p>
    </section>
  </footer>
</template>

<script>
// libraries
import appConfig from '~/config/app.json'

// images
import logoUSTW from '~/assets/img/logo-white.png'
import logoACT from '~/assets/img/logo-white.png'

import FbLikeBtnUSTW from '~/components/FbLikeBtnUSTW'
import LineAddBtnUSTW from '~/components/LineAddBtnUSTW'

export default {
  components: {
    FbLikeBtnUSTW,
    LineAddBtnUSTW
  },
  props: {
    copyright: {
      type: String,
      default: 'Copyright © U.S. Taiwan Watch 2019'
    },
    showPoweredby: {
      type: Boolean,
      default: true
    },
    logo: {
      type: String,
      default: ''
    },
    logoImgAlt: {
      type: String,
      default: ''
    },
    fbLikeBtn: {
      type: String,
      default: ''
    },
    lineAddBtn: {
      type: String,
      default: ''
    },
    sections: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      wavesImgUrl: `${appConfig.assets.baseUrl}/wave-white.svg`,
      logoSrc: {
        ustw: logoUSTW,
        act: logoACT
      },
      powerByTarget: 'https://grants.g0v.tw/power/',
      powerByTargetAlt: 'power by g0v',
      powerByImgActAlt: 'ACT',
      powerByImgG0vAlt: 'g0v',
      powerByG0vImgUrl: `${appConfig.assets.baseUrl}/poweredby-g0v-long.png`,
      powerByActImgUrl: `${appConfig.assets.baseUrl}/act-logo-footer.png`
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.9em;
  }

  .powerBy {
    display: flex;
    align-items: center;
    margin-top: 10px;

    a {
      &:first-child {
        margin-right: 15px;
      }
      img {
        height: 20px;
      }
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
