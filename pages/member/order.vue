<template>
  <div><NuxtPage /></div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    title: coreShopLang('订单列表')
})

</script>
<style lang="scss" scoped>
</style>
