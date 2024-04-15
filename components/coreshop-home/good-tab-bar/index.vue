<template>
  <div class="layout">
    <div
      class="coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18"
      style="overflow: hidden"
    >
      <NTabs type="line" :bar-width="28">
        <NTabPane v-for="item in props.coreshopData?.parameters?.list || []" :name="item.title" :tab="item.title">
          <CoreshopHomeGoodTabBarItem :config="item"></CoreshopHomeGoodTabBarItem>
        </NTabPane>
      </NTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { NTabs, NTabPane } from "naive-ui";
import {GoodTabBarConfig }from '@/model'

const props = withDefaults(defineProps<{ coreshopData?: GoodTabBarConfig }>(), {});
</script>

<style scoped lang="scss"></style>
