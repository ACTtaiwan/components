<template>
  <div class="bill-card">
    <div class="bill-meta">
      <span class="bill-code">{{ bill.billCode }}</span>
      <span class="bill-type">{{ billType }}</span>
    </div>
    <router-link :to="`/bills/${bill.id}`">
      <h1 class="bill-title">{{ bill.title | truncate(160) }}</h1>
    </router-link>
    <div class="bill-info">
      <Row>
        <Col
          :span="24"
          class="bill-card-info-block">
        <!-- Sponsor -->
        <div class="bill-sponsor">
          <img
            :class="avatarClass"
            :src="avatarSource"
            :style="avatarStyle"
            class="avatar" >
          <router-link :to="`/members/${bill.sponsor.person.id}`">
            <p class="name">{{ bill.sponsor.title }} {{ bill.sponsor.person.firstname }} {{ bill.sponsor.person.lastname }}</p>
          </router-link>
          <p class="area">{{ memberArea }} </p>
        </div>
        </Col>
        <Col
          :span="isDesktop ? 6 : 12"
          class="bill-card-info-block">
        <!-- Congress -->
        <span class="label">Congress</span>
        <p class="value">{{ bill.congress }}th</p>
        </Col>
        <Col
          :span="isDesktop ? 6 : 12"
          class="bill-card-info-block">
        <!-- Introduced Date -->
        <span class="label">Introduced</span>
        <p class="value">{{ bill.introducedDate | localTime }}</p>
        </Col>
        <Col
          :span="isDesktop ? 6 : 12"
          class="bill-card-info-block">
        <!-- Cosponsors -->
        <span class="label">Cosponsors</span>
        <p class="value">{{ bill.cosponsors ? bill.cosponsors.length : 0 }}</p>
        </Col>
        <Col
          :span="isDesktop ? 6 : 12"
          class="bill-card-info-block">
        <!-- Tags -->
        <span class="label">{{ $t('BillSearchResultCard.tagsFieldTitle') }}</span>
        <div
          v-if="bill.tags"
          class="tags">
          <Tag
            v-for="tag in bill.tags.slice(0, 3)"
            :key="tag.tag"
            type="border"
            class="tag">
            {{ tag.tag }}
          </Tag>
          <Button
            v-if="bill.tags.length > 3"
            class="tag"
            icon="ios-more"
            type="dashed"
            size="small"
            @click="tagsModal = true"/>
          <Modal
            v-model="tagsModal"
            footerHide
            className="vertical-center-modal">
            <p slot="header" style="color:#3e57c1 ;text-align:center">
              <Icon type="ios-pricetag" />
              <span> All tags</span>
            </p>
            <Tag
              v-for="tag in bill.tags"
              :key="tag.tag"
              type="border"
              class="tag">
              {{ tag.tag }}
            </Tag>
          </Modal>
        </div>
        <span
          v-else
          class="value">none</span>
        </Col>
        <Col
          :span="24"
          class="bill-card-info-block">
        <!-- Tracker -->
        <span class="label">Status</span>
        <p class="value">{{ billLatestAction | trimConGovAction }}</p>
        <BillTracker
          :steps="bill.trackers"
          :progress="billProgress"
          class="tracker"/>
        </Col>
      </Row>
    </div>
    <div class="bill-footer">
      <div class="social">
        <!-- <TwButton
          class="social-button"
          icon="md-bookmark"
          type="icon"
          style="light"/> -->
        <FbShareWrapper :url="`/bills/${bill.id}`">
          <TwButton
            class="social-button"
            icon="md-share"
            type="icon"
            style="light"/>
        </FbShareWrapper>
      </div>
      <div>
        <TwButton 
          :icon="showPopVox ? 'md-arrow-dropdown' : 'md-arrow-dropright'"
          class="action" 
          label="Write Lawmaker" 
          @press="showPopVox = !showPopVox"/>
        <router-link :to="`/bills/${bill.id}`" class="action">
          <TwButton label="More"/>
        </router-link>
      </div>
    </div>
    <POPVox v-if="showPopVox" :bill="bill" class="popvox"/>
  </div>
</template>
<script>
import defaultAvatar from '~/assets/img/tw-logo-color.png'
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
    }
  },
  data () {
    return {
      size: 40,
      tagsModal: false,
      showPopVox: false
    }
  },
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    avatarSource () {
      console.log('!!!', this.bill)
      const pictures = this.bill.sponsor.person.profilePictures
      return pictures.tiny ? pictures.tiny : defaultAvatar
    },
    avatarStyle () {
      return `
        object-fit: cover;
        width: ${this.size}px;
        height: ${this.size}px;
      `
    },
    avatarClass () {
      let color = ''
      switch (this.bill.sponsor.party) {
        case 'Republican':
          color = 'red'
          break
        case 'Democrat':
          color = 'blue'
          break
        default:
          color = 'gray'
          break
      }
      return color
    },
    memberArea () {
      if (this.bill.sponsor.district) {
        return `, ${this.bill.sponsor.state}-${this.bill.sponsor.district}`
      } else {
        return `, ${this.bill.sponsor.state}`
      }
    },
    billType () {
      return {
        s: 'Bill',
        hr: 'Bill',
        hconres: 'Concurrent Resolution',
        sconres: 'Concurrent Resolution',
        hres: 'Resolution',
        sres: 'Resolution',
        hjres: 'Joint Resolution',
        sjres: 'Joint Resolution'
      }[this.bill.billType.code]
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
      this.bill.actions.forEach(action => {
        if (action.datetime > latestActionTime) {
          latestAction = action.description
          latestActionTime = action.datetime
        }
      })
      // strip html tags from the string
      var dom = document.createElement('DIV')
      dom.innerHTML = latestAction
      return dom.textContent || dom.innerText || ''
    }
  },
  methods: {}
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
  margin-bottom: 20px;

  &:hover {
    color: $twIndigo;
  }
}

.bill-sponsor {
  display: flex;
  align-items: center;

  .avatar {
    border-radius: 50%;
    border-style: solid;
    border-width: 3px;
    margin-right: 10px;

    &.red {
      border-color: $twRed;
    }

    &.blue {
      border-color: $twBlue;
    }

    &.gray {
      border-color: $twGrayLight;
    }
  }

  .name {
    font-size: 1em;
    color: $twGrayDark;
    font-weight: $twSemiBold;
    &:hover {
      color: $twIndigo;
    }
  }

  .area {
    font-size: 1em;
    color: $twGrayDark;
    font-weight: $twSemiBold;
  }
}

.tracker {
  margin-top: 10px;
}

.bill-card-info-block {
  @extend .card-info-block;

  .tags {
    .tag {
      height: auto;
    }
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
  margin-top: 20px;
}

</style>


<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.ivu-tooltip-rel {
  display: inherit;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
