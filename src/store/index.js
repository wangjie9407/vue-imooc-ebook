import Vue from 'vue'
import Vuex from 'vuex'
import ebook from './book/ebook'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    ebook
  }
})
