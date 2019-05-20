<template>
  <div class="social-media-card">
    <a :href="source.url" target="_blank">
      <div class="card-content">
        <div :class="cardHeaderClass">
          <p class="title">{{ source.title }}</p>
        </div>
        <div class="card-body">
          <p class="description">{{ source.description }}</p>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    source: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    cardHeaderClass () {
      const classes = ['card-header']
      const srcClass = {
        fb: 'fb-card',
        ig: 'ig-card',
        line: 'line-card',
        medium: 'medium-card'
      }[this.source.name]

      if (srcClass) {
        classes.push(srcClass)
      }

      return classes
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.social-media-card {
  @extend .card;

  padding: 0;
  margin-bottom: 20px;
}

.card-content {
  min-height: 120px;
  // height: 160px;

  .card-header {
    height: 60px;
    color: white;

    font-size: 20px;
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: center;

    p {
      transform: skewY(-2deg);
    }

    &.fb-card {
      background: linear-gradient(#00b4ff, #0170ff);
    }

    &.ig-card {
      background: linear-gradient(#3e44ec, #f23266, #edc668);
    }

    &.line-card {
      background: #00b900;
    }

    &.medium-card {
      background: #1c1b1a;
    }

    clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  }

  .card-body {
    padding: 20px;

    .description {
      color: $twGrayDark;
      text-align: left;
      font-size: 16px;
      font-weight: 400;
    }
  }
}

// phone
@media screen and (max-width: $smallDeviceWidth - 1) {
  .card {
    margin-left: 0px;
    margin-right: 0px;
    border-radius: 5px;
  }
}
</style>
