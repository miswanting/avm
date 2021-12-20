import 'sanitize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './themes/index.styl'

import { createApp } from 'vue'

import App from './App.vue'

import i18n from './i18n'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(store)

app.mount('body')