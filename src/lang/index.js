import Vue from 'vue';
import VueI18n from 'vue-i18n';
import cn from './cn';
import en from './en';
import {getLocalStorage, setLocalStorage} from '../utils/localstorage';

Vue.use(VueI18n)

const messages = {
    en,
    cn
}

let locale = getLocalStorage('locale')
if (!locale) {
    locale = 'cn'
    setLocalStorage('locale', locale)
}

const i18n = new VueI18n({
    locale,
    messages
})

export default i18n