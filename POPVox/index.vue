<template>
  <div class="popvox-widget">
    <script :data-route="billRoute" src="https://s3.amazonaws.com/static.popvox.com/widget/popvox-WLM-widget.js"/>
  </div>
</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/app';

.popvox-widget {
  @extend .card;
  margin-bottom: 20px;
}

</style>
