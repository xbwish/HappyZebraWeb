<template>
  <NuxtLayout>
    <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
      <NuxtPage />
    </NConfigProvider>
     <!-- 统计代码 -->
     <div v-show="false" v-html="configStore?.statistics"></div> 
  </NuxtLayout>
</template>

<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN } from "naive-ui";
import { useConfigStore } from '@/store';
const configStore = useConfigStore().getConfig;
</script>

<style lang="scss" scoped></style>
