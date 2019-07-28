<template>
    <div>
        <transition name="slide-up">
            <div class="setting-wrapper" v-show="menuVisible && settingVisible===1">
                <div class="setting-theme">
                  <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
                    <div class="preview" 
                      :style="{background: item.style.body.background}" 
                      :class="{'no-border': item.style.body.background !== '#fff'}">
                      </div>
                    <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
                  </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {EbookMixins} from '../../utils/map-getter-utils.js'
    import {setLocalStorage} from '../../utils/localstorage'
    import {addCssFile} from '../../assets/enum/font-size'
    export default {
        mixins:[EbookMixins],
        computed: {
        },
        data() {
            return {
            }
        },
        methods: {
            setTheme(index) {
                const theme = this.themeList[index]
                this.setDefaultTheme(theme.name)
                this.themeList.forEach(theme => {
                    this.currentBook.rendition.themes.register(theme.name,theme.style)
                })
                this.currentBook.rendition.themes.select(this.defaultTheme)
                addCssFile(`${process.env.VUE_APP_SOURCE_URL}theme/${theme.href}`)
                setLocalStorage('theme',theme)
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;

          }
        }
      }
    }
  }
</style>