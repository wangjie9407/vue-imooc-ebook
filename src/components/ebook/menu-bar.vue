<template>
  <div>
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <setting-font></setting-font>
    <ebook-font-family-option></ebook-font-family-option>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>

<script>
import SettingFont from './setting-font'
import EbookFontFamilyOption from './ebook-font-family-option'
import EbookSettingTheme from './ebook-setting-theme' 
import EbookSettingProgress from './ebook-setting-progress' 
import EbookSlide from './ebook-slide' 

import {EbookMixins} from '../../utils/map-getter-utils'
export default {
  name: "EbookMenu",
  components:{
      SettingFont,
      EbookFontFamilyOption,
      EbookSettingTheme,
      EbookSettingProgress,
      EbookSlide
  },
  methods:{
      showSetting(key){
          this.setSettingVisible(key)
      },
  },
  mixins:[
      EbookMixins
  ],
  
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      font-size: px2rem(22);
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }
</style>