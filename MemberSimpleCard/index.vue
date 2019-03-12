<template>
  <div
    :class="{ phone: isPhone }"
    class="member-card">
    <div class="member-meta">
      <span class="member-meta-info">{{ memberAreaCode }}</span>
      <span class="member-meta-info">{{ memberParty }}</span>
    </div>
    <div class="member-profile">
      <img
        :class="avatarClass"
        :src="avatarSource"
        :style="avatarStyle"
        class="avatar" >
      <div class="member-name-title">
        <router-link :to="`/members/${member.id}`">
          <h1 class="member-name">{{ member.title }} {{ member.firstName }} {{ member.middleName }} {{ member.lastName }}</h1>
        </router-link>
        <p class="member-title">{{ memberTitle }} </p>
      </div>
    </div>

    <div class="member-info">
      <div class="member-card-info-block">
        <div class="item-row">
          <p class="item-label">{{ $t('MemberSimpleCard.labelSponsored') }}</p>
          <p class="item-value">{{ member.billIdSponsored.length }}</p>
        </div>

        <div class="item-row">
          <p class="item-label">{{ $t('MemberSimpleCard.labelCosponsored') }}</p>
          <p class="item-value">{{ member.billIdCosponsored.length }}</p>
        </div>

        <div class="item-row">
          <p class="item-label">{{ $t('MemberSimpleCard.labelSocialMedia') }}</p>
          <p class="item-value">
            <a v-if="twitterLink" :href="twitterLink" target="_blank">
              <img :src="twitterLogo" class="social twitter">
            </a>
            <a v-if="youtubeLink" :href="youtubeLink" target="_blank">
              <img :src="youtubeLogo" class="social youtube">
            </a>
            <a v-if="facebookLink" :href="facebookLink" target="_blank">
              <img :src="facebookLogo" class="social facebook">
            </a>
            <a v-if="cspanLink" :href="cspanLink" target="_blank">
              <img :src="cspanLogo" class="social cspan">
            </a>
            <a v-if="member.website" :href="member.website" target="_blank">
              <img :src="wwwLogo" class="social www">
            </a>
          </p>
        </div>

        <div class="item-row">
          <p class="item-label">{{ $t('MemberSimpleCard.labelLastSupport') }}</p>
          <p v-line-clamp="3" v-if="lastSupportBill" class="item-value">
            {{ lastSupportBill.bill.billCode }} - {{ lastSupportBill.bill.title }}
            <span class="support-bill">{{ $t('MemberSimpleCard.lastSupportSuffix', { action: lastSupportBill.role, date: lastSupportBill.time }) }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="bill-footer">
      <div class="social">
        <FbShareWrapper :url="`/members/${member.id}`">
          <Button class="fbShareBtn" icon="md-share" shape="circle"/>
        </FbShareWrapper>
      </div>
      <router-link :to="`/members/${member.id}`">
        <TwButton :label="$t('MemberSimpleCard.btnTitleMore')"/>
      </router-link>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { get } from '@/plugins/utils'
import TwButton from '~/components/TwButton'
import defaultAvatar from '~/assets/img/tw-logo-color.png'
import FbShareWrapper from '~/components/FbShareWrapper'

// logos
import cspanLogo from '~/assets/img/cspan_logo.svg'
import facebookLogo from '~/assets/img/facebook_logo.svg'
import youtubeLogo from '~/assets/img/youtube_logo.svg'
import twitterLogo from '~/assets/img/twitter_logo.svg'
import wwwLogo from '~/assets/img/www_logo.svg'

// Queries
import BillsQuery from '~/apollo/queries/MemberLandingPage/Bills'

export default {
  components: {
    TwButton,
    FbShareWrapper
  },
  props: {
    member: {
      type: Object,
      required: true,
      default: () => ({})
    },
    states: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      cspanLogo,
      facebookLogo,
      youtubeLogo,
      twitterLogo,
      wwwLogo,
      ppMember: null,
      size: 50,
      lastSupportBill: false
    }
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    avatarSource () {
      const pictures = this.member.profilePictures
      return pictures && pictures.tiny ? pictures.tiny : defaultAvatar
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
      switch (this.member.currentRole.party) {
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
      if (this.member.currentRole.district) {
        return `${this.member.currentRole.state}-${this.member.currentRole.district}`
      } else {
        return `${this.member.currentRole.state}`
      }
    },
    memberTitle () {
      const lang = this.locale === 'zh-tw' ? 'zh' : 'en'

      if (!this.states) return ''
      const title = this.member.currentRole.titleLong
      const state = (this.member.currentRole.state && this.states[this.member.currentRole.state][lang]) || ''
      const hasDistrict = !!this.member.currentRole.district
      if (hasDistrict) {
        const district = this.member.currentRole.district
        return this.$t('MemberSimpleCard.memberTitleWithDistrict', { title, state, district })
      } else {
        return this.$t('MemberSimpleCard.memberTitle', { title, state })
      }
    },
    memberParty () {
      const party = this.member.currentRole.party
      const partyTrans = {
        'zh-tw': {
          'Republican': '共和黨',
          'Democrat': '民主黨'
        }
      }[this.locale];
      return (partyTrans && partyTrans[party]) || party
    },
    twitterLink () {
      return this.ppMember && this.ppMember.twitter_account
        ? `https://twitter.com/${this.ppMember.twitter_account}`
        : null
    },
    facebookLink () {
      return this.ppMember && this.ppMember.facebook_account
        ? `https://www.facebook.com/${this.ppMember.facebook_account}`
        : null
    },
    youtubeLink () {
      return this.ppMember && this.ppMember.youtube_account
        ? `https://www.youtube.com/user/${this.ppMember.youtube_account}`
        : null
    },
    cspanLink () {
      return this.ppMember && this.ppMember.cspan_id ? `https://www.c-span.org/person/?${this.ppMember.cspan_id}` : null
    }
  },
  mounted () {
    const personBioGuideId = this.member.bioGuideId
    const personId = this.member.id

    Promise.all([
      this.fetchBills(this.member.billIdSponsored),
      this.fetchBills(this.member.billIdCosponsored)
    ])
    .then(results => {
      let sponsoredBills = results[0].data.bills;
      let cosponsoredBills = results[1].data.bills;

      let lastSupportBill = { role: '', time: null, bill: '' }

      _.each(sponsoredBills, bill => {
        if (Number(bill.introducedDate) > lastSupportBill.time) {
          lastSupportBill.role = this.$t('MemberSimpleCard.lastSupportSponsored')
          lastSupportBill.time = this.$options.filters.localTime(Number(bill.introducedDate))
          lastSupportBill.bill = bill
        }
      });

      let m = _.keyBy(this.member.cosponsorProperty, 'billId')
      _.each(cosponsoredBills, bill => {
        let dateCosponsored = m[bill.id].dateCosponsored
        if (Number(dateCosponsored) > lastSupportBill.time) {
          lastSupportBill.role = this.$t('MemberSimpleCard.lastSupportCosponsored')
          lastSupportBill.time = this.$options.filters.localTime(Number(dateCosponsored))
          lastSupportBill.bill = bill
        }
      });
      this.lastSupportBill = lastSupportBill
    })
    .catch(error => {
      console.log('get all roles data error -->', error)
    })

    this.fetchProPublicaMember(personBioGuideId)
  },
  methods: {
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillsQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    async fetchProPublicaMember (bioGuideId) {
      const response = await get(`https://api.propublica.org/congress/v1/members/${bioGuideId}.json`)
      this.ppMember = response.data.results[0]
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.member-card {
  @extend .card;
  margin-bottom: 10px;
}

.member-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .member-meta-info {
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

.member-profile {
  display: flex;
  margin-top: 10px;
  margin-bottom: 15px;

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
      font-size: 16px;
      color: $twGrayDark;
      font-weight: $twSemiBold;

      &:hover {
        color: $twIndigo;
      }
    }

    .member-title {
      font-size: 12px;
      color: $twGrayDark;
    }
  }
}

.member-card-info-block {
  @extend .card-info-block;

  .social {
    margin-right: 12px;
  }

  .twitter {
    width: 18px;
  }

  .youtube {
    width: 22px;
  }

  .facebook {
    width: 16px;
  }

  .cspan {
    width: 44px;
    margin-bottom: 2px;
  }

  .www {
    height: 16px;
  }

  .link {
    color: $twIndigo;
    text-decoration: underline;
  }

  .support-bill {
    color: $twGrayLight;
  }
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
}
</style>
