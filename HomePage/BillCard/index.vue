<template>
  <div
    :class="{ phone: isPhone }"
    class="bill-card">
    <div class="bill-meta">
      <span class="bill-update-time">{{ billLatestActionDate | localTime }}</span>
      <span class="bill-code">{{ bill.billCode }}</span>
      <span class="bill-type">{{ bill.billType.code | billType }}</span>
    </div>
    <router-link :to="`/bills/${bill.id}`">
      <h1 class="bill-title">{{ bill.title | truncate(100) }}</h1>
    </router-link>
    <div class="bill-info">
      <div class="bill-card-info-block">
        <span class="label">Latest Action</span>
        <p class="value">{{ billLatestAction | trimConGovAction | truncate(200) }}</p>
        <BillTracker
          :steps="bill.trackers"
          :progress="billProgress"
          class="tracker"/>
      </div>
    </div>
    <div class="bill-footer">
      <div class="social">
        <!-- <TwButton
          class="social-button"
          icon="md-bookmark"
          type="icon"/> -->
        <FbShareWrapper :url="`/bills/${bill.id}`">
          <TwButton
            class="social-button"
            icon="md-share"
            type="icon"/>
        </FbShareWrapper>
      </div>
      <div>
        <TwButton v-if="showSupportBtn" class="action" label="Support" @press="showSupportDialog = true"/>
        <Modal
          :width="768"
          :footerHide="true" 
          v-model="showSupportDialog" 
          class="modal-support-dialog">
          <POPVox v-if="showSupportDialog" :bill="bill" class="popvox"/>
        </Modal>
        <router-link :to="`/bills/${bill.id}`">
          <TwButton class="action" label="More"/>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import BillTracker from '~/components/BillTracker'
import TwButton from '~/components/TwButton'
import FbShareWrapper from '~/components/FbShareWrapper'
import POPVox from '~/components/POPVox'

export default {
  components: {
    BillTracker,
    TwButton,
    FbShareWrapper,
    POPVox
  },
  props: {
    bill: {
      type: Object,
      required: true
    },
    showSupportBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      billLatestActionDate: '',
      showSupportDialog: false
    }
  },
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    billProgress () {
      const totalSteps = this.bill.trackers.length
      let currentStep
      this.bill.trackers.forEach((step, index) => {
        if (step.selected) currentStep = index + 1
      })
      return currentStep / totalSteps * 100
    },
    billLatestAction () {
      let latestActionTime = 0
      let latestAction = ''
      this.bill.actionsAll.forEach(action => {
        if (action.datetime > latestActionTime) {
          latestAction = action.description
          latestActionTime = action.datetime
        }
      })
      this.updateLastActionTime(latestActionTime)
      // strip html tags from the string
      var dom = document.createElement('DIV')
      dom.innerHTML = latestAction
      return dom.textContent || dom.innerText || ''
    }
  },
  methods: {
    updateLastActionTime (latestActionTime) {
      this.billLatestActionDate = latestActionTime
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.bill-card {
  @extend .card;
  margin-bottom: 20px;
}

.bill-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .bill-update-time {
    font-size: 1em;
    font-weight: $twSemiBold;
    color: $twWhite;
    background: $twGreen;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;
  }

  .bill-code {
    font-size: 1em;
    font-weight: $twSemiBold;
    color: $twGrayLight;
    background: $twGrayLighter;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;
  }
  .bill-type {
    font-size: 1em;
    font-weight: $twSemiBold;
    color: $twGrayLight;
    background: $twGrayLighter;
    border-radius: 10px;
    padding: 1px 8px;
  }
}

.bill-title {
  font-size: 1.4em;
  color: $twGrayDark;
  font-weight: $twSemiBold;
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
  margin-bottom: 20px;

  &:hover {
    color: $twIndigo;
  }
}

.tracker {
  margin-top: 10px;
}

.bill-card-info-block {
  @extend .card-info-block;

  .value {
    line-height: 1.5em;
    height: 3em;
    overflow: hidden;
  }
}

.bill-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;

  .social {
    .social-button {
      margin-right: 10px;

      &:last-child {
        margin-right: 0px;
      }
    }
  }
}

.action {
  margin-left: 10px;
}

.popvox {
  margin-top: 30px;
}
</style>
