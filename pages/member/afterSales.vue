<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup lang='ts'>
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    title: coreShopLang("售后列表页")
})
</script>

<style lang='scss' scoped>

</style>