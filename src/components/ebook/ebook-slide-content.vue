<template>
    <div class="ebook-slide-contents">
        <div class="slide-contents-search-wrapper">
            <div class="slide-contents-search-input-wrapper">
                <div class="slide-contents-search-icon">
                    <span class="icon-search"></span>
                </div>
                <input class="slide-contents-seearch-input" 
                       type="text" 
                       :placeholder="$t('book.searchHint')"
                       @click="showSearchpage">
            </div>
            <div class="slide-contents-search-cancel" v-if="searchPage" @click="hideSearchpage">{{$t('book.cancel')}}</div>
        </div>
        <div class="slide-contents-book-wrapper">
            <div class="slide-contents-book-img-wrapper">
                <img :src="cover" class="slide-contents-book-img">
            </div>
            <div class="slide-contents-book-info-wrapper">
                <div class="slide-contents-book-title">{{metaData.title}}</div>
                <div class="slide-contents-book-author">{{metaData.creator}}</div>
            </div>
            <div class="slide-contents-book-progress-wrapper">
                <div class="slide-contents-book-progress">
                    <span class="progress">{{progress + '%'}}</span>
                    <span class="progress-text">{{$t('book.haveRead2')}}</span>
                </div>
                <div class="slide-contents-book-time">{{getReadTime}}</div>
            </div>
        
        
        </div>
        <scroll class="slide-contents-list"
                :top="158"
                :bottom="48"
                ref="scroll">
                <div class="slide-contents-item"
                     v-for="(item,index) in navigation" :key="index" 
                     :style="contentItemStyle(item.level)">
                    <span :class="[{selected: section === index},'slide-contents-item-label']"
                          @click="displayNavigation(item.href)">{{item.label}}</span>
                    <span class="slide-contents-item-page"></span>
                </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from '../common/Scroll'

    import {EbookMixins} from '../../utils/map-getter-utils'
    import { px2rem } from '../../utils/css-utils'
    export default {
        name: 'EbookSlideContent',
        mixins: [EbookMixins],
        components: {
            Scroll,
        },
        data() {
            return {
                searchPage: false,
            }
        },
        methods: {
            hideSearchpage() {
                this.searchPage = false
            },
            showSearchpage(){
                this.searchPage = true
            },
            contentItemStyle(level){
                return {
                    marginLeft: `${px2rem(15 * level)}rem`
                }
            },
            displayNavigation(target){
                this.display(target,() => {
                    this.hideEbookMenu()
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.ebook-slide-contents{
    font-size: 0;
    width: 100%;
    .slide-contents-search-wrapper{
        display: flex;
        width: 100%;
        height: px2rem(36);
        margin: px2rem(20) 0 px2rem(10) 0;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-contents-search-input-wrapper{
            flex: 1;
            @include center;
            
            .slide-contents-search-icon{
                flex: 0 0 px2rem(28);
                font-size: px2rem(12);
                @include center;
            }
            .slide-contents-seearch-input{
                flex: 1;
                width: 100%;
                height: px2rem(32);
                font-size: px2rem(14);
                border: none;
                background-color: transparent;
                &:focus{
                    outline: none;
                }
            }
        }
        .slide-contents-search-cancel{
           flex: 0 0 px2rem(50);
           font-size: px2rem(14);
           @include right; 
        }
    }
    .slide-contents-book-wrapper{
        display: flex;
        width: 100%;
        height: px2rem(90);
        padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
        .slide-contents-book-img-wrapper{
            flex:0 0 px2rem(45);
            .slide-contents-book-img{
                width: px2rem(45);
                height: px2rem(60);
            }
        }
        .slide-contents-book-info-wrapper{
            flex: 1;
            padding: 0 px2rem(10);
            box-sizing: border-box;
            .slide-contents-book-title{
                font-size: px2rem(14);
                width: px2rem(153.75);
                line-height: px2rem(16);
                @include ellipsis2(3);
            }
            .slide-contents-book-author{
                width: px2rem(153.75);
                @include ellipsis;
                font-size: px2rem(12);
                margin-top: px2rem(5);
            }
        }
        .slide-contents-book-progress-wrapper{
            flex:0 0 px2rem(80);
            .slide-contents-book-progress{
                .progress{
                    font-size: px2rem(14);
                }
                .progress-text{
                    font-size: px2rem(12);
                }
            }
            .slide-contents-book-time{
                margin-top: px2rem(5);
                font-size: px2rem(12);
            }
        }
    }
    .slide-contents-list{
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-contents-item{
            display: flex;
            font-size: px2rem(14);
            line-height: px2rem(16);
            .slide-contents-item-label{
                flex: 1;
                padding: px2rem(20) 0;
                box-sizing: border-box;
                @include ellipsis;
            }
            .slide-contents-item-page{}
        }
    }
}
</style>