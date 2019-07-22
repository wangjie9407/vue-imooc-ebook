const ebook = {
  state: {
    // 电子书名称
    fileName: '',
    // 菜单是否可见
    menuVisible: false,
    // 设置项是否可见:-1：不可见，0：字号，1：主题；2：进度；3：目录
    settingVisible: -1,
    // 默认字号
    defaultFontSize: 16,
    // 当前电子书对象
    currentBook: null,
    // 默认选中字体
    defaultFontFamily:'Default',
    // 字体选项栏显隐状态
    fontFamilyVisible:false
  },
  mutations: {
    SET_FILENAME (state, filename) {
      state.fileName = filename
    },
    SET_MENUVISIBLE (state, menuVisible) {
		if(!menuVisible){
			state.settingVisible = -1
		}
		state.menuVisible = menuVisible
    },
    SET_SETTINGVISIBLE (state, settingVisible) {
		if(state.settingVisible === settingVisible){
			state.settingVisible = -1
		}else{
			state.settingVisible = settingVisible
		}
    },
    SET_DEFAULTFONTSIZE (state, defaultFontSize) {
      state.defaultFontSize = defaultFontSize
    },
    SET_CURRENTBOOK (state, currentBook) {
      state.currentBook = currentBook
    },
    SET_FONTFAMILYVISIBLE (state, fontFamilyVisible) {
      state.fontFamilyVisible = fontFamilyVisible
    },
    SET_DEFAULTFONTFAMILY (state, defaultFontFamily) {
      state.defaultFontFamily = defaultFontFamily
    }
  },
  actions: {
    setFileName: ({commit}, filename) => {
      return  commit('SET_FILENAME', filename)
    },
    setMenuVisible: ({commit}, menuVisible) => {
      return  commit('SET_MENUVISIBLE', menuVisible)
    },
    setSettingVisible: ({commit}, settingVisible) => {
      return  commit('SET_SETTINGVISIBLE', settingVisible)
    },
    setDefaultFontSize: ({commit}, defaultFontSize) => {
      return  commit('SET_DEFAULTFONTSIZE', defaultFontSize)
    },
    setCurrentBook: ({commit}, currentBook) => {
      return  commit('SET_CURRENTBOOK', currentBook)
    },
    setFontFamilyVisible: ({commit}, fontFamilyVisible) => {
      return  commit('SET_FONTFAMILYVISIBLE', fontFamilyVisible)
    },
    setDefaultFontFamily: ({commit}, defaultFontFamily) => {
      return  commit('SET_DEFAULTFONTFAMILY', defaultFontFamily)
    },
  },
  getters:{
    fileName : state => state.fileName,
    menuVisible: state => state.menuVisible,
    settingVisible:  state => state.settingVisible,
    defaultFontSize: state => state.defaultFontSize,
    currentBook: state => state.currentBook,
    defaultFontFamily: state => state.defaultFontFamily,
    fontFamilyVisible: state => state.fontFamilyVisible
  }
}
 export default ebook
