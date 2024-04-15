<template>
  <Empty
    image="/images/no-data.png"
    image-size="80"
    :description="$t(props.text)"
  >
  </Empty>
</template>

<script setup lang="ts">
import { Empty } from "vant";

const props = withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: "暂无数据",
  }
);
</script>

<style lang="scss" scoped>
.body {
}
</style>
