<template>
  <div
    :class="{ phone: isPhone }"
    class="overview-card">
    <h1 class="overview-card-title">{{ $t('MemberOverviewCard.cardTitle') }}</h1>
    <div class="member-meta">
      <span class="member-meta-info">{{ memberAreaCode }}</span>
      <span class="member-meta-info">{{ memberParty }}</span>
      <span
        v-if="isInCongress"
        class="member-meta-info success">
        {{ $t('MemberOverviewCard.pillInCongress') }}
      </span>
    </div>
    <div class="member-profile">
      <img
        :class="avatarClass"
        :src="avatarSource"
        :style="avatarStyle"
        class="avatar" >
      <div class="member-name-title">
        <h1 class="member-name">{{ members[0].latestRole.title }} {{ members[0].firstName }} {{ members[0].middleName }} {{ members[0].lastName }}</h1>
        <p class="member-title">{{ memberTitle }} </p>
      </div>
    </div>
    <Row>
      <Col
        :span="isDesktop ? 6 : 12"
        class="overview-card-info-block">
      <!-- Terms -->
      <span class="label">{{ $t('MemberOverviewCard.labelTerms') }}</span>
      <div
        v-if="terms"
        class="poptip-block">
        <p class="value stats">{{ terms.length }}</p>
        <Poptip
          :trigger="isPhone ? 'click' : 'hover'"
          class="poptip"
          placement="right">
          <Icon type="md-information-circle"/>
          <div
            slot="content"
            class="poptip-content">
            <p
              v-for="term in terms"
              :key="term">{{ $t('MemberOverviewCard.poptipCongress', {term}) }}</p>
          </div>
        </Poptip>
      </div>
      <BeatLoader
        v-else
        class="stats-loader" />
      </Col>
      <Col
        :span="isDesktop ? 6 : 12"
        class="overview-card-info-block">
      <!-- Vote with party -->
      <span class="label">{{ $t('MemberOverviewCard.labelVote') }}</span>
      <div
        v-if="ppMember"
        class="poptip-block">
        <p class="value stats">{{ Number.parseFloat(ppMember.roles[0].votes_with_party_pct).toPrecision(2) }}%</p>
        <Poptip
          class="poptip"
          trigger="hover"
          placement="right">
          <Icon type="md-information-circle"/>
          <div
            slot="content"
            class="poptip-content">
            <p>{{ $t('MemberOverviewCard.poptipVote', {congress: ppMember.roles[0].congress}) }}</p>
          </div>
        </Poptip>
      </div>
      <BeatLoader
        v-else
        class="stats-loader"/>
      </Col>
      <Col
        :span="isDesktop ? 6 : 12"
        class="overview-card-info-block">
      <!-- Sponsored -->
      <span class="label">{{ $t('MemberOverviewCard.labelSponsored') }}</span>
      <p
        v-if="sponsoredBills"
        class="value stats">{{ sponsoredBills.length }}</p>
      <BeatLoader
        v-else
        class="stats-loader" />
      </Col>
      <Col
        :span="isDesktop ? 6 : 12"
        class="overview-card-info-block">
      <!-- Cosponsored -->
      <span class="label">{{ $t('MemberOverviewCard.labelCosponsored') }}</span>
      <p
        v-if="cosponsoredBills"
        class="value stats">{{ cosponsoredBills.length }}</p>
      <BeatLoader
        v-else
        class="stats-loader" />
      </Col>
      <Col
        :span="24"
        class="overview-card-info-block">
      <!-- Committees -->
      <span class="label">{{ $t('MemberOverviewCard.labelCommittees') }}</span>
      <p
        v-for="committee in ppMember.roles[0].committees"
        :key="committee.code"
        class="value">{{ committee.name }}
        <span class="note">({{ committee.title && committee.title.toLowerCase() }})</span>
      </p>
      </Col>
    </Row>
  </div>
</template>

<script>
import defaultAvatar from '~/assets/img/tw-logo-color.png'
import BeatLoader from '~/components/BeatLoader'

export default {
  components: {
    BeatLoader
  },
  props: {
    ppMember: {
      type: Object,
      required: true
    },
    members: {
      type: Array,
      required: true
    },
    memberTitle: {
      type: String,
      required: true
    },
    sponsoredBills: {
      type: Array,
      required: false,
      default: () => []
    },
    cosponsoredBills: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      avatarSize: 50
    }
  },
  asyncComputed: {},
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    currentCongress () {
      return this.$store.state.currentCongress
    },
    avatarSource () {
      const pictures = this.members[0].profilePictures
      return pictures && pictures.medium ? pictures.medium : defaultAvatar
    },
    avatarStyle () {
      return `
        object-fit: cover;
        width: ${this.avatarSize}px;
        height: ${this.avatarSize}px;
      `
    },
    avatarClass () {
      let color = ''
      switch (this.members[0].latestRole.party) {
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
    memberAreaCode () {
      if (this.members[0].latestRole.district) {
        return `${this.members[0].latestRole.state}-${this.members[0].latestRole.district}`
      } else {
        return `${this.members[0].latestRole.state}`
      }
    },
    memberParty () {
      const party = this.members[0].latestRole.party
      const partyTrans = {
        'zh-tw': {
          'Republican': '共和黨',
          'Democrat': '民主黨'
        }
      }[this.locale];
      return (partyTrans && partyTrans[party]) || party
    },
    terms () {
      return this.ppMember.roles.map(role => role.congress)
    },
    isInCongress () {
      return !!this.members[0].currentRole
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.overview-card {
  @extend .card;
  margin-bottom: 20px;

  .overview-card-title {
    @extend .card-title;
  }
}

.member-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .member-meta-info {
    font-size: 1em;
    font-weight: $twSemiBold;
    color: $twGrayLight;
    background: $twGrayLighter;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;

    &.success {
      color: $twWhite;
      background: $twGreen;
    }
  }
}

.member-profile {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;

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

  .member-name-title {
    .member-name {
      font-size: 1.4em;
      color: $twGrayDark;
      font-weight: $twSemiBold;
    }

    .member-title {
      font-size: 1em;
      color: $twGray;
    }
  }
}

.overview-card-info-block {
  @extend .card-info-block;

  .stats {
    font-size: 1.6em;
  }

  .stats-loader {
    font-size: 1.6em;
  }

  .note {
    color: $twGrayLight;
  }
}

.poptip-block {
  display: flex;

  .poptip {
    margin-left: 5px;
    color: $twGrayLight;
    cursor: pointer;
    font-size: 1em;
  }

  .poptip-content {
    padding: 10px;
    color: $twGrayDark;
    font-size: 14px;
  }
}

.chart {
  max-height: 140px;
  position: relative;
  display: flex;

  &.isLoading {
    opacity: 0.5;
  }
}
</style>
