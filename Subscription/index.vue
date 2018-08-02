<template>
  <div class="subscriptions">
    <div :style="{ 'background-image': 'url(' + waves + ')' }" class="content-wrapper" >
      <div class="title">Get Updates</div>
      <div v-if="!(isTablet || isPhone)" class="description">American Citizens for Taiwan articles, Congressional tool, Congressional Guide, and TaiwaneseCulture.org site remain free, but take an enormous time each month to research, write and post, and thousands of dollars to sustain. If you find any value in what we do, become a Friend of ACT by supporting with a recurring monthly donation of your choosing, between a cup of tea and a good dinner, to help American Citizens for Taiwan educate Americans about Taiwan and continue to press our government to strengthen U.S.-Taiwan relations and be fully supportive of Taiwan’s right to self-determination.</div>
      <div v-if="isTablet || isPhone" class="placeholder"/>
      <div class="email-btn-wrapper">
        <input v-model="email" :disabled="state === 'loading'" type="email" placeholder="your email" name="email" class="box-email">
        <Button :loading="state === 'loading'" :icon="(state === 'done') ? 'checkmark-round' : null" type="primary" class="sub-btn" @click="toLoading">
          <span v-if="state === 'none'">Subscribe</span>
          <span v-if="state === 'loading'">Saving...</span>
          <span v-if="state === 'done'">Thanks!</span>
        </Button>
      </div>
    </div>
  </div>  
</template>

<script>
import Vue from 'vue'
import waves from '~/assets/img/wave-white.svg'
export default {
  data () {
    return {
      waves,
      state: 'none',
      email: null
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    }
  },
  methods: {
    toLoading () {
      this.state = 'loading';
      setTimeout(() => {
        this.state = 'done';
        this.email = null;
        setTimeout(() => {
          this.state = 'none';
        }, 1000);
      }, 3000);
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/colors';
@import 'assets/css/typography';

.subscriptions {
  background-image: linear-gradient(116deg, #83c2f6, #4c8fea);

  .content-wrapper {
    background-position: center;
    background-size: cover;
    text-align: center;
    height: 100%;
    padding: 46px 0;

    .title {
      color: $twWhite;
      font-weight: $twMedium;
      font-size: 24px;
    }

    .description {
      font-size: 16px;
      line-height: 1.31;
      color: $twWhite;
      padding: 22px 0 26px 0;
      width: 60vw;
      margin: auto;
    }

    .email-btn-wrapper {
      height: 32px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      margin: 0 10px;
    }

    .sub-btn {
      background-color: $twWhite;
      border-color: $twWhite;
      color: $twBlueDark;
      font-size: 18px;
      font-weight: $twMedium;
      height: 32px;
      padding: 0 12px;
      border-radius: 0 2px 2px 0;
    }

    .box-email {
      width: 320px;
      height: 32px;
      border-radius: 2px 0 0 2px;
      border: solid 1px #ffffff;
      background: transparent;
    }

    input[type="email"] {
      text-align: center;
      color: white;
      font-size: 18px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #ffffff;
        text-align: center;
        opacity: 0.8;
        font-size: 18px;
      }
    }
  }

  .placeholder {
    height: 20px;
  }
}
</style>