<template>
    <div class="ebook-reader">
      <div id="ebook"></div>
    </div>
</template>

<script>
  import EPub from 'epubjs'
  import {FONT_FAMILY_LIST} from '../../assets/enum/font-size'
  import {EbookMixins} from '../../utils/map-getter-utils'
  import {setBookStorage, getBookStorage, getLocalStorage, setLocalStorage} from '../../utils/localstorage'

  global.ePub = EPub
  export default {
    name: 'EbookReader',
    data () {
      return {
        // EPub对象
        book: null,
        //  渲染对象
        rendition: null,
        //  手势起始位置
        touchStartX: 0,
        // 手势触碰时的起始时间
        touchStatrtTime: 0,
        // 手势结束位置
        touchEndX: 0,
        // 手势触碰时的结束时间
        touchEndTime: 0,

      }
    },
    methods:{
      /*
        切换菜单以及标题显示状态
       */
      toggleMenuAndTitle: function () {
        this.setMenuVisible(!this.menuVisible)
      },
      /**
       * 格式化文字
       */
      initFont(key,value){
        // 初始化字号
        if(key === 'fontSize'){
          if (!value) {
            setBookStorage(this.fileName,key, this.defaultFontSize)
          } else {
            this.setDefaultFontSize(value)
            this.book.rendition.themes.fontSize(value)
          }
        }else if (key === 'fontFamily') {
          if (!value) {
            setBookStorage(this.fileName,key, this.defaultFontFamily)
          } else {
            this.setDefaultFontFamily(value)
            this.book.rendition.themes.font(value)
          }
        }
      },
      initEpub: function () {
        // 缓存this指向
        const that = this;
        // 定义解析电子书的url
        const url = `${process.env.VUE_APP_SOURCE_URL}epub/${this.fileName}.epub`
        // 获取epub对象
        this.book = new EPub(url)
        this.setCurrentBook(this.book)
        // 渲染电子书
        this.rendition = this.book.renderTo('ebook',
          {
            width: innerWidth,
            height: innerHeight,
            method: 'default'
          }
        )
        this.rendition.display().then(rendition => {
          let fontSize = getBookStorage(this.fileName,'fontSize')
          this.initFont('fontSize', fontSize)
          let fontFamily = getBookStorage(this.fileName,'fontFamily')
          this.initFont('fontFamily', fontFamily)
        })
        // 获取手势起始状态
        this.rendition.on('touchstart', function(event) {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStatrtTime = event.timeStamp
        })
        // 获取手势结束状态
        this.rendition.on('touchend', function(event) {
          this.touchEndX = event.changedTouches[0].clientX
          this.touchEndTime = event.timeStamp
          const offsetX = this.touchEndX - this.touchStartX;
          const offsetTime = this.touchEndTime - this.touchStatrtTime
          if (offsetTime < 500 ){
            if(offsetX > 40) {
              this.next()
              that.setMenuVisible(false)
              that.setFontFamilyVisible(false)
            }else if (offsetX < -40){
              this.prev()
              that.setMenuVisible(false)
              that.setFontFamilyVisible(false)
            }else {
              that.setFontFamilyVisible(false)
              that.toggleMenuAndTitle()
            }
            event.preventDefault()
            event.stopPropagation();
          }
        })
        this.rendition.hooks.content.register(content => {
          FONT_FAMILY_LIST.forEach(item => {
            if(item.font !== 'Default'){
              content.addStylesheet(`${process.env.VUE_APP_SOURCE_URL}fonts/${item.font}.css`)
            }
          })
        })
      },
    },
    mounted(){
      if ((this.$route.params.filename) && ( this.$route.params.filename.indexOf('|')>=0) ){
        const filename = this.$route.params.filename.split('|').join('/')
        this.setFileName(filename).then(() => {
          this.initEpub()
        })
      }
    },
    mixins:[
      EbookMixins
    ]
  }
</script>

<style scoped>

</style>
