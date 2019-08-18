import { mapGetters, mapActions } from 'vuex'
import { themeList } from '../assets/enum/font-size'
import {setBookStorage, getBookStorage, getLocalStorage, setLocalStorage} from './localstorage'

export const EbookMixins = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'currentBook',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'progress',
      'bookAvailable',
      'section',
      'readTime',
      'cover',
      'metaData'
    ]),
    themeList() {
      return themeList(this)
    },
    // 获取已读时间
    getReadTime(){
      return this.$t('book.haveRead').replace('$1',this.readTime)
    }
  },
  methods: {
    ...mapActions([
      'setMenuVisible',
      'setFileName',
      'setSettingVisible',
      'setDefaultFontSize',
      'setCurrentBook',
      'setFontFamilyVisible',
      'setDefaultFontFamily',
      'setDefaultTheme',
      'setProgress',
      'setBookAvailable',
      'setSection',
      'setReadTime',
      'setCover',
      'setMetaData'
    ]),
    /**
     * 刷新进度，保证设置章节时，进度条会实时刷新
     */
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const startCfi = currentLocation.start.cfi
      const currentProgress = this.currentBook.locations.percentageFromCfi(startCfi)
      this.setProgress(Math.floor(currentProgress * 100))
      this.setSection(currentLocation.start.index)
      setBookStorage(this.fileName, 'location', startCfi)
    },
    /**
     * 初始化电子书，根据缓存设置电子书的状态
     * @ param target,电子书渲染对象
     * @ param cb 回调函数
     */
    display(target,cb){
      if(target){
        this.rendition.display(target).then(() => {
          this.refreshLocation()
            if(cb){
              cb()
            }
        })
      }else{
        this.rendition.display().then(() => {
          this.refreshLocation()
            if(cb){
              cb()
            }
        })
      }
    },
    /**
     * 隐藏菜单
     */
    hideEbookMenu(){
      this.setMenuVisible(false);
      this.setFontFamilyVisible(false);
      this.setSettingVisible(-1)
    }
  },
}