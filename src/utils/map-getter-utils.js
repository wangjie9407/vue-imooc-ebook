import {mapGetters,mapActions} from 'vuex'

export const EbookMixins = {
    computed: {
        ...mapGetters([
          'fileName',
          'menuVisible',
          'settingVisible',
          'defaultFontSize',
          'currentBook',
          'defaultFontFamily',
          'fontFamilyVisible'
          ])
      },
    methods: {
        ...mapActions([
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize',
            'setCurrentBook',
            'setFontFamilyVisible',
            'setDefaultFontFamily'
        ])
    },
}