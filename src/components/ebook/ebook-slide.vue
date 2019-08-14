<template>
    <transition name="fade-slide-right">
        <div class="slide-content-wrapper " v-show="menuVisible && settingVisible === 3">
                <div class="content" v-if="settingVisible === 3">
                    <div class="content-page-wrapper">
                        <div class="content-page">
                            <component :is="currentTab === 1? content : bookmark"></component>
                        </div>
                        <div class="content-page-tab">
                            <div :class="['content-page-tab-item',{'selected':currentTab === 1}]" @click="selectTab(1)">{{$t('book.navigation')}}</div>
                            <div :class="['content-page-tab-item',{'selected':currentTab === 2}]" @click="selectTab(2)">{{$t('book.bookmark')}}</div>
                        </div>
                    </div>
                </div>
            <div class="content-bg" @click="hideEbookMenu"></div>
        </div>
    </transition>
</template>

<script>
    import content from './ebook-slide-content'
    import bookmark from './ebook-slide-bookmark'

    import {EbookMixins} from '../../utils/map-getter-utils'
    export default {
        mixins: [EbookMixins],
        data() {
            return {
                currentTab: 1,
                content: content,
                bookmark: bookmark
            }
        },
        methods: {
           selectTab (val) {
                this.currentTab = val
            },
        },
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.slide-content-wrapper{
    position: absolute;
    z-index: 300;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    display: flex;
    .content{
        flex:0 0 85%;
        width: 85%;
        height: 100%;
        .content-page-wrapper{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            .content-page{
                flex: 1;
                width: 100%;
                overflow: hidden;
            }
            .content-page-tab{
                flex: 0 0 px2rem(48);
                width: 100%;
                display: flex;
                border-top: px2rem(1) solid #ccc;
                .content-page-tab-item{
                    flex: 1;
                    font-size: px2rem(12);
                    @include center;
                }
            }
        }
    }
    .content-bg{
        flex:0 0 15%;
        width: 15%;
        height: 100%;
    }
}
</style>