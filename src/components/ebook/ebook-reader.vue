<template>
  <div class="ebook-reader">
    <div id="ebook"></div>
  </div>
</template>

<script>
import EPub from "epubjs";
import { FONT_FAMILY_LIST, addCssFile } from "../../assets/enum/font-size";
import { EbookMixins } from "../../utils/map-getter-utils";
import {
  setBookStorage,
  getBookStorage,
  getLocalStorage,
  setLocalStorage
} from "../../utils/localstorage";

global.ePub = EPub;
export default {
  name: "EbookReader",
  data() {
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
      touchEndTime: 0
    };
  },
  methods: {
    /*
        切换菜单以及标题显示状态
       */
    toggleMenuAndTitle: function() {
      this.setMenuVisible(!this.menuVisible);
    },
    /**
     * 格式化文字
     */
    initFont(key, value) {
      // 初始化字号
      if (key === "fontSize") {
        if (!value) {
          setBookStorage(this.fileName, key, this.defaultFontSize);
        } else {
          this.setDefaultFontSize(value);
          this.book.rendition.themes.fontSize(value);
        }
      } else if (key === "fontFamily") {
        if (!value) {
          setBookStorage(this.fileName, key, this.defaultFontFamily);
        } else {
          this.setDefaultFontFamily(value);
          this.book.rendition.themes.font(value);
        }
      }
    },
    /**
     * 格式化主题
     */
    initTheme() {
      const theme = getLocalStorage("theme");
      if (theme) {
        this.themeList.forEach(theme => {
          this.currentBook.rendition.themes.register(theme.name, theme.style);
        });
        this.currentBook.rendition.themes.select(theme.name);
        addCssFile(`${process.env.VUE_APP_SOURCE_URL}theme/${theme.href}`);
      } else {
        setLocalStorage("theme", this.themeList[0]);
      }
    },
    /**
     * 格式化进度
     */
    initProgress() {
      const section = getBookStorage(this.fileName, "section");
      const progress = getBookStorage(this.fileName, "progress");
      if (section > 0) {
        this.setSection(section);
        const sectionInfo = this.currentBook.section(section);
        if (sectionInfo && sectionInfo.href) {
          this.currentBook.rendition.display(sectionInfo.href);
        }
      }
      if (progress > 0) {
        this.setProgress(progress);
        const cfi = this.currentBook.locations.cfiFromPercentage(
          progress / 100
        );
        this.currentBook.rendition.display(cfi);
      }
    },
    /**
     * 设置手势事件
     */
    initGesture() {
      const that = this;
      // 获取手势起始状态
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStatrtTime = event.timeStamp;
      });
      // 获取手势结束状态
      this.rendition.on("touchend", event => {
        this.touchEndX = event.changedTouches[0].clientX;
        this.touchEndTime = event.timeStamp;
        const offsetX = this.touchEndX - this.touchStartX;
        const offsetTime = this.touchEndTime - this.touchStatrtTime;
        if (offsetTime < 500) {
          if (offsetX > 40) {
            console.log("this", this);
            this.rendition.next().then(() => {
              this.refreshLocation();
            });
            that.setMenuVisible(false);
            that.setFontFamilyVisible(false);
          } else if (offsetX < -40) {
            this.rendition.prev().then(() => {
              this.refreshLocation();
            });
            that.setMenuVisible(false);
            that.setFontFamilyVisible(false);
          } else {
            that.setFontFamilyVisible(false);
            that.toggleMenuAndTitle();
          }
          event.preventDefault();
          event.stopPropagation();
        }
      });
    },
    /**
     * 动态添加字体为电子书
     */
    addCssFiles() {
      this.rendition.hooks.content.register(content => {
        FONT_FAMILY_LIST.forEach(item => {
          if (item.font !== "Default") {
            content.addStylesheet(
              `${process.env.VUE_APP_SOURCE_URL}fonts/${item.font}.css`
            );
          }
        });
      });
    },
    initEpub: function() {
      // 缓存this指向
      const that = this;
      // 定义解析电子书的url
      const url = `${process.env.VUE_APP_SOURCE_URL}epub/${this.fileName}.epub`;
      // 获取epub对象
      this.book = new EPub(url);
      this.setCurrentBook(this.book);
      // 渲染电子书
      this.rendition = this.book.renderTo("ebook", {
        width: innerWidth,
        height: innerHeight,
        method: "default"
      });
      // 在创建电子书对象时读取缓存初始化对象
      const location = getBookStorage(this.fileName, "location");
      this.display(location, () => {
        let fontSize = getBookStorage(this.fileName, "fontSize");
        // 初始化电子式字号
        this.initFont("fontSize", fontSize);
        let fontFamily = getBookStorage(this.fileName, "fontFamily");
        // 初始化电子书字体
        this.initFont("fontFamily", fontFamily);
        // 初始化主题
        this.initTheme();
        // 初始化进度
        // this.initProgress()
      });
      // 添加绑定手势事件
      this.initGesture();
      // 动态添加字体样式文件
      this.addCssFiles();
      // 添加分页功能
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            (750 *
              (window.innerWidth / 375) *
              getBookStorage(this.fileName, "fontSize")) /
              16
          );
        })
        .then(locations => {
          this.setBookAvailable(true);
          this.refreshLocation();
        });
    }
  },
  mounted() {
    if (
      this.$route.params.filename &&
      this.$route.params.filename.indexOf("|") >= 0
    ) {
      const filename = this.$route.params.filename.split("|").join("/");
      this.setFileName(filename).then(() => {
        this.initEpub();
      });
    }
  },
  mixins: [EbookMixins]
};
</script>

<style scoped>
</style>
