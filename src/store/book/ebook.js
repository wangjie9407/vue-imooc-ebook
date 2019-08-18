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
    defaultFontFamily: 'Default',
    // 字体选项栏显隐状态
    fontFamilyVisible: false,
    // 默认主题
    defaultTheme: 'Default',
    // 进度
    progress: 0,
    bookAvailable: false,
    // 章节
    section: 0,
    // 阅读时间
    readTime: null,
    // 电子书封面图片
    cover: null,
    // 电子书相关信息
    metaData:null
  },
  mutations: {
    /**
     * 设置电子书相关信息
     */
    SET_METADATA(state, metaData) {
      state.metaData = metaData
    },
    /**
     * 设置电子书名称
     */
    SET_FILENAME(state, filename) {
      state.fileName = filename
    },
    /**
     * 设置菜单可见
     */
    SET_MENUVISIBLE(state, menuVisible) {
      if (!menuVisible) {
        state.settingVisible = -1
      }
      state.menuVisible = menuVisible
    },
    /**
     * 设置功能可见
     */
    SET_SETTINGVISIBLE(state, settingVisible) {
      if (state.settingVisible === settingVisible) {
        state.settingVisible = -1
      } else {
        state.settingVisible = settingVisible
      }
    },
    /**
     * 设置字体
     */
    SET_DEFAULTFONTSIZE(state, defaultFontSize) {
      state.defaultFontSize = defaultFontSize
    },
    /**
     * 设置默认主题
     */
    SET_DEFAULTTHEME(state, defaultTheme) {
      state.defaultTheme = defaultTheme
    },
    /**
     * 设置当前电子书对象
     */
    SET_CURRENTBOOK(state, currentBook) {
      state.currentBook = currentBook
    },
    /**
     * 设置字体菜单可见
     */
    SET_FONTFAMILYVISIBLE(state, fontFamilyVisible) {
      state.fontFamilyVisible = fontFamilyVisible
    },
    /**
     * 设置默认字体
     */
    SET_DEFAULTFONTFAMILY(state, defaultFontFamily) {
      state.defaultFontFamily = defaultFontFamily
    },
    /**
     * 设置进度
     */
    SET_PROGRESS(state, progress) {
      state.progress = progress
    },
    SET_BOOKAVAILABLE(state, bookAvailable) {
      state.bookAvailable = bookAvailable
    },
    /**
     * 设置章节
     */
    SET_SECTION(state, section) {
      state.section = section
    },
    /**
     * 设置阅读时间
     */
    SET_READTIME(state, readTime) {
      state.readTime = readTime
    },
    /**
     * 设置封面图片地址
     */
    SET_COVER(state, cover) {
      state.cover = cover
    },
  },
  actions: {
    setMetaData:({ commit }, metaData) => {
      return commit('SET_METADATA',metaData)
    },
    setFileName: ({ commit }, filename) => {
      return commit('SET_FILENAME', filename)
    },
    setMenuVisible: ({ commit }, menuVisible) => {
      return commit('SET_MENUVISIBLE', menuVisible)
    },
    setSettingVisible: ({ commit }, settingVisible) => {
      return commit('SET_SETTINGVISIBLE', settingVisible)
    },
    setDefaultFontSize: ({ commit }, defaultFontSize) => {
      return commit('SET_DEFAULTFONTSIZE', defaultFontSize)
    },
    setDefaultTheme: ({ commit }, defaultTheme) => {
      return commit('SET_DEFAULTTHEME', defaultTheme)
    },
    setCurrentBook: ({ commit }, currentBook) => {
      return commit('SET_CURRENTBOOK', currentBook)
    },
    setFontFamilyVisible: ({ commit }, fontFamilyVisible) => {
      return commit('SET_FONTFAMILYVISIBLE', fontFamilyVisible)
    },
    setDefaultFontFamily: ({ commit }, defaultFontFamily) => {
      return commit('SET_DEFAULTFONTFAMILY', defaultFontFamily)
    },
    setProgress: ({ commit }, progress) => {
      return commit('SET_PROGRESS', progress)
    },
    setBookAvailable: ({ commit }, bookAvailable) => {
      return commit('SET_BOOKAVAILABLE', bookAvailable)
    },
    setSection: ({ commit }, section) => {
      return commit('SET_SECTION', section)
    },
    setReadTime: ({ commit }, readTime) => {
      return commit('SET_READTIME', readTime)
    },
    setCover: ({ commit }, cover) => {
      return commit('SET_COVER', cover)
    },
  },
  getters: {
    fileName: state => state.fileName,
    menuVisible: state => state.menuVisible,
    settingVisible: state => state.settingVisible,
    defaultFontSize: state => state.defaultFontSize,
    currentBook: state => state.currentBook,
    defaultFontFamily: state => state.defaultFontFamily,
    fontFamilyVisible: state => state.fontFamilyVisible,
    defaultTheme: state => state.defaultTheme,
    progress: state => state.progress,
    bookAvailable: state => state.bookAvailable,
    section: state => state.section,
    readTime: state => state.readTime,
    cover: state => state.cover,
    metaData: state => state.metaData,
  }
}
export default ebook
