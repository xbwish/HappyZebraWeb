<template>
  <CoreChopPersonalCenterHeader />
  <div class="layout-page">
    <slot></slot>
  </div>
  <van-back-top
    style="--van-back-top-bottom: 75px; z-index: 999; --van-back-top-background: #D33123"
  />
</template>

<script setup lang="ts">
import CoreChopPersonalCenterHeader from "./personal-center/coreshop-personal-center-header.vue";
</script>
<style lang="scss" scoped>
.layout-page {
  width: 10rem;
  margin: 0 auto; 
}
</style>
