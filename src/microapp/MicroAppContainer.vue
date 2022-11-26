<template>
  <div>
    <!--
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
      baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
     -->
    <micro-app name='vue3' url='http://localhost:9001/micro-app/vue3' :data='data' baseRoute='/vue3'>
      <!-- destroy inline scopecss='false' -->
    </micro-app>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const data = ref({ from: '来自基座的初始化数据' })
</script>
