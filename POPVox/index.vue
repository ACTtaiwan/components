<template>
  <Modal :width="`60vw`" v-model="showModal" :footerHide="true" :fullscreen="isPhone ? true : false">
    <div v-if="show" class="popvox-widget">
      <Alert class="intro-section">
        <ul>
          <li><p>You will need to enter in your address so POPVOX can correctly identify your members of Congress.</p></li>
          <li><p>Take action on each piece of legislation. Don't worry if you can't remember which one you already took action on, the system will let you know if you try to do it twice.</p></li>
          <li><p>ACT uses the POPVOX system to route your message to members of Congress. Don't forget to confirm your email after you take action the first time.</p></li>
        </ul>
      </Alert>
      <div>
        <script :data-route="billRoute" src="https://s3.amazonaws.com/static.popvox.com/widget/popvox-WLM-widget.js"/>
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    billRoute () {
      const codeMap = {
        s: 's',
        hr: 'hr',
        sres: 'sres',
        hres: 'hres',
        sjres: 'sjres',
        hjres: 'hjres',
        sconres: 'scres',
        hconres: 'hcres'
      }
      const code = codeMap[this.bill.billType.code]
      return `us/federal/bills/${this.bill.congress}/${code}${this.bill.billNumber}`
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    showModal: {
      get () {
        return this.show
      },
      set (val) {
        console.log('TTTT', val)
        !val && this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/app';

.popvox-widget {
  margin: 25px 15px 0 15px;

  .intro-section {
    padding: 14px 14px;
    ul {
      margin-left: 20px;

      li {
        font-size: 14px;
        color: #111111;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

// phone
@media screen and (max-width: $smallDeviceWidth - 1) {
  .ivu-modal {
    width: 100% !important;
    margin: 0;

    .popvox-widget {
      margin: 25px 0 0 0;
    }
  }
}
</style>
