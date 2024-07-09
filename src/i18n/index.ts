import { createI18n } from 'vue-i18n'
import message from '@/i18n/package'


localStorage.setItem('localLang', 'en');
const i18n = createI18n({
  locale: 'en', //默认是中文
  legacy: false, //解决报错的
  globalInjection: true, // 全局注册$t方法
  messages: message,
})

export default i18n