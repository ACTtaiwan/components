<template>
  <div>
    <p v-if="!isAuthenticated">
      <nuxt-link :to="path(this, '/auth/login')">Login</nuxt-link>
    </p>
    <p v-else>
      {{ loggedUser ? loggedUser.email : 'Please provide an email.' }} <nuxt-link :to="path(this, '/auth/logout')">Logout</nuxt-link>
    </p>
  </div>
</template>

<script>
import { show } from '@/plugins/lock'
import { path } from '@/plugins/utils'

export default {
  middleware: 'authenticated',
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    loggedUser () {
      return this.$store.getters.loggedUser
    },
  },
  methods: {
    path
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.content {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
}
</style>
