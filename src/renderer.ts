import 'sanitize.css'
import 'bulma/css/bulma.css'
// import 'ant-design-vue/dist/antd.css';
// import 'element-plus/dist/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { ipcRenderer } from 'electron'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
// import Antd from 'ant-design-vue';
// import ElementPlus from 'element-plus/es/index'
import NetStore from './stores/NetStore'
import VideoStore from './stores/VideoStore'
import ConfigStore from './stores/ConfigStore'
import App from './App.vue'
import DashboardRoute from './routes/DashboardRoute.vue'
import ConfigRoute from './routes/ConfigRoute.vue'
import { parse } from "path";
const app = createApp(App)
// app.use(ElementPlus)
// app.config.productionTip = false;
// app.use(Antd);
const store = createStore({
  modules: {
    net: NetStore,
    video: VideoStore,
    config: ConfigStore
  }
})
app.use(store)
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: DashboardRoute },
    { path: '/config', component: ConfigRoute }
  ]
})
app.use(router)
app.mount('body')
ipcRenderer.on('pkg', (e, data) => {
  store.dispatch('net/recv', data)
})
document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});
document.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.dataTransfer.files) {
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const p = parse(e.dataTransfer.files[i].path);
      const newVideo = {
        dir: p.dir, // 视频所在目录
        base: p.base, // 文件名(含扩展)
        name: p.name, // 纯文件名
        code: undefined, // 视频代号
        coverPath: undefined, // 封面路径
        cover: undefined, // 封面路径
        title: undefined, // 标题
        release: undefined, // 发行日期
        director: undefined, // 导演
        producer: undefined, // 发行日期
        publisher: undefined, // 发行日期
        series: undefined, // 系列
        actors: [], // 演员
        frames: undefined, // 演员
        progress: undefined, // 演员
        done: false, // 演员
      };
      (store as any).dispatch('video/new', newVideo)
      // store.dispatch('run', e.dataTransfer.files[i].path)
    }
  }
});