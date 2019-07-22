<template>
    <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
        <div class="ebook-popup-title">
            <div class="title-icon" @click="hideFontFamilyOpt">
                <span class="icon-down2"></span>
            </div>
            <div class="title-text">
                {{$t('book.selectFont')}}
            </div>
        </div>
        <div class="ebook-popup-list-wrapper">
            <div :class="['ebook-popup-item',{isCHeck:currentCheck === index} ]" @click="checkFont(fontItem,index)" v-for="(fontItem,index) in fontFamilyList" :key="index">
                <div class="item-font">{{fontItem.font}}</div>
                <div class="item-icon icon-check" v-show="currentCheck === index"></div>
            </div>
        </div>
    </div>
    </transition>

</template>

<script>
    import {EbookMixins} from '../../utils/map-getter-utils'
    import {FONT_FAMILY_LIST} from '../../assets/enum/font-size'
  	import {setBookStorage, getBookStorage} from '../../utils/localstorage'
    export default {
        name:'EbookFontFamilyOption',
        mixins:[EbookMixins],
        mounted(){
            const fontfamily = getBookStorage(this.fileName,'fontFamily')
            const idnex = FONT_FAMILY_LIST.findIndex( item => item.font === fontfamily)
            if ((idnex === -1) || fontfamily === 'Cabin') {
                this.currentCheck = 0
            } else {
                this.currentCheck = idnex
            }
        },
        data(){
            return{
                fontFamilyList:FONT_FAMILY_LIST,
                currentCheck: 0
            }
        },
        methods:{
            /**
             * 隐藏字体栏
             */
            hideFontFamilyOpt(){
                this.setFontFamilyVisible(false)
            },
            /**
             * 设置字体
             */
            checkFont(fontItem,index){
                this.currentCheck = index
                let fontfamily = fontItem.font
                if(fontfamily === 'Default'){
                    fontfamily = 'Cabin'
                    this.currentBook.rendition.themes.font('Cabin')
                } else {
                    this.setDefaultFontFamily(fontItem.font)
                    this.currentBook.rendition.themes.font(this.defaultFontFamily)
                }
                this.hideFontFamilyOpt()
                setBookStorage(this.fileName,'fontFamily',fontfamily)
                const font = getBookStorage(this.fileName,'fontFamily',fontfamily)
                console.log('fontFamily',font );
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.ebook-popup-list{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 300;
    background-color: white;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
    .ebook-popup-title{
        display: flex;
        padding: px2rem(15);
        box-sizing: border-box;
        border-bottom: px2rem(1) solid #ccc;
        font-weight: bold;
        font-size: px2rem(16);
            
        .title-text{
            flex: 1;
            text-align:center;
        }
    }
    .ebook-popup-list-wrapper{
        .ebook-popup-item{
            display: flex;
            font-size: px2rem(15);
            padding: px2rem(10) px2rem(15);
            box-sizing: border-box;
            font-weight: bold;
            &.isCHeck{
                color: #346cb9;
            }
            .item-font{
                justify-content: flex-start;
                flex: 1;
            }
            .item-icon{
                justify-content: flex-end;
                width: px2rem(16)
            }
        }
    }
}
</style>