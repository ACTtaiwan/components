<template>
  <div class="content-wrapper">
    <div class="content">
      <div class="content-block donate-form">
        <script src="https://donorbox.org/widget.js" paypalExpress="false"/>
        <iframe
          :src="url" height="400px" width="100%" style="max-width:400px; min-width:310px; max-height:590px!important" seamless="seamless" name="donorbox"
          frameborder="0" scrolling="no" allowpaymentrequest/>
      </div>
      <div v-if="config === 'act'" class="content-block info-sec">
        <h1 class="title">👍🏻 Be a Friend of ACT </h1>
        <div class="text">
          <p>Become a <b>Friend of ACT</b> by supporting with a recurring monthly donation of your choosing, between a cup of tea and a good dinner, to help American Citizens for Taiwan educate Americans about Taiwan and continue to press our government to strengthen U.S.-Taiwan relations and be fully supportive of Taiwan’s right to self-determination.</b></b></p>
          <p>We are all volunteer staff, so we maximize your impact, every penny counts.</p>
        </div>
        <img :src="spendingChartUrl" class="spending-chart">
      </div>
      <div v-if="config === 'ustw'" class="content-block info-sec">
        <h1 class="title">👍🏻謝謝您成為我們的朋友 </h1>
        <img :src="ustwImage2" class="spending-chart ustw-img">
        <div class="text">
          <p><b>美國國會台灣觀測站（U.S. Taiwan Watch）</b>是一個開源（open source）專案，所有國會資料皆取自於公開授權平台，而我們網站上的資料，乃至於原始碼也都會是開源，以回饋社群。</p>
          <p>我們的團隊由一群工程師、設計師、以及政治研究學者組成，目前都是用義務兼職的方式貢獻專案。如果你支持我們的專案，卻不知該如何貢獻，捐款會是對我們直接的鼓勵，讓網站可以持續營運下去，並在未來產出更多實用和有影響力的內容。</p>
        </div>
        <img :src="ustwImage" class="spending-chart ustw-img">
      </div>
    </div>
    <div class="legal">
      <p>{{ legal }}</p>
    </div>
  </div>
</template>

<script>
// libraries
import appConfig from '~/config/app.json'

import ustwImage from '~/assets/img/donation-ustw.png'
import ustwImage2 from '~/assets/img/donation-ustw-2.png'

export default {
  props: {
    config: {
      type: String,
      required: false,
      default: 'act'
    }
  },
  data () {
    return {
      spendingChartUrl: `${appConfig.assets.baseUrl}/act-spending-2017.png`,
      ustwImage,
      ustwImage2,
      configSettings: {
        'act': {
          legal: 'American Citizens for Taiwan Foundation is exempt from federal income taxes under Section 501(c)(3) of the Internal Revenue Code, therefore your gift is tax-deductible to the full extent provided by law. Our federal tax identification number is 90-1025980. You should consult your financial planner or tax adviser to determine the exact tax advantages of any gift you are considering. We provide a receipt for all online gifts that can be used to claim a tax deduction.',
          url: 'https://donorbox.org/embed/support-american-citizens-for-taiwan-foundation?default_interval=m'
        },
        'ustw': {
          legal: '美國國會台灣觀測站（U.S. Taiwan Watch）為美台會（American Citizens for Taiwan, ACT）管理之專案，捐款收據開立方為美台會，所以屆時收據上American Citizens for Taiwan。 美台會根據《國內稅收法》第501(c)(3)條免除聯邦所得稅，因此您的禮物可在法律規定的全部範圍內免稅。我們的聯邦稅號為90-1025980。您應諮詢您的理財規劃師或稅務顧問，以確定您正在考慮的任何禮品的確切稅收優惠。我們提供可用於申請減稅的所有在線禮品的收據。',
          url: 'https://donorbox.org/embed/ustw?default_interval=m'
        }
      }
    }
  },
  computed: {
    legal () {
      return this.configSettings[this.config].legal
    },
    url () {
      return this.configSettings[this.config].url
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/app';
@import 'assets/css/colors';

.title {
  margin-bottom: 15px;
  font-size: 20px;
  color: #111111;
  font-weight: 600;
  text-align: center;
}

.content {
  margin: 15px;
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
      width: 70%;
      max-width: 300px;
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

.ustw-img {
  padding: 15px 0;
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
