<template>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
        <div class="setting-progress">
            <div class="read-time-wrapper">
                <span class="read-time-text">{{getReadTime}}</span>    
                <span class="icon-forward"> </span>    
            </div>
          <div class="progress-wrapper">
                <div class="progress-icon-wrapper" @click="preSection">
                    <span class="icon-back"></span>
                </div>
                <input class="progress" type="range"
                                    max="100"
                                    min="0"
                                    step="1"
                                    @change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)"
                                    :value="progress"
                                    :disabled="!bookAvailable"
                                    ref="progress">
                <div class="progress-icon-wrapper" @click="nextSection">
                    <span class="icon-forward"></span>
                </div>
          </div>
          <div class="text-wrapper">
            <span class="section-name">{{sectionName}}</span>
            <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
    import {EbookMixins} from '../../utils/map-getter-utils'
    import {setBookStorage, getBookStorage, getLocalStorage, setLocalStorage} from '../../utils/localstorage'
    export default {
        methods: {
            /**
             * 设置进度
             */
            onProgressChange(progress) {
                this.setProgress(progress).then(()=>{
                    this.displayProgress()
                    this.updateProgressBgSize()
                    setBookStorage(this.fileName,'progress',this.progress)
                })
            },
            /**
             * 设置已读进度背景色
             */
            updateProgressBgSize(){
                this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
            },
            /**
             * 显示分页结果
             */
            displayProgress(){
                const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
                this.currentBook.rendition.display(cfi).then(() => {
                  this.refreshLocation()
                })
            },
            /**
             * 读取章节
             */
            displaySection(){
              setBookStorage(this.fileName,'section',this.section)
              const sectionInfo = this.currentBook.section(this.section)
              if(sectionInfo && sectionInfo.href){
                this.currentBook.rendition.display(sectionInfo.href).then(() => {
                  this.refreshLocation()
                })
              }
            },
            /**
             * 上一章
             */
            preSection(){
              if(this.section>0 && this.bookAvailable){
                this.setSection(this.section-1).then(() => {
                  this.displaySection()
                })
              }
            },
            /**
             * 下一章
             */
            nextSection(){
              if(this.section < this.currentBook.spine.length){
                this.setSection(this.section+1).then(() => {
                  this.displaySection()
                })
              }
            },
            /**
             * 读取进度
             */
            onProgressInput(progress){
                this.setProgress(progress).then(()=>{
                    this.updateProgressBgSize()
                })
            },
             
        },
        mixins: [EbookMixins],
        computed: {
          /**
          * 获取章节名称
          */
          sectionName (val) {
            // let sectionName = ''
          //  if(this.section){
          //    const sectionInfo = this.currentBook.section(this.section)
          //    if(sectionInfo && sectionInfo.href){
          //      sectionName = this.currentBook.navigation.get(sectionInfo.href).label
          //    }
          //  }
           return this.section && this.navigation[this.section] ? this.navigation[this.section].label : ''
         },
         
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
    .setting-progress {
        position: relative;
        width: 100%;
        height: 100%;
        .read-time-wrapper{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: px2rem(40);
            font-size: px2rem(12);
            @include center;
        }
        .progress-wrapper {
          width: 100%;
          height: 100%;
          @include center;
          padding: 0 px2rem(15);
          box-sizing: border-box;

          .progress {
            width: 100%;
            -webkit-appearance: none;
            height: px2rem(2);
            margin: 0 px2rem(10);
            &:focus {
              outline: none;
            }
            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: px2rem(20);
              width: px2rem(20);
              border-radius: 50%;
              background: white;
              box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
              border: px2rem(1) solid #ddd;
            }
          }
        }
        .progress-icon-wrapper{
            font-size: px2rem(20)
        }
        .text-wrapper {
          position: absolute;
          left: 0;
          bottom: px2rem(10);
          width: 100%;
          color: #333;
          font-size: px2rem(12);
          @include center;
          padding: 0 15px;
          .section-name{
            @include ellipsis
          }
        }
      }
  }
</style>