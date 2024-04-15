<template>
  <div class="rich-text" v-html="props.coreshopData?.parameters?.value"></div>
</template>

<script setup lang="ts">
import {} from "vue";

const props = withDefaults(
  defineProps<{
    coreshopData: {
      parameters: {
        value: string;
      };
    };
  }>(),
  {}
);
</script>

<style scoped lang="scss">
.rich-text {
  color: #606266;
  font-size: 13px;
  line-height: 1.8;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
  background-color: #ffffff;
  overflow: hidden;
}

:deep(.rich-text) {
  p {
    color: #909193;
    overflow: hidden !important;
    display: block;
  }
}
</style>
