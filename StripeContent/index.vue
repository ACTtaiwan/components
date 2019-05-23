<template>
  <div>
    <div class="support-block">
      <h1 v-if="showTitle" class="title">{{ $t('donation.title') }}</h1>
      <img :src="supportImg">
      <div class="content">
        <p v-html="$t('donation.description')"/>
      </div>
      <div class="donate">
        <div class="option">
          <h1>{{ $t('donation.plans.basic.amountText') }}</h1>
          <p>{{ $t('donation.plans.basic.content') }}</p>
          <TwButton
            :label="$t('donation.plans.basic.acceptBtnText')"
            fontSize="14px"
            lineHeight="22px"
            class="actionBtn"
            @press="checkout($t('donation.plans.basic.amount'))"
          />
        </div>
        <div class="option">
          <h1>{{ $t('donation.plans.better.amountText') }}</h1>
          <p>{{ $t('donation.plans.better.content') }}</p>
          <TwButton
            :label="$t('donation.plans.better.acceptBtnText')"
            fontSize="14px"
            lineHeight="22px"
            class="actionBtn"
            @press="checkout($t('donation.plans.better.amount'))"
          />
        </div>
        <div class="option">
          <h1>{{ $t('donation.plans.good.amountText') }}</h1>
          <p>{{ $t('donation.plans.good.content') }}</p>
          <TwButton
            :label="$t('donation.plans.good.acceptBtnText')"
            fontSize="14px"
            lineHeight="22px"
            class="actionBtn"
            @press="checkout($t('donation.plans.good.amount'))"
          />
        </div>
        <div class="option">
          <div class="custom">
            <h1>{{ $t('donation.currencyDisplay') }}</h1>
            <InputNumber :min="50" v-model="customValue" :precision="0" class="amount"/>
          </div>
          <p>{{ $t('donation.plans.custom.content') }}</p>
          <TwButton
            :label="$t('donation.plans.custom.acceptBtnText')"
            fontSize="14px"
            lineHeight="22px"
            class="actionBtn"
            @press="checkout(customValue)"
          />
        </div>
      </div>
    </div>

    <!-- Stripe Checkout -->
    <no-ssr>
      <vue-stripe-checkout
        ref="checkoutRef"
        :image="checkoutOpts.image"
        :name="checkoutOpts.name"
        :description="checkoutOpts.description"
        :currency="checkoutOpts.currency"
        :amount="checkoutOpts.amount"
        :allowRememberMe="false"
        @done="done"
        @opened="opened"
        @closed="closed"
        @canceled="canceled"
      />
    </no-ssr>

    <!-- Success Popup -->
    <Modal :width="500" v-model="showSuccess" :footerHide="true" :fullscreen="isPhone ? true : false" class="donateResultPopup">
      <div :style="successImgBlockStyle" class="content">
        <div class="title success">
          <Icon class="icon" type="md-checkmark-circle"/>
          <p>{{ $t('donation.successTitle') }}</p>
        </div>
        <div class="body">
          <p v-html="$t('donation.successDescription')"/>
        </div>
      </div>
    </Modal>

    <!-- Fail Popup -->
    <Modal :width="500" v-model="showFail" :footerHide="true" :fullscreen="isPhone ? true : false" class="donateResultPopup">
      <div :style="failImgBlockStyle" class="content">
        <div class="title fail">
          <Icon class="icon" type="md-close-circle"/>
          <p>{{ $t('donation.failTitle') }}</p>
        </div>
        <div class="body">
          <p v-html="$t('donation.failDescription')"/>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import appConfig from '~/config/app.json'

// components
import TwButton from '~/components/TwButton'
// images
import twlogo from '~/assets/img/tw-logo-color.png'
import supportImg from '~/assets/img/donation-ustw.png'
// graphql
import DonateMutation from '~/apollo/mutations/Donate'

