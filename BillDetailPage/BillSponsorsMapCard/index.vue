<template>
  <div
    :class="{ phone: isPhone }"
    class="sponsors-map-card">
    <h1 class="sponsors-map-card-title">{{ $t('BillSponsorsMapCard.cardTitle') }}</h1>
    <div class="sponsors-map-card-body">
      <div class="sponsors">
        <!-- {{cosponsor.role.person.id}} -->
        <router-link
          v-for="cosponsor in bill.cosponsors"
          :key="cosponsor.member.id"
          :to="`/members/${cosponsor.member.id}`">
          <Tag
            :name="cosponsor.id"
            :color="{Republican: 'error', Democrat: 'primary'}[cosponsor.role.party]"
            type="dot">
            {{ `${cosponsor.member.firstName} ${cosponsor.member.lastName} (${cosponsor.role.state})` }}
          </Tag>
        </router-link>

      </div>
      <Spinner v-if="!isMapDataLoaded"/>
      <SponsorsMap
        v-if="isMapDataLoaded"
        :sponsors="sponsors"
        :usMap="usMap"
        :stateToFips="stateToFips"
        :fipsToState="fipsToState"
        :congressMap="congressMap"
        :statesNameLookup="statesNameLookup"/>
    </div>
  </div>

</template>

<script>
import queryMapUtils from '~/apollo/queries/mapUtils'
import queryCdMap from '~/apollo/queries/cdMap'
import StateListQuery from '~/apollo/queries/StateList'
import SponsorsMap from '~/components/SponsorsMap'
import Spinner from '~/components/Spinner'

export default {
  components: {
    SponsorsMap,
    Spinner
  },
  props: {
    bill: {
      type: Object,
      required: true
    },
    mapLocale: {
      type: String,
      required: false,
      default: 'en'
    }
  },
  data () {
    return {}
  },
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    style () {
      return `
        object-fit: cover;
        width: ${this.size}px;
        height: ${this.size}px;
      `
    },
    isMapDataLoaded () {
      let loaded = false
      if (this.mapUtils && this.cdMap) {
        loaded = true
      }
      return loaded
    },
    usMap () {
      return JSON.parse(this.mapUtils.usMap)
    },
    stateToFips () {
      return JSON.parse(this.mapUtils.stateToFips)
    },
    fipsToState () {
      return JSON.parse(this.mapUtils.fipsToState)
    },
    congressMap () {
      return JSON.parse(this.cdMap)
    },
    sponsors () {
      const sponsor = this.bill.sponsor
      const cosponsors = _.map(this.bill.cosponsors, co => ({ ...co.member, role: co.role }));
      const hasCosponsors = cosponsors && cosponsors.length > 0
      const mainSponsorArray = [sponsor]
      const sponsors = hasCosponsors
        ? mainSponsorArray.concat(cosponsors)
        : mainSponsorArray
      return sponsors
    },
    statesNameLookup () {
      const m = _.mapValues(this.states, o => o[this.mapLocale])
      return m
    }
  },
  apollo: {
    mapUtils: {
      query: queryMapUtils,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          lang: this.locale
        }
      },
      update (data) {
        return data.maps[0]
      }
    },
    cdMap: {
      query: queryCdMap,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          congress: 115,
          lang: this.locale
        }
      },
      update (data) {
        return data.maps[0].cdMap
      }
    },
    states: {
      query: StateListQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return { lang: this.locale, stateList: true }
      },
      update (data) {
        return JSON.parse(data.maps[0].states)
      }
    }
  },
  methods: {
    getThis () {
      return this
    }
  }
}
</script>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.ivu-tag-text {
  color: $twGrayDark;
  font-size: 14px;
  font-weight: $twRegular;
}
</style>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.sponsors-map-card {
  @extend .card;
  margin-bottom: 20px;

  .sponsors-map-card-title {
    @extend .card-title;
  }

  .sponsors-map-card-body {
    text-align: center;

    .sponsors {
      text-align: left;
      @extend .textFont;
      margin-bottom: 20px;
    }
  }
}

.paragraph {
  margin-bottom: 20px;
  color: $twGrayDark;
  font-size: 1em;
}
</style>
