<template>
  <Modal :width="`60vw`" :footerHide="true" v-model="showModal" class="sub-modal">
    <div :class="{ 'phone': isPhone, 'tablet': isTablet }" class="subscriptions">
      <img :src="waves" class="bg-img"></img>
      <div class="content-wrapper" >
        <section class="left">
          <div class="title">{{ $t('subscribeForm.title') }}</div>
          <div class="description" v-html="$t('subscribeForm.description')"/>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :labelWidth="0">
            <div class="box-wrapper">
              <FormItem prop="name">
                <Input
                  v-model="formValidate.name"
                  :disabled="state === 'loading'"
                  :placeholder="$t('subscribeForm.form.name.placeholder')"
                  class="box box-name">
                </Input>
              </FormItem>
              <Tooltip placement="top" maxWidth="300">
                <TwButton class="help-btn" type="icon" icon="md-help"/>
                <div slot="content">
                  <p>{{ $t('subscribeForm.form.name.tooltip') }}</p>
                </div>
              </Tooltip>
            </div>
            <div class="box-wrapper">
              <FormItem prop="email">
                <Input
                  v-model="formValidate.email"
                  :disabled="state === 'loading'"
                  :placeholder="$t('subscribeForm.form.email.placeholder')"
                  class="box box-email">
                </Input>
              </FormItem>
              <Tooltip placement="top" maxWidth="300">
                <TwButton class="help-btn" type="icon" icon="md-help"/>
                <div slot="content">
                  <p>{{ $t('subscribeForm.form.email.tooltip') }}</p>
                </div>
              </Tooltip>
            </div>
            <FormItem>
              <Button :loading="state === 'loading'" :icon="(state === 'done') ? 'checkmark-round' : null" type="primary" class="sub-btn" @click="handleSubmit('formValidate')">
                <span v-if="state === 'none'">{{ $t('subscribeForm.form.submitBtn.title') }}</span>
                <span v-if="state === 'loading'">{{ $t('subscribeForm.form.submitBtn.titleSubmitting') }}</span>
                <span v-if="state === 'done'">{{ $t('subscribeForm.form.submitBtn.titleSubmitted') }}</span>
              </Button>
            </FormItem>
          </Form>
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
import SubscribeNewsletter from '~/apollo/mutations/SubscribeNewsletter'

export default {
  components: {
    TwButton
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: String,
      default: 'act'
    }
  },
  data () {
    return {
      waves,
      emailMockup,
      state: 'none',
      formValidate: {
        email: null,
        name: null
      },
      ruleValidate: {
        name: [{ required: true, message: this.$t('subscribeForm.form.name.requiredMessage'), trigger: 'blur' }],
        email: [
          { required: true, message: this.$t('subscribeForm.form.email.requiredMessage'), trigger: 'blur' },
          { type: 'email', message: this.$t('subscribeForm.form.email.invalidMessage'), trigger: 'blur' }
        ]
      }
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
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.state = 'loading'
          this.$apollo
            .mutate({
              mutation: SubscribeNewsletter,
              variables: {
                inputs: {
                  email: this.formValidate.email,
                  name: this.formValidate.name,
                  list: this.list
                }
              }
            })
            .then(data => {
              console.log('[SUBSCRIBE] OK = ' + JSON.stringify(data, null, 2))
            })
            .catch(error => {
              console.log('[SUBSCRIBE] ERR = ' + JSON.stringify(error, null, 2))
            })
            .finally(() => {
              this.state = 'done'
              this.formValidate.name = null
              this.formValidate.email = null
              setTimeout(() => {
                this.showModal = false
                this.state = 'none'
              }, 1000)
            })
        }
      })
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
    opacity: 0.4;
    pointer-events: none;
  }

  .email-img {
    width: 100%;
    transition: transform 0.4s;

    &:hover {
      -ms-transform: scale($zoomScale); /* IE 9 */
      -webkit-transform: scale($zoomScale); /* Safari 3-8 */
      transform: scale($zoomScale);
    }
  }

  .right {
    flex-basis: 60%;
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
      padding: 40px 0 80px 0;
      margin: auto;
    }

    .box-wrapper {
      width: 70%;
      display: flex;
      align-items: center;

      .help-btn {
        margin-left: 20px;
      }

      & + .box-wrapper {
        margin-top: 30px;
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
      margin-top: 40px;
      box-shadow: 5px 10px 30px rgba(0, 0, 0, 0.3);
    }

    .box {
      border-radius: 2px;
      background: transparent;
    }

    .box-email {
      width: 100%;
    }

    .box-name {
      width: 100%;
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
  .subscriptions .right {
    display: none;
  }
}
</style>

<style lang="scss">
@import 'assets/css/colors';

$errorColor: lighten($twRed, 20%);

.sub-modal {
  padding: 0;

  .subscriptions {
    .description > p + p {
      margin-top: 20px;
    }
  }

  .ivu-form-item-error-tip {
    color: $errorColor;
  }

  .ivu-form-item {
    width: 100%;
    margin-bottom: 0;
  }

  .ivu-form-item-error .ivu-input {
    &:focus,
    &:hover {
      border: solid 1px $errorColor;
    }
  }

  .ivu-input {
    background: none;
    text-align: center;
    color: white;
    font-size: 18px;
    border: solid 1px #ffffff;

    &:focus {
      outline: none;
      box-shadow: none;
    }

    &::placeholder {
      color: #ffffff;
      text-align: center;
      opacity: 0.8;
      font-size: 18px;
    }
  }

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
