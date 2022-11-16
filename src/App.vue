<template>
  <div class="about">
    <h1>This is an about page</h1><br>
    <Button class="randy-css">123</Button>
  </div>
</template>
<script setup lang="ts">
import {Button} from "ant-design-vue"
console.log('Randy123');

</script>
<style lang="less">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    .randy-css {
      color: red;
    }
  }
}
</style>
