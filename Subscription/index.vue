<template>
  <Modal :width="`60vw`" :footerHide="true" v-model="showModal" class="sub-modal">
    <div :class="{ 'phone': isPhone, 'tablet': isTablet }" class="subscriptions">
      <img :src="waves" class="bg-img"></img>
      <div class="content-wrapper" >
        <section class="left">
          <div class="title">Don’t fall behind</div>
          <div class="description">
            <p>Don’t miss a single article or new Taiwan related bill in Congress. Join over 2,000 subscribers who keep up with U.S. Taiwan relations.</p>
            <p>Delivered every 5-10 days, straight to your inbox.</p>
            <p>You can unsubscribe at any time.</p>
          </div>
          <div class="box-wrapper">
            <input v-model="name" :disabled="state === 'loading'" type="text" placeholder="full name" name="name" class="box box-name">
            <Tooltip placement="top" maxWidth="300">
              <TwButton class="help-btn" type="icon" icon="md-help"/>
              <div slot="content">
                <p>let us know what we should call you</p>
              </div>
            </Tooltip>
          </div>
          <div class="box-wrapper">
            <input v-model="email" :disabled="state === 'loading'" type="email" placeholder="email" name="email" class="box box-email">
            <Tooltip placement="top" maxWidth="300">
              <TwButton class="help-btn" type="icon" icon="md-help"/>
              <div slot="content">
                <p>enter your email address</p>
              </div>
            </Tooltip>
          </div>
          <Button :loading="state === 'loading'" :icon="(state === 'done') ? 'checkmark-round' : null" type="primary" class="sub-btn" @click="toLoading">
            <span v-if="state === 'none'">Subscribe</span>
            <span v-if="state === 'loading'">Saving...</span>
            <span v-if="state === 'done'">Thanks!</span>
          </Button>
        </section>
        <section class="right">
          <img :src="emailMockup" class="email-img"></img>
        </section>
      </div>
    </div>
  </Modal>  
</template>

<script>
import Vue from 'vue'
import waves from '~/assets/img/wave-white.svg'
import emailMockup from '~/assets/img/email-mockup.png'
import TwButton from '~/components/TwButton'

export default {
  components: {
    TwButton
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      waves,
      emailMockup,
      state: 'none',
      email: null,
      name: null
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    },
    showModal: {
      get () {
        return this.show
      },
      set (val) {
        !val && this.$emit('close')
      }
    }
  },
  methods: {
    toLoading () {
      this.state = 'loading';
      setTimeout(() => {
        this.state = 'done';
        this.email = null;
        setTimeout(() => {
          this.state = 'none';
        }, 1000);
      }, 3000);
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

$zoomScale: 1.07;

.subscriptions {
  background-image: linear-gradient(116deg, $twIndigo, #4a44ad, #d8aec5);
  // background-image: linear-gradient(116deg, #0a70b8, #d8aec5);
  // background-image: linear-gradient(-64deg, #2978e2, #4a44ad);

  .bg-img {
    position: absolute;
    height: 100%;
    left: 20%;
    opacity: .4;
    pointer-events: none;
  }

  .email-img {
    width: 100%;
    transition: transform .4s;

    &:hover {
      -ms-transform: scale($zoomScale); /* IE 9 */
      -webkit-transform: scale($zoomScale); /* Safari 3-8 */
      transform: scale($zoomScale);
    }
  }

  .right {
    flex-basis: 60%;
    margin: 0 50px;
  }

  .content-wrapper {
    background-position: center;
    background-size: cover;
    text-align: left;
    height: 100%;
    padding: 40px;
    display: flex;
    align-items: center;

    .title {
      color: $twWhite;
      font-weight: $twMedium;
      font-size: 24px;
      letter-spacing: 2px;
    }

    .description {
      font-size: 16px;
      line-height: 1.5em;
      letter-spacing: 1px;
      color: $twWhite;
      padding: 40px 0 70px 0;
      margin: auto;

      > p + p {
        margin-top: 20px;
      }
    }

    .box-wrapper {
      height: 32px;
      width: 70%;
      overflow: hidden;
      display: flex;

      .help-btn {
        margin-left: 20px;
      }

      & + .box-wrapper {
        margin-top: 20px;
      }
    }

    .sub-btn {
      @include button-color($twWhite, $twBlueDark);
      border: none;
      font-size: 18px;
      font-weight: $twMedium;
      height: 32px;
      width: 150px;
      padding: 0 12px;
      border-radius: 32px;
      margin-top: 30px;
      box-shadow: 5px 10px 30px rgba(0, 0, 0, .3);
    }

    .box {
      height: 32px;
      border-radius: 2px;
      border: solid 1px #ffffff;
      background: transparent;
    }

    .box-email {
      width: 100%;
    }

    .box-name {
      width: 100%;
    }

    .box-last-name {
      margin-left: 20px;
    }

    input[type="email"],
    input[type="text"] {
      text-align: center;
      color: white;
      font-size: 18px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #ffffff;
        text-align: center;
        opacity: 0.8;
        font-size: 18px;
      }
    }
  }

  &.phone,
  &.tablet {
    .left,
    .box-wrapper {
      width: 100%;
    }
  }
}

@media screen and (max-width: 1200px) {
  .right {
    display: none;
  }  
}

</style>

<style lang="scss">
.sub-modal {
  padding: 0;

  .ivu-modal-content {
    overflow: hidden;
  }

  .ivu-modal-body {
    padding: 0;
  }

  .ivu-modal-close .ivu-icon-ios-close {
    color: #fff;
  }
}
</style>  
