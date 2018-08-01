<template>
  <div :class="{ phone: isPhone }" class="article-card">
    <a :href="article.url" target="_blank">
      <div :style="imgStyle" class="article-img">
        <div class="card-content">
          <div class="card-font article-title">
            {{ article.headline }}
          </div>
          <div class="card-font article-subtitle">
            {{ article.subhead }}
          </div>
          <div class="card-font article-author">
            {{ article.author }}
          </div>
          <div class="card-font article-date">
            {{ displayDate }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      imgStyle: `background-image: linear-gradient(180deg, rgb(0, 0, 0, 0), rgb(0, 0, 0, 1)), url("${this.article.imageUrl}");`
    }
  },
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    displayDate () {
      let str = '';
      if (this.article.date) {
        let thisYear = new Date().year
        let d = new Date(parseInt(this.article.date))
        let yearStyle = (d.year !== thisYear) ? 'numeric' : undefined
        str += d.toLocaleDateString(this.$store.locale, {month: 'short', day: 'numeric', year: yearStyle})
      }
      return str
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

$marginSide: 60px;

.article-card {
  position: relative;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: $marginSide;
  margin: 20px auto;
  overflow: hidden;
  width: calc(100% - #{2 * $marginSide})
}

.article-img {
  background-size: cover;
  background-position: center;
  height: 100%;
}

.card-font {
  color: $twWhite;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.article-title {
  font-size: 1.8em;
  font-weight: $twSemiBold;
}

.article-subtitle {
  font-size: 1.2em;
  font-weight: $twMedium;
}

.article-author {
  font-size: .8em;
  font-weight: $twRegular;
}

.article-date {
  font-size: .8em;
  font-weight: $twRegular;
}

</style>
