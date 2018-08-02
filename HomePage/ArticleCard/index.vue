<template>
  <div
    :class="{ phone: isPhone, 'img-no-margin': imgNoMargin }"
    class="article-card">
    <a
      :href="article.url"
      target="_blank">
      <div class="article-img-wrapper">
        <div
          :style="imgStyle"
          class="article-img"/>
      </div>
      <div class="card-content">
        <div v-if="showAuthor && article.author" class="card-font article-author">
          {{ article.author }}
        </div>
        <div v-if="showDate && displayDate" class="card-font article-date">
          {{ displayDate }}
        </div>
        <div :class="{ 'fix-height': onlyShowTitle }" class="card-font article-title">
          {{ article.headline }}
        </div>
        <div v-if="showSubtitle && article.subhead" class="card-font article-subtitle">
          {{ article.subhead }}
        </div>
        <div v-if="showIntro && article.intro" class="card-font article-intro" v-html="article.intro"/>
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
    },
    showSubtitle: {
      type: Boolean,
      default: false
    },
    showAuthor: {
      type: Boolean,
      default: false
    },
    showDate: {
      type: Boolean,
      default: false
    },
    showIntro: {
      type: Boolean,
      default: false
    },
    imgNoMargin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imgStyle: `background-image: url("${this.article.imageUrl}"); background-size: cover;`
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
    },
    onlyShowTitle () {
      return !(this.showSubtitle || this.showAuthor || this.showDate || this.showIntro)
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

$spacer: 20px;
$zoomScale: 1.07;

.article-card {
  @extend .card;
  margin-bottom: $spacer;
}

.card-content {
  margin-top: $spacer;
}

.card-font {
  overflow: hidden;
  color: $twGrayDark;
  line-height: 1.5em;

  &:hover {
    color: $twIndigo;
  }

  &+.card-font:not(.article-intro) {
    margin: 5px auto;
  }
}

.fix-height {
  height: 3em;
}

.article-author {
  font-size: .8em;
  font-weight: $twRegular;
  color: $twGrayLight;
}

.article-date {
  font-size: .8em;
  font-weight: $twRegular;
  color: $twGrayLight;
}

.article-title {
  font-size: 1.4em;
  font-weight: $twSemiBold;
}

.article-subtitle {
  font-size: 1em;
  font-weight: $twMedium;
}

.article-intro {
  font-weight: $twRegular;
  color: $twGray;
  margin-top: 15px;
}

.article-img {
  padding-top: 60%;
  transition: transform .4s;

  &.article-img:hover {
    -ms-transform: scale($zoomScale); /* IE 9 */
    -webkit-transform: scale($zoomScale); /* Safari 3-8 */
    transform: scale($zoomScale); 
  }
}

.article-img-wrapper {
  overflow: hidden;
}

.article-img-wrapper,
.article-img {
  border-radius: 10px;
}

.img-no-margin {
  &.article-card {
    padding: 0;
  }

  .card-content {
    padding: 0 $spacer $spacer $spacer;
  }

  .article-img-wrapper,
  .article-img {
    border-radius: 5px 5px 0 0;
  }
}

// phone
@media screen and (max-width: $smallDeviceWidth - 1) {
  .img-no-margin {
    .article-img,
    .article-img-wrapper {
      border-radius: 0;
    }
  }
}

</style>
