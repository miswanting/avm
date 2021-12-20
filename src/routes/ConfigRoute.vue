<template lang="pug">
.container
  .box
    h3.title.is-4 网络设置
    .field
      label.radio 
        input(
          type="radio",
          name="proxy",
          :value="false",
          v-model="store.state.config.proxy"
        )
        span 直接连接
      label.radio 
        input(
          type="radio",
          name="proxy",
          :value="true",
          v-model="store.state.config.proxy"
        )
        span 通过代理
    label.label 代理地址
    .field.has-addons
      .control
        .select
          select(
            :disabled="!store.state.config.proxy",
            v-model="store.state.config.proxyProtocol"
          )
            option(value="sock") sock://
            option(value="http") http://
      .control.is-expanded
        input.input(
          placeholder="127.0.0.1",
          :disabled="!store.state.config.proxy",
          v-model="store.state.config.proxyHost"
        )
      .control
        a.button.is-static :
      .control.is-expanded
        input.input(
          type="number",
          placeholder="8080",
          :disabled="!store.state.config.proxy",
          v-model="store.state.config.proxyPort"
        )
    .field
      .control
        button.button.is-primary(
          :class="{ 'is-loading': store.state.net.connectTestStatus === 0, 'is-success': store.state.net.connectTestStatus === 1, 'is-danger': store.state.net.connectTestStatus === -1 }",
          @click="store.dispatch('net/test')"
        )
          span(v-if="store.state.net.connectTestStatus === null") 测试连接
          span.icon(v-if="store.state.net.connectTestStatus === 1")
            i.fas.fa-check
          span(v-if="store.state.net.connectTestStatus === 1") 连接成功！
          span.icon(v-if="store.state.net.connectTestStatus === -1")
            i.fas.fa-times
          span(v-if="store.state.net.connectTestStatus === -1") 连接失败！
  .box
    h3.title.is-4 下载引擎设置
    .buttons.has-addons
      button.button.is-primary(disabled) 下载 Wget
      button.button.is-primary(disabled) 下载 Aria2
    .field
      label.label
        span Wget 路径
        span.tag 可选
      .control
        input.input(v-model="store.state.config.wgetPath")
    .field
      label.label
        span Aria2c 路径
        span.tag 可选
      .control
        input.input(v-model="store.state.config.aria2cPath")
    .field
      label.label 当前下载引擎
      .control
        .select
          select(v-model="store.state.config.downloadEngine")
            option(value="internal") 内置
            option(value="wget") Wget
            option(value="aria2") Aria2
  .box
    h3.title.is-4 媒体信息引擎设置
    .field
      .control
        button.button.is-primary(disabled) 下载 FFmpeg
    .field
      label.label FFprobe 路径
      .control
        input.input(v-model="store.state.config.ffprobePath")
    .field
      label.label MediaInfo 路径
      .control
        input.input(v-model="store.state.config.mediaInfoPath")
    .field
      label.label 当前媒体信息引擎
      .control
        .select
          select(v-model="store.state.config.mediaInfoEngine")
            option(value="ffprobe") FFprobe
            option(value="mediainfo") MediaInfo
  .box
    h3.title.is-4 转码引擎设置
    .field
      .control
        button.button.is-primary(disabled) 下载 FFmpeg
    .field
      label.label FFmpeg 路径
      .control
        input.input(v-model="store.state.config.ffmpegPath")
    .field
      label.label 当前转码引擎
      .control
        .select
          select(v-model="store.state.config.convertEngine")
            option(value="ffmpeg") FFmpeg
  .box
    h3.title.is-4 视频代码解析设置
    .field
      label.label 提取代码正则表达式
      .control
        input.input(v-model="store.state.config.re")
  .box
    h3.title.is-4 在线数据库设置
    .field
      label.label 当前数据库
      .control
        .select
          select(v-model="store.state.config.database")
            option(value="javbus") JavBus
  .box
    h3.title.is-4 文件命名格式
    .field
      label.label 文件命名格式
      .control
        input.input(v-model="store.state.config.filename")
  .box
    h3.title.is-4 转码参数设置
    .field
      label.label 视频格式
      .control
        .select
          select(v-model="store.state.config.extension")
            option(value="mp4") mp4
    .field
      label.label 编码方式
      .control
        .select
          select(v-model="store.state.config.encodeMethod")
            option(value="cbr") CBR
    .field
      label.label 码率
      .control
        input.input(v-model="store.state.config.rate")
    .field
      label.label 分辨率
      .control
        .select
          select(v-model="store.state.config.resolution")
            option(:value="360") 360P
            option(:value="480") 480P
            option(:value="560") 560P
            option(:value="720") 720P
            option(:value="1080") 1080P
  .box
    h3.title.is-4 目录组织方式
    .field
      label.label 目录名称
      .control
        input.input(v-model="store.state.config.folder")
  .box
    h3.title.is-4 元数据设置
  .box
    h3.title.is-4 系统设置
    .field
      .control
        button.button.is-primary(disabled) 检查更新
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
const store = useStore();
</script>
