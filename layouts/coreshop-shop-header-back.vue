<template>
  <view v-if="showBackCMP" class="arrow-back" :style="backStyleCMP" @click="onBack()">
    <CoreshopIconBack></CoreshopIconBack>
  </view>
  <slot></slot>
  <BackTop style="--van-back-top-bottom: 75px; z-index: 999; --van-back-top-background: #D33123;" />
</template>
<script setup lang="ts">
import { useCommonStore, usePageConfig } from "@/store";
import { BackTop } from "vant";
import { coreShopAuthCookie } from "@/consts";

const backStyleCMP = computed(() => usePageConfig().get_back_style || {});
const showBackCMP = computed(() => usePageConfig().get_show_back);

const router = useRouter();

const onBack = () => {
  const cookie = useCookie(coreShopAuthCookie);
  if (cookie?.value) {
    return router.back();
  }

  const fromRoutePath: string = useCommonStore().get_from_route_path;
  if (["/member/center", "/cart"].includes(fromRoutePath)) {
    return navigateTo("/", { replace: true });
  }
  router.back();
};
</script>

<style lang="scss" scoped>
.arrow-back {
  position: fixed;
  left: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  svg {
    margin: auto;
    width: 20px;
    height: 20px;
  }
}
</style>
