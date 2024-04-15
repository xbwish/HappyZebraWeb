<template>
  <NuxtLayout name="home">
    <CoreshopTitle :title="$t('快乐搬馬')"></CoreshopTitle>
    <PullRefresh v-model="state.pullRefresh" @refresh="onPullRefresh()">
      <CoreshopHome :homePageLayoutConfig="state.pageConfig?.data?.items"></CoreshopHome>
    </PullRefresh>
    <CoreshopLoading v-if="state.loading" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { queryPageConfig } from "@/composables/config";
import { PullRefresh } from "vant";

definePageMeta({ layout: false });
const state = reactive<{
  pullRefresh: boolean;
  pageConfig: { [key: string]: any };
  loading: boolean;
}>({
  pullRefresh: false,
  pageConfig: {},
  loading: false,
});

const getPageConfig = async () => {
  state.loading = true;
  state.pageConfig = await queryPageConfig("mobile_home");
  state.loading = false;
};

getPageConfig();

/** 下拉刷新 */
const onPullRefresh = async () => {
  await getPageConfig();
  state.pullRefresh = false;
};
</script>
<style lang="scss" scoped></style>
