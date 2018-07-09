<template>
  <header>
    <Menu
      :active-name="activeMenuItem"
      mode="horizontal"
      theme="light">
      <div class="header-wrapper">
        <div
          :class="{isMenuOpen: isMenuOpen}"
          class="header-menu-hamburger"
          @click="onHamburgerClick">
          <span/>
        </div>
        <Logo/>
        <div
          :class="{isMenuOpen: isMenuOpen}"
          class="header-nav">
          <!-- MENU -->
          <div class="header-menu">
            <router-link
              :class="{'menu-item-selected': activeMenuItem === 'bills'}"
              :to="`/bills`"
              class="menu-item">
              <MenuItem name="bills" >
              {{ $t('site.menu.billItemText') }}
              </MenuItem>
            </router-link>
            <router-link
              :class="{'menu-item-selected': activeMenuItem === 'members'}"
              :to="`/members`"
              class="menu-item">
              <MenuItem name="members">
              {{ $t('site.menu.congressMemberItemText') }}
              </MenuItem>
            </router-link>
          </div>
          <!-- INFO -->
          <div class="header-info">
            <UserInfo/>
          </div>
        </div>
      </div>
    </Menu>
  </header>
</template>

<script>
import Logo from './Logo'
import UserInfo from './UserInfo'

export default {
  components: {
    Logo,
    UserInfo
  },
  props: {},
  data () {
    return {
      isMenuOpen: false
    }
  },
  computed: {
    localeStrippedPath () {
      let regex = new RegExp('/' + this.$i18n.locale + '/', 'g')
      return this.$route.fullPath.replace(regex, '/')
    },
    activeMenuItem () {
      let currentItem = this.localeStrippedPath.split('/')[1]
      return currentItem === '' ? 'home' : currentItem
    }
  },
  methods: {
    onHamburgerClick (event) {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
}

.header-wrapper {
  display: flex;
  justify-content: center;
  @extend .pageWrapper-large;
}

.header-nav {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.header-menu-hamburger {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  display: block;
  transform: translate(0);
  padding: 13px 20px 0;

  &.isMenuOpen span {
    opacity: 0;
  }

  span {
    background: $twBlack;
    border-radius: 3px;
    content: '';
    display: block;
    height: 2px;
    margin: 7px 0;
    transition: all 0.2s ease-out;
    transform-origin: 50% 50%;
    width: 26px;
  }

  &.isMenuOpen:before {
    transform: rotate(45deg) translate(4px, 8px);
  }

  &.isMenuOpen:after {
    transform: rotate(-45deg) translate(4px, -8px);
  }

  &:before {
    background: $twBlack;
    border-radius: 3px;
    content: '';
    display: block;
    height: 2px;
    margin: 7px 0;
    transition: all 0.2s ease-out;
    transform-origin: 50% 50%;
    width: 26px;
  }

  &:after {
    background: $twBlack;
    border-radius: 3px;
    content: '';
    display: block;
    height: 2px;
    margin: 7px 0;
    transition: all 0.2s ease-out;
    transform-origin: 50% 50%;
    width: 26px;
  }
}

.header-menu {
  display: flex;
  justify-content: center;
}

.menu-item {
  .ivu-menu-item {
    color: $twBlack;
    font-weight: $twMedium;
    font-size: 1.1em;

    &:hover {
      border-bottom: none;
    }
  }
}

.menu-item-selected {
  .ivu-menu-item {
    border-bottom: none;
  }
}

.header-info {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: #{$largeDeviceWidth}) {
  .header-nav {
    opacity: 0;
    transition: opacity 0.3s;
    visibility: hidden;
    background-color: #4a505e;
    color: #fff;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    flex-direction: column;
    justify-content: flex-start;

    &.isMenuOpen {
      opacity: 1;
      visibility: visible;
    }
  }

  .header-menu {
    margin-top: 20px;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
  }

  .menu-item {
    width: 100%;
    display: flex;
    justify-content: center;

    .ivu-menu-item {
      font-size: 1.15em;
    }
  }
}

@media screen and (min-width: $largeDeviceWidth + 1) {
  .header-menu-hamburger {
    display: none;
  }
}
</style>
