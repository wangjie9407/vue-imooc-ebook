import {mapGetters,mapActions} from 'vuex'
import {themeList} from '../assets/enum/font-size'

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
          'section'
          ]),
          themeList() {
            return themeList(this)
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
            'setSection'
        ])
    },
}