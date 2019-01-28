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
          <div class="column-item" @click="showSubscription = true">Subscribe</div>
          <router-link :to="`/articles`" class="column-item">Articles</router-link>
          <div class="column-item" @click="showDonorbox = true">Donate</div>
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

    <p class="copyright">{{ copyright }}</p>


    <!-- Subscription -->
    <Subscription :show="showSubscription" @close="showSubscription = false"/>

    <!-- Donorbox -->
    <Donorbox :show="showDonorbox" @close="showDonorbox = false"/>

  </footer>
</template>

<script>
// images
import waves from '~/assets/img/wave-white.svg'

// components
import Subscription from '~/components/Subscription'
import Donorbox from '~/components/Donorbox'

export default {
  components: {
    Subscription,
    Donorbox
  },
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
      showSubscription: false,
      showDonorbox: false
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
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
    height: $appCopyRightHeight;
    color: $twWhite;
    background: darken($twGray, 5%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
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
