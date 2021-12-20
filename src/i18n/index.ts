import { createI18n } from 'vue-i18n'

import en_US from './en-US.yml'
import ja_JP from './ja-JP.yml'
import zh_CN from './zh-CN.yml'
import zh_TW from './zh-TW.yml'

type MessageSchema = typeof en_US

export default createI18n<[MessageSchema], 'en-US' | 'ja-JP' | 'zh-CN' | 'zh-TW'>({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': en_US,
    'ja-JP': ja_JP,
    'zh-CN': zh_CN,
    'zh-TW': zh_TW,
  }
})