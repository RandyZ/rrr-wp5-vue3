<template>
  <div>
    <micro-app :name='appName' :url="appUrl" :data='data' :baseRoute='appActive'>
    </micro-app>
  </div>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, ref, type ComponentPublicInstance, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { Md5 } from 'ts-md5'
import type { MicroAppBaseContext, RouteMetaData } from './typeings'
const proxy: ComponentPublicInstance | null | undefined = getCurrentInstance()?.proxy
const data: Ref<MicroAppBaseContext> = ref({
  appName: process.env.VUE_APP_NAME,
  eventBus: (proxy?.$Bus || null)
} as MicroAppBaseContext)
const route = useRoute()
const routeMeta = route.meta?.microapp as RouteMetaData
const appName = computed(() => routeMeta?.name || `MicroApp-${Md5.hashStr(route.fullPath)}`)
const appUrl = ref(routeMeta.location)
const appActive = ref(routeMeta.active)

// 测试事件总线
setTimeout(() => {
  proxy?.$Bus.emit('Randy123123123', {
    test: 1
  })
}, 1000)
</script>
