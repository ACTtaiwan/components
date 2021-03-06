<template>
  <Row :gutter="20">
    <i-col :xs="{ span: 24 }" class="filter-block">
      <h2 class="filter-title">{{ $t('BillsFilters.labelSearchTitle') }}</h2>
      <div class="filter-field-block">
        <div class="filter-field">
          <span class="filter-field-title">{{ $t('BillsFilters.labelFrom') }}</span>
          <InputNumber
            v-model="filterData.congressFrom"
            :min="congressMin"
            :max="congressMax"
            class="filter-field-value"
            @on-change="clearErros"/>
        </div>
        <div class="filter-field">
          <span class="filter-field-title">{{ $t('BillsFilters.labelTo') }}</span>
          <InputNumber
            v-model="filterData.congressTo"
            :min="congressMin"
            :max="congressMax"
            class="filter-field-value"
            @on-change="clearErros"/>
        </div>
      </div>
      <div
        v-if="errors.congressError !== ''"
        class="formErrorBlock">
        {{ errors.congressError }}
      </div>
    </i-col>
    <!-- <i-col :xs="{ span: 24 }" class="filter-block">
      <h2 class="filter-title">Category</h2>
      <Select
        v-model="filterData.selectedCategories"
        multiple
        placeholder="select bill categories"
        @on-change="onCategorySelect">
        <Option
          v-for="category in categories"
          :value="category.id"
          :key="category.id">{{ category.name }}</Option>
      </Select>
    </i-col> -->
    <!-- <Col :span="this.isTablet ? 12 : 24" class="filter-block" :class="{ tablet: this.isTablet }">
      <h2 class="filter-title">Sponsor</h2>
      <Select v-model="filterData.selectedSponsorId" @on-change="onSponsorSelect" clearable remote :remote-method="getSponsorSuggestList" placeholder="select a sponsor">
        <Option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</Option>
      </Select>
    </Col> -->
    <i-col
      :span="24"
      class="filter-block">
      <TwButton
        :loading="loading"
        :label="$t('BillsFilters.btnTitleSearch')"
        @press="submit"/>
    </i-col>
  </Row>
</template>

<script>
import TwButton from '~/components/TwButton'

export default {
  components: {
    TwButton
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    console.log(this.loading)
    return {
      filterData: {
        congressFrom: this.$store.state.currentCongress,
        congressTo: this.$store.state.currentCongress,
        selectedCategories: [],
        selectedSponsorId: ''
      },
      errors: {
        congressError: ''
      }
    }
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    congressMax () {
      return this.$store.state.currentCongress
    },
    congressMin () {
      return this.$store.state.earliestCongress
    }
  },
  methods: {
    onCategorySelect (selected) {
      console.log('select category', this.filterData.selectedCategories)
    },
    onSponsorSelect () {},
    getSponsorSuggestList () {},
    clearErros () {
      for (var property in this.errors) {
        this.errors[property] = ''
      }
    },
    submit () {
      let ok = true
      this.clearErros()

      // check congress
      if (!this.filterData.congressTo || !this.filterData.congressFrom) {
        this.errors.congressError = 'Please specify the range for congress'
        ok = false
      }

      if (this.filterData.congressTo < this.filterData.congressFrom) {
        this.errors.congressError = 'Initial congress is greater than ending congress'
        ok = false
      }

      if (ok) {
        this.$emit('on-filter', this.filterData)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.filter-block {
  margin-bottom: 20px;

  .filter-title {
    color: $twGrayDark;
    font-size: 1.2em;
    font-weight: $twBold;
    margin-bottom: 10px;
  }

  .filter-field-block {
    display: flex;
    align-items: center;

    .filter-field {
      display: flex;
      align-items: center;
      width: 100%;
      margin-right: 10px;

      &:last-child {
        margin-right: 0px;
      }

      .filter-field-title {
        font-size: 12px;
        font-weight: $twSemiBold;
        color: $twGrayLight;
        margin-right: 10px;
      }

      .filter-field-value {
        min-width: 30px;
        width: 100%;
      }
    }
  }
}
</style>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.formErrorBlock {
  margin-top: 5px;
  color: $twRed;
  font-weight: $twRegular;
  font-size: 12px;
}
</style>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.ivu-input-number-input {
  font-weight: $twMedium;
  color: $twGrayDark;
}

.ivu-select-placeholder {
  font-weight: $twMedium !important;
  color: $twGrayLight !important;
}

.ivu-select-multiple .ivu-select-selection {
  padding: 0 24px 1px 4px;

  .ivu-tag {
    height: 24px;
  }
}

.ivu-select-dropdown-list {
  .ivu-select-item {
    font-weight: $twMedium;
    color: $twGrayDark;
    margin: 2px 0;

    &.ivu-select-item-selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 28px;
      background: none;

      &:after {
        color: $twIndigo;
        display: inline-block;
        font-family: Ionicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        -webkit-font-feature-settings: normal;
        font-feature-settings: normal;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        float: right;
        font-size: 24px;
        content: '\F3FD';
      }
    }
  }
}

.ivu-select-selected-value {
  font-weight: $twMedium;
  color: $twGrayDark;
}

.ivu-tag-text {
  font-weight: $twMedium;
  color: $twGrayDark;
}
</style>
