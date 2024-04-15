<template>
  <div>{{ userCenter }}</div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
const userCenter: Ref<string> = useState<string>("product", () => coreShopLang("用户中心"));
</script>
