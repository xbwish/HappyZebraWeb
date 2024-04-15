<template>
  <div class="rich-text" v-html="props.content"></div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ content?: string }>(), {
  content:
    '<p>ddd<img alt="" src="https://files.nsts.mvccms.cn/upload/20230118/20230118234946_0176.png" style="width: 41px; height: 61px;" /></p>',
});
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
  p {
    color: #909193;
  }
}
</style>
