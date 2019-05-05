<template>
  <div class="bill-card">
    <div class="bill-meta">
      <span class="bill-congress">{{ bill.congress }}th</span>
      <span class="bill-code">{{ bill.billCode }}</span>
      <span class="bill-type">{{ bill.billType.code | billType }}</span>
    </div>
    <router-link :to="`/bills/${bill.id}`">
      <p v-line-clamp="2" class="bill-title">{{ bill.title }}</p>
    </router-link>
    <div class="bill-info">
      <div class="bill-card-info-block">
        <div class="item-row">
          <p class="item-label">{{ $t('BillSimpleCard.sponsorLabel') }}</p>
          <p class="item-value">
            <router-link :to="`/members/${bill.sponsor.id}`">{{ bill.sponsor.firstName }} {{ bill.sponsor.lastName }}</router-link>
            ({{ bill.introducedDate | localTime }})
          </p>
        </div>

        <div class="item-row">
          <p class="item-label">{{ $t('BillSimpleCard.sponsorCountLabel') }}</p>
          <p class="item-value">{{ bill.cosponsors.length }}</p>
        </div>

        <div class="item-row">
          <p class="item-label">{{ $t('BillSimpleCard.lastActionLabel') }}</p>
          <p v-line-clamp="3" class="item-value">
            {{ billLatestAction | trimConGovAction }}
            <span
              v-if="billLatestActionChamber"
            >({{ $t('BillSimpleCard')[billLatestActionChamber] }}{{ $t('BillSimpleCard.dotNotation') }}{{ billLatestActionDate | localTime }})</span>
            <span v-if="!billLatestActionChamber">({{ billLatestActionDate | localTime }})</span>
          </p>
        </div>

        <div class="item-row v-center">
          <p class="item-label">{{ $t('BillSimpleCard.billProgressLabel') }}</p>
          <BillTracker :steps="bill.trackers" :progress="billProgress"/>
        </div>
      </div>
    </div>
    <div class="bill-footer">
      <div class="social">
        <FbShareWrapper :url="`/bills/${bill.id}`">
          <Button class="fbShareBtn" icon="md-share" shape="circle"/>
        </FbShareWrapper>
      </div>
      <div class="actions">
        <TwButton v-if="showSupportBtn" class="supportBtn" label="Support" @press="showSupportDialog = true"/>
        <router-link :to="`/bills/${bill.id}`">
          <Button class="moreBtn" shape="circle">{{ $t('BillSimpleCard.moreBtnLabel') }}</Button>
        </router-link>
      </div>
    </div>

    <!-- PopVox Modal -->
    <Modal :width="768" :footerHide="true" v-model="showSupportDialog" class="modal-support-dialog">
      <PopVox v-if="showSupportDialog" :bill="bill" class="popvox"/>
    </Modal>
  </div>
</template>
<script>
import BillTracker from '~/components/BillTracker'
import TwButton from '~/components/TwButton'
import FbShareWrapper from '~/components/FbShareWrapper'
import PopVox from '~/components/POPVox'

export default {
  components: {
    BillTracker,
    TwButton,
    FbShareWrapper,
    PopVox
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
      billLatestActionChamber: '',
      showSupportDialog: false
    }
  },
  computed: {
    billProgress () {
      const totalSteps = this.bill.trackers.length
      let currentStep
      this.bill.trackers.forEach((step, index) => {
        if (step.selected) currentStep = index + 1
      })
      return (currentStep / totalSteps) * 100
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
      let dom = document.createElement('DIV')
      dom.innerHTML = latestAction

      let result = dom.textContent || dom.innerText || ''

      // strip "Action By"
      // it will always be the last part
      let matchStr = result.indexOf(' Action By') < 0 ? 'Action By' : ' Action By'
      let action = result.split(matchStr)[0]
      let chamber = result.split(matchStr)[1]
      chamber && this.updateLastActionChamber(chamber)

      return action
    }
  },
  methods: {
    updateLastActionTime (latestActionTime) {
      this.billLatestActionDate = latestActionTime
    },
    updateLastActionChamber (lastActionChamber) {
      if (lastActionChamber.toLowerCase().indexOf('senate') >= 0) {
        this.billLatestActionChamber = 'senate'
      }

      if (lastActionChamber.toLowerCase().indexOf('house') >= 0) {
        this.billLatestActionChamber = 'house'
      }
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

  span {
    font-size: 12px;
    @extend .displayFont;
    font-weight: $twBold;
    color: $twGray;
    background: $twGrayLight2;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;
  }
}

.bill-title {
  @extend .textFont;
  font-size: 16px;
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

.bill-card-info-block {
  @extend .card-info-block;
}

.bill-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .social {
    .fbShareBtn {
      border: none;
      color: $twWhite;
      background: $twGreen;
      font-size: 14px;
      width: 32px;
      height: 32px;

      &:hover {
        background: darken($twGreen, 10%);
      }
    }
  }

  .actions {
    .supportBtn {
      margin-left: 10px;
    }

    .moreBtn {
      @extend .textFont;
      font-size: 12px;
      font-weight: $twSemiBold;
      padding: 6px 12px;
      border: none;
      color: $twWhite;
      background: $twIndigo;

      &:hover {
        background: darken($twIndigo, 10%);
      }
    }
  }
}

.popvox {
  margin-top: 30px;
}
</style>
