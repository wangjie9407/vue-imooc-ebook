<template>
  <div>
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookTitle from "../../components/ebook/ebook-title";
import EbookReader from "../../components/ebook/ebook-reader";
import EbookMenu from "../../components/ebook/menu-bar";

import { EbookMixins } from "../../utils/map-getter-utils";
import {
  setBookStorage,
  getBookStorage,
  getLocalStorage,
  setLocalStorage
} from "../../utils/localstorage";
import { setInterval, clearInterval } from "timers";
export default {
  name: "index",
  mixins: [EbookMixins],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  data() {
    return {
      timeId: null,
    };
  },
  methods: {
    startLoopReadTime() {
      let readTime = getBookStorage(this.fileName, "readTime");
      this.setReadTime(readTime)
      if (!this.readTime) {
        this.setReadTime(0)
      }
      this.timeId = setInterval(() => {
        this.setReadTime(readTime++)
        setBookStorage(this.fileName, "readTime", this.readTime);
      }, 60000);
    }
  },
  mounted() {
    this.startLoopReadTime();
  },
  destroyed() {
    if (this.timeId) {
      clearInterval(this.timeId);
    }
  }
};
</script>

<style scoped>
</style>