export default {
  components: {
    TwButton
  },
  props: {
    config: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  data () {
    return {
      checkoutOpts: {
        image: twlogo,
        name: '美國國會台灣觀測站',
        description: '',
        currency: this.$t('donation.currency'),
        amount: 100
      },
      supportImg,
      customValue: null,
      showSuccess: false,
      showFail: false,
      successImgBlockStyle: `background-image: url("${
        appConfig.assets.baseUrl
      }/donate-bird-3.png"); background-repeat: no-repeat; background-size: 200px; background-position: right bottom;`,
      failImgBlockStyle: `background-image: url("${
        appConfig.assets.baseUrl
      }/donate-bird-1.png"); background-repeat: no-repeat; background-size: 160px; background-position: right bottom;`
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    showTitle () {
      if (this.config && this.config.showTitle !== undefined) {
        return !!this.config.showTitle
      }
      return true
    }
  },
  methods: {
    async checkout (donateAmount) {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      this.checkoutOpts.amount = donateAmount * 100
      this.$nextTick(() => {
        this.$refs.checkoutRef.open()
      })
    },
    genInput ({ id, email, card, type, client_ip, created }) {
      return {
        token: id,
        email: email,
        amount: this.checkoutOpts.amount,
        currency: this.checkoutOpts.currency,
        description: `Donate $${this.checkoutOpts.amount / 100} USD to ${this.$t('donation.source')} via the website.`
      }
    },
    done ({ token, args }) {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      // do stuff...

      this.$apollo
        .mutate({
          mutation: DonateMutation,
          variables: {
            inputs: this.genInput(token)
          }
        })
        .then(data => {
          if (data.data.donate.isSuccess) {
            this.showSuccess = true
          } else {
            this.showFail = true
          }
          console.log('[STRIPECONTENT] OK = ' + JSON.stringify(data, null, 2))
        })
        .catch(error => {
          this.showFail = true
          console.log('[STRIPECONTENT] ERR = ' + JSON.stringify(error, null, 2))
        })
    },
    opened () {
      // do stuff
    },
    closed () {
      // do stuff
    },
    canceled () {
      // do stuff
    }
  }
}
</script>

<style lang="scss" >
@import 'assets/css/colors';

.ivu-input-number-input {
  color: $twGrayDark;
}

// make the modal vertically centered
.ivu-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>

<style lang="scss" scoped>
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.support-block {
  text-align: center;
  padding: 20px;

  .title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #000000;
  }

  img {
    width: 80%;
  }

  .content {
    color: $twGrayDark;
    margin-top: 20px;
    text-align: left;
    font-size: 16px;
    font-weight: 400;
  }

  .donate {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    margin-left: -10px;
    margin-right: -10px;

    .option {
      position: relative;
      flex: 1;
      flex-basis: 140px;
      display: flex;
      flex-direction: column;
      background: $twGrayLighter;
      border: 1px solid $twGrayLight;
      border-radius: 5px;
      margin-right: 5px;
      margin-left: 5px;
      margin-bottom: 10px;
      padding: 10px;

      h1 {
        color: $twGrayDark;
        @extend .displayFont;
      }

      p {
        @extend .textFont;
        font-size: 14px;
        color: $twGrayDark;
        margin-bottom: 10px;
      }

      .actionBtn {
        width: auto;
        margin: auto auto 0;
        // margin-top: auto;
      }

      .custom {
        display: flex;
        margin: 0 auto;

        h1 {
          margin-right: 5px;
        }

        .amount {
          font-size: 24px;
          color: $twGrayDark;
          width: 80px;
        }
      }
    }
  }
}

.donateResultPopup {
  .content {
    text-align: center;
    padding: 20px;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 10px;

      &.success {
        color: $twGreen;
      }

      &.fail {
        color: $twRed;
      }

      .icon {
        margin-right: 5px;
      }
    }

    .body {
      padding: 10px;
      height: 200px;

      p {
        color: $twGrayDark;
        margin-top: 20px;
        text-align: left;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}
</style>