<template>
  <div
    :class="{ phone: isPhone }"
    class="analytic-card">
    <h1 class="analytic-card-title">Sponsorship of bills by states</h1>
    <div class="analytic-card-body">
      <div class="analytic-card-info-block">
        <span class="label">Congress ({{ congressRange[0] }} - {{ congressRange[1] }})</span>
        <Slider
          v-model="congressRange"
          :step="1"
          :min="congressMin"
          :max="congressMax"
          class="slider"
          showStops
          range
          @on-change="updateChart"/>
      </div>
      <div class="chart-container">
        <BillCountMap
          v-if="mapUtils && bills && isInitiated"
          v-show="!isChartLoading"
          :bills="bills"
          :usMap="usMap"
          :stateToFips="stateToFips"
          :fipsToState="fipsToState"
          mapId="sponsored-bill-count-map"/>
        <!-- loader -->
        <div
          v-if="isChartLoading && isInitiated"
          class="overlay-container">
          <div class="overlay-block">
            <Spinner/>
          </div>
        </div>
        <!-- Initializer -->
        <div
          v-if="!isInitiated"
          :style="sponsorCountMapStyle"
          class="overlay-container">
          <div class="overlay-block">
            <TwButton
              label="Start Analysis"
              color="gray-light"
              @press="onInitChart"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Spinner from '~/components/Spinner'
import TwButton from '~/components/TwButton'
import BillCountMap from '~/components/Analytics/BillCountMap'
// Images
import sponsorCountMapBkgd from '~/assets/img/sponsorCountMapBkgd.png'
// Queries
import queryMapUtils from '~/apollo/queries/mapUtils'
import PrefetchBillsByCongressQuery from '~/apollo/queries/Analytics/PrefetchBillsByCongress'
import BillSponsorQuery from '~/apollo/queries/Analytics/BillSponsor'
import _ from 'lodash'

export default {
  components: {
    Spinner,
    TwButton,
    BillCountMap
  },
  props: {},
  data () {
    return {
      isChartLoading: true,
      isInitiated: false,
      congressRange: [this.$store.state.currentCongress-1, this.$store.state.currentCongress],
      mapUtils: null,
      bills: null,
      billsFetched: {},
      sponsorCountMapStyle: `background-image: url("${sponsorCountMapBkgd}"); background-size: cover;`
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    congressMax () {
      return this.$store.state.currentCongress
    },
    congressMin () {
      return this.$store.state.earliestCongress
    },
    congress () {
      let congress = []
      for (var i = this.congressRange[0]; i <= this.congressRange[1]; i++) {
        congress.push(i)
      }
      return congress
    },
    usMap () {
      return JSON.parse(this.mapUtils.usMap)
    },
    stateToFips () {
      return JSON.parse(this.mapUtils.stateToFips)
    },
    fipsToState () {
      return JSON.parse(this.mapUtils.fipsToState)
    }
  },
  mounted () {
    // this.updateChart()
  },
  methods: {
    onInitChart () {
      this.isInitiated = true
      this.updateChart()
    },
    prefetchBillIds ({ congress }) {
      return this.$apollo.query({
        query: PrefetchBillsByCongressQuery,
        variables: { lang: this.locale, congress }
      })
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillSponsorQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    computeRoleOnBill (bills) {
      _.each(bills, bill => {
        if (bill.sponsor) {
          // find correlated sponsor role
          const roles = bill.sponsor.congressRoles
          const sortCngrRoles = _.orderBy(roles, 'endDate', 'desc')
          const sponsoredTime = parseInt(bill.introducedDate)
          bill.sponsor.role = _.find(sortCngrRoles, r => sponsoredTime >= r.startDate && sponsoredTime < r.endDate)
          delete bill.sponsor.congressRoles
        }
      })
    },
    async updateChart () {
      this.isChartLoading = true

      let response = await this.prefetchBillIds({ congress: this.congress })
      let billIds = response.data.bills[0].prefetchIds

      let fetchedBillIds = _.keys(this.billsFetched)
      let newBillIds = _.difference(billIds, fetchedBillIds)

      let chunckedIds = _.chunk(newBillIds, 20)
      let promises = chunckedIds.map(idsSubset => this.fetchBills(idsSubset))
      let apiResult = await Promise.all(promises)
      let newBills = _.cloneDeep(_.flatten(_.map(apiResult, r => r.data.bills)))
      this.computeRoleOnBill(newBills)
      console.log(`newly fetched ${newBills.length} bills`)

      let cachedBillIds = _.intersection(billIds, fetchedBillIds)
      let cachedBills = _.values(_.pick(this.billsFetched, cachedBillIds))

      this.bills = [...cachedBills, ...newBills]

      // update cache
      this.billsFetched = _.merge(this.billsFetched, _.keyBy(newBills, 'id'))

      this.isChartLoading = false
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
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.analytic-card {
  @extend .card;
  margin-bottom: 20px;

  .analytic-card-title {
    @extend .card-title;
  }
}

.analytic-card-info-block {
  @extend .card-info-block;
}

.overlay-container {
  padding-top: 60%;
  position: relative;
  display: flex;
  justify-content: center;

  .overlay-block {
    position: absolute;
    top: 50%;
  }
}

.slider {
  margin: 0 5px;
}

.chart-container {
  position: inherit;
}
</style>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.ivu-slider-bar {
  background: $twIndigo;
}

.ivu-slider-button,
.ivu-slider-button-dragging,
.ivu-slider-button:hover {
  border-color: $twIndigo;
}
</style>
