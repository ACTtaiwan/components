<template>
  <div
    :class="{ phone: isPhone }"
    class="article-card">
    <div
      :style="imgStyle"
      class="article-img"/>
    <a
      :href="article.url"
      target="_blank">
      <h1 class="article-title">
        {{ article.headline | truncate(100) }}
      </h1>
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
      imgStyle: `background-image: url("${this.article.imageUrl}"); background-size: cover;`
    }
  },
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.article-card {
  @extend .card;
  margin-bottom: 20px;
}

.article-title {
  font-size: 1.4em;
  color: $twGrayDark;
  font-weight: $twSemiBold;
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
  margin-top: 20px;

  &:hover {
    color: $twIndigo;
  }
}

.article-img {
  padding-top: 60%;
  border-radius: 10px;
}
</style>
