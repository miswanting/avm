import { createStore } from 'vuex'

import cache from './cache'
import config from './config'
import database from './database'
import net from './net'
import nfo from './nfo'
import task from './task'
import theme from './theme'
import video from './video'

export default createStore({
  modules: {
    cache,
    config,
    database,
    net,
    nfo,
    task,
    theme,
    video,
  }
})