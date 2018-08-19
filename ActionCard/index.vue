<template>
  <div
    class="action-card">
    <a
      @click="press">
      <div class="card-img-wrapper">
        <img
          :src="card.imageUrl"
          class="card-img">
        </img>
      </div>
      <div class="card-content">
        <TwButton v-if="showTitle && card.title" :label="card.title" fontSize="1.3em" width="84%" height="100%" class="action-btn"/>
        <div v-if="showSubtitle && card.subtitle" class="card-subtitle">
          {{ card.subtitle }}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
// components
import TwButton from '~/components/TwButton'

export default {
  components: {
    TwButton
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    showImage: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    showSubtitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    press () {
      this.$emit('press')
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.action-card {
  width: 300px;
  padding: 20px;

  &:hover {
    @extend .card;
  }

  &:not(:hover) .action-btn {
    color: #515a6e;
    background: transparent;
  }
}

.action-btn {
  margin-top: 20px;
}

.card-img-wrapper {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  background-color: $twBlueLightest;
  display: flex;
  justify-content: center;
  align-items: center;

  .card-img {
    width: 60%;
    height: 60%;
    margin: auto;
  }
}

.card-subtitle {
  font-size: 16px;
  font-weight: $twRegular;
  color: $twGray;
  margin-top: 15px;
}

</style>
