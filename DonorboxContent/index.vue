<template>
  <div>
    <h1 class="title">👍🏻 Be a Friend of ACT </h1>
    <div class="content">
      <div class="content-block donate-form">
        <script src="https://donorbox.org/widget.js" paypalExpress="false"/>
        <iframe
          src="https://donorbox.org/embed/support-american-citizens-for-taiwan-foundation?default_interval=m" height="685px" width="100%" style="max-width:500px; min-width:310px; max-height:none!important" seamless="seamless" name="donorbox"
          frameborder="0" scrolling="no" allowpaymentrequest/>
      </div>
      <div class="content-block info-sec">
        <div class="text">
          <p>Become a <b>Friend of ACT</b> by supporting with a recurring monthly donation of your choosing, between a cup of tea and a good dinner, to help American Citizens for Taiwan educate Americans about Taiwan and continue to press our government to strengthen U.S.-Taiwan relations and be fully supportive of Taiwan’s right to self-determination.</b></b></p>
          <p>We are all volunteer staff, so we maximize your impact, every penny counts.</p>
        </div>
        <img :src="spendingChart" class="spending-chart">
      </div>
    </div>
    <div class="legal">
      <p>American Citizens for Taiwan Foundation is exempt from federal income taxes under Section 501(c)(3) of the Internal Revenue Code, therefore your gift is tax-deductible to the full extent provided by law. Our federal tax identification number is 90-1025980. You should consult your financial planner or tax adviser to determine the exact tax advantages of any gift you are considering. We provide a receipt for all online gifts that can be used to claim a tax deduction.</p>
    </div>
  </div>
</template>

<script>
import spendingChart from '~/assets/img/spending-2017.png'

export default {
  data () {
    return {
      spendingChart
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/app';
@import 'assets/css/colors';

.title {
  margin: 10px 15px 25px;
  font-size: 26px;
  color: #111111;
  font-weight: 600;
  text-align: center;
}

.content {
  margin: 0 15px;
  display: flex;

  .donate-form {
    flex: 1;
    text-align: center;
  }

  .info-sec {
    margin-left: 30px;
    flex: 1;
    text-align: center;

    .spending-chart {
      width: 80%;
    }

    p {
      text-align: left;
      font-size: 14px;
      color: #111111;
      margin-bottom: 10px;
    }
  }
}

.legal {
  border-top: $twGrayLighter 2px solid;
  margin: 0 15px;
  padding: 15px 0 10px;
  font-size: 12px;
  color: $twGrayLight;
}

// tablet
@media screen and (max-width: $mediumDeviceWidth - 1) {
  .content {
    flex-direction: column;

    .info-sec {
      margin-left: 0;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .text {
        max-width: 420px;
      }

      .spending-chart {
        max-width: 340px;
      }
    }
  }
}

// phone
@media screen and (max-width: $smallDeviceWidth - 1) {
  .content {
    margin: 25px 0 0 0;

    .info-sec {
      margin-left: 0;
      padding: 0;
      margin-bottom: 30px;
    }
  }
  .legal {
    margin: 0;
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
  }
}
</style>
