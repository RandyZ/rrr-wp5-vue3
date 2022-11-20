<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Button>123</Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from 'ant-design-vue'
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
